import { lockScroll, unlockScroll } from './scrollBlocker';

export default function() {
    const burgerBtn = document.querySelector('.js-burger');
    const burgerMenuInnerWrapper = document.querySelector('.page-header__burger-menu-inner-wrapper');

    let burgerMenuOpen = false;

    function burgerOpen() {
        document.body.classList.add('burger-menu-open');
        lockScroll(burgerMenuInnerWrapper);
        burgerMenuOpen = true;
    }

    function burgerClose() {
        document.body.classList.remove('burger-menu-open');
        unlockScroll();
        burgerMenuOpen = false;
    }

    if (burgerBtn && burgerMenuInnerWrapper) {
        burgerBtn.addEventListener('click', event => {
            event.preventDefault();

            if (!burgerMenuOpen) {
                burgerOpen();
            } else {
                burgerClose();
            }
        });
    }

    document.addEventListener(
        'anchorclick',
        () => {
            burgerClose();
        }
    );
}
