import Swiper from 'swiper';

export default function() {
    const offersSliders = Array.from(document.querySelectorAll('.js-offers-slider'));

    offersSliders.forEach(sliderElement => {
        const container = sliderElement.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            effect: 'fade',
            duration: 700,
            slidesPerView: 1,
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: sliderElement.querySelector('.offers__nav-btn--prev'),
                prevEl: sliderElement.querySelector('.offers__nav-btn--next')
            }
        });
    });
}
