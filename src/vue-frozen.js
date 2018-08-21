/* global Vue:true */
/* global define:true */
;(function () {
    const frozen = {};

    let startY = 0;
    let moveY = 0;

    touchStart = (e) => {
        startY = e.touches[0].clientY;
        e.stopPropagation();
    }

    touchMove = (e, el) => {
        moveY = e.touches[0].clientY;
        var yDiff = moveY - startY; // yDiff大于0为下拉,小于0上拉
        if (yDiff > 0 && el.scrollTop === 0 && e.cancelable) {
            e.preventDefault();
        }
        if (yDiff < 0 && (el.scrollTop === (el.scrollHeight - el.offsetHeight)) && e.cancelable) {
            e.preventDefault();
        }
    }

    frozen.install = (Vue, options) => {
        Vue.directive('frozen', {
            bind (el, binding) { // el是绑定指令的元素
                el.addEventListener('touchstart', (e) => {
                    touchStart(e);
                }, false);
                el.addEventListener('touchmove', (e) => {
                    e.stopPropagation();
                    touchMove(e, el);
                }, false);
                el.addEventListener('touchend', (e) => {
                    e.stopPropagation();
                }, false);
            },
            unbind (el) {
                el.removeEventListener('touchstart', (e) => {
                    touchStart(e);
                }, false);
                el.removeEventListener('touchmove', (e) => {
                    touchMove(e, el);
                }, false);
            }
        });
    }
  
    if (typeof exports === 'object') {
        module.exports = frozen;
    } else if (window.Vue) {
        window.frozen = frozen;
        Vue.use(frozen);
    }
})();