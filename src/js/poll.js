import { lockScroll, unlockScroll } from './scrollBlocker';
import { gsap } from 'gsap';

export default function() {
    const poll = document.querySelector('.js-poll');

    if (!poll) return;

    let pollStep = 0;

    const pollSteps = Array.from(poll.querySelectorAll('.js-poll-step'));
    const pollStepsCount = pollSteps.length;
    const callbackModalScrollContainer = document.querySelector('.js-poll .callback__inner');
    let callbackModalOpen = false;
    const callbackFormLayer = document.querySelector('.js-poll .js-callback-form-layer');
    const callbackSuccessLayer = document.querySelector('.js-poll .js-callback-success-layer');
    const pollForm = document.querySelector('.js-poll .js-poll-form');
    const progressbar = document.querySelector('.js-poll .callback__poll-progressbar-spinner');
    const choices = Array.from(poll.querySelectorAll('.callback__poll-questions-checkbox-input'));

    gsap.set(progressbar, {
        scaleX: (pollStep + 1) / pollStepsCount
    });

    function setProgressBar(stepNumber) {
        gsap.to(progressbar, {
            duration: 0.5,
            ease: 'none',
            scaleX: (stepNumber + 1) / pollStepsCount
        });
    }

    function setPollStep(stepNumber) {
        callbackFormLayer.classList.remove('active');
        callbackSuccessLayer.classList.remove('active');
        pollSteps.forEach(element => element.classList.remove('active'));
        pollSteps[pollStep].classList.add('active');
        poll.classList.add('poll-mode');
        setProgressBar(stepNumber);
    }

    function openPollForm() {
        pollSteps.forEach(element => element.classList.remove('active'));
        callbackSuccessLayer.classList.remove('active');
        callbackFormLayer.classList.add('active');
        poll.classList.remove('poll-mode');
    }

    function openPollSuccessWindow() {
        pollSteps.forEach(element => element.classList.remove('active'));
        callbackFormLayer.classList.remove('active');
        callbackSuccessLayer.classList.add('active');
        poll.classList.remove('poll-mode');
    }

    function resetPoll() {
        pollStep = 0;
        setPollStep(pollStep);
        choices.forEach(element => (element.checked = false));
        pollForm.reset();
    }

    function prevPollStep() {
        if (pollStep !== 0) {
            pollStep--;
            setPollStep(pollStep);
        }
    }

    function nextPollStep() {
        if (pollStep < pollStepsCount - 1) {
            pollStep++;
            setPollStep(pollStep);
        } else {
            openPollForm();
        }
    }

    function openCallbackModal() {
        document.body.classList.add('poll-open');
        callbackModalOpen = true;
        lockScroll(callbackModalScrollContainer);

        const transitionEndHandler = () => {
            poll.classList.remove('initial-load');
            poll.removeEventListener('transitionend', transitionEndHandler);
        };

        poll.addEventListener('transitionend', transitionEndHandler);
        poll.classList.add('initial-load');

        const event = new CustomEvent('pollOpen');
        document.dispatchEvent(event);
    }
    function closeCallbackModal() {
        document.body.classList.remove('poll-open');
        callbackModalOpen = false;
        unlockScroll();
        resetPoll();
        poll.classList.remove('initial-load');
        const event = new CustomEvent('pollClose');
        document.dispatchEvent(event);
    }

    document.addEventListener('click', event => {
        if (event.target.closest('.js-open-poll') || event.target.matches('.js-open-poll')) {
            event.preventDefault();
            openCallbackModal();
        } else if (event.target.closest('.js-poll .js-close-callback-modal') || event.target.matches('.js-poll .js-close-callback-modal')) {
            event.preventDefault();
            closeCallbackModal();
        } else if (event.target.closest('.js-poll .js-callback-reset') || event.target.matches('.js-poll .js-callback-reset')) {
            event.preventDefault();
            resetPoll();
        } else if (event.target.closest('.js-poll .js-callback-exit') || event.target.matches('.js-poll .js-callback-exit')) {
            event.preventDefault();
            resetPoll();

            closeCallbackModal();
        } else if (event.target.closest('.js-poll .js-poll-back') || event.target.matches('.js-poll .js-poll-back')) {
            event.preventDefault();
            prevPollStep();
        } else if (event.target.closest('.js-poll .js-poll-next') || event.target.matches('.js-poll .js-poll-next')) {
            event.preventDefault();
            nextPollStep();
        }
    });

    choices.forEach(choice => {
        choice.addEventListener('change', () => {
            nextPollStep();
        });
    });

    setPollStep(pollStep);

    window.openPollSuccessWindow = openPollSuccessWindow;
}
