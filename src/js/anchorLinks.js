import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function() {
    const anchorLinks = Array.from(document.querySelectorAll('.js-anchor-link'));

    anchorLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const hash = link.hash;
            const element = document.querySelector(hash);
            console.log(hash, element);

            const anchorEvent = new CustomEvent('anchorclick');
            document.dispatchEvent(anchorEvent);

            if (element) {
                const elementOffsetTop = Math.floor(element.getBoundingClientRect().top + window.pageYOffset);

                console.log(elementOffsetTop);

                gsap.to(window, { duration: 0.7, scrollTo: elementOffsetTop });
            }
        });
    });
}
