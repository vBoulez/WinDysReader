/*jshint globalstrict: true*/
/*global jQuery: true*/

"use strict";

var DEBUG = {}; // eslint-disable-line no-unused-vars

jQuery(function ($) {
    var chapter = $("#mobidys").mobidysChapter().data("mobidysChapter");
    if (chapter.$chapArea.data("autoShow"))
        chapter.$chapter.queue(function (next) {
            chapter.showHideChapArea(true);
            next();
        });

    DEBUG = {
        "$pointer": $('<div id="DEBUG_pointer"><div></div></div>').appendTo("body"),
        newPoint: function () {
            return this.$pointer.clone().appendTo("body");
        },
        log: function (message) {
            this.$pointer.show();
            var $div = this.$pointer.find("> div");
            var $p = $("<p/>").html(message);
            $div.append($p);
        }
    };

});
