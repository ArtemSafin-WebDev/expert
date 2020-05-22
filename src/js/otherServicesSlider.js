import Swiper from 'swiper';

export default function() {
    const otherServicesSliders = Array.from(document.querySelectorAll('.js-other-services-slider'));

    otherServicesSliders.forEach(element => {
        const container = element.querySelector('.swiper-container');

        let sliderInstance = null;

        const options = {
            slidesPerView: 'auto',
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.others-services__slider-btn--next'),
                prevEl: element.querySelector('.others-services__slider-btn--prev')
            },
            breakpoints: {
                768: {
                    slidesPerView: 3
                }
            }
        };

        const mql = window.matchMedia('(max-width: 767px)');

        function init() {
            if (!sliderInstance) sliderInstance = new Swiper(container, options);
            sliderInstance.snapGrid = [...sliderInstance.slidesGrid];
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
