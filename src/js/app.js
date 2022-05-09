document.addEventListener('DOMContentLoaded', function () {



})




document.addEventListener('DOMContentLoaded', function () {
    const domain = document.head.querySelector("meta[name='domain']").getAttribute('content');
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));


    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // NUMBER WITH SPACES
    function numberWithSpaces(x) {
        if( x === ''){return '';}
        //return parseInt(x.replace(/\s/g,'')).toLocaleString('ru');
        var int = String(Math.trunc(x.replace(/\s/g,'')));
        if(int.length <= 3) return int;
        var space = 0;
        var number = '';

        for(var i = int.length - 1; i >= 0; i--) {
            if(space === 3) {
                number = ' ' + number;
                space = 0;
            }
            number = int.charAt(i) + number;
            space++;
        }

        return number;
    }
    
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

    function GetURLParameter(sParam)
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam)
            {
                return sParameterName[1];
            }
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
                    quantityCountInput[i].dispatchEvent(new Event('change'));
                }
            });
    
            quantityPlus[i].addEventListener('click', () => {
                quantityCountInput[i].value = (quantityCountInput[i].value) * 1 + 1;
                quantityCountInput[i].dispatchEvent(new Event('change'));
            });

        })
    }

    let people_numbers = document.querySelectorAll('.quantity__number');
    if(people_numbers.length > 0) {
        people_numbers.forEach((item) => {
            item.addEventListener('change', function (event) {
                console.log('Изменение проживающих');
                document.querySelector('#calc > input[data-id="'+this.id+'"]').value = this.value;
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

                    if(item.nextElementSibling) {
                        if (item.nextElementSibling.classList.contains('input-dropdown')) {
                            item.nextElementSibling.classList.add('input-dropdown--active')
                        }
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
                    if(item.nextElementSibling) {
                        if (item.nextElementSibling.classList.contains('input-dropdown--active')) {
                            item.nextElementSibling.classList.remove('input-dropdown--active')
                            //document.getElementById('what_need_wrapper').style.setProperty('pointer-events','auto');

                        }
                    }
                },100);
                //}
            })

            item.addEventListener('keyup', (event) => {
                let input, filter, i, txtValue,txtValue_ru, a, li, ul;
                input = event.target;
                ul = input.nextElementSibling;
                filter = input.value.toUpperCase();

                if(ul) {
                    li = ul.getElementsByTagName("li");
                    for (i = 0; i < li.length; i++) {
                        a = li[i].getElementsByTagName("a")[0];
                        console.log(a.innerText);
                        console.log(a.textContent);
                        console.log(a.dataset.ru);
                        txtValue = a.textContent || a.innerText || a.dataset.ru;
                        txtValue_ru = a.dataset.ru;
                        if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValue_ru && txtValue_ru.toUpperCase().indexOf(filter) > -1)) {
                            li[i].style.display = "";
                        } else {
                            li[i].style.display = "none";
                        }
                    }
                }
            });




        })
    }

    const myCodeInput = document.getElementById('my_code');
    if(myCodeInput) {
        myCodeInput.addEventListener('keyup', (event) => {
            console.log('keyup in mycoce');
            console.log(event.target.value.length);
            if (event.target.value.length >= 6) {
                let remains_form_data = new FormData();
                remains_form_data.append('code', event.target.value);
                let telephone = document.getElementsByName('form_report_telephone');
                if (telephone) {
                    remains_form_data.append('telephone', telephone[0].value);
                    let response = fetch(domain + '/coderemains', {
                        method: 'POST',
                        body: remains_form_data
                    })
                        .then(response => response.json())
                        .then(result => {
                            console.log(result);
                            if (result.error) {
                                document.getElementById('no_subscription').classList.add('show_subscription');
                                document.getElementById('subscription').classList.remove('show_subscription');
                            }
                            if (result.remains) {
                                if (result.promotariff === 'true') {
                                    document.getElementById('no_subscription').classList.remove('show_subscription');
                                    document.getElementById('subscription').innerHTML = "Промокод на кол-во отчетов: " + result.remains + ". Cтоимость: " + result.promotariff_price;
                                    document.getElementById('subscription').classList.add('show_subscription');
                                } else {
                                    document.getElementById('no_subscription').classList.remove('show_subscription');
                                    document.getElementById('subscription').innerHTML = "Доступно отчетов: " + result.remains;
                                    document.getElementById('subscription').classList.add('show_subscription');
                                }

                            } else if (result.remains === 0) {
                                document.getElementById('no_subscription').classList.remove('show_subscription');
                                document.getElementById('subscription').innerHTML = "Доступно отчетов: " + result.remains;
                                document.getElementById('subscription').classList.add('show_subscription');
                            }


                        });
                }

            } else {
                document.getElementById('subscription').classList.remove('show_subscription');
                document.getElementById('no_subscription').classList.remove('show_subscription');
            }
        });
    }


    const citySelectItems = document.querySelectorAll('.city_item');
    const cityVal = document.getElementById('cities_placeholder');
    const regionSelectItems = document.querySelectorAll('.region_item');
    const regionVal = document.getElementById('regions_placeholder');
    const regions_buttons = document.getElementById('regions_buttons');
    const selected_jk = document.getElementById('selected_jk');
    const selected_jks = document.querySelectorAll('.selected_jk');

    const calc = document.getElementById('calc');

    /*для чего*/
    let for_what = document.getElementById('for_what_wrapper');
    if(for_what){
        for_what.addEventListener('click', function (event) {
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

                document.querySelector('#calc > input[data-id="for_what"]').value = event.target.value;
                setTimeout(() => {
                    sentRequest();
                },200);
            }

        });
    }

    if(citySelectItems) {
        citySelectItems.forEach((item) => {
            item.addEventListener('click',(event) => {
                event.stopPropagation();
                console.log('city clicked');
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
                    let response = fetch(domain+'/getRegionsByCity', {
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

    let flat_budget = document.getElementById('flat-budget');
    if(flat_budget){
        flat_budget.addEventListener('blur',function(event) {
            console.log('Бюжет изменение:'+event.target.value);
            document.querySelector('#calc > input[data-id="flat-budget"]').value = event.target.value.replace(/\s/g,'');
            setTimeout(() => {
                sentRequest();
            },200);
        });

        flat_budget.addEventListener('keyup',function(event) {
            let current_value = numberWithSpaces(event.target.value);
            console.log(current_value);
            this.value = current_value;
        });
    }


    let flat_aria = document.getElementById('flat-aria');
    if(flat_aria){
        flat_aria.addEventListener('keyup',function(event) {
            console.log('Пощадь изменение:'+event.target.value);
            document.querySelector('#calc > input[data-id="flat-area"]').value = event.target.value;
        });
        flat_aria.addEventListener('blur',function(event) {
            console.log('Пощадь изменение:'+event.target.value);
            document.querySelector('#calc > input[data-id="flat-area"]').value = event.target.value;
            setTimeout(() => {
                sentRequest();
            },200);

        });
    }


    let class_flat_checkboxs = document.querySelectorAll('#class_flat_wrapper > label > .class_flat_button');
    if(class_flat_checkboxs){
        class_flat_checkboxs.forEach((item) => {
            item.addEventListener('change', function() {
                let checked;
                if (this.checked) {
                    console.log("Checkbox is checked.."+this.id);
                    checked = true;
                } else {
                    console.log("Checkbox is not checked..");
                    checked = false;
                }

                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = checked;
                setTimeout(() => {
                    console.log('start request..');
                    sentRequest();
                },200);
            });
        });
    }

    let type_flat_checkboxs = document.querySelectorAll('#type_flat_wrapper > label > .type_flat_button');
    if(type_flat_checkboxs){
        type_flat_checkboxs.forEach((item) => {
            item.addEventListener('change', function() {
                let checked;
                if (this.checked) {
                    console.log("Checkbox is checked.."+this.id);
                    checked = true;
                } else {
                    console.log("Checkbox is not checked..");
                    checked = false;
                }
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = checked;
                setTimeout(() => {
                    console.log('start request..');
                    sentRequest();
                },200);
            });
        })
    }

    let important_flat_checkboxs = document.querySelectorAll('#important_wrapper > label > .important_for_flat');
    if(important_flat_checkboxs){
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
    }


    let plus_minute_people = document.querySelectorAll('.quantity__number');
    if(plus_minute_people){
        plus_minute_people.forEach((item) => {
            item.addEventListener('change', function() {
                setTimeout(() => {
                    console.log('start request..');
                    sentRequest();
                },200);
            })
        });
    }


    let need_dog = document.getElementById('flat_for_dog');
    if(need_dog){
        need_dog.addEventListener('change', function() {
            if (this.checked) {
                console.log("Checkbox dog is checked.."+this.id);
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
                //Включаем в отчет
                //dispatchEvent(new Event('click')
            } else {
                console.log("Checkbox dog is not checked..");
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
                //Исключаем из отчета
                //dispatchEvent(new Event('click')
            }
            sentRequest();
        });
    }

    //Важно метро
    let important_metro = document.getElementById('important_metro');
    if(important_metro){
        important_metro.addEventListener('change',function(event) {
            if (this.checked) {
                console.log("Checkbox dog is checked.."+this.id);
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
            } else {
                console.log("Checkbox dog is not checked..");
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
            }
            setTimeout(() => {
                console.log('start request..');
                sentRequest();
            },200);
        });
    }

    //Важна отделка
    let important_finish = document.getElementById('important_finish');
    if(important_finish){
        important_finish.addEventListener('change',function(event) {
            if (this.checked) {
                console.log("Checkbox dog is checked.."+this.id);
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
            } else {
                console.log("Checkbox dog is not checked..");
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
            }
            setTimeout(() => {
                console.log('start request..');
                sentRequest();
            },200);
        })
    }

    //Важна парковка
    let important_parking = document.getElementById('important_parking');
    if(important_parking){
        important_parking.addEventListener('change',function(event) {
            if (this.checked) {
                console.log("Checkbox dog is checked.."+this.id);
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = true;
            } else {
                console.log("Checkbox dog is not checked..");
                document.querySelector('#calc > input[data-id="'+this.id+'"]').checked = false;
            }
            setTimeout(() => {
                console.log('start request..');
                sentRequest();
            },200);

        });
    }

    //исключить|добавить из отчета
    const report_no_needs_block = document.getElementById('report_no_needs');
    const report_needs_block = document.getElementById('report_needs');
    const need_to_report = document.querySelectorAll('.report_need_include');
    const available_projects_list = document.getElementById('available_projects_list');


    if(need_to_report){
        need_to_report.forEach((item)=> {
            item.addEventListener('change', function(e) {
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
    }

    if(available_projects_list){
        available_projects_list.addEventListener('click',function(event) {
            event.preventDefault();
            if ( event.target.className === 'input-dropdown__link region_item available_project') {

                addJkSelect(event.target.innerHTML, event.target.dataset.region);

            }
        });
    }

    /*
    if(selected_jk) {
        selected_jks.forEach((item)=>{
            item.addEventListener('click',function(event){
                console.log(event.target);
                let current_dataset = event.target.dataset.id;
                document.querySelector('#calc > input[data-id="' + current_dataset + '"]').remove();
                event.target.parentNode.remove();
                event.target.remove();
                objectManager.objects.setObjectOptions(event.target.dataset.id.replace('jk_', ''), {iconImageHref: '/img/dist/icon-mark.svg'});
            });
        });
    }
     */

    if(selected_jk){


        selected_jk.addEventListener('click',(event) => {

            event.stopPropagation();

            console.log('target:');
            console.log(event.target);
            if(event.target.dataset.id) {
                let current_dataset = event.target.dataset.id;
                console.log('currnet_dataset=' + current_dataset);
                console.log('#calc > input[data-id="' + current_dataset + '"]');

                document.querySelector('#calc > input[data-id="' + current_dataset + '"]').remove();
                event.target.parentNode.remove();
                event.target.remove();
                //sentRequest();
                objectManager.objects.setObjectOptions(event.target.dataset.id.replace('jk_', ''), {iconImageHref: '/img/dist/icon-mark.svg'});
            }
            else {
                return false;
            }
        });
    }



    let by_raiting_ckeckbox = document.getElementById('raiting-checkbox');

    if(by_raiting_ckeckbox){
        by_raiting_ckeckbox.addEventListener('change',function(event) {
           if(event.target.checked === false){
               document.querySelectorAll('#calc > input[name="jks[]"]').forEach((item)=>{item.remove()});
               selected_jk.innerHTML='';
           }
           else {
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
                   let jk = '<label for="apartment-checkbox_'+item.dataset.id+'" class="btn-checkbox projects__checkbox selected_jk" data-id="'+item.dataset.id+'">\n' +
                       '                        <input type="checkbox" class="btn-checkbox__input" id="apartment-checkbox_'+item.dataset.id+'"  checked>\n' +
                       '                        <span class="btn-checkbox__label" data-id="jk_' + item.dataset.id + '">' + item.dataset.name + '</span>\n' +
                       '                        <span class="btn-checkbox__icon" data-id="jk_'+item.dataset.id+'"></span>\n' +
                       '                    </label>';

                   selected_jk.insertAdjacentHTML('beforeend', jk);
                   calc.insertAdjacentHTML('beforeend', '<input type="hidden" name="jks[]" value="' + item.dataset.id + '" data-id="jk_' + item.dataset.id + '"/>');
                   objectManager.objects.setObjectOptions(item.dataset.id, {iconImageHref: '/img/dist/icon-mark_selected.svg'});

               });
           }

        })
    }





    document.addEventListener('click',(event)=>{
        //console.log('clicked on '+event.target.className);
    })

    let regionWrapper = document.getElementById('region_wrapper');
    if(regionWrapper){
        regionWrapper.addEventListener('click',(event) => {
            //console.log(event.target.className);
            event.preventDefault();
            if ( event.target.className === 'input-dropdown__link region_item') {
                // console.log('clicked on region item');
                //regionVal.placeholder = event.target.innerHTML;

                let current_element = document.querySelector('[data-id="region_'+event.target.innerHTML+'"]');
                if(!current_element) {
                    regions_buttons.insertAdjacentHTML('beforeend', '<label for="area-checkbox-01" class="btn-checkbox projects__checkbox" data-id="region_'+event.target.innerHTML+'" >\n' +
                        '                            <input type="checkbox" checked="checked" class="btn-checkbox__input region_buttons">\n' +
                        '                            <span class="btn-checkbox__label" data-id="region_' + event.target.innerHTML + '">' + event.target.innerHTML + '</span>\n' +
                        '                            <span class="btn-checkbox__icon" data-id="region_'+event.target.innerHTML+'"></span>\n' +
                        '                        </label>');

                    calc.insertAdjacentHTML('beforeend','<input type="hidden" name="region[]" value="'+event.target.innerHTML+'" data-id="region_' + event.target.innerHTML + '" />')
                }
                else {
                    console.log('уже есть');
                }
                sentRequest()

            }
        },false)
    }

    if(regions_buttons){
        regions_buttons.addEventListener('click',(event) => {

            event.stopPropagation();
            let current_dataset = event.target.dataset.id;
            console.log('current_region_to_delete: '+event.target.dataset.id);
            document.querySelector('#calc > input[data-id="'+current_dataset+'"]').remove();
            event.target.parentNode.remove();
            event.target.remove();

            sentRequest();
        })
    }




    function sentRequest()
    {
        document.querySelectorAll('#calc > input[name="jks[]"]').forEach((item)=>{item.remove()});
        selected_jk.innerHTML='';
        available_projects_list.innerHTML = "";
        document.querySelectorAll('#calc > input[name="report_includes[]"]').forEach(e => e.remove());
        //document.querySelectorAll('.report_need_include').forEach(e => e.remove());
        let form = document.getElementById('calc');
        let response = fetch(domain+'/reqtest', {
            method: 'POST',
            body: new FormData(form)
        })
            .then(response => response.json())
            .then(result => {
                //let counts = Object.entries(result);

                let houses = [];
                result.items.forEach((item) => {
                    //console.log({'name': item.name, 'coords': item.coordinates});
                    houses.push({'name': item.name, 'coords': item.coordinates});
                    available_projects_list.insertAdjacentHTML('beforeend', '<li class="input-dropdown__item available_project" data-id="'+item.code+'" data-name="'+item.name+'">'+
                        '<a href="#" class="input-dropdown__link region_item available_project" data-region="'+item.code+'" data-ru="'+item.ru_name+'">'+item.name+'</a> </li>');
                });

                if(result.res.included) {
                    result.res.included.forEach((item) => {
                        calc.insertAdjacentHTML('beforeend', '<input type="text" class name="report_includes[]" value="' + item.name + '"  />');
                        let current_element = report_no_needs_block.querySelector('[data-value = "' + item.name + '"]');
                        if (current_element) {
                            console.log('Включаю нужно из ненужных=' + item.name);
                            current_element.checked = true;
                            report_needs_block.appendChild(current_element.parentNode);
                        }

                    });
                }
                if(result.res.excluded) {
                        result.res.excluded.forEach((item) => {
                            let current_element = report_needs_block.querySelector('[data-value = "' + item.name + '"]');
                            if (current_element) {
                                console.log('Выключаю ненужное из нужных=' + item.name);
                                current_element.checked = false;
                                report_no_needs_block.appendChild(current_element.parentNode);
                            }

                        });
                    }

                sessionStorage.setItem('yacoords', JSON.stringify(result));
                document.getElementById('total').innerHTML = result.items.length;
                document.getElementById('total_panel').innerHTML = result.items.length;
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

    /*send Form*/
    let sendForm = document.getElementById('request_report');
    if(sendForm){
        sendForm.addEventListener('submit', function(event){
            console.log('submit form');
            event.preventDefault();
            sendToReport();
        });
    }


    function sendToReport()
    {
        let form_calc = document.getElementById('calc');
        let form_request = document.getElementById('request_report');

        let formData = new FormData(form_request);
        let calcData = new FormData(form_calc);

        for (var pair of calcData.entries()) {
            formData.append(pair[0], pair[1]);
        }

        let response = fetch(domain+'/reqreport', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.success === 'ok') {
                    if(result.redirect){
                        window.location.assign(result.redirect);
                    }
                    else {
                        document.getElementById('order').classList.remove('modal--active')
                        document.getElementById('success').classList.add('modal--active')
                    }

                }
                if(result.error) {
                    alert(result.redirect);
                }
            })

    }

    // MODAL
    const modalBtn = document.querySelectorAll('.modal-btn')
    const modal = document.querySelectorAll('.modal')
    const modalClose = document.querySelectorAll('.modal__close')
    const modalBtnClose = document.querySelectorAll('.modal__btn_close');
    const overlay = document.querySelector('.overlay')
    const tariffs = document.querySelectorAll('.tariff-code');
    const promo_block = document.querySelector('.promo_block');

    /*
    document.getElementById('payment-success').classList.add('modal--active');
    if (!overlay.classList.contains('overlay--active')) {
        overlay.classList.add('overlay--active');
    }

     */


    if (modalBtn) {
        modalBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                //Если это кнопка выбора проектов, то надо проверить, что выбраны минимум 1 проект
                if(item.id==='get_projects_button'){
                    let jks = document.getElementsByName('jks[]');
                    if(jks.length <= 0) {
                        alert('Чтобы сравнить - выберите от 1 до 3 проектов.');
                        return false;
                    }
                }

                const modalID = item.dataset.id

                if (modalID) {
                    if (!overlay.classList.contains('overlay--active')) {
                        overlay.classList.add('overlay--active')
                    }
    
                    document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                    //document.body.classList.add('scroll-disabled')
                    document.getElementById(modalID).classList.add('modal--active')

                    if (document.getElementById(modalID).classList.contains('modal--sm')) {
                        setTimeout(() => {
                            //document.body.classList.remove('scroll-disabled')
                            document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                            overlay.classList.remove('overlay--active')
                        }, 5000)
                    }
                }
            });
        });
    }

    if(tariffs) {
        tariffs.forEach((item)=>{
            item.addEventListener('change', (event)=>{
                if(item.classList.contains('show-code')) {
                    promo_block.classList.add('show_promo_block');
                }
                else {
                    promo_block.classList.remove('show_promo_block');
                }
            });
        })
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (key == 27) {
            if (overlay.classList.contains('overlay--active')) {
                //document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                overlay.classList.remove('overlay--active')
            }
        };
    }, false);

    if (modalClose) {
        modalClose.forEach((item) => {
            item.addEventListener('click', () => {
                console.log('close click');
                console.log(overlay);
                if (overlay.classList.contains('overlay--active')) {
                    console.log('overlay contains overla--active');
                    //document.body.classList.remove('scroll-disabled')
                    document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                    overlay.classList.remove('overlay--active')
                }
            });
        });
    }

    if(modalBtnClose){
        modalBtnClose.forEach((item) => {
            item.addEventListener('click', () => {
                console.log('close click');
                console.log(overlay);
                if (overlay.classList.contains('overlay--active')) {
                    console.log('overlay contains overla--active');
                    //document.body.classList.remove('scroll-disabled')
                    document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                    overlay.classList.remove('overlay--active')
                }
            });
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (overlay.classList.contains('overlay--active')) {
                //document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                overlay.classList.remove('overlay--active')
            }
        });
    }




    /*click moscow*/
    //citySelectItems[0].click();
    //input-dropdown__link city_item
    let cities =  document.querySelectorAll('.input-dropdown__link.city_item')
    if(cities.length > 0) {
        setTimeout(function () {
            cities[0].click();
        },500);

    }



    let payment_result = GetURLParameter('payment');
    console.log('payment-result='+payment_result);
    if(payment_result){
        if(payment_result === 'success'){
            document.getElementById('payment-success').classList.add('modal--active');
            if (!overlay.classList.contains('overlay--active')) {
                overlay.classList.add('overlay--active');
            }
        }
        if(payment_result === 'failure') {
            document.getElementById('payment-failure').classList.add('modal--active');
            if (!overlay.classList.contains('overlay--active')) {
                overlay.classList.add('overlay--active');
            }
        }
    }

    /*cookie bar*/
    let cookie_modal = document.getElementById('modal_cookie');
    let cookie_modal_close = document.getElementById('modal_cookie-close');
    if(!sessionStorage.getItem('cookie_info_seen')) {
        cookie_modal.classList.add('modal--active');
    }
    cookie_modal_close.addEventListener('click',function(event) {
        event.preventDefault();
        sessionStorage.setItem('cookie_info_seen',1);
        cookie_modal.classList.remove('modal--active');
    })



});



document.addEventListener('DOMContentLoaded', function () {
    let modal_count_get = document.getElementById('total_panel_button');
    if(modal_count_get){
        modal_count_get.addEventListener('click',function(e){
            document.getElementById('modal_count').classList.add('modal-count__hide');
        });
    }

    let modal_count = document.getElementById('modal_count');

    let scroll_func = function(){
        console.log(window.scrollY);
        let count_button = document.getElementById('total_wrapper');
        const top = count_button.scrollTop;

        if(window.scrollY > 2100 && (window.scrollY < count_button.offsetTop-880)){
            console.log('ONE');
            modal_count.classList.remove('modal-count__hide');
        }
        else if(window.scrollY > count_button.offsetTop-880 ) {
            console.log('TWO');
            modal_count.classList.add('modal-count__hide');
        }
        else {
            console.log('THREE');
            modal_count.classList.add('modal-count__hide');
        }
    };

    const debounce = (func, delay) => {
        let debounceTimer
        return function() {
            const context = this
            const args = arguments
            clearTimeout(debounceTimer)
            debounceTimer
                = setTimeout(() => func.apply(context, args), delay)
        }
    }




    window.addEventListener('scroll', debounce(function() {
        scroll_func();
    },10));
});



