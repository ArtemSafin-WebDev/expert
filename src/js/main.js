import polyfills from './polyfills';
import detectTouch from './detectTouch';
import offersSlider from './offersSlider';
import otherServicesSlider from './otherServicesSlider';
import gallerySliders from './gallerySliders';
import teamSliders from './teamSlider';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    offersSlider();
    otherServicesSlider();
    gallerySliders();
    teamSliders();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
})
