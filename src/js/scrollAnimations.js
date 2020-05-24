import * as ScrollMagic from 'scrollmagic';
import { gsap } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import detectIt from 'detect-it';

ScrollMagicPluginGsap(ScrollMagic, gsap);

export default function() {
    if (window.matchMedia('(max-width: 767px)').matches || detectIt.hasTouch) return;

    const types = document.querySelector('.types');
    const apply = document.querySelector('.how-to-apply');
    const pageFooter = document.querySelector('.page-footer');
    const controller = new ScrollMagic.Controller();
    const faq = document.querySelector('.faq');

    if (types) {
        const introText = types.querySelector('.types__intro-text');
        const pageHeader = document.querySelector('.page-header');
        const tl = gsap.timeline();

        tl.set(introText, { transformOrigin: 'left top' }).to(introText, {
            opacity: 0,
            duration: 1,
            y: 250,
            scale: 0.975,
            ease: 'none'
        });

        // new ScrollMagic.Scene({
        //     triggerElement: types,
        //     triggerHook: 0,
        //     duration: '15%'
        // })
        //     .setPin(types, {
        //         pushFollowers: true
        //     })
        //     .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: types,
            triggerHook: 0,
            duration: '35%'
        })
            .setTween(tl)
            .addTo(controller);

        // new ScrollMagic.Scene({
        //     triggerElement: types,
        //     triggerHook: 0,
        //     duration: '15%'
        // })
        //     .setPin(pageHeader, {
        //         pushFollowers: false
        //     })
        //     .addTo(controller);
    }

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
