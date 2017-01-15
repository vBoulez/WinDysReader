/*jshint globalstrict: true*/
/*global jQuery: true*/
/*global Audio: true*/
/*global setTimeout: true*/
/*global clearTimeout: true*/

var Mobidys = Mobidys || {
    cl: {}
};

(function ($) {

    /**************************************************************************
     *
     *                          OptionManager class
     *
     *************************************************************************/

    /**
     * OptionManager constructor.
     * @class
     * @classdesc Class used to manage available options. Can check for
     * compatibilities between them.
     * @param {string[]} list - List of options to allow.
     */
    Mobidys.cl.OptionManager = function (list) {
        /**
         * List of available options' instances, referenced by their name.
         * @member {Object.<string, Mobidys.Options~Option>}
         */
        this.options = {};

        /**
         * Table of compatibilities between options.
         * @member {Object.<string, string[]>}
         */
        this.compatibilities = {};

        for (var i in list) {
            var opt = list[i];
            var name = opt.substring(0,1).toUpperCase()+opt.substring(1);
            this.options[opt] = new Mobidys.Options[name]();
            this.registerCompatibilities(opt);
        }
    };

    $.extend(Mobidys.cl.OptionManager.prototype, /** @lends Mobidys.cl.OptionManager.prototype */{
        /**
         * Toggle an option. Checks for compatibilities and disables incompatible
         * options.
         * @param {string} option - Option to toggle.
         * @return {string[]} List of options that changed.
         */
        toggle: function (option) {
            if (!(option in this.options)) {
                console.error("Option "+option+" not available");
                return [];
            }

            var changedOptions = [];
            if (this.options[option].enabled) {
                this.options[option].enabled = false;
            }
            else {
                for (var opt in this.options) {
                    if (this.options[opt].enabled
                        && this.compatibilities[option].indexOf(opt) < 0) {
                        this.options[opt].enabled = false;
                        changedOptions.push(opt);
                    }
                }

                this.options[option].enabled = true;
            }

            changedOptions.push(option);
            return changedOptions;
        },

        /**
         * Registers compatibilities between options
         * @param {string} option - Check compatibilities of this option.
         */
        registerCompatibilities: function (option) {
            var _this = this;
            var comp = this.options[option].compatibility;
            if (!(option in this.compatibilities)) {
                this.compatibilities[option] = comp;
            }
            else {
                this.compatibilities[option] =
                    this.compatibilities[option].concat(comp.filter(function (item) {
                        return _this.compatibilities[option].indexOf(item) < 0;
                    }));
            }

            for (var i = 0; i < comp.length; i++) {
                var opt = comp[i];

                if (!(opt in this.compatibilities))
                    this.compatibilities[opt] = [option];
                else if (this.compatibilities[opt].indexOf(option) < 0)
                    this.compatibilities[opt].push(option);
            }
        },

        /**
         * Print compatibilities table with each option.
         */
        printCompatibilities: function () {
            var strTimes = function (str, times) {
                var s = "";
                for (var i = 0; i < times; i++) {
                    s += str;
                }
                return s;
            };

            var maxLength = 0;
            for (var name in this.compatibilities) {
                if (name.length > maxLength)
                    maxLength = name.length;
            }

            var line = strTimes(" ", maxLength) + "|";
            for (var opt in this.compatibilities) {
                line += opt.substr(0,1) + "|";
            }
            console.log(line);

            for (opt in this.compatibilities) {
                line = opt + strTimes(" ", maxLength-opt.length) + "|";
                for (var o in this.compatibilities) {
                    if (opt == o)
                        line += "\\";
                    else if (this.compatibilities[opt].indexOf(o) > -1)
                        line += "X";
                    else
                        line += " ";
                    line += "|";
                }

                console.log(line);
            }
        }
    });


    /**************************************************************************
     *
     *                          Options
     *
     *************************************************************************/

    /**
     * Contains constructor for all {@link Mobidys.Options~Option|Option}s.
     * @namespace
     */
    Mobidys.Options = {};

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionContrast</code>
     * on the <code>#chapArea</code> element.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.Contrast = function () {
        this.enabled = false;
        this.compatibility = ["spaces", "alternateLines", "highlightPhrases", "colorSyllables", "colorPhonemes", "colorPunctuation", "definitions", "pagination", "textmark"];
        /*if(this.enabled) {
            $('#chapArea').toggleClass("optionContrast");
            $(".contraste-icon").toggleClass("ON");
        }*/
    };

    Mobidys.Options.Contrast.prototype.renderChapter = function (chap) {
        chap.$chapArea.toggleClass("optionContrast");
        // MENU
        $(".contraste-icon").toggleClass("ON");
    };

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionSpaces</code>
     * on the <code>.textContainer</code> element.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.Spaces = function () {
        this.enabled = true;
        this.compatibility = ["contrast", "alternateLines", "highlightPhrases", "colorSyllables", "colorPhonemes", "colorPunctuation", "definitions", "audioSupport", "readingWindow", "audioPlayback", "pagination", "textmark"];
        if(this.enabled) {
            $('.textContainer').toggleClass("optionSpaces");
            $(".aeration-icon").toggleClass("ON");
        }
    };

    /**
     * See {@link Mobidys.Options~renderChapter}
     * @param {Mobidys.cl.Chapter} chap - Chapter instance.
     * @fires Mobidys.cl.Chapter~event:refresh
     */
    Mobidys.Options.Spaces.prototype.renderChapter = function (chap) {
        chap.$textContainer.toggleClass("optionSpaces");
        chap.trigger("refresh");

        // MENU
        $(".aeration-icon").toggleClass("ON");
    };

    /**
     * @class
     * @classdesc When enabled, this option creates the lines in the background of
     * the text, and adds the class <code>optionStripes</code> on the
     * <code>#textArea</code> element.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.AlternateLines = function () {
        this.enabled = false;
        this.compatibility = ["contrast", "spaces", "colorSyllables", "colorPhonemes", "colorPunctuation", "definitions", "pagination", "textmark"];

        /**
         * Last number of lines found.
         * @member {number}
         * @private
         */
        this.nbLines = -1;
    };

    $.extend(Mobidys.Options.AlternateLines.prototype, /** @lends Mobidys.Options.AlternateLines.prototype */{
        /**
         * See {@link Mobidys.Options~renderChapter}
         * @param {Mobidys.cl.Chapter} chap - Chapter instance.
         * @fires Mobidys.cl.Chapter~event:refresh
         */
        renderChapter: function (chap) {
            chap.$textArea.toggleClass("optionStripes");
            if (this.enabled) {
                chap.on("refresh", this.onRefresh);
                chap.trigger("refresh");
            }
            else {
                chap.off("refresh", this.onRefresh);
                var $textBg = chap.$textContainer.find(".textBackground");
                $textBg.children().remove();
                this.nbLines = -1;
            }

            // MENU
            $(".trameLignes-icon").toggleClass("ON");
        },

        /**
         * Refresh the number of lines on .textBackground element.
         * @listens Mobidys.cl.Chapter~event:refresh
         */
        onRefresh: function () {
            var chap = this;
            var _this = chap.book.optionManager.options.alternateLines;
            var height = chap.$textContainer.height() / Mobidys.utils.scale.y;
            var nbLines = Math.round(height / chap.lineHeight);
            if (nbLines != _this.nbLines) {
                _this.nbLines = nbLines;
                var $textBg = chap.$textContainer.find(".textBackground");
                var $div = $('<div class="line"/>');
                $textBg.children().remove();
                for (var i = 0; i < nbLines; i+=2) {
                    var $line = $div.clone();
                    $textBg.append($line);
                }
            }
        }
    });

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionPhrases</code>
     * on the <code>.textContainer</code> element.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.HighlightPhrases = function () {
        this.enabled = false;
        this.compatibility = ["contrast", "spaces", "colorSyllables", "colorPhonemes", "colorPunctuation", "definitions", "pagination", "textmark"];
    };

    Mobidys.Options.HighlightPhrases.prototype.renderChapter = function (chap) {
        chap.$textContainer.toggleClass("optionPhrases");

        // MENU
        $(".trameRheses-icon").toggleClass("ON");
    };

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionColorSyllables</code>
     * on the <code>.textContainer</code> element.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.ColorSyllables = function () {
        this.enabled = true;
        this.compatibility = ["contrast", "spaces", "alternateLines", "highlightPhrases", "definitions", "audioSupport", "readingWindow", "audioPlayback", "pagination", "textmark"];
        if(this.enabled) {
            $('.textContainer').toggleClass("optionColorSyllables");
            $(".syllabes-icon").toggleClass("ON");
        }
    };

    Mobidys.Options.ColorSyllables.prototype.renderChapter = function (chap) {
        chap.$textContainer.toggleClass("optionColorSyllables");

        // MENU
        $(".syllabes-icon").toggleClass("ON");
    };

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionColorPhonemes</code>
     * on the <code>.textContainer</code> element.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.ColorPhonemes = function () {
        this.enabled = false;
        this.compatibility = ["contrast", "spaces", "alternateLines", "highlightPhrases", "definitions", "audioSupport", "readingWindow", "audioPlayback", "pagination", "textmark"];
    };

    Mobidys.Options.ColorPhonemes.prototype.renderChapter = function (chap) {
        chap.$textContainer.toggleClass("optionColorPhonemes");

        // MENU
        $(".phonemes-icon").toggleClass("ON");
    };

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionColorPunctuation</code>
     * on the <code>.textContainer</code> element.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.ColorPunctuation = function () {
        this.enabled = false;
        this.compatibility = ["contrast", "spaces", "alternateLines", "highlightPhrases", "definitions", "audioSupport", "readingWindow", "audioPlayback", "pagination", "textmark"];
    };

    Mobidys.Options.ColorPunctuation.prototype.renderChapter = function (chap) {
        chap.$textContainer.toggleClass("optionColorPunctuation");

        // MENU
        $(".ponctuation-icon").toggleClass("ON");
    };

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionDefinitions</code>
     * on the <code>.textContainer</code> element. It also binds a click event on
     * the <code>.pastille</code> and <code>.definition</code> elements in the text.
     * When one of these elements is clicked, it opens a popup containing either the
     * definition, the character's image, or both.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.Definitions = function (chap) {
        this.enabled = false;
        this.compatibility = ["contrast", "spaces", "alternateLines", "highlightPhrases", "pagination", "textmark"];
        /**
         * Audio player reference.
         * @member {Audio}
         */
        this.audioPlayer = new Audio();
    };

    $.extend(Mobidys.Options.Definitions.prototype, /** @lends Mobidys.Options.Definitions.prototype */{
        renderChapter: function (chap) {
            chap.$textContainer.toggleClass("optionDefinitions");

            var $popups = chap.$textContainer.find("#popups");
            var $popupHide = $('body').find(".popupHide");
            var $characters = chap.$textSrc.find(".pastille");
            var $definitions = chap.$textSrc.find(".definition");
            if (this.enabled) {
                var _this = this;
                chap.on("refresh", this.onRefresh);

                $popupHide.on("click.definitions touch.definitions", function (e) {
                    e.preventDefault();
                    $popups.hide().children(".popup").remove();
                    _this.audioPlayer.pause();
                    $popupHide.hide();
                });

                $characters.add($definitions).on("click.definitions touch.definitions", function (e) {
                    e.preventDefault();
                    var $this = $(this);

                    var id = $this.attr("id");
                    var $popup = $popups.children(".popup");
                    if ($popup.length > 0 && $popup.data("idref") == id) {
                        $popup.remove();
                        $popups.hide();
                        _this.audioPlayer.pause();
                    }
                    else {
                        $popup.remove();
                        $popup = $("<div/>");
                        $popup.addClass("popup").data("idref", id);
                        $popup.appendTo($popups);

                        if ($this.hasClass("pastille")) {
                            var character = $this.attr("class").split(" ")[2];
                            var charSrc = chap.book.configuration.charactersPath + character + ".png";
                            var $img = $popups.find(".pastille-img").clone();
                            $img.find("img").attr("src", charSrc);
                            $img.appendTo($popup).show();
                            $popupHide.show();
                        }

                        if ($this.hasClass("definition")) {
                            var $definition = chap.$textSrc.find(".popup-def."+id);
                            $definition.clone().appendTo($popup).css("display", "block");
                            var defSrc = $definition.data("audioDef");
                            _this.audioPlayer.src =
                                chap.book.configuration.definitionsPath + defSrc;
                            _this.audioPlayer.play();
                            $popupHide.show();
                        }

                        $popups.show();

                        _this.updatePosition(chap, $popup, $this);
                    }
                });
            }
            else {
                chap.off("refresh", this.onRefresh);
                $popupHide.off(".definitions");
                $characters.add($definitions).off(".definitions");

                var $popup = $popups.children(".popup");
                if ($popup.length > 0) {
                    $popup.remove();
                    $popups.hide();
                    this.audioPlayer.pause();
                }
            }

            // MENU
            $(".popUp-icon").toggleClass("ON");
        },

        /**
         * Refresh popup position.
         * @listens Mobidys.cl.Chapter~event:refresh
         */
        onRefresh: function () {
            var chap = this;
            var _this = chap.book.optionManager.options.definitions;
            var $popups = chap.$textContainer.find("#popups");
            var $popup = $popups.children(".popup");
            if ($popup.length > 0) {
                var id = $popup.data("idref");
                var $ref = chap.$textSrc.find("#"+id);
                _this.updatePosition(chap, $popup, $ref);
            }
        },

        /**
         * Update position of the popup.
         * @param {Mobidys.cl.Chapter} chap - Chapter instance.
         * @param {jQuery} $popup - jQuery popup element.
         * @param {jQuery} $ref - jQuery reference element for the popup.
         */
        updatePosition: function (chap, $popup, $ref) {
            var refHeight = $ref.height() / Mobidys.utils.scale.y;
            var offset = $ref.offset();
            offset.top /= Mobidys.utils.scale.y;
            offset.left /= Mobidys.utils.scale.x;
            offset.top += refHeight;
            var size = {
                width: $popup.width() / Mobidys.utils.scale.x,
                height: $popup.height() / Mobidys.utils.scale.y
            };

            var areaOffset = chap.$textArea.offset();
            areaOffset.top /= Mobidys.utils.scale.y;
            areaOffset.left /= Mobidys.utils.scale.x;
            var areaSize = {
                width: chap.$textArea.width() / Mobidys.utils.scale.x,
                height: chap.$textArea.height() / Mobidys.utils.scale.y
            };
            if (chap.$textShadow.filter(":visible").length > 0)
                areaSize.height -= chap.$textShadow.height() / Mobidys.utils.scale.y;

            // Check if popup overflow in width
            if (offset.left + size.width > areaOffset.left + areaSize.width - 20)
                // ->  - 20px to avoid scrollbar.
                offset.left = areaOffset.left + areaSize.width - 20 - size.width;

            // Check if popup overflow in height
            if (offset.top + size.height > areaOffset.top + areaSize.height)
                offset.top -= size.height + refHeight;

            var relativeOffset = $popup.offsetParent().offset();
            relativeOffset.top /= Mobidys.utils.scale.y;
            relativeOffset.left /= Mobidys.utils.scale.x;
            offset.top -= relativeOffset.top;
            offset.left -= relativeOffset.left;
            $popup.css(offset);
        }
    });

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionAudioSupport</code>
     * on the <code>.textContainer</code> element. It also binds a click event on
     * the <code>.rhese</code> elements in the <code>.textSrc</code> element. When
     * one of these elements is clicked, it reads the phrase by playing the audio of
     * the chapter at the correct time, using a smil file to find informations, and
     * adds a class <code>.highlight</code> on the phrase. It stops after the phrase or
     * when the option is disabled.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.AudioSupport = function () {
        this.enabled = false;
        this.compatibility = ["spaces", "colorSyllables", "colorPhonemes", "colorPunctuation", "pagination", "textmark"];

        /**
         * <p>Change option mode between support and playback. Value can be:
         * <ul><li><b>onlyOnePhrase</b>: Read one phrase and stop.</li>
         * <li><b>allNextPhrase</b>: Read all chapter, starting from clicked element.</li></ul></p>
         * <p>For this option, it is set to 'onlyOnePhrase'.</p>
         * @member {string}
         * @private
         * @readonly
         */
        this.optionAudioMode = "onlyOnePhrase";

        /**
         * See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement|HTMLAudioElement on MDN}.
         * @private
         * @member {HTMLAudioElement}
         */
        this.audioPlayer = new Audio();

        /**
         * Last phrase index played.
         * @private
         * @member {number}
         */
        this.currPhraseIdx = 0;

        /**
         * Timer ID. Used to synchronize audio and highlight with the smil.
         * @private
         * @member {number}
         */
        this.audioHighlightTimer = null;
    };

    $.extend(Mobidys.Options.AudioSupport.prototype, /** @lends Mobidys.Options.AudioSupport.prototype */{
        renderChapter: function (chap) {
            chap.$textContainer.toggleClass("optionAudioSupport");
            this.changeState(chap);

            // MENU
            $('.suiviAudio-icon').toggleClass("ON");
        },

        /**
         * Add or remove the events when option is enabled or disabled.
         * @param {Mobidys.cl.Chapter} chap - Chapter instance.
         */
        changeState: function (chap) {
            var $phrases = chap.$textSrc.find(".rhese1, .rhese2");
            if (this.enabled) {
                var _this = this;

                // Get smil file by current html filename
                    /*var currHtml = window.location.href;
                    currHtml = currHtml.split("/").pop().split(".").shift();*/
                var currChap = "chap" + $('.numChap').text().match(/\d+/);
                $.get("./SMIL/"+currChap+".smil", function (data) {
                    _this._load_smil_data(chap, $phrases, data);
                });

            } else {
                this.audioPlayer.pause();
                $phrases.off(".audioPlayback");
                $(this.audioPlayer).off(".audioPlayback");
                chap.$textArea.off(".audioPlayback");
                $phrases.removeClass("highlight");
                this.clearAudioHighlightTimer();

                if (this.optionAudioMode !== "onlyOnePhrase") {
                    chap.off("refresh", this.onRefresh);
                    this.currentId = "";
                }
            }
        },

        /**
         * Callback when finish load xml smil
         * @param {Mobidys.cl.Chapter} chap - Chapter instance.
         * @param {jQuery} $phrases - List of phrases.
         * @param {string} data - XML read from smil file.
         */
        _load_smil_data: function (chap, $phrases, data) {
            var _this = this;
            var $smil = $(data);

            if (this.optionAudioMode !== "onlyOnePhrase") {
                this.onRefresh = function () {
                    _this.scrolled(chap, $phrases, $smil);
                };
            }

            $phrases.on("click.audioPlayback touch.audioPlayback", function (e) {
                e.preventDefault();
                var $phrase = $(this);

                // Stop audio player
                _this.clearAudioHighlightTimer();
                _this.audioPlayer.pause();
                _this.audioPlayer.src = "";
                $(_this.audioPlayer).off(".audioPlayback");
                $phrases.removeClass("highlight");

                var $data = $phrase;
                if (_this.optionAudioMode !== "onlyOnePhrase") {
                    var index = $phrases.index($phrase);
                    var $last = _this.getLastVisible(chap, $phrases.slice(index));
                    $data = $data.add($last);

                    _this.currentId = $phrase.attr("id");
                    _this.currentEnded = false;
                    chap.$textArea.on("scroll.audioPlayback", function () {
                        _this.scrolled(chap, $phrases, $smil);
                    });

                    chap.on("refresh", _this.onRefresh);
                }

                _this.play(chap, _this.smilPhraseInfo($data, $smil));
            });
        },

        /**
         * Get smil information for source audio, begin clip and end clip.
         * @param {jQuery} $data - jQuery object, contain phrase object.
         * @param {jQuery} $smil - Smil xml data.
         * @return {Mobidys.Options.AudioSupport~ClipInfo} Useful info from smil file.
         */
        smilPhraseInfo: function ($data, $smil) {
            var $seq = $smil.find("smil body seq");
            var phrases = [];

            // Begin
            var $parBegin = $seq.find("par[id=\""+$data.eq(0).attr("id")+"\"]");
            var $begin = $parBegin.find("audio");

            /**
             * @typedef Mobidys.Options.AudioSupport~PhraseInfo
             * @property {string} id - Id attribute to find the phrase.
             * @property {number} begin - Audio begin time.
             * @property {number} end - Audio end time.
             */
            var phrase = {
                "id": $data.eq(0).attr("id"),
                "begin": $begin.attr("clipBegin"),
                "end": $begin.attr("clipEnd") - 0.2};
            phrases.push(phrase);

            // End
            var $parEnd = $parBegin;
            if ($data.length > 1) {
                $parEnd = $seq.find("par[id=\""+$data.eq(1).attr("id")+"\"]");
                var find = false;
                $seq.find("par").each( function () {
                    var $par = $(this);
                    if ($par.is($parBegin)) {
                        find = true;
                        return true;
                    }

                    if (find) {
                        var $parAudio = $par.find("audio");
                        var phrase = {
                            "id": $par.attr("id"),
                            "begin": $parAudio.attr("clipBegin"),
                            "end": $parAudio.attr("clipEnd") - 0.2};
                        phrases.push(phrase);
                    }

                    if ($par.is($parEnd)) {
                        return false;
                    }

                    return true;
                });
            }
            var $end = $parEnd.find("audio");

            /**
             * @typedef Mobidys.Options.AudioSupport~ClipInfo
             * @property {number} begin - Clip begin time to start audio from.
             * @property {number} end - Clip end time to stop audio.
             * @property {string} src - Audio source filename.
             * @property {Mobidys.Options.AudioSupport~PhraseInfo[]} phrases - Info
             * for each phrase in the clip.
             */
            return {
                begin: $begin.attr("clipBegin"),
                end: $end.attr("clipEnd"),
                src: $begin.attr("src"),
                phrases: phrases
            };
        },

        /**
         * Update highlighted phrase synchronized with audio.
         * @param {Mobidys.cl.Chapter} chap - Chapter instance.
         * @param {Mobidys.Options.AudioSupport~ClipInfo} info - Phrases smil info.
         */
        updateAudioHighlight: function (chap, info) {
            var _this = this;
            var needTimer = true;
            var phrases = info.phrases;
            var currTime = this.audioPlayer.currentTime;

            // If the end of the current phrase is reached
            if (currTime >= phrases[this.currPhraseIdx].end) {
                // Highlight next one if it exists or stop playing
                if (this.currPhraseIdx < phrases.length - 1) {
                    this.currPhraseIdx += 1;
                    chap.$textSrc.find(".rhese1, .rhese2").removeClass("highlight");

                    if (this.optionAudioMode !== "onlyOnePhrase")
                        this.currentId = phrases[this.currPhraseIdx].id;
                } else {
                    this.audioPlayer.pause();
                    needTimer = false;

                    if (this.optionAudioMode !== "onlyOnePhrase")
                        this.currentEnded = true;
                }
            }

            // Run a new timer until the end of the phrase
            if (needTimer) {
                chap.$textSrc.find("#"+phrases[this.currPhraseIdx].id).addClass("highlight");
                this.clearAudioHighlightTimer();
                currTime = Math.floor(currTime * 1000);
                var end = Math.floor(phrases[this.currPhraseIdx].end * 1000);
                var diff = end - currTime;
                // Minimum delay for the timer. Avoid running multiple timer quickly.
                if (diff < 10)
                    diff = 10;
                this.audioHighlightTimer = setTimeout(function () {
                    _this.updateAudioHighlight(chap, info);
                }, diff);
            }
        },

        /**
         * Play audio and synchronize highlighted phrase.
         * @param {Mobidys.cl.Chapter} chap - Chapter instance.
         * @param {Mobidys.Options.AudioSupport~ClipInfo} info - All player info.
         */
        play: function (chap, info) {
            this.currPhraseIdx = 0;

            if (!this.audioPlayer.src.endsWith(info.src)) {
                this.audioPlayer.src = info.src;
                this.audioPlayer.load();
            }
            else {
                if (this.audioPlayer.paused)
                    this.audioPlayer.play();
                else
                    this.updateAudioHighlight(chap, info);
            }

            // Audio events
            var _this = this;
            $(this.audioPlayer).off(".audioPlayback");
            $(this.audioPlayer).on({
                "canplay.audioPlayback": function () {
                    if (_this.audioPlayer.paused) {
                        _this.audioPlayer.currentTime = info.begin;
                        _this.audioPlayer.play();
                    }
                },

                "play.audioPlayback": function () {
                    _this.updateAudioHighlight(chap, info);
                },

                "timeupdate.audioPlayback": function () {
                    // Prevent audio from continue if the end has been
                    // reached. Should not happen but just in case.
                    if (!_this.audioPlayer.paused && _this.audioPlayer.currentTime > info.end) {
                        _this.audioPlayer.pause();
                        return;
                    }
                },

                "pause.audioPlayback ended.audioPlayback": function () {
                    chap.$textSrc.find(".rhese1, .rhese2").removeClass("highlight");
                    _this.clearAudioHighlightTimer();
                }
            });
        },

        /**
         * Clear timer audio.
         */
        clearAudioHighlightTimer: function () {
            if (this.audioHighlightTimer === null)
                return;
            clearTimeout(this.audioHighlightTimer);
            this.audioHighlightTimer = null;
        },

        /**
         * When text is scrolled, try to continue reading.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         * @param {jQuery} $phrases - List of phrases.
         * @param {jQuery} $smil - Reference on the smil xml file.
         * @listens Mobidys.cl.Chapter~event:scroll
         * @listens Mobidys.cl.Chapter~event:refresh
         */
        scrolled: function (chap, $phrases, $smil) {
            if (this.currentId == "")
                return;

            if (!this.audioPlayer.paused) {
                this.clearAudioHighlightTimer();
            }

            var index;
            if (this.currentEnded) {
                index = $phrases.index($phrases.filter("#"+this.currentId));
                index += 1;
            }
            else {
                index = $phrases.index($phrases.filter("#"+this.currentId));
            }

            if (index < 0 || index >= $phrases.length) {
                this.audioPlayer.pause();
                return;
            }

            var $data = $phrases.eq(index);
            if (!this.isVisible(chap, $data)) {
                this.audioPlayer.pause();
                return;
            }

            this.currentId = $data.attr("id");
            this.currentEnded = false;

            $data = $data.add(this.getLastVisible(chap, $phrases.slice(index)));
            this.play(chap, this.smilPhraseInfo($data, $smil));
        },

        /**
         * Find the last visible phrase in the <code>#textArea</code> element.
         * @param {Mobidys.cl.Chapter} chap - Chapter instance.
         * @param {jQuery} $phrases - all player info.
         * @return {jQuery} Last visible phrase.
         */
        getLastVisible: function (chap, $phrases) {
            var _this = this;
            var $last = $();

            $phrases.each(function () {
                var $this = $(this);

                if (!_this.isVisible(chap, $this))
                    return false;

                $last = $this;
                return true;
            });

            return $last;
        },

        /**
         * Check if an element is visible in the <code>#textArea</code> element.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         * @param {jQuery} $elem - jQuery element to check.
         * @return {bool} True when visible, false otherwise.
         */
        isVisible: function (chap, $elem) {
            var top = $elem.offset().top / Mobidys.utils.scale.y;
            var height = $elem.height() / Mobidys.utils.scale.y;
            var areaTop = chap.$textArea.offset().top / Mobidys.utils.scale.y;
            var areaHeight = chap.$textArea.height() / Mobidys.utils.scale.y;
            if (chap.$textShadow.filter(":visible").length > 0) {
                areaHeight -= chap.$textShadow.height() / Mobidys.utils.scale.y;
                }
            if (top < areaTop || top + height > areaTop + areaHeight)
                return false;

            return true;
        }

    });

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionReadingWindow</code>
     * on the <code>.textContainer</code> element. It also binds a click event on the
     * <code>.rhese</code> elements in the <code>.textSrc</code> element. When one
     * of these elements is clicked, a class <code>.highlight</code> is added on it.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.ReadingWindow = function () {
        this.enabled = false;
        this.compatibility = ["spaces", "colorSyllables", "colorPhonemes", "colorPunctuation", "pagination", "textmark"];
    };

    Mobidys.Options.ReadingWindow.prototype.renderChapter = function (chap) {
        chap.$chapArea.toggleClass("optionReadingWindow");
        //var $phrases = chap.$textSrc.find(".rhese");
        var $phrases = $('.rhese1, .rhese2');
        if (this.enabled) {
            $phrases.on("touch.readingWindow click.readingWindow", function (e) {
                e.preventDefault();
                $phrases.removeClass("highlight");
                $(this).addClass("highlight");
            });
        }
        else {
            $phrases.off("touch.readingWindow click.readingWindow");
            $phrases.removeClass("highlight");
        }

        // MENU
        $('.suiviSilence-icon').toggleClass("ON");
    };

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionAudioSupport</code>
     * on the <code>.textContainer</code> element. It also binds a click event on
     * the <code>.rhese</code> elements in the <code>.textSrc</code> element. When
     * one of these elements is clicked, it starts reading the text by playing the
     * audio of the chapter at the correct time, using a smil file to find informations,
     * and adds a class <code>.highlight</code> on the currently playing phrase. It stops
     * when the end of the chapter is reached or the option is disabled.
     * @extends Mobidys.Options.AudioSupport
     */
    Mobidys.Options.AudioPlayback = function () {
        Mobidys.Options.AudioSupport.call(this);

        this.compatibility = ["spaces", "colorSyllables", "colorPhonemes", "colorPunctuation", "pagination", "textmark"];

        /**
         * <p>See {@link Mobidys.Options.AudioSupport#optionAudioMode}.</p>
         * <p>For this option, it is set to 'onlyOnePhrase'.</p>
         * @readonly
         */
        this.optionAudioMode = "allNextPhrase";

        /**
         * Store the currently reading phrases Id.
         * @member {string}
         */
        this.currentId = "";

        /**
         * Set to true when currentId is finished reading.
         * @member {boolean}
         */
        this.currentEnded = false;

        /**
         * Method that updates playing info on refresh event.
         * @member {function}
         */
        this.onRefresh = null;
    };

    Mobidys.Options.AudioPlayback.prototype =
        Object.create(Mobidys.Options.AudioSupport.prototype);

    Mobidys.Options.AudioPlayback.prototype.renderChapter = function (chap) {
        chap.$textContainer.toggleClass("optionAudioPlayback");
        this.changeState(chap);

        // MENU
        $('.narration-icon').toggleClass("ON");
    };

    /**
     * @class
     * @classdesc When enabled, this option adds a class <code>optionPagination</code>
     * on the <code>#textArea</code> element. It shows a <code>.pageNumbers</code>
     * element and writes inside the current page and number of pages in
     * <code>.currentPage</code> and <code>.totalPages</code> elements respectively.
     * It also binds a swipe event on the <code>.textContainer</code> element to go to
     * next or previous pages.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.Pagination = function () {
        this.enabled = false;
        this.compatibility = ["textmark", "contrast", "spaces", "alternateLines", "highlightPhrases", "colorSyllables", "colorPhonemes", "colorPunctuation", "definitions", "audioSupport", "readingWindow", "audioPlayback"];

        /**
         * Last number of pages found.
         * @type number
         */
        this.nbPages = -1;

        /**
         * Info on touch event to detect when to trigger swipe event.
         * @property {number} time
         * @property {Object} coords
         * @property {number} coords.x
         * @property {number} coords.y
         */
        this.swipeStart = {};
    };

    $.extend(Mobidys.Options.Pagination.prototype, /** @lends Mobidys.Options.Pagination.prototype */{
        /**
         * See {@link Mobidys.Options~renderChapter}
         * @param {Mobidys.cl.Chapter} chap - Chapter instance.
         * @fires Mobidys.cl.Chapter~event:refresh
         */
        renderChapter: function (chap) {
            if (this.enabled)
                this.enable(chap);
            else
                this.disable(chap);

            chap.trigger("refresh");
        },

        /**
         * When option is enabled.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         */
        enable: function (chap) {
            chap.removeCustomScroll();
            chap.$textArea.scrollTop(0);
            chap.$textArea.addClass("optionPagination");
            chap.$chapter.find(".pageNumbers").show();
            chap.currentPage = 1;
            chap.on("refresh", this.onRefresh);
            this.events(chap);
            chap.$textArea.perfectScrollbar({ handlers: [] });

            // MENU
            $('.pageApage-icon').addClass("ON");
            chap.$tools.find("#previous").removeClass("disabled");
            chap.$tools.find("#next").removeClass("disabled");
        },

        /**
         * When option is disabled.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         */
        disable: function (chap) {
            chap.$textArea.perfectScrollbar("destroy");
            chap.$textArea.removeClass("optionPagination");
            chap.$chapter.find(".pageNumbers").hide();
            chap.$textContainer.css("height", "");
            chap.off("refresh", this.onRefresh);
            chap.currentPage = -1;
            this.nbPages = -1;
            chap.$textContainer.off(".pagination");
            chap.initCustomScroll();

            // MENU
            $('.pageApage-icon').removeClass("ON");
            chap.$tools.find("#previous").addClass("disabled");
            chap.$tools.find("#next").addClass("disabled");
        },

        /**
         * When number of pages is changed, updates <code>.pageNumbers</code> 
         * element with current page and new number of pages.
         * @listens Mobidys.cl.Chapter~event:refresh
         */
        onRefresh: function () {
            var chap = this;
            var _this = chap.book.optionManager.options.pagination;
            var height = chap.$textSrc.innerHeight() / Mobidys.utils.scale.y;
            var nbLines = Math.round(height / chap.lineHeight) - 1;
            var nbPages = Math.ceil(nbLines / (chap.visibleLineNumber + 1));

            var $pageNumbers = chap.$chapter.find(".pageNumbers");
            $pageNumbers.find(".totalPages").text(nbPages);

            if (_this.enabled) {
                if (chap.currentPage > nbPages)
                    chap.currentPage = nbPages;
                var scroll = (chap.currentPage - 1) * chap.lineHeight * chap.visibleLineNumber;
                chap.$textArea.scrollTop(scroll);
                _this.updatePage(chap);
            }

            if (nbPages != _this.nbPages) {
                _this.nbPages = nbPages;
                if (nbPages > 1) {
                    var containerHeight =
                            (nbPages - 1) * chap.visibleLineNumber * chap.lineHeight
                            + chap.$textArea.height() / Mobidys.utils.scale.y;
                    chap.$textContainer.css("height", containerHeight);
                }
                else {
                    chap.$textContainer.css("height", "");
                }

                chap.trigger("refresh");
            }
        },

        /**
         * Bind swipe events to go to next or previous page.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         */
        events: function (chap) {
            var _this = this;

            chap.$textContainer.on("mousedown.pagination touchstart.pagination", function (e) {
                var $this = $(this);
                var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                _this.swipeStart = {
                    time: (new Date()).getTime(),
                    coords: {x: data.pageX, y: data.pageY}
                };

                $this.on("mousemove.pagination touchmove.pagination", function (e) {
                    e.preventDefault();
                    var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e;

                    var swipeStop = {
                        time: (new Date()).getTime(),
                        coords: {x: data.pageX, y: data.pageY}
                    };

                    if (swipeStop.time - _this.swipeStart.time < 600 &&
                        Math.abs( _this.swipeStart.coords.x - swipeStop.coords.x ) < 30 &&
                        Math.abs( _this.swipeStart.coords.y - swipeStop.coords.y ) > 150) {
                        if (_this.swipeStart.coords.y < swipeStop.coords.y)
                            _this.previousPage(chap);
                        else
                            _this.nextPage(chap);

                        _this.swipeStart = {};
                    }
                });

                $this.on("mouseup.pagination touchend.pagination", function () {
                    $this.off("mousemove.pagination touchmove.pagination mouseup.pagination touchend.pagination");
                });

            });
        },

        /**
         * Update current page number.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         */
        updatePage: function (chap) {
            var $pageNumbers = chap.$chapter.find(".pageNumbers");
            $pageNumbers.find(".currentPage").text(chap.currentPage);

            // MENU
            if (chap.currentPage == 1)
                chap.$tools.find("#previous").addClass("disabled");
            else
                chap.$tools.find("#previous").removeClass("disabled");

            if (chap.currentPage == this.nbPages)
                chap.$tools.find("#next").addClass("disabled");
            else
                chap.$tools.find("#next").removeClass("disabled");
        },

        /**
         * Scroll to previous page.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         // * @fires Mobidys.cl.Chapter~event:scroll
         */
        previousPage: function (chap) {
            if (!this.enabled || chap.isAnimated)
                return;

            var _this = this;
            chap.$textContainer.finish();
            var scroll = chap.$textArea.scrollTop();
            if (scroll > 0) {
                scroll -= chap.visibleLineNumber * chap.lineHeight;
                chap.isAnimated = true;
                chap.$textArea.animate(
                    { scrollTop: scroll },
                    chap.book.configuration.paginationScrollDuration
                ).queue(function (next) {
                    chap.currentPage -= 1;
                    _this.updatePage(chap);
                    chap.isAnimated = false;
                    next();
                });
            }
        },

        /**
         * Scroll to next page.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         // * @fires Mobidys.cl.Chapter~event:scroll
         */
        nextPage: function (chap) {
            if (!this.enabled || chap.isAnimated)
                return;

            var _this = this;
            var scroll = chap.$textArea.scrollTop();
            scroll += chap.visibleLineNumber * chap.lineHeight;
            var height = chap.$textSrc.height() / Mobidys.utils.scale.y;
            if (scroll < height) {
                chap.isAnimated = true;
                chap.$textArea.animate(
                    {scrollTop: scroll},
                    chap.book.configuration.paginationScrollDuration
                ).queue(function (next) {
                    chap.currentPage += 1;
                    _this.updatePage(chap);
                    chap.isAnimated = false;
                    next();
                });
            }
        }
    });

    /**
     * @class
     * @classdesc When enabled, this option adds shows the <code>#textMark</code>
     * element. This element can be dragged up or down over the text to mark a line.
     * When it is released, it finds the closest line of text over or under it, and
     * store the first <code>.mot</code> element of this line in
     * {@link Mobidys.cl.Book#parameters|Mobidys.cl.Book.parameters.textmark}.
     * @extends Mobidys.Options~Option
     */
    Mobidys.Options.Textmark = function () {
        this.enabled = false;
        this.compatibility = ["pagination", "contrast", "spaces", "alternateLines", "highlightPhrases", "colorSyllables", "colorPhonemes", "colorPunctuation", "definitions", "audioSupport", "readingWindow", "audioPlayback"];
    };

    $.extend(Mobidys.Options.Textmark.prototype, /** @lends Mobidys.Options.Textmark.prototype */{
        renderChapter: function (chap) {
            if (this.enabled) {
                this.enable(chap);
            }
            else {
                this.disable(chap);
            }
        },

        /**
         * When option is enabled.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         */
        enable: function (chap) {
            if (chap.book.parameters.textmark != "") {
                this.updateMark(chap);
            }
            else {
                var $textMark = chap.$textArea.find("#textMark");
                var scroll = chap.$textArea.scrollTop();
                var top = scroll + chap.lineHeight;
                if (scroll === 0) {
                    var top = chap.lineHeight*2;
                }
                $textMark.css("top", top);
                $textMark.show();
                this.findMarkReference(chap);
            }
            this.events(chap);
            chap.on("refresh", this.onRefresh);

            // MENU
            $('.marqueLigne-icon').addClass("ON");
        },

        /**
         * When option is disabled.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         * @fires Mobidys.cl.Chapter~event:refresh
         */
        disable: function (chap) {
            chap.book.parameters.textmark = "";
            var $textMark = chap.$textArea.find("#textMark");
            $textMark.hide();
            chap.off("refresh", this.onRefresh);
            chap.book.saveContext();

            // MENU
            $('.marqueLigne-icon').removeClass("ON");
        },

        /**
         * Refresh the mark.
         * @listens Mobidys.cl.Chapter~event:refresh
         */
        onRefresh: function () {
            var chap = this;
            var _this = chap.book.optionManager.options.textmark;
            if (chap.book.parameters.textmark != "") {
                _this.updateMark(this);
            }
        },

        /**
         * Update position of the mark if word has changed line.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         */
        updateMark: function (chap) {
            var $textMark = chap.$textArea.find("#textMark");
            var $markedWord = this.getElem(
                chap.$textSrc.get(0), chap.book.parameters.textmark);

            if ($markedWord.length > 0) {
                var top = $markedWord.position().top / Mobidys.utils.scale.y;
                top /= chap.lineHeight; // -> number of lines
                top = Math.floor(top + 1) * chap.lineHeight;
                $textMark.css("top", top);
                $textMark.show();
            }
        },

        /**
         * Bind touch/click events on <code>#textMark</code>.
         * @param {Mobidys.cl.Chapter} chap - Chapter object.
         */
        events: function (chap) {
            var _this = this;
            var $textMark = chap.$textArea.find("#textMark");

            // Update #textMark position.
            // -- Mouse event
            $textMark.on("mousedown.textMark", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var startOffset = $textMark.offset();
                var startPos = e.pageY - startOffset.top;
                $("body").on("mousemove.textMark", function (e) {
                    var newPos = e.pageY;
                    $textMark.offset({top: newPos - startPos, left: startOffset.left});
                });

                $("body").on("mouseup.textMark", function () {
                    $("body").off(".textMark");
                    _this.findMarkReference(chap);
                });
            });

            // -- Touch event.
            $textMark.on("touchstart.textMark touchend.textMark", function (e) {
                if (e.touches.length != 1) {
                    $textMark.off("touchmove.textMark");
                    _this.findMarkReference(chap);
                    return;
                }

                e.preventDefault();
                e.stopPropagation();
                var startOffset = $textMark.offset();
                var startPos = e.touches[0].pageY - startOffset.top;
                $textMark.on("touchmove.textMark", function (e) {
                    var newPos = e.touches[0].pageY;
                    $textMark.offset({top: newPos-startPos, left: startOffset.left});
                });
            });
        },

        /**
         * Find the closest line from the current mark position and store the first
         * <code>.mot</code> element of this line. Also moves the mark under the line.
         * @param {Mobidys.cl.Chapter} chap - Chapter instance.
         */
        findMarkReference: function (chap) {
            var $textMark = chap.$textArea.find("#textMark");
            var $word = $();
            var $text = chap.$textSrc.children().eq(0);
            var coords = {
                top: $textMark.offset().top / Mobidys.utils.scale.y,
                left: $text.offset().left / Mobidys.utils.scale.x
            };
            var goUp = true;
            var loop = 0;
            var left = 0;

            //$textMark.hide();
            while ($word.length == 0 && loop <= 8) { // -> 8 / 4 = two lines checked
                var elem = document.elementFromPoint(
                    coords.left * Mobidys.utils.scale.x,
                    coords.top * Mobidys.utils.scale.y
                );

                $word = $(elem).closest(".mot");

                left += 5;
                coords.left += 5;

                if (left >= ($text.width() / Mobidys.utils.scale.x) / 2) { // -> stop after half width of line
                    coords.left -= left;
                    left = 0;
                    loop += 1;
                    if (goUp) // -> check every lineHeight / 4
                        coords.top -= chap.lineHeight / 4 * loop;
                    else
                        coords.top += chap.lineHeight / 4 * loop;
                    goUp = !goUp;
                }
            }

            if ($word.length > 0) {
                chap.book.parameters.textmark =
                    this.getXPath($word.get(0), chap.$textSrc.get(0));
                chap.book.saveContext();
            }
            this.updateMark(chap);
        },

        /**
         * Returns XPath for an element up to root.
         * @param {DOMElement} element - Last element of the XPath.
         * @param {DOMElement} root - First element of the XPath.
         * @return {string} Partial or full XPath.
         */
        getXPath: function (element, root) {
            if (element===root) {
                var lastElem = element.tagName;
                if (element.id != "")
                    lastElem += "#" + element.id;
                return lastElem;
            }

            var ix= 0;
            var siblings= element.parentNode.childNodes;
            for (var i= 0; i<siblings.length; i++) {
                var sibling= siblings[i];
                if (sibling===element)
                    return this.getXPath(element.parentNode, root)
                    +"/"+element.tagName+"["+(ix+1)+"]";
                if (sibling.nodeType===1 && sibling.tagName===element.tagName)
                    ix++;
            }

            return null;
        },

        /**
         * Return the jQuery element for a given XPath.
         * @param {DOMElement} root - First element of the XPath.
         * @param {string} xpath - XPath to the element.
         * @return {jQuery} Found element.
         */
        getElem: function (root, xpath) {
            var path = xpath.split("/");
            var $elem = $(root);

            $elem = $elem.filter(path[0]);
            for (var i = 1; i < path.length; i++) {
                if ($elem.length == 0)
                    break;

                var name = path[i].split("[");
                var idx = 1;
                if (name.length > 1)
                    idx = name[1].split("]")[0];
                name = name[0];

                $elem = $elem.children(name).eq(idx-1);
            }

            return $elem;
        }

    });

}(jQuery));
