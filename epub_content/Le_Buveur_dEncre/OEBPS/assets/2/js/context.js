/*jshint globalstrict: true*/
/*global localStorage: true*/
/*global indexedDB: true*/

var Mobidys = Mobidys || {
    cl: {}
};

(function () {

    /**************************************************************************
     *
     *                          ContextManager
     *
     *************************************************************************/

    /**
     * @namespace
     */
    Mobidys.ContextManager = {
        /**
         * Remember which save/load method works here.
         */
        method: undefined,

        /**
         * Save {@link Mobidys.cl.Book|Book} data.
         * @param {Mobidys.cl.Book} book - Book instance.
         */
        save: function (book) {
            var method = Mobidys.ContextManager.testMethod();

            var status = {};
            for (var opt in book.optionManager.options) {
                status[opt] = book.optionManager.options[opt].enabled;
            }

            var data = {
                options: status,
                parameters: book.parameters
            };

            method.write(book.configuration.uid, JSON.stringify(data));
        },

        /**
         * Load {@link Mobidys.cl.Book|Book} data.
         * @param {Mobidys.cl.Book} book - Book instance.
         * @param {Function} callback - Function to call after data are retrieved.
         */
        load: function (book, callback) {
            var method = Mobidys.ContextManager.testMethod();
            method.read(book.configuration.uid, function (str) {
                if (str != null)
                    callback.call(book, JSON.parse(str));
            });
        },

        /**
         * Remove saved data.
         * @param {string} uid - Unique identifier of the book.
         */
        remove: function (uid) {
            var method = Mobidys.ContextManager.testMethod();
            method.delete(uid);
        },

        /**
         * Test which method is available, either localStorage or cookie.
         * @return {Object} A literal object that contains working methods to
         * read/write/delete data.
         */
        testMethod: function () {
            if (Mobidys.ContextManager.method !== undefined)
                return Mobidys.ContextManager.method;

            if (localStorage !== undefined && localStorage !== null)
                Mobidys.ContextManager.method = Mobidys.ContextManager.localStorage;
            else if (indexedDB !== undefined && indexedDB !== null)
                Mobidys.ContextManager.method = Mobidys.ContextManager.indexedDB;
            else
                Mobidys.ContextManager.method = Mobidys.ContextManager.cookie;

            return Mobidys.ContextManager.method;
        },

        /**
         * @namespace
         * @implements {Mobidys.ContextManager.ContextMethod}
         */
        cookie: {
            /**
             * Write cookie data.
             * @param {string} name - Cookie name.
             * @param {string} value - Cookie value.
             */
            write: function (name, value) {
                var date = new Date();
                date.setTime(date.getTime()+(365*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
                document.cookie = name+"="+value+expires+"; path=/";
            },

            /**
             * Read cookie data.
             * @param {string} name - Cookie name.
             * @param {Function} callback - Callback to return data.
             */
            read: function (name, callback) {
                var data = null;
                var nameEQ = name + "=";
                var ca = document.cookie.split(";");
                for(var i=0;i < ca.length && data == null;i++) {
                    var c = ca[i];
                    while (c.charAt(0)==" ")
                        c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) == 0)
                        data = c.substring(nameEQ.length,c.length);
                }
                callback(data);
            },

            /**
             * Removes a cookie
             * @param {string} name - Cookie name.
             */
            delete: function (name) {
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            }
        },

        /**
         * @namespace
         * @implements {Mobidys.ContextManager.ContextMethod}
         */
        localStorage: {
            /**
             * Write data in localStorage
             * @param {string} key - Item key.
             * @param {string} value - Item value.
             */
            write: function (key, value) {
                localStorage.setItem(key, value);
            },

            /**
             * Read localStorage item.
             * @param {string} key - Item key.
             * @param {Function} callback - Callback to return data.
             */
            read: function (key, callback) {
                var data = localStorage.getItem(key);
                callback(data);
            },

            /**
             * Removes a localStorage item.
             * @param {string} key - Item key.
             */
            delete: function (key) {
                localStorage.removeItem(key);
            }
        },

        /**
         * @namespace
         * @implements {Mobidys.ContextManager.ContextMethod}
         */
        indexedDB: {
            /**
             * Write data in localStorage
             * @param {string} key - Item key.
             * @param {string} value - Item value.
             */
            write: function (key, value) {
                Mobidys.ContextManager.indexedDB._handle("write", key, value);
            },

            /**
             * Read localStorage item.
             * @param {string} key - Item key.
             * @param {Function} callback - Callback to return data.
             */
            read: function (key, callback) {
                Mobidys.ContextManager.indexedDB._handle("read", key, callback);
            },

            /**
             * Removes a localStorage item.
             * @param {string} key - Item key.
             */
            delete: function (key) {
                Mobidys.ContextManager.indexedDB._handle("delete", key);
            },

            /**
             * Database reference.
             * @member {Object}
             * @private
             */
            _db: undefined,

            /**
             * Handle an action on the DB.
             * @private
             * @param {string} action - Write, read or delete action.
             * @param {string} key - Item key.
             * @param {(string|function)} [valOrCall] - Value to write or callback
             * to call when data is read.
             */
            _handle: function (action, key, valOrCall) {
                var _this = Mobidys.ContextManager.indexedDB;
                var _call = function () {
                    if (action == "write")
                        _this._write(_this._db, key, valOrCall);
                    else if (action == "read")
                        _this._read(_this._db, key, valOrCall);
                    else if (action == "delete")
                        _this._delete(_this._db, key);
                };

                // When DB connection is already initialized
                if (_this._db !== undefined) {
                    _call();
                    return;
                }

                var request = indexedDB.open(key, 1);

                request.onsuccess = function () {
                    _this._db = request.result;
                    _call();
                };

                request.onupgradeneeded = function (event) {
                    var db = event.target.result;
                    db.createObjectStore("parameters", {keyPath: "key"});
                };
            },

            /**
             * Actual write in the DB.
             * @private
             * @param {Object} db - DB reference.
             * @param {string} key - Item key.
             * @param {string} value - Value to write.
             */
            _write: function (db, key, value) {
                var request = db.transaction(["parameters"], "readwrite")
                        .objectStore("parameters")
                        .put({ key: key, data: value });

                request.onerror = function () {
                    console.error("Unable to write data");
                };
            },

            /**
             * Actual read in the DB.
             * @private
             * @param {Object} db - DB reference.
             * @param {string} key - Item key.
             * @param {string} callback - Callback to call when data is read.
             */
            _read: function (db, key, callback) {
                var request = db.transaction(["parameters"], "readonly")
                        .objectStore("parameters")
                        .get(key);

                request.onsuccess = function (event) {
                    var result = event.target.result;
                    var data = null;
                    if (result !== undefined)
                        data = result.data;

                    callback(data);
                };

                request.onerror = function () {
                    console.error("Unable to read data");
                };
            },

            /**
             * Actual delete in the DB.
             * @private
             * @param {Object} db - DB reference.
             * @param {string} key - Item key.
             */
            _delete: function (db, key) {
                var request = db.transaction(["parameters"], "readwrite")
                    .objectStore("parameters")
                        .delete(key);

                request.onerror = function () {
                    console.error("Unable to delete data");
                };
            }

        }

    };

}());
