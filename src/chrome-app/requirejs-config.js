//  Copyright (c) 2014 Readium Foundation and/or its licensees. All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without modification,
//  are permitted provided that the following conditions are met:
//  1. Redistributions of source code must retain the above copyright notice, this
//  list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//  this list of conditions and the following disclaimer in the documentation and/or
//  other materials provided with the distribution.
//  3. Neither the name of the organization nor the names of its contributors may be
//  used to endorse or promote products derived from this software without specific
//  prior written permission.


var currentURL =
self.location ? (
  self.location.protocol
  + "//"
  + self.location.hostname
  + (self.location.port ? (':' + self.location.port) : '')
  + (self.location.pathname ? self.location.pathname : '')
  ) : ''
;

//    chrome-extension://UUID/index.html
console.log(currentURL);

// self.location.origin  == self.location.protocol + '//' + self.location.host

//    chrome-extension://UUID
console.log(self.location.origin);

var fontsArray = [];
if (typeof getFontFaces != "undefined") { // defined externally
    fontsArray = getFontFaces(self.location.origin + "/font-faces/");
}

// MUST BE *SINGLE* CALL TO require.config() FOR ALMOND (SINGLE BUNDLE) TO WORK CORRECTLY!!!
require.config({
    /* http://requirejs.org/docs/api.html#config-waitSeconds */
    waitSeconds: 0,

    config : {

        'readium_js_viewer/ModuleConfig' : {

            'mathJaxUrl': self.location.origin + '/scripts/mathjax/MathJax.js',
            
            'fonts': fontsArray,

            'annotationCSSUrl': self.location.origin + '/css/annotations.css',

            'jsLibRoot': '/scripts/zip/',

            'useSimpleLoader' : true,

            //   filesystem:chrome-extension://UUID/persistent/epub_library.json
            'epubLibraryPath': undefined,

            'imagePathPrefix': undefined,

            'canHandleUrl' : false,
            'canHandleDirectory' : true,

            'workerUrl': '/scripts/readium-js-viewer_CHROMEAPP-WORKER.js',
            'epubReadingSystemUrl': self.location.origin + '/scripts/epubReadingSystem.js'
        }
    }
});
