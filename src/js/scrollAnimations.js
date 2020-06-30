import * as ScrollMagic from 'scrollmagic';
import { gsap } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

ScrollMagicPluginGsap(ScrollMagic, gsap);

export default function() {

    
    window.scrollBy(0, 1);
    window.addEventListener('load', function() {
        const controller = new ScrollMagic.Controller();
        const bgImage = document.querySelector('.fullheight-bg');
        const bgImageOverlay = document.querySelector('.fullheight-bg__overlay');
        console.log('Animating bg');
        const bgTl = gsap.timeline();
        gsap.set(bgImage, { position: 'fixed' });
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

        if (window.matchMedia('(max-width: 1024px)').matches || document.body.classList.contains('is-admin')) return;
       

        const types = document.querySelector('.types');
        const apply = document.querySelector('.how-to-apply');
        const pageFooter = document.querySelector('.page-footer');

        const sidelogo = document.querySelector('.sidelogo');
        const container = document.querySelector('.container');

        const introText = document.querySelector('.js-intro-text');
        const introTextWrapper = document.querySelector('.js-intro-text-wrapper');

        const tl = gsap.timeline();

        gsap.set(introTextWrapper, {
            minHeight: introText.offsetHeight
        });
        gsap.set(introText, {
            transformOrigin: 'center',
            position: 'fixed',
            zIndex: -1,
            paddingLeft: introTextWrapper.getBoundingClientRect().left,
            top: introTextWrapper.getBoundingClientRect().top + window.pageYOffset,
            width: '100%',
            left: 0,
           
        });

        gsap.set(sidelogo, {
            left: 'auto',
            display: 'block',
            right:
                parseFloat(window.getComputedStyle(container).getPropertyValue('width')) -
                parseFloat(window.getComputedStyle(container).getPropertyValue('padding-left')) / 2 -
                parseFloat(window.getComputedStyle(sidelogo).getPropertyValue('width')) / 2
        });

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                gsap.set(introText, { transformOrigin: 'center', position: 'fixed', paddingLeft: introTextWrapper.getBoundingClientRect().left, top: introTextWrapper.getBoundingClientRect().top + window.pageYOffset, width: '100%', left: 0 });

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
            ease: 'none',
            display: 'none'
        });

        new ScrollMagic.Scene({
            triggerElement: types,
            triggerHook: 0,
            duration: '45%'
        })
            .setTween(tl)
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

        console.log({
            documentHeight: document.documentElement.clientHeight,
            pageFooterHeight: pageFooter.offsetHeight * 0.9,
            windowHeight: window.innerHeight
        });

        if (pageFooter && document.documentElement.clientHeight >= pageFooter.offsetHeight * 0.9) {
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
                duration: pageFooter.offsetHeight, 
                offset: document.querySelector('.page-main').offsetHeight - window.innerHeight
            })
                .setTween(tl)
                .addTo(controller);
        }
    });
}
