define(['../ModuleConfig', './Messages', 'jquery', '../PackageParser', 'readium_js/epub-fetch/encryption_handler'], function(moduleConfig, Messages, $, PackageParser, EncryptionHandler){

    var worker;
    var cleanupWorker = function(){
        if (worker) {
            worker.terminate();
            worker = null;
        }
    };
    
    var doWork = function(job, callbacks, transferables){
        if (worker){
            console.log('dangling worker');
        }

        var workerUrl = moduleConfig.workerUrl;
        console.log("WORKER URL: " + workerUrl);
        worker = new Worker(workerUrl);

        var continueOverwrite = function(){
console.debug("postMessage: OVERWRITE_CONTINUE");
            worker.postMessage({msg: Messages.OVERWRITE_CONTINUE});
        }
        var keepBoth = function(){
console.debug("postMessage: OVERWRITE_SIDE_BY_SIDE");
            worker.postMessage({msg: Messages.OVERWRITE_SIDE_BY_SIDE})
        }
        var cancelOverwrite = function(){
            cleanupWorker();
        }

        var innerError = callbacks.error || $.noop;
        var error = function(error, job){
            cleanupWorker();
            innerError(error, job);
        }

        worker.onmessage = function(evt){
            
            var data = evt.data;
            switch (data.msg){
                case Messages.READY:
                
console.debug("postMessage: " + job.msg);
                    // Worker.onMessage() is ready to receive the job
                    // (RequireJS loader for AMD modules => async! require([NAME],function(module){}))
                    if (transferables) {
console.debug("postMessage TRANSFERABLES");
                        worker.postMessage(job, transferables);
                    } else {
                        worker.postMessage(job);
                    }
                    break;
                case Messages.SUCCESS:
                    if (callbacks.success){
                        callbacks.success(data.libraryItems);
                    }
                    cleanupWorker();
                    break;
                case Messages.CONTINUE_IMPORT_ZIP:
                    cleanupWorker();
                    
                    // var reader = new FileReader();
                    // reader.onload = function(e) {
                    //     var buffer = reader.result;
                    
                    //     doWork({msg: Messages.CONTINUE_IMPORT_ZIP, buf: buffer, index: data.index, rootDirName: data.rootDirName, libraryItems: data.libraryItems}, callbacks, [buffer]);
                    // }
                    // reader.readAsArrayBuffer(data.buf);
                
                    doWork({msg: Messages.CONTINUE_IMPORT_ZIP, buf: data.buf, index: data.index, rootDirName: data.rootDirName, libraryItems: data.libraryItems}, callbacks);
                    
                    break;
                case Messages.PROGRESS:
                    if (callbacks.progress){
                        callbacks.progress(data.percent, data.progressType, data.progressData);
                    }
                    break;
                case Messages.OVERWRITE:
                    if (callbacks.overwrite){
                        callbacks.overwrite(data.item, continueOverwrite, keepBoth, cancelOverwrite);
                    }
                    break;
                case Messages.FIND_PACKAGE:
                    var containerDom = (new DOMParser()).parseFromString(data.containerStr, "text/xml");
                    var $rootfile = $('rootfile', containerDom);
                    if (!$rootfile.length){
                        error(Messages.ERROR_EPUB);
                        console.error('Epub container.xml missing rootfile element');
                    }
                    else{
console.debug("postMessage: FIND_PACKAGE_RESPONSE");
                        worker.postMessage({msg: Messages.FIND_PACKAGE_RESPONSE, path: $rootfile.attr('full-path')});
                    }
                    break;
                case Messages.PARSE_PACKAGE:
                    var packageDom = (new DOMParser()).parseFromString(data.packageStr, "text/xml");
                    var errors = $(packageDom).find('parsererror');
                    if (errors.length) {
                        error(Messages.ERROR_PACKAGE_PARSE, $(errors).find('div').text());
                        console.error('There was an xml parsing error when trying to parse the package dom');
                    }
                    else {
                        var packageObj = PackageParser.parsePackageDom(packageDom);

                        var encryptionData;
                        if(data.encryptionStr) {
                            var encryptionDom = (new DOMParser()).parseFromString(data.encryptionStr, "text/xml");

                            encryptionData = EncryptionHandler.CreateEncryptionData(packageObj.id, encryptionDom);
                        }
console.debug("postMessage: PARSE_PACKAGE_RESPONSE");
                        worker.postMessage({msg: Messages.PARSE_PACKAGE_RESPONSE, packageObj: packageObj, encryptionData: encryptionData});
                    }
                    break;
                default:
                    error(data.errorMsg || "Unknown error");
                    cleanupWorker();
            }
        };
        
        worker.onerror = function(){
            console.error(arguments)
        }
    }

    return {
        importZip: function(blob, libraryItems, callbacks){
            
            // var reader = new FileReader();
            // reader.onload = function(e) {
            //     var buffer = reader.result;
            //     doWork({msg: Messages.IMPORT_ZIP, buf: buffer, libraryItems: libraryItems}, callbacks, [buffer]);
            // }
            // reader.readAsArrayBuffer(blob);
            
            doWork({msg: Messages.IMPORT_ZIP, buf: blob, libraryItems: libraryItems}, callbacks);
        },
        importDirectory : function(files, libraryItems, callbacks){
            doWork({msg: Messages.IMPORT_DIR, files: files, libraryItems: libraryItems}, callbacks);
        },
        importUrl : function(url, libraryItems, callbacks){
            doWork({msg: Messages.IMPORT_URL, url: url, libraryItems: libraryItems}, callbacks);
        },
        deleteEpub : function(id, libraryItems, callbacks){
            doWork({msg: Messages.DELETE_EPUB, id: id, libraryItems:libraryItems}, callbacks);
        },
        migrateOldBooks : function(callbacks){
            doWork({msg: Messages.MIGRATE}, callbacks);
        }
    }
});
