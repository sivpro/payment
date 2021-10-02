document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    // SMOOTH SCROLL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }
    
    function smoothScrollCoord(coord) {
        let startY = currentYPosition();
        let stopY = coord;
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // ALL LINKS SMOOTH SCROLL
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                if (item.getAttribute('href').length > 1) {
                    smoothScroll(item.getAttribute('href').slice(1))
                }
            })
        })
    }

    // HEADER HEIGHT
    const header = document.querySelector('.header')

    document.documentElement.style.setProperty('--height', `${header.getBoundingClientRect().height}px`);
    
    // SWIPER
    const reportSlider = document.querySelector('.report__slider .swiper-container')
    const reportSlideNext = document.querySelector('.report__slider .swiper-button-next')
    const reportSlidePrev = document.querySelector('.report__slider .swiper-button-prev')

    if (reportSlider) {
        const mySwiperReport = new Swiper(reportSlider, {
            spaceBetween: 50,
            slidesPerView: 1,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                    centeredSlides: true,
                    roundLengths: true,
                    loopAdditionalSlides: 30,
                }
            },
        })
    }

    // QUANTITY
    const quantity = document.querySelectorAll('.quantity'),
        quantityMinus = document.getElementsByClassName('quantity__minus'),
        quantityPlus = document.getElementsByClassName('quantity__plus')
    
    let quantityCountInput = document.getElementsByClassName('quantity__number')
    
    if (quantity) {
        quantity.forEach((s, i) => {
            quantityMinus[i].addEventListener('click', () => {
                if ((quantityCountInput[i].value) * 1 >= 1) {
                    quantityCountInput[i].value = (quantityCountInput[i].value) * 1 - 1;
                }
            });
    
            quantityPlus[i].addEventListener('click', () => {
                quantityCountInput[i].value = (quantityCountInput[i].value) * 1 + 1;
            })
        })
    }

    // INPUT && DROPDOWN LIST
    const inputGroup = document.querySelectorAll('.input-group__input')
    const inputDropdown = document.querySelectorAll('.input-dropdown')

    if (inputGroup) {
        inputGroup.forEach((item) => {
            item.addEventListener('input', () => {
                if (item.value.length > 0 && item.nextElementSibling) {
                    if (item.nextElementSibling.classList.contains('input-dropdown')) {
                        item.nextElementSibling.classList.add('input-dropdown--active')
                    }
                } else if (item.value.length < 1 && item.nextElementSibling) {
                    if (item.nextElementSibling.classList.contains('input-dropdown--active')) {
                        item.nextElementSibling.classList.remove('input-dropdown--active')
                    }
                }
            })
            item.addEventListener('focus', () => {
                if (item.value.length > 0 && item.nextElementSibling) {
                    if (item.nextElementSibling.classList.contains('input-dropdown')) {
                        item.nextElementSibling.classList.add('input-dropdown--active')
                    }
                }
            })
            item.addEventListener('blur', () => {
                if (item.value.length > 0 && item.nextElementSibling) {
                    if (item.nextElementSibling.classList.contains('input-dropdown--active')) {
                        item.nextElementSibling.classList.remove('input-dropdown--active')
                    }
                }
            })
        })
    }

    // MODAL
    const modalBtn = document.querySelectorAll('.modal-btn')
    const modal = document.querySelectorAll('.modal')
    const modalClose = document.querySelectorAll('.modal__close')
    const overlay = document.querySelector('.overlay')
    
    if (modalBtn) {
        modalBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                const modalID = item.dataset.id

                if (modalID) {
                    if (!overlay.classList.contains('overlay--active')) {
                        overlay.classList.add('overlay--active')
                    }
    
                    document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                    document.body.classList.add('scroll-disabled')
                    document.getElementById(modalID).classList.add('modal--active')

                    if (document.getElementById(modalID).classList.contains('modal--sm')) {
                        setTimeout(() => {
                            document.body.classList.remove('scroll-disabled')
                            document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                            overlay.classList.remove('overlay--active')
                        }, 5000)
                    }
                }
            });
        });
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (key == 27) {
            if (overlay.classList.contains('overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                overlay.classList.remove('overlay--active')
            }
        };
    }, false);

    if (modalClose) {
        modalClose.forEach((item) => {
            item.addEventListener('click', () => {
                if (overlay.classList.contains('overlay--active')) {
                    document.body.classList.remove('scroll-disabled')
                    document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                    overlay.classList.remove('overlay--active')
                }
            });
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (overlay.classList.contains('overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                overlay.classList.remove('overlay--active')
            }
        });
    }
});