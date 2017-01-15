/*jshint globalstrict: true*/
/*global jQuery: true*/
/*global setInterval: true*/
/*global clearInterval: true*/

"use strict";

var Mobidys = Mobidys || {};

(function ($) {
    /**
     * @namespace
     */
    Mobidys.utils = {};

    /**
     * <p><b>Fix: Readium scale on html element.</b></p>
     * <p>Scale should be applied to these jQuery functions (not exhaustively):</p>
     * <ul><li><code>$.fn.<b>offset</b></code></li>
     * <li><code>$.fn.<b>width</b></code></li>
     * <li><code>$.fn.<b>height</b></code></li></ul>
     * <p>Values retrieved by these functions must be divided by the corresponding
     * scale value. Values set must be multiplied.</p>
     * <p><b>Warning</b>: using <code>$.fn.<b>offset</b></code> to set position may be
     * incorrect. Try using <code>$.fn.<b>offsetParent</b></code> to retrieve
     * relative element, then calculate top and left values, and finally set them
     * with <code>$.fn.<b>css</b></code>.
     * <p>It should NOT be applied on <code>$.fn.<b>css</b></code> function.</p>
     * @property {number} x - x-axis scale. Defaults: 1.
     * @property {number} y - y-axis scale. Defaults: 1.
     */
    Mobidys.utils.scale = {
        x: 1,
        y: 1
    };

    $(function () {
        // Scale
        var $elem = $("html");
        var setScale = function () {
            var transforms = $elem.getTransformObj();
            Mobidys.utils.scale = transforms.scale;
            for (var i = 0; i < Mobidys.chapters.length; i++) {
                Mobidys.chapters[i].trigger("refresh");
            }
        };

        if ($elem.css("transform") !== "none") {
            setScale();
        } else {
            var max = 3000;
            var step = 500;
            var count = 0;
            var timer = setInterval(function () {
                if ($elem.css("transform") !== "none") {
                    setScale();
                    clearInterval( timer );
                }
                else if (count > max)
                    clearInterval( timer );
                count += step;
            }, step);
        }

        $(window).on("orientationchange resize", function () {
            var transforms = $elem.getTransformObj();
            if (transforms.scale.y != Mobidys.utils.scale.y ||
                transforms.scale.x != Mobidys.utils.scale.x) {
                setScale();
            } else {
                var max = 3000;
                var step = 500;
                var count = 0;
                var timer = setInterval(function () {
                    var transforms = $elem.getTransformObj();
                    if (transforms.scale.y != Mobidys.utils.scale.y ||
                        transforms.scale.x != Mobidys.utils.scale.x) {
                        setScale();
                        clearInterval( timer );
                    }
                    else if (count > max)
                        clearInterval( timer );
                    count += step;
                }, step);
            }
        });

    });

    /**
     * Convert a transform matrix into an object.
     * @function getTransformObj
     * @memberof jQueryPlugins
     * @return {Object} Transform object.
     */
    $.fn.getTransformObj = function () {
        var obj = {
            rotate: 0,
            scale: {x: 1, y: 1},
            translate: {x: 0, y: 0}
        };
        var transform = this.css("transform");
        if (transform !== "none") {
            var matrix = transform.match(/([-+]?[\d\.]+)/g);

            obj.translate.x = matrix[4];
            obj.translate.y = matrix[5];

            obj.rotate = Math.round(Math.atan2(parseFloat(matrix[1]), parseFloat(matrix[0])) * (180/Math.PI));

            obj.scale.x = Math.sqrt(matrix[0]*matrix[0] + matrix[1]*matrix[1]);
            obj.scale.y = Math.sqrt(matrix[2]*matrix[2] + matrix[3]*matrix[3]);
        }

        obj.toString = function () {
            return "transform: translate("+obj.translate.x+"px,"+obj.translate.y+"px) rotate("+obj.rotate+"deg) scale("+obj.scale.x+","+obj.scale.y+");";
        };

        return obj;
    };

    // setTimeout(function () {
    //     $("html").css("transform", "scale(0.8)");
    //     $("html").css("transform-origin", "0px 0px");
    // }, 500);

}(jQuery));
