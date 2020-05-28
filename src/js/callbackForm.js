import { lockScroll, unlockScroll } from './scrollBlocker';
export default function() {
    const callbackModalScrollContainer = document.querySelector('.js-callback-modal .callback__inner');
    let callbackModalOpen = false;
    const callbackFormLayer = document.querySelector('.js-callback-modal .js-callback-form-layer');
    const callbackSuccessLayer = document.querySelector('.js-callback-modal .js-callback-success-layer');
    const callbackForm = document.querySelector('.js-callback-modal .js-callback-form');

    function openCallbackModal() {
        document.body.classList.add('callback-form-shown');
        callbackModalOpen = true;
        lockScroll(callbackModalScrollContainer);

        const event = new CustomEvent('callbackOpen');
        document.dispatchEvent(event);
    }
    function closeCallbackModal() {
        document.body.classList.remove('callback-form-shown');
        callbackModalOpen = false;
        unlockScroll();

        const event = new CustomEvent('callbackClose');
        document.dispatchEvent(event);
    }

    document.addEventListener('click', event => {
        if (event.target.closest('.js-open-callback-modal') || event.target.matches('.js-open-callback-modal')) {
            event.preventDefault();
            openCallbackModal();
        } else if (event.target.closest('.js-callback-modal .js-close-callback-modal') || event.target.matches('.js-callback-modal .js-close-callback-modal')) {
            event.preventDefault();
            closeCallbackModal();
        } else if (event.target.closest('.js-callback-modal .js-callback-reset') || event.target.matches('.js-callback-modal .js-callback-reset')) {
            event.preventDefault();
            callbackFormLayer.classList.add('active');
            callbackSuccessLayer.classList.remove('active');
            callbackForm.reset();
        } else if (event.target.closest('.js-callback-modal .js-callback-exit') || event.target.matches('.js-callback-modal .js-callback-exit')) {
            event.preventDefault();
            callbackFormLayer.classList.add('active');
            callbackSuccessLayer.classList.remove('active');
            callbackForm.reset();
            closeCallbackModal();
        }
    });
}
