import Swiper from 'swiper';

export default function() {
    const gallerySliders = Array.from(document.querySelectorAll('.js-gallery-slider'));

    gallerySliders.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            slidesPerView: 1,
            speed: 1000,
            parallax: true,
            navigation: {
                nextEl: element.querySelector('.gallery__slider-nav-btn--next'),
                prevEl: element.querySelector('.gallery__slider-nav-btn--prev'),
            }
        });
    });
}
