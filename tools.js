var tools = (function (d) {

    function createNodeList(selector) {
        if (selector instanceof NodeList) {
            return selector;
        }
        if (selector instanceof Node) {
            return [selector];
        }
        if (typeof selector === 'string' && selector.length > 0) {
            return d.querySelectorAll(selector);
        }
        return [];
    }

    function addClass(selector, className) {
        var elements, len, i, optionalSpace;
        elements = createNodeList(selector);
        len = elements.length;
        for (i = 0; i < len; i += 1) {
            optionalSpace = elements[i].classList.length > 0 ? ' ' : '';
            if (!elements[i].classList.contains(className)) {
                elements[i].className += optionalSpace + className;
            }
        }
    }

    function removeClass(selector, className) {
        var elements, len, i, optionalSpace;
        elements = createNodeList(selector);
        len = elements.length;
        for (i = 0; i < len; i += 1) {
            optionalSpace = elements[i].className.indexOf(className) > 0 ? ' ' : '';
            elements[i].className = elements[i].className.split(optionalSpace + className).join('');
        }

    }


    return {
        addClass: addClass,
        removeClass: removeClass
    };

}(window.document));