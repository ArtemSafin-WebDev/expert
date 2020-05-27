import * as ScrollMagic from 'scrollmagic';
import { gsap } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import detectIt from 'detect-it';

ScrollMagicPluginGsap(ScrollMagic, gsap);

export default function() {
    if (window.matchMedia('(max-width: 767px)').matches) return;

    const types = document.querySelector('.types');
    const apply = document.querySelector('.how-to-apply');
    const pageFooter = document.querySelector('.page-footer');
    const controller = new ScrollMagic.Controller();

    const bgImage = document.querySelector('.fullheight-bg');
    const bgImageOverlay = document.querySelector('.fullheight-bg__overlay');
    const sidelogo = document.querySelector('.sidelogo');
    const container = document.querySelector('.container');

    const introText = document.querySelector('.js-intro-text');
    const introTextWrapper = document.querySelector('.js-intro-text-wrapper');

    const tl = gsap.timeline();

    gsap.set(introTextWrapper, {
        minHeight: introText.offsetHeight
    });
    gsap.set(introText, { transformOrigin: 'center', position: 'fixed', left: introTextWrapper.getBoundingClientRect().left, top: introTextWrapper.getBoundingClientRect().top + window.pageYOffset, width: '100%' });
    gsap.set(bgImage, { position: 'fixed' });

    gsap.set(sidelogo, {
        left: 'auto',
        display: 'block',
        right:
            parseFloat(window.getComputedStyle(container).getPropertyValue('width')) - parseFloat(window.getComputedStyle(container).getPropertyValue('padding-left')) / 2 - parseFloat(window.getComputedStyle(sidelogo).getPropertyValue('width')) / 2
    });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            gsap.set(introText, { transformOrigin: 'center', position: 'fixed', left: introTextWrapper.getBoundingClientRect().left, top: introTextWrapper.getBoundingClientRect().top + window.pageYOffset, width: '100%' });

            gsap.set(sidelogo, {
                left: 'auto',
                right:
                    parseFloat(window.getComputedStyle(container).getPropertyValue('width')) -
                    parseFloat(window.getComputedStyle(container).getPropertyValue('padding-left')) / 2 -
                    parseFloat(window.getComputedStyle(sidelogo).getPropertyValue('width')) / 2
            });
        }, 250);
    });

    new ScrollMagic.Scene({
        triggerHook: 'onEnter',
        duration: '100%'
    })
        .setClassToggle(sidelogo, 'hidden')
        .addTo(controller);

    tl.to(introText, {
        duration: 1,
        autoAlpha: 0,
        scale: 0.97,
        ease: 'none'
    });

    new ScrollMagic.Scene({
        triggerElement: types,
        triggerHook: 0,
        duration: '45%'
    })
        .setTween(tl)
        .addTo(controller);

    const bgTl = gsap.timeline();

    bgTl.to(
        bgImageOverlay,
        {
            opacity: 1,
            duration: 1,
            ease: 'none'
        },
        0
    );
    new ScrollMagic.Scene({
        triggerElement: types,
        triggerHook: 0,
        duration: '35%'
    })
        .setTween(bgTl)
        .addTo(controller);

    if (apply) {
        const redLabelCircle = apply.querySelector('.how-to-apply__red-label-circle');
        const tl = gsap.timeline();

        tl.to(redLabelCircle, {
            duration: 1,
            rotation: 360,
            ease: 'none'
        });

        new ScrollMagic.Scene({
            triggerElement: apply,
            triggerHook: 0.9,
            duration: '120%'
        })
            .setTween(tl)
            .addTo(controller);
    }

    if (pageFooter) {
        const tl = gsap.timeline();

        gsap.set(pageFooter, {
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '100%',
            zIndex: 1,
            autoAlpha: 0
        });
        gsap.set(document.querySelector('body'), {
            paddingBottom: pageFooter.offsetHeight
        });
        gsap.set(document.querySelector('.page-main'), {
            zIndex: 2,
            position: 'relative'
        });

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                gsap.set(document.querySelector('body'), {
                    paddingBottom: pageFooter.offsetHeight
                });
            }, 250);
        });

        tl.to(pageFooter, {
            duration: 1,
            autoAlpha: 1
        });
        new ScrollMagic.Scene({
            triggerElement: document.querySelector('section:last-child'),
            triggerHook: 0,
            duration: '100%'
        })
            .setTween(tl)
            .addTo(controller);
    }
}
