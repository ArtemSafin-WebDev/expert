import { gsap } from 'gsap';

export default function() {
    const tabs = Array.from(document.querySelectorAll('.js-tabs'));

    tabs.forEach(element => {
        const tabsNav = Array.from(element.querySelectorAll('.js-tabs-nav'));
        const tabItems = Array.from(element.querySelectorAll('.js-tabs-item'));
        let spinner = null;
        let initialLoad = false;

        function createSpinner() {
            spinner = document.createElement('div');
            spinner.className = 'tabs-spinner';
            tabsNav[0].parentElement.appendChild(spinner);
            gsap.set(spinner, {
                position: 'absolute',
                left: 0,
                top: 0,
                pointerEvents: 'none',
                zIndex: 10,
                backgroundColor: '#ED1C24',
                width: '0.3rem',
                height: '0.3rem'
            });
        }

        function moveSpinnerToActiveBtn() {
            const activeBtn = tabsNav.find(element => element.classList.contains('active'));

            // const btnWidth = parseFloat(window.getComputedStyle(activeBtn).getPropertyValue('width'));

            const btnWidth = activeBtn.offsetWidth;

            const btnXoffset = activeBtn.offsetLeft;
            const btnYoffset = activeBtn.offsetTop;

            console.log({
                activeBtn,
                btnWidth,
                btnXoffset,
                btnYoffset
            });

            gsap.to(spinner, {
                width: btnWidth,
                duration: 0.4,
                left: btnXoffset,
                top: btnYoffset + activeBtn.offsetHeight - spinner.offsetHeight
            });
        }

        function setActiveTab(index, event) {
            if (event) event.preventDefault();

            const heightBefore = parseFloat(window.getComputedStyle(element).getPropertyValue('height'));

            gsap.set(element, {
                height: 'auto'
            });

            tabsNav.forEach(btn => btn.classList.remove('active'));
            tabItems.forEach(item => item.classList.remove('active'));
            tabsNav[index].classList.add('active');
            tabItems[index].classList.add('active');

            const heightAfter = parseFloat(window.getComputedStyle(element).getPropertyValue('height'));

            // console.log({
            //     heightBefore,
            //     heightAfter
            // });

            if (element.hasAttribute('data-adaptive-tabs')) {
                gsap.fromTo(
                    element,
                    { height: heightBefore },
                    {
                        duration: 0.4,
                        height: heightAfter,
                        clearProps: 'all'
                    }
                );
            }

            if (initialLoad && element.hasAttribute('data-has-spinner')) {
                moveSpinnerToActiveBtn();
            }
        }

        tabsNav.forEach((btn, btnIndex) => {
            const handler = setActiveTab.bind(btn, btnIndex);
            btn.addEventListener('click', handler);
        });

        setActiveTab(0);

        if (element.hasAttribute('data-has-spinner')) {
            window.addEventListener('load', function() {
                createSpinner();

                moveSpinnerToActiveBtn();
                initialLoad = true;

                let resizeTimer = null;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        moveSpinnerToActiveBtn();
                    }, 250);
                });
            });
        }
    });
}
