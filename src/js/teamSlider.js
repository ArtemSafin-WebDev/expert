import Swiper from "swiper";

export default function() {
    const teamSliders = Array.from(document.querySelectorAll('.js-team-slider'));


    teamSliders.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            slidesPerView: 3,
            navigation: {
                nextEl: element.querySelector('.team__slider-btn--next'),
                prevEl: element.querySelector('.team__slider-btn--prev')
            }
        })
    })
}