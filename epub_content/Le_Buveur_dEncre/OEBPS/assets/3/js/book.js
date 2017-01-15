/*jshint globalstrict: true*/
/*global jQuery: true*/

"use strict";

// jQuery.noConflict();

/**
 * Global namespace.
 * @namespace
 */
var Mobidys = Mobidys || {
    /**
     * Main classes.
     * @namespace Mobidys.cl
     */
    cl: {},

    /**
     * References to all chapters
     * @member {Mobidys.cl.Chapter[]}
     * @memberof Mobidys
     */
    chapters: []
};

(function ($) {

    /**********************************************************************
     *
     *                          Book class
     *
     *********************************************************************/

    /**
     * Book constructor.
     * @class
     * @classdesc The Book class is the controller. It contains informations
     * about the full book, like the configuration, the options available, etc.
     * @param {Object} config - Configuration. See {@link Mobidys.Book.defaults}
     */
    Mobidys.cl.Book = function (config) {
        /**
         * Configuration used to initialize this book.
         * See {@link Mobidys.Book.defaults}
         * @readonly
         * @member {Object}
         */
        this.configuration = $.extend(true, {}, Mobidys.Book.defaults, config);

        /**
         * Parameters changed in views and saved between pages.
         * @member {Object}
         * @property {number} fontSize - Current font size used in chapter pages.
         * @property {string} fontFamily - Current font used in chapter pages.
         * @property {string} textmark - Last position of the textmark. Uses
         * an XPath representation.
         */
        this.parameters = {
            fontSize: -1,
            fontFamily: "",
            textmark: ""
        };

        /** @member {Mobidys.cl.OptionManager} */
        this.optionManager = new Mobidys.cl.OptionManager(this.configuration.options);
    };

    // Public methods
    $.extend(Mobidys.cl.Book.prototype, /** @lends Mobidys.cl.Book.prototype */{
        /**
         * Increase font size if not at max.
         * @return {?number} New font size (in px) or null if no change.
         */
        increaseFontSize: function () {
            if (this.parameters.fontSize + 2 <= this.configuration.maxFontSize) {
                this.parameters.fontSize += 2;
                $('.zoom-icon').addClass('ON');
                setTimeout(function() {
                    $('.zoom-icon').removeClass('ON');
                },750);
                this.saveContext();
                return this.parameters.fontSize;
            }
            return null;
        },

        /**
         * Decrease font size if not at min.
         * @return {?number} New font size (in px) or null if no change.
         */
        decreaseFontSize: function () {
            if (this.parameters.fontSize - 2 >= this.configuration.minFontSize) {
                this.parameters.fontSize -= 2;
                $('.dezoom-icon').addClass('ON');
                setTimeout(function() {
                    $('.dezoom-icon').removeClass('ON');
                },750);
                this.saveContext();
                return this.parameters.fontSize;
            }
            return null;
        },

        /**
         * Set font size. Checks for min and max in configuration.
         * @param {number} size - Font size.
         * @return {?number} New font size (in px) if changed by max or min,
         * or null if 'size' correctly set.
         */
        setFontSize: function (size) {
            if (size > this.configuration.maxFontSize) {
                this.parameters.fontSize = this.configuration.maxFontSize;
                return this.parameters.fontSize;
            }
            else if (size < this.configuration.minFontSize) {
                this.parameters.fontSize = this.configuration.minFontSize;
                return this.parameters.fontSize;
            }
            else {
                this.parameters.fontSize = size;
                return null;
            }
        },

        /**
         * Cycle between configured fonts.
         * @return {string} New font-family to be applied.
         */
        switchFont: function () {
            var index = this.configuration.fontList.indexOf(this.parameters.fontFamily);
            if (index >= this.configuration.fontList.length - 1)
                index = -1;
            this.parameters.fontFamily = this.configuration.fontList[index+1];
            this.saveContext();
            if (this.parameters.fontFamily == "Arial") {
                $('.icone-menu.police-icon img').css("cssText", 'top:0!important');
            } else if (this.parameters.fontFamily == "timesnewroman-webfont") {
                $('.icone-menu.police-icon img').css("cssText", 'top:-86px!important');
            } else if (this.parameters.fontFamily == "OpenDyslexicAlta-regular") {
                $('.icone-menu.police-icon img').css("cssText", 'top:-172px!important');
            }
            return this.parameters.fontFamily;
        },

        /**
         * Toggle an option.
         * @param {string} option - Name of the option.
         * @return {string[]} A list of options that had their state changed.
         */
        toggleOption: function (option) {
            var options = this.optionManager.toggle(option);
            this.saveContext();
            return options;
        },

        /**
         * Save context, with state and options.
         */
        saveContext: function () {
            Mobidys.ContextManager.save(this);
        },

        /**
         * Load context, with parameters and options.
         * @param {Mobidys.Book~onLoaded} callback - Function called after data
         * is loaded.
         */
        loadContext: function (callback) {
            Mobidys.ContextManager.load(this, function (data) {
                if (!data.parameters) 
                    return;

                $.extend(this.parameters, data.parameters);

                
                var changedOptions = [];
                for (var opt in data.options) {
                    if (this.optionManager.options[opt]
                        && data.options[opt] != this.optionManager.options[opt].enabled) {
                        this.optionManager.options[opt].enabled = data.options[opt];
                        changedOptions.push(opt);
                    }
                }

                var parameters = {
                    options: changedOptions,
                    fontSize: this.parameters.fontSize,
                    fontFamily: this.parameters.fontFamily
                };
                if (this.parameters.fontFamily == "Arial") {
                    $('.icone-menu.police-icon img').css("cssText", 'top:0!important');
                } else if (this.parameters.fontFamily == "timesnewroman-webfont") {
                    $('.icone-menu.police-icon img').css("cssText", 'top:-86px!important');
                } else if (this.parameters.fontFamily == "OpenDyslexicAlta-regular") {
                    $('.icone-menu.police-icon img').css("cssText", 'top:-172px!important');
                }
                callback(parameters);
            });
        },

        /**
         * Remove saved context.
         */
        removeContext: function () {
            Mobidys.ContextManager.remove(this.configuration.uid);
        }
    });

    /**
     * @namespace
     */
    Mobidys.Book = {
        /**
         * @property {string} uid - Unique identifier for the book.
         * @property {number} minFontSize - Minimum font size.
         * @property {number} maxFontSize - Maximum font size.
         * @property {string[]} fontList - List of fonts available.
         * @property {string[]} options - Options to allow.
         * @property {number} paginationScrollDuration - Animation
         * duration on page change.
         * @property {string} charactersPath - Path to characters images.
         * @property {string} definitionsPath - Path to definitions audios.
         */
        defaults: {
            uid: "lily10",
            minFontSize: 16,
            maxFontSize: 22,
            fontList: ["timesnewroman-webfont", "OpenDyslexicAlta-regular", "Arial"],
            options: [
                "pagination", "textmark", "contrast", "spaces", "alternateLines",
                "highlightPhrases", "colorSyllables", "colorPhonemes", "colorPunctuation",
                "definitions", "audioSupport", "readingWindow", "audioPlayback"
                /*"numPagination", "numTextmark", "numContrast", "numSpaces", "numAlternateLines",
                "numHighlightPhrases", "numColorSyllables", "numColorPhonemes", "numColorPunctuation",
                "numDefinitions", "numAudioSupport", "numReadingWindow", "numAudioPlayback", 
                "numPolice", "numZoom", "numDezoom", "numVide1", "numVide2", "numVide3", "numVide4"*/
            ],
            paginationScrollDuration: 2000,
            charactersPath: "Pastilles/",
            definitionsPath: "Definitions/"        }
    };

}(jQuery));
