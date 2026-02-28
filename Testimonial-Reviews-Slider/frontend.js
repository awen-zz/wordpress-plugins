(function() {
    function initSlider(slider) {
        var track = slider.querySelector('.ctsb-track');
        if (!track) return;

        var slides = track.children;
        var count = slides.length;
        if (count <= 1) return;

        var btnPrev = slider.querySelector('.ctsb-prev');
        var btnNext = slider.querySelector('.ctsb-next');
        var dotsWrap = slider.querySelector('.ctsb-dots');

        var autoPlay = slider.getAttribute('data-autoplay') === 'true';
        var interval = parseInt(slider.getAttribute('data-interval') || '5000', 10);
        var showDots = slider.getAttribute('data-dots') === 'true';
        var showArrows = slider.getAttribute('data-arrows') === 'true';

        var index = 0;
        var timer = null;

        function setIndex(i) {
            index = i;
            if (index < 0) index = count - 1;
            if (index >= count) index = 0;
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            updateDots();
        }

        function next() { setIndex(index + 1); restart(); }
        function prev() { setIndex(index - 1); restart(); }

        function buildDots() {
            if (!showDots || !dotsWrap) return;
            dotsWrap.innerHTML = '';
            for (var i = 0; i < count; i++) {
                var b = document.createElement('button');
                b.type = 'button';
                b.className = 'ctsb-dot' + (i === 0 ? ' is-active' : '');
                b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                (function(ii) { b.addEventListener('click', function() { setIndex(ii); restart(); }); })(i);
                dotsWrap.appendChild(b);
            }
        }

        function updateDots() {
            if (!dotsWrap) return;
            var dots = dotsWrap.querySelectorAll('.ctsb-dot');
            for (var i = 0; i < dots.length; i++) {
                if (i === index) dots[i].classList.add('is-active');
                else dots[i].classList.remove('is-active');
            }
        }

        function start() {
            if (!autoPlay) return;
            stop();
            timer = window.setInterval(function() {
                setIndex(index + 1);
            }, Math.max(2000, interval));
        }

        function stop() {
            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        function restart() {
            if (!autoPlay) return;
            start();
        }

        buildDots();
        setIndex(0);

        if (showArrows) {
            if (btnPrev) btnPrev.addEventListener('click', function(e) { e.preventDefault(); prev(); });
            if (btnNext) btnNext.addEventListener('click', function(e) { e.preventDefault(); next(); });
        }

        slider.addEventListener('mouseenter', stop);
        slider.addEventListener('mouseleave', start);
        slider.addEventListener('focusin', stop);
        slider.addEventListener('focusout', start);

        start();
    }

    document.addEventListener('DOMContentLoaded', function() {
        var sliders = document.querySelectorAll('.ctsb-slider');
        for (var i = 0; i < sliders.length; i++) initSlider(sliders[i]);
    });
})();
