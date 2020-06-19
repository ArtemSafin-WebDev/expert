import polyfills from './polyfills';
import detectTouch from './detectTouch';
import offersSlider from './offersSlider';
import otherServicesSlider from './otherServicesSlider';
import gallerySliders from './gallerySliders';
import teamSliders from './teamSlider';
import reviewsSlider from './reviewsSlider';
import accordions from './accordions';
import tabs from './tabs';
import stickyElements from './stickyElements';
import typesSlider from './typesSlider';
import burgerMenu from './burgerMenu';
import scrollAnimations from './scrollAnimations';
import callbackModal from './callbackForm';
import formValidation from './formValidation';
import poll from './poll';
import anchorLinks from './anchorLinks';
import showMore from './showMore';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    offersSlider();
    otherServicesSlider();
    gallerySliders();
    teamSliders();
    reviewsSlider();
    accordions();
    tabs();
    stickyElements();
    typesSlider();
    burgerMenu();
    scrollAnimations();
    callbackModal();
    formValidation();
    poll();
    anchorLinks();
    showMore();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => {
        document.body.classList.add('animatable');
    }, 300);
});
