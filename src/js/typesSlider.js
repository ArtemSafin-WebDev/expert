import Swiper from 'swiper';

export default function() {
    const typesSliders = Array.from(document.querySelectorAll('.js-types-slider'));

    typesSliders.forEach(element => {
        const container = element.querySelector('.swiper-container');
        let sliderInstance = null;

        const options = {
            slidesPerView: 'auto',
            // watchSlidesProgress: true,
            watchOverflow: true,
            spaceBetween: 0,
            on: {
                progress: function() {
                    if (this.isEnd) {
                        element.classList.add('last-slide-reached');
                    } else {
                        element.classList.remove('last-slide-reached');
                    }
                    console.log('is end', this.isEnd)
                }
            }
        };

        const mql = window.matchMedia('(max-width: 767px)');

        function init() {
            if (!sliderInstance) sliderInstance = new Swiper(container, options);
            // sliderInstance.snapGrid = [...sliderInstance.slidesGrid];
            console.log('Slider initialized');
        }

        function destroy() {
            if (sliderInstance) sliderInstance.destroy();
            sliderInstance = null;
            console.log('Slider destroyed');
        }

        function controller(mq) {
            if (mq.matches) {
                init();
            } else {
                destroy();
            }
        }

        mql.addListener(controller);

        controller(mql);
    });
}
