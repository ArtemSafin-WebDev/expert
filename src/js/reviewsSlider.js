import Swiper from 'swiper';

export default function() {
    const reviewsSliders = Array.from(document.querySelectorAll('.js-reviews-slider'));

    reviewsSliders.forEach(element => {
        const mainContainer = element.querySelector('.reviews__slider-main .swiper-container');
        const secondaryContainer = element.querySelector('.reviews__slider-secondary .swiper-container');

        const mainSlider = new Swiper(mainContainer, {
            watchOverflow: true,
            speed: 800,

            navigation: {
                nextEl: element.querySelector('.reviews__slider-btn--next'),
                prevEl: element.querySelector('.reviews__slider-btn--prev')
            }
        });

        const secondarySlider = new Swiper(secondaryContainer, {
            spaceBetween: 0,
            speed: 1200,
            breakpoints: {
                768: {
                    spaceBetween: 130,
                }
            }
        });

        mainSlider.controller.control = secondarySlider;
        secondarySlider.controller.control = mainSlider;
    });
}
