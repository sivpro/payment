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
    console.log(inputGroup);
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

                    if (item.nextElementSibling.classList.contains('input-dropdown')) {
                        item.nextElementSibling.classList.add('input-dropdown--active')
                    }

            })


            item.addEventListener('focusout', (event) => {

                //if (item.value.length > 0 && item.nextElementSibling) {
                /*
                setTimeout(function () {
                    dropdown.classList.remove('input-dropdown--active');
                },100);

                 */
                setTimeout(function () {
                    if (item.nextElementSibling.classList.contains('input-dropdown--active')) {
                        item.nextElementSibling.classList.remove('input-dropdown--active')
                        //document.getElementById('what_need_wrapper').style.setProperty('pointer-events','auto');

                    }
                },100);
                //}
            })




        })
    }

    const citySelectItems = document.querySelectorAll('.city_item');
    const cityVal = document.getElementById('cities_placeholder');
    const regionSelectItems = document.querySelectorAll('.region_item');
    const regionVal = document.getElementById('regions_placeholder');
    const regions_buttons = document.getElementById('regions_buttons');
    const selected_jk = document.getElementById('selected_jk');

    const calc = document.getElementById('calc');

    /*для чего*/
    document.getElementById('for_what_wrapper').addEventListener('click', function (event) {
        if ( event.target && event.target.matches("input[type='radio']") ) {
            console.log('Щёлк на для чего '+event.target.value);
            if(event.target.value === 'for_home') {
                document.getElementById('people_wrapper').classList.remove('s-none');
                document.getElementById('people_add_wrapper').classList.remove('s-none');
            }
            else {
                document.getElementById('people_wrapper').classList.add('s-none');
                document.getElementById('people_add_wrapper').classList.add('s-none');
            }
        }
        document.querySelector('#calc > input[data-id="for_what"]').value = event.target.value;
    });



    if(citySelectItems) {
        citySelectItems.forEach((item) => {
            item.addEventListener('click',(event) => {
                event.stopPropagation();
                if(document.querySelector('#calc > input[name="city"]')){
                    document.querySelector('#calc > input[name="city"]').remove();
                }

                calc.insertAdjacentHTML('beforeend','<input type="hidden" name="city" value="'+event.target.dataset.city+'" data-id="city" />')

                if(event.target.className === 'input-dropdown__link city_item') { event.stopPropagation(); console.log('мимо')}
                else { console.log(event.target.className)}
                let regions_li = document.getElementById('regions_li');

                regions_li.innerHTML = "";

                    cityVal.placeholder = item.innerHTML;
                    let data = {
                        city_code: item.dataset.city
                    };
                    let response = fetch('https://meter.sivpro.ru/getRegionsByCity', {
                        method: 'POST',
                        body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(
                            result => Object.entries(result).forEach(([key, value]) => {
                                regions_li.insertAdjacentHTML('beforeend', '<li class="input-dropdown__item">'+
                                    '<a href="#" class="input-dropdown__link region_item" data-region="'+value+'">'+value+'</a> </li>');

                            })
                        )
                        .then(result => sentRequest())
            })
        })
    }

    document.getElementById('flat-budget').addEventListener('keyup',function(event) {
        console.log('Бюжет изменение:'+event.target.value);
        document.querySelector('#calc > input[data-id="flat-budget"]').value = event.target.value;
    });
    document.getElementById('flat-aria').addEventListener('keyup',function(event) {
        console.log('Пощадь изменение:'+event.target.value);
        document.querySelector('#calc > input[data-id="flat-area"]').value = event.target.value;
    });

    let class_flat_checkboxs = document.querySelectorAll('#class_flat_wrapper > label > .class_flat_button');
    class_flat_checkboxs.forEach((item) => {
        item.addEventListener('change', function() {
            if (this.checked) {
                console.log("Checkbox is checked.."+this.id);
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
            } else {
                console.log("Checkbox is not checked..");
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
            }
        });
    })
    let type_flat_checkboxs = document.querySelectorAll('#type_flat_wrapper > label > .type_flat_button');
    type_flat_checkboxs.forEach((item) => {
        item.addEventListener('change', function() {
            if (this.checked) {
                console.log("Checkbox is checked.."+this.id);
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
            } else {
                console.log("Checkbox is not checked..");
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
            }
        });
    })
    let important_flat_checkboxs = document.querySelectorAll('#important_wrapper > label > .important_for_flat');
    important_flat_checkboxs.forEach((item) => {
        item.addEventListener('change', function() {
            if (this.checked) {
                console.log("Checkbox is checked.."+this.id);
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
            } else {
                console.log("Checkbox is not checked..");
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
            }
        });
    })

    /*
    let report_needs = document.querySelectorAll('#report_needs > label');
    let report_no_needs = document.querySelectorAll('#report_no_needs > label');
    report_needs.forEach((item) => {
        item.addEventListener('click', function (event) {
            //console.log('click on report need element');
        })
    });

     */

    let need_dog = document.getElementById('flat_for_dog');
    need_dog.addEventListener('change', function() {
        if (this.checked) {
            console.log("Checkbox dog is checked.."+this.id);
            document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
        } else {
            console.log("Checkbox dog is not checked..");
            document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
        }
    });

    //Важно метро
    let important_metro = document.getElementById('important_metro');
    important_metro.addEventListener('change',function(event) {
        if (this.checked) {
            console.log("Checkbox dog is checked.."+this.id);
            document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
        } else {
            console.log("Checkbox dog is not checked..");
            document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
        }
    });

    //Важна отделка
    let important_finish = document.getElementById('important_finish');
    important_finish.addEventListener('change',function(event) {
        if (this.checked) {
            console.log("Checkbox dog is checked.."+this.id);
            document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
        } else {
            console.log("Checkbox dog is not checked..");
            document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
        }
    })

    //Важна парковка
    let important_parking = document.getElementById('important_parking');
    important_parking.addEventListener('change',function(event) {
        if (this.checked) {
            console.log("Checkbox dog is checked.."+this.id);
            document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
        } else {
            console.log("Checkbox dog is not checked..");
            document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
        }
    })

    //исключить|добавить из отчета
    const report_no_needs_block = document.getElementById('report_no_needs');
    const report_needs_block = document.getElementById('report_needs');
    const need_to_report = document.querySelectorAll('.report_need_include');
    // const available_projects_list_items = document.querySelectorAll('.available_project');
    const available_projects_list = document.getElementById('available_projects_list')

    need_to_report.forEach((item)=> {
        item.addEventListener('change', function(e) {
            //e.stopPropagation();
            //report_no_needs_block.appendChild(item);
            let parent_node_id = e.target.parentNode.parentNode.id;
            console.log('Исключи|включить в отчет ' + parent_node_id);
            if(parent_node_id === 'report_no_needs') {
                console.log('Перемещаем в блок включить в отчет');
                report_needs_block.appendChild(item);
                calc.insertAdjacentHTML('beforeend','<input type="text" class name="report_includes[]" value="'+e.target.dataset.value+'"  />')

            }
            else if(parent_node_id === 'report_needs') {
                console.log('Перемещаем в блок исключить из отчета ')
                report_no_needs_block.appendChild(item);
                document.querySelector('#calc > input[value="'+e.target.dataset.value+'"]').remove();


            }
        });
    });

    available_projects_list.addEventListener('click',function(event) {
            event.preventDefault();
            if ( event.target.className === 'input-dropdown__link region_item available_project') {

                let current_element = document.querySelector('[data-id="jk_'+event.target.dataset.region+'"]');
                let already_selected_jks = document.querySelectorAll('#calc > input[name="jks[]"]');
                if(already_selected_jks){
                    if (already_selected_jks.length === 3){
                        alert('Максимально только 3 ЖК');
                        return true;
                    }
                }
                if(!current_element) {
                    let jk = '<label for="apartment-checkbox-01" class="btn-checkbox projects__checkbox" data-id="'+event.target.dataset.region+'" data-name="'+event.target.innerHTML+'">\n' +
                        '                        <input type="checkbox" class="btn-checkbox__input" id="apartment-checkbox-01"  checked>\n' +
                        '                        <span class="btn-checkbox__label" data-id="jk_' + event.target.dataset.region + '">' + event.target.innerHTML + '</span>\n' +
                        '                        <span class="btn-checkbox__icon"></span>\n' +
                        '                    </label>';

                    selected_jk.insertAdjacentHTML('beforeend', jk);
                    calc.insertAdjacentHTML('beforeend', '<input type="hidden" name="jks[]" value="' + event.target.dataset.region + '" data-id="jk_' + event.target.dataset.region + '"/>')
                }
                else {
                    console.log('уже есть');
                }
            }
    });


    selected_jk.addEventListener('click',(event) => {

        event.stopPropagation();

        console.log('target:');
        console.log(event.target);

        let current_dataset = event.target.dataset.id;
        console.log('currnet_dataset='+current_dataset);
        console.log('#calc > input[data-id="'+current_dataset+'"]');

        document.querySelector('#calc > input[data-id="'+current_dataset+'"]').remove();
        event.target.parentNode.remove();
        event.target.remove();
        //sentRequest();
    });


    let by_raiting_button = document.getElementById('by_raiting_button');

    by_raiting_button.addEventListener('click',function(event) {
        //let items_by_rating = document.querySelectorAll('#available_projects_list > li:nth-child(-n+3)');
        let items_by_rating = document.querySelectorAll('#available_projects_list > li:nth-child(-n+3)');
        //Удаляем уже выбранные
        selected_jk.innerHTML='';
        document.querySelectorAll('#calc > input[name="jks[]"]').forEach((item)=>{item.remove()});

        console.log('по рейтингу');
        console.log(items_by_rating);
        items_by_rating.forEach((item) => {
            console.log()
            console.log(item.dataset)
            console.log(item.dataset.id)
            console.log(item.dataset.name)
            let jk = '<label for="apartment-checkbox-01" class="btn-checkbox projects__checkbox" data-id="'+item.dataset.id+'">\n' +
                '                        <input type="checkbox" class="btn-checkbox__input" id="apartment-checkbox-01"  checked>\n' +
                '                        <span class="btn-checkbox__label" data-id="jk_' + item.dataset.id + '">' + item.dataset.name + '</span>\n' +
                '                        <span class="btn-checkbox__icon"></span>\n' +
                '                    </label>';

            selected_jk.insertAdjacentHTML('beforeend', jk);
            calc.insertAdjacentHTML('beforeend', '<input type="hidden" name="jks[]" value="' + item.dataset.id + '" data-id="jk_' + item.dataset.id + '"/>')

        });
    })




    document.addEventListener('click',(event)=>{
        //console.log('clicked on '+event.target.className);
    })

    let regionWrapper = document.getElementById('region_wrapper');
    regionWrapper.addEventListener('click',(event) => {
        console.log(event.target.className);
        event.preventDefault();
        if ( event.target.className === 'input-dropdown__link region_item') {
            console.log('clicked on region item');
            regionVal.placeholder = event.target.innerHTML;

            let current_element = document.querySelector('[data-id="region_'+event.target.innerHTML+'"]');
            if(!current_element) {
                regions_buttons.insertAdjacentHTML('beforeend', '<label for="area-checkbox-01" class="btn-checkbox projects__checkbox" data-id="'+event.target.innerHTML+'" >\n' +
                    '                            <input type="checkbox" checked="checked" class="btn-checkbox__input region_buttons">\n' +
                    '                            <span class="btn-checkbox__label" data-id="region_' + event.target.innerHTML + '">' + event.target.innerHTML + '</span>\n' +
                    '                            <span class="btn-checkbox__icon"></span>\n' +
                    '                        </label>');

                calc.insertAdjacentHTML('beforeend','<input type="hidden" name="region[]" value="'+event.target.innerHTML+'" data-id="region_' + event.target.innerHTML + '" />')
            }
            else {
                console.log('уже есть');
            }
            sentRequest()

        }
    },false)

    regions_buttons.addEventListener('click',(event) => {

            event.stopPropagation();
            console.log('click to delete region button');

            console.log('target:');
            console.log(event.target);
            let current_dataset = event.target.dataset.id;
            console.log('currnet_dataset='+current_dataset);
            console.log('#calc > input[data-id="'+current_dataset+'"]');
            document.querySelector('#calc > input[data-id="'+current_dataset+'"]').remove();
            event.target.parentNode.remove();
            event.target.remove();
        sentRequest();
    })



    function sentRequest()
    {
        //let available_projects_list = document.getElementById('available_projects_list');
        available_projects_list.innerHTML = "";

        let form = document.getElementById('calc');
        let response = fetch('https://meter.sivpro.ru/reqtest', {
            method: 'POST',
            body: new FormData(form)
        })
            .then(response => response.json())
            .then(result => {
                //let counts = Object.entries(result);
                console.log(result)
                let houses = [];
                result.items.forEach((item) => {
                    //console.log({'name': item.name, 'coords': item.coordinates});
                    houses.push({'name': item.name, 'coords': item.coordinates});
                    available_projects_list.insertAdjacentHTML('beforeend', '<li class="input-dropdown__item available_project" data-id="'+item.code+'" data-name="'+item.name+'">'+
                        '<a href="#" class="input-dropdown__link region_item available_project" data-region="'+item.code+'">'+item.name+'</a> </li>');
                })
                    sessionStorage.setItem('yacoords', JSON.stringify(result));
                    document.getElementById('total').innerHTML = result.items.length;
                    total_wrapper.style.setProperty('display','block');
                    if(result.items.length > 0){
                        get_projects_button.style.setProperty('display','inline-block');
                    }
                    else {
                        get_projects_button.style.setProperty('display','none');
                    }

                    objectManager.removeAll();
                    objectManager.add(result.map);








            }
            );

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

    /*
    let map = document.getElementById('YMapsID');
    if(map.length > 0) {
        var myMap;
        ymaps.ready(function () {
            myMap = new ymaps.Map('YMapsID', {
                center: [55.751574, 37.573856],
                zoom: 9
            }),

                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    `<div style="color: #FFFFFF; font-weight: bold;">
                    $[properties.iconContent]
                    Magnolia Park
                    Ромашка Девелопмент 3Q 2023 г.

                    квартиры премиум класс
                    Студии от 5 890 000 р.
                    1-комн. от 7 236 000 р.
                </div>`
                )

            objectManager = new ymaps.ObjectManager({
                // Чтобы метки начали кластеризоваться, выставляем опцию.
                clusterize: true,
                // ObjectManager принимает те же опции, что и кластеризатор.
                gridSize: 32,
                clusterDisableClickZoom: true
            });
            objectManager.objects.options.set('preset', 'islands#greenDotIcon');
            objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
            myMap.geoObjects.add(objectManager);
            //getDataForMap();
        });
    }
    */

});