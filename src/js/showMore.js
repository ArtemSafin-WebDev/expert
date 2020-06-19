export default function() {
    const showMore = Array.from(document.querySelectorAll('.js-show-more'));

    function openAccordeon(element) {
        element.style.maxHeight = 'none';
        const computedStyle = getComputedStyle(element);
        const computedHeight = computedStyle.height;
        element.style.maxHeight = '';
        setTimeout(() => {
            const transitionEndHandler = () => {
                console.log('Tranisitionnd Initiated');
                element.style.maxHeight = 'none';
                element.removeEventListener('transitionend', transitionEndHandler);
            };
            element.addEventListener('transitionend', transitionEndHandler);
            element.style.maxHeight = `${computedHeight}`;
        }, 20);
    }

    function closeAccordeon(element) {
        const computedStyle = getComputedStyle(element);
        const computedHeight = computedStyle.height;
        element.style.maxHeight = `${computedHeight}`;
        setTimeout(() => {
            element.style.maxHeight = '';
        }, 20);
    }

    showMore.forEach(element => {
        const btn = element;
        const content = element.nextElementSibling;
        const btnInitialText = btn.textContent;

        if (!content.matches('.js-show-more-content')) {
            console.error('Next element is not content');
        } else {
            btn.addEventListener('click', event => {
                event.preventDefault();
                if (!element.classList.contains('active')) {
                    openAccordeon(content);
                    element.classList.add('active');
                    btn.textContent = 'скрыть'
                } else {
                    closeAccordeon(content);
                    element.classList.remove('active');
                    btn.textContent = btnInitialText;
                }
            });
        }
    });
}
