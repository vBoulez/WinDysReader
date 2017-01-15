/*jshint globalstrict: true*/
/*global jQuery: true*/

var Mobidys = Mobidys || {
    cl: {}
};

(function ($) {

    /**************************************************************************
     *
     *                          Chapter
     *
     *************************************************************************/

    /**
     * Chapter constructor.
     * @class
     * @param {jQuery} $chapter - jQuery main chapter object.
     * @param {Object} config - Configuration. See {@link Mobidys.Book.defaults}
     */
    Mobidys.cl.Chapter = function ($chapter, config) {
        /** @member {Mobidys.cl.Book} */
        this.book = new Mobidys.cl.Book(config);

        // Find useful DOM object
        /**
         * Main element used to initialize the object. Context used everywhere
         * else to find other elements.
         * @member {jQuery}
         */
        this.$chapter = $chapter;

        /**
         * Chapter interface, <code>#chapArea</code> element.
         * @member {jQuery}
         */
        this.$chapArea = this.$chapter.find("#chapArea");

        /**
         * Chapter header, <code>#chapHeader</code> element.
         * @member {jQuery}
         */
        this.$chapHeader = this.$chapArea.find("#chapHeader");

        /**
         * Text viewport, <code>#textArea</code> element.
         * @member {jQuery}
         */
        this.$textArea = this.$chapArea.find("#textArea");

        /**
         * Text container, <code>.textContainer</code> element.
         * @member {jQuery}
         */
        this.$textContainer = this.$textArea.find(".textContainer");

        /**
         * Text source, <code>.textSrc</code> element.
         * @member {jQuery}
         */
        this.$textSrc = this.$textContainer.find(".textSrc");

        /**
         * Text shadow, to show that the text is scrollable.
         * <code>#textShadow</code> element.
         * @member {jQuery}
         */
        this.$textShadow = this.$chapArea.find("#textShadow");

        /**
         * Menu with options, <code>#tools</code> element.
         * @member {jQuery}
         */
        this.$tools = this.$chapter.find("#tools");

        /**
         * Store functions to call when an event is triggered.
         * @member {Object}
         * @private
         * @property {Array.<Function>} refresh - Listeners of refresh event.
         */
        this.listeners = { refresh: [] };

        // Calculate initial values
        /**
         * Current top value of the <code>#chapArea</code> element. Either 0 when
         * it is visible, or value fixed in the CSS to hide it.
         * @member {Number}
         * @private
         */
        this.currentTop = this.$chapArea.css("top");
        this.currentTop =
            Number(this.currentTop.substring(0, this.currentTop.length-2));

        /**
         * Initial top value of the <code>#chapArea</code> element fixed by the CSS.
         * @member {Number}
         * @private
         */
        this.origTop = 0;

        /**
         * LineHeight of the text.
         * @member {Number}
         * @private
         */
        this.lineHeight = 0;

        /**
         * Number of lines fully visible in the <code>#textArea</code> element.
         * @member {Number}
         * @private
         */
        this.visibleLineNumber = 0;

        /**
         * Last move set when #chapArea is dragged. It is positive when
         * the move was down, or negative when it was up.
         * @member {Number}
         * @private
         */
        this.lastChapMove = 0;

        /**
         * Current page shown when option Pagination is enabled.
         * @member {Number}
         * @private
         */
        this.currentPage = 1;

        /**
         * During an animation of the <code>#chapArea</code>, this value is set
         * to true to prevent running another animation.
         * @member {bool}
         * @private
         */
        this.isAnimated = false;

        this.initChapter();
        this.menuEvents();

        var _this = this;
        var onLoaded = function (parameters) {
            _this.applyFontSize(parameters.fontSize);
            _this.renderOptions(parameters.options);
            _this.$textContainer.css("fontFamily", parameters.fontFamily);
            _this.trigger("refresh");
        };
        this.book.loadContext(onLoaded);
    };

    // Public methods
    $.extend(Mobidys.cl.Chapter.prototype, /** @lends Mobidys.cl.Chapter.prototype */{
        /**
         * Add a listener to an event.
         * @param {string} event - Event type.
         * @param {function} handler - Listener function.
         * @return {Mobidys.cl.Chapter} This object.
         */
        on: function (event, handler) {
            this.listeners[event].push(handler);
            return this;
        },

        /**
         * Remove listeners of an event. Handler can be passed to remove only
         * this listener.
         * @param {string} event - Event type.
         * @param {function} [handler] - Listener function to remove.
         * @return {Mobidys.cl.Chapter} This object.
         */
        off: function (event, handler) {
            var listeners = this.listeners[event];

            // remove all handlers
            if (1 == arguments.length) {
                delete this.listeners[event];
                this.listeners[event] = [];
                return this;
            }

            // remove specific handler
            var cb;
            for (var i = 0; i < listeners.length; i++) {
                cb = listeners[i];
                if (cb === handler) {
                    listeners.splice(i, 1);
                    break;
                }
            }
            return this;
        },

        /**
         * Trigger an event. Calls all registered listeners.
         * @param {string} event - Event type.
         * @return {Mobidys.cl.Chapter} This object.
         */
        trigger: function (event) {
            var callbacks = this.listeners[event];

            if (event === "refresh")
                this.updateLines();

            if (callbacks) {
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                    var cb = callbacks[i];
                    if (typeof cb == "function")
                        cb.apply(this);
                }
            }
            return this;
        },

        /**
         * Show or hide chapter area.
         * @param {boolean} show - Show if true or hide if false.
         * @return {Mobidys.cl.Chapter} This object.
         */
        showHideChapArea: function (show) {
            this.changeStateChapArea(show);
            return this;
        },

        /**
         * Increase font size.
         * @return {Mobidys.cl.Chapter} This object.
         */
        increaseFontSize: function () {
            var size = this.book.increaseFontSize();
            if (size != null)
                this.applyFontSize(size);
            return this;
        },

        /**
         * Decrease font size.
         * @return {Mobidys.cl.Chapter} This object.
         */
        decreaseFontSize: function () {
            var size = this.book.decreaseFontSize();
            if (size != null)
                this.applyFontSize(size);
            return this;
        },

        /**
         * Switch font.
         * @return {Mobidys.cl.Chapter} This object.
         */
        switchFont: function () {
            var font = this.book.switchFont();
            this.$textContainer.css("fontFamily", font);
            return this;
        },

        /**
         * Toggle state of any option.
         * @param {string} opt - Name of the option to toggle.
         * @return {Mobidys.cl.Chapter} This object.
         */
        toggleOption: function (opt) {
            var list = this.book.toggleOption(opt);
            this.renderOptions(list);
            return this;
        }

    });

    /**
     * <p>Chapter plugin. The jQuery object passed is limited to the first of the
     * selection, and the plugin places a data-mobidys-chapter on it to retrieve
     * the instance of {@link Mobidys.cl.Chapter} configured for this page.</p>
     * <p>Example: <code>$("#mobidys").mobidysChapter();</code></p>
     * @function mobidysChapter
     * @memberof jQueryPlugins
     * @param {Object} config - Configuration. See {@link Mobidys.Book.defaults}
     * @return {jQuery} jQuery object configured.
     */
    $.fn.mobidysChapter = function (config) {
        var $this = this.eq(0);
        var chapter = new Mobidys.cl.Chapter($this, config || {});
        Mobidys.chapters.push(chapter);
        $this.data("mobidysChapter", chapter);
        return $this;
    };

    // Private methods
    $.extend(Mobidys.cl.Chapter.prototype, /** @lends Mobidys.cl.Chapter.prototype */{
        /**
         * Initialize object, find values and register listeners.
         * @private
         * @fires Mobidys.cl.Chapter~refresh
         */
        initChapter: function () {
            var chap = this;
            var fontSize = this.$chapArea.css("fontSize");
            var size = this.book.setFontSize(Number(fontSize.substring(0, fontSize.length-2)));
            if (size != null)
                this.applyFontSize(size);

            var chapHeight = this.$chapter.css("height");
            chapHeight = Number(chapHeight.substring(0, chapHeight.length-2));
            var chapHead = this.$chapHeader.css("height");
            chapHead = Number(chapHead.substring(0, chapHead.length-2));
            this.origTop = chapHeight - chapHead;

            // Cancel all images drag events
            this.$chapter.find("img").on("dragstart", false);

            // Show/Hide text area
            // -- Mouse event
            this.$chapHeader.on("mousedown.moveTextArea", function (e) {
                e.preventDefault();
                var $this = $(this);
                var startPos = e.pageY / Mobidys.utils.scale.y;
                var previousPos = startPos;
                chap.$chapArea.stop(true);
                var startTop = chap.currentTop;
                $("body").on("mousemove.moveTextArea", function (e) {
                    var newPos = e.pageY / Mobidys.utils.scale.y;
                    chap.eventMoveChapArea(startTop, startPos, newPos, previousPos);
                    previousPos = newPos;
                });
                $("body").on("mouseup.moveTextArea", function () {
                    $("body").off(".moveTextArea");
                    chap.changeStateChapArea();
                });
                $this.on("mouseup.moveTextAreaTap", function (e) {
                    $("body").off(".moveTextArea");
                    var newPos = 512 / Mobidys.utils.scale.y;
                    chap.eventMoveChapArea(startTop, startPos, newPos, previousPos);
                    previousPos = newPos;
                    chap.changeStateChapArea();
                });
            });

            // -- Touch event
            this.$chapHeader.on("touchstart.moveTextArea touchend.moveTextArea", function (e) {
                var $this = $(this);
                if (e.touches.length != 1) {
                    $this.off("touchmove.moveTextArea");
                    chap.changeStateChapArea();
                    return;
                }
                e.preventDefault();
                var startPos = e.touches[0].pageY / Mobidys.utils.scale.y;
                var previousPos = startPos;
                chap.$chapArea.stop(true);
                var startTop = chap.currentTop;
                $this.on("touchmove.moveTextArea", function (e) {
                    var newPos = e.touches[0].pageY / Mobidys.utils.scale.y;
                    chap.eventMoveChapArea(startTop, startPos, newPos, previousPos);
                    previousPos = newPos;
                });
                $this.on("touchend.moveTextAreaTap", function (e) {
                    var newPos = 512 / Mobidys.utils.scale.y;
                    chap.eventMoveChapArea(startTop, startPos, newPos, previousPos);
                    previousPos = newPos;
                    chap.changeStateChapArea();
                });
            });

            // Pinch to zoom
            this.$textContainer.on("touchstart.pinchToZoom touchend.pinchToZoom", function (e) {
                var $this = $(this);
                if (e.originalEvent.touches.length != 2) {
                    $this.off("touchmove.pinchToZoom");
                    return;
                }

                e.preventDefault();

                var touch1 = e.originalEvent.touches[0];
                var touch2 = e.originalEvent.touches[1];
                var startCoords1 = {
                    x: touch1.pageX,
                    y: touch1.pageY
                };
                var startCoords2 = {
                    x: touch2.pageX,
                    y: touch2.pageY
                };

                var startDistance =
                        Math.sqrt(Math.pow(startCoords2.x - startCoords1.x, 2)
                                  + Math.pow(startCoords2.y - startCoords1.y, 2));

                $this.on("touchmove.pinchToZoom", function (e) {
                    e.preventDefault();
                    var touch1 = e.originalEvent.touches[0];
                    var touch2 = e.originalEvent.touches[1];
                    var coords1 = {
                        x: touch1.pageX,
                        y: touch1.pageY
                    };
                    var coords2 = {
                        x: touch2.pageX,
                        y: touch2.pageY
                    };

                    var distance = Math.sqrt(Math.pow(coords2.x - coords1.x, 2)
                                             + Math.pow(coords2.y - coords1.y, 2));
                    var diff = distance - startDistance;
                    var STEP = 50; // -> distance to travel to de/zoom.
                    if (diff > STEP) {
                        startDistance = distance;
                        chap.increaseFontSize();
                    }
                    else if (diff < -STEP) {
                        startDistance = distance;
                        chap.decreaseFontSize();
                    }
                });
            });

            // Show/Hide menu
            this.$textContainer.find(".showMenu").on("click touch", function (e) {
                e.preventDefault();
                chap.$tools.toggle();
            });
            this.$tools.on("click touch", function (e) {
                e.preventDefault();
                $(this).hide();
            });

            // Limit page turn event to facilitate text scroll.
            this.$chapter.on("touchmove", function (e) {
                e.stopPropagation();
            });

            // When text is scrolled or text size is changed, check for the
            // #textShadow to be shown or hidden.
            this.$textArea.on("scroll", function () {
                chap.showHideShadow();
            });
            this.on("refresh", function () {
                chap.updateCustomScroll();
                chap.showHideShadow();
            });
            this.trigger("refresh");

            // Show #chapHeader
            this.$chapter.delay(250).queue(function (next) {
                chap.$chapArea.animate({top: chap.origTop}, "slow");
                next();
            });

            // Enable custom scroll.
            this.initCustomScroll();
        },

        /**
         * Calculate the new {@link Mobidys.cl.Chapter#currentTop|currentTop}
         * during move of chapter area.
         * @private
         * @param {number} startTop - Initial top value.
         * @param {number} startPos - First event 'y' position.
         * @param {number} newPos - Current event 'y' position.
         * @param {number} previousPos - Previous event 'y' position.
         */
        eventMoveChapArea: function (startTop, startPos, newPos, previousPos) {
            this.currentTop = startTop + (newPos - startPos);
            if (this.currentTop > this.origTop || this.currentTop < 0)
                return;

            var diff = newPos - previousPos;
            if (diff != 0)
                this.lastChapMove = diff;
            this.$chapArea.css("top", this.currentTop);
        },

        /**
         * Show or hide chapter area based on last move or forced by parameter.
         * When parameter is omitted, if lastChapMove is positive, hide it,
         * if negative, show it.
         * @private
         * @param {boolean} [show] - Force show if true or hide if false.
         */
        changeStateChapArea: function (show) {
            if (show === undefined && this.lastChapMove != 0)
                show = (this.lastChapMove < 0);
            if (show === true) {
                this.currentTop = 0;
                $('.menu-tirette').fadeIn(200);
            }
            else {
                this.currentTop = this.origTop;
                $('.menu-tirette').fadeOut(200);
            }

            this.$chapArea.stop(true).animate({top: this.currentTop}, 1500, function () {
                $('.numChap').removeClass('halo');
            });
            ;
        },

        /**
         * Show/Hide <code>#textShadow</code> as necessary.
         * @private
         * @listens Mobidys.cl.Chapter~event:scroll
         * @listens Mobidys.cl.Chapter~event:refresh
         */
        showHideShadow: function () {
            var textAreaHeight = this.$textArea.height() / Mobidys.utils.scale.y;
            var scrolled =  textAreaHeight + this.$textArea.scrollTop();
            var top = this.$textContainer.css("top");
            top = Math.abs(Number(top.substring(0, top.length-2))) + textAreaHeight;
            var textContainerHeight =
                    this.$textContainer.height() / Mobidys.utils.scale.y;
            var height = textContainerHeight - this.lineHeight;
            var heightShadow = (textAreaHeight % this.lineHeight) + this.lineHeight;

            if (scrolled >= height || top >= height) {
                this.$textShadow.css('height','0');
                this.$textShadow.hide();
            } else {
                this.$textShadow.css('height',heightShadow);
                this.$textShadow.show();
            }
        },

        /**
         * Apply given font size.
         * @private
         * @fires Mobidys.cl.Chapter~refresh
         * @param {string} size - Font size.
         */
        applyFontSize: function (size) {
            if (size < 0)
                return;

            this.$chapArea.css("fontSize", size);
            this.trigger("refresh");

            // MENU
            if (size == this.book.configuration.minFontSize)
                this.$tools.find("#txtM").addClass("disabled");
            else
                this.$tools.find("#txtM").removeClass("disabled");

            if (size == this.book.configuration.maxFontSize)
                this.$tools.find("#txtP").addClass("disabled");
            else
                this.$tools.find("#txtP").removeClass("disabled");
        },

        /**
         * Update internal lineHeight value and visibleLineNumber. Creates div lines
         * for option "alternateLines".
         * @private
         * @listens Mobidys.cl.Chapter~event:refresh
         */
        updateLines: function () {
            this.lineHeight = this.$textContainer.css("lineHeight");
            this.lineHeight =
                Number(this.lineHeight.substring(0, this.lineHeight.length-2));

            var height = this.$textArea.height() / Mobidys.utils.scale.y;
            this.visibleLineNumber =
                Math.floor( height / this.lineHeight) - 1;
        },

        /**
         * Call chapter renders for each option of the given list.
         * @private
         * @param {Array} list - Options to render.
         */
        renderOptions: function (list) {
            for (var i in list) {
                this.book.optionManager.options[list[i]].renderChapter(this);
            }
        },

        /**
         * Initialize custom scroll on the <code>#textArea</code> element.
         */
        initCustomScroll: function () {
            if ($.fn.perfectScrollbar)
                this.$textArea.perfectScrollbar();
            else
                console.warn("Scrollbar lib not found");
        },

        /**
         * Update custom scroll on the <code>#textArea</code> element.
         */
        updateCustomScroll: function () {
            if ($.fn.perfectScrollbar)
                this.$textArea.perfectScrollbar("update");
        },

        /**
         * Remove custom scroll from the <code>#textArea</code> element.
         */
        removeCustomScroll: function () {
            if ($.fn.perfectScrollbar)
                this.$textArea.perfectScrollbar("destroy");
        },

        /**
         * Menu manager. Add events to all buttons in the <code>#tools</code> element.
         * @private
         */
        menuEvents: function () {
            var chap = this;
            
            /*$.each(["spaces", "pagination", "audioSupport"], function (i, option) {
                chap.toggleOption(option);
            });*/

            // Bind tools
            $('.icone-menu').each(function () {
                var $link = $(this);
                switch ($link.attr("class").split(' ')[3].replace('-icon','')) {

                    case "rmSave":
                        $link.on("click", function () {
                            chap.book.removeContext();
                            return false;
                        });
                        break;

                    case "zoom":
                        $link.on("click", function () {
                            chap.increaseFontSize();
                            return false;
                        });
                        break;

                    case "dezoom":
                        $link.on("click", function () {
                            chap.decreaseFontSize();
                            return false;
                        });
                        break;

                    case "police":
                        $link.on("click", function () {
                            chap.switchFont();
                            return false;
                        });
                        break;

                    case "contraste":
                        $link.on("click", function () {
                            chap.toggleOption("contrast");
                            return false;
                        });
                        break;

                    case "aeration":
                        $link.on("click", function () {
                            chap.toggleOption("spaces");
                            return false;
                        });
                        break;

                    case "trameLignes":
                        $link.on("click", function () {
                            chap.toggleOption("alternateLines");
                            return false;
                        });
                        break;

                    case "trameRheses":
                        $link.on("click", function () {
                            chap.toggleOption("highlightPhrases");
                            return false;
                        });
                        break;

                    case "syllabes":
                        $link.on("click", function () {
                            chap.toggleOption("colorSyllables");
                            return false;
                        });
                        break;

                    case "phonemes":
                        $link.on("click", function () {
                            chap.toggleOption("colorPhonemes");
                            return false;
                        });
                        break;

                    case "ponctuation":
                        $link.on("click", function () {
                            chap.toggleOption("colorPunctuation");
                            return false;
                        });
                        break;

                    case "popUp":
                        $link.on("click", function () {
                            chap.toggleOption("definitions");
                            return false;
                        });
                        break;

                    case "suiviAudio":
                        $link.on("click", function () {
                            chap.toggleOption("audioSupport");
                            return false;
                        });
                        break;

                    case "suiviSilence":
                        $link.on("click", function () {
                            chap.toggleOption("readingWindow");
                            return false;
                        });
                        break;

                    case "narration":
                        $link.on("click", function () {
                            chap.toggleOption("audioPlayback");
                            return false;
                        });
                        break;

                    case "pageApage":
                        $link.on("click", function () {
                            chap.toggleOption("pagination");
                            return false;
                        });
                        break;

                    case "marqueLigne":
                        $link.on("click", function () {
                            chap.toggleOption("textmark");
                            return false;
                        });
                        break;

                    case "previous":
                        $link.on("click", function () {
                            chap.book.optionManager.options.pagination.previousPage(chap);
                            return false;
                        });
                        break;

                    case "next":
                        $link.on("click", function () {
                            chap.book.optionManager.options.pagination.nextPage(chap);
                            return false;
                        });
                        break;

                    default:
                        $link.on("click", function () {
                            console.error("Not implemented!");
                            return false;
                        });
                }
            });
        }
    });

}(jQuery));
