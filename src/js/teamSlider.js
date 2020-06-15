import Swiper from 'swiper';

export default function() {
    const teamSliders = Array.from(document.querySelectorAll('.js-team-slider'));

    teamSliders.forEach(element => {
        const container = element.querySelector('.swiper-container');

        let sliderInstance = null;

        const options = {
            watchOverflow: true,
            slidesPerView: 1,
            slidesPerGroup: 1,
            speed: 400,
            navigation: {
                nextEl: element.querySelector('.team__slider-btn--next'),
                prevEl: element.querySelector('.team__slider-btn--prev')
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    speed: 700,
                }
            }
        };

        const mql = window.matchMedia('(max-width: 767px)');

        function init() {
            if (!sliderInstance) sliderInstance = new Swiper(container, options);
            // sliderInstance.snapGrid = [...sliderInstance.slidesGrid];
        }

        function destroy() {
            if (sliderInstance) sliderInstance.destroy();
            sliderInstance = null;
            console.log('Slider destroyed');
        }

        function controller() {
            destroy();
            init();
        }

        mql.addListener(controller);

        controller(mql);
    });
}
