/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]'
    var Alert   = function (el) {
        $(el).on('click', dismiss, this.close)
    }

    Alert.prototype.close = function (e) {
        var $this    = $(this)
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
            $parent = $this.hasClass('alert') ? $this : $this.parent()
        }

        $parent.trigger(e = $.Event('close.bs.alert'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            $parent.trigger('closed.bs.alert').remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
                .one($.support.transition.end, removeElement)
                .emulateTransitionEnd(150) :
            removeElement()
    }


    // ALERT PLUGIN DEFINITION
    // =======================

    var old = $.fn.alert

    $.fn.alert = function (option) {
        return this.each(function () {
            var $this = $(this)
            var data  = $this.data('bs.alert')

            if (!data) $this.data('bs.alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.alert.Constructor = Alert


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function () {
        $.fn.alert = old
        return this
    }


    // ALERT DATA-API
    // ==============

    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);
window.onload = (function() {
    return function() {
        sdcc.menuInit();
    }
})();

var sdcc = {
    openedHeight: '',
    menuOpen: true,
    mainMenu: null,
    menuInit: function() {
        this.mainMenu = document.getElementById('main_nav');
        this.mainMenu.style.opacity = 1;
        this.closeMenu();
    },
    closeMenu: function() {
        var height = this.mainMenu.clientHeight;
        this.openedHeight = height + 'px';

        this.mainMenu.style.height = '0';
        this.menuOpen = false;

        var menuLinks = document.getElementById('main_nav').children.length;
        var compHeight = 40 + (51 * menuLinks)

        if (height < compHeight) {
            this.openedHeight = compHeight + 'px';
        }
    },
    toggleMenu: function() {
        var body = document.getElementsByTagName('body')[0];

        if(this.menuOpen) {
            this.closeMenu();
            body.removeAClass('menu-open');
        } else {
            body.className += ' menu-open';
            this.mainMenu.style.height = this.openedHeight;
            this.menuOpen = true;
        }
    }
};

HTMLElement.prototype.removeAClass = function(classToRemove) {
    var newClassName = "";
    var i;
    var classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
        if(classes[i] !== classToRemove) {
            newClassName += classes[i] + " ";
        }
    }
    this.className = newClassName.trim();
}

if (typeof String.prototype.trim != 'function') { // detect native implementation
    String.prototype.trim = function () {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}