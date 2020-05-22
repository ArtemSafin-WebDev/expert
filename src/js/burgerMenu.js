import { lockScroll, unlockScroll } from './scrollBlocker';

export default function() {
    const burgerBtn = document.querySelector('.js-burger');
    const burgerMenuInnerWrapper = document.querySelector('.page-header__burger-menu-inner-wrapper');

    let burgerMenuOpen = false;

    if (burgerBtn && burgerMenuInnerWrapper) {
        burgerBtn.addEventListener('click', event => {
            event.preventDefault();

            if (!burgerMenuOpen) {
                document.body.classList.add('burger-menu-open');
                lockScroll(burgerMenuInnerWrapper);
                burgerMenuOpen = true;
            } else {
                document.body.classList.remove('burger-menu-open');
                unlockScroll();
                burgerMenuOpen = false;
            }
        });
    }
}
