import Swiper from 'swiper';

export default function() {
    const otherServicesSliders = Array.from(document.querySelectorAll('.js-other-services-slider'));

    otherServicesSliders.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 3,
            watchOverflow: true,
            navigation: {
                nextEl: element.querySelector('.others-services__slider-btn--next'),
                prevEl: element.querySelector('.others-services__slider-btn--prev')
            }
        });
    });
}
