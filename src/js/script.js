'use strict';
// сторонние из npm пакетов, pure.css
// import "purecss/build/grids-min.css"; // мы берем не из Npm пакету уже, а из локальных папок Libs т.к. мы перенесли для нормальной натсройки промежутков media 1024 и 1200. Далее удалили Purecss из проекта за ненадобностью, т.к. перенесли нужные файлы из node modules -> purecss -> dist -> grids-min.css / grids-responsive-min.css которые мы использовали в проекте, и так-же просто подключили их в style.scss
// import "purecss/build/grids-responsive-min.css";

// мои файлики
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import JustValidate from 'just-validate';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "/src/sass/style.scss";

// burger menu
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
        headerMenu = document.querySelector('.header__menu'),
        closeHeaderMenu = document.querySelector('.header__menu-close');

    burger.addEventListener('click', () => {
        headerMenu.classList.add('header__menu_active');
        document.body.style.overflow = 'hidden'
    });
    closeHeaderMenu.addEventListener('click', () => {
        headerMenu.classList.remove('header__menu_active');
        document.body.style.overflow = ''
    });

    // slider

    try {
        new Swiper('.works__slider', {
            slidesPerView: 1,
            spaceBetween: 5,
            loop: true,
            centeredSlides: true,
            navigation: {
                nextEl: ".icon-right-open",
                prevEl: ".icon-left-open",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            breakpoints: {
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                },
                1920: {
                    spaceBetween: 35,
                },
            },
            modules: [Navigation, Pagination],
        });

    } catch (e) { }

    // tabs

    try {

        const tabs = document.querySelector('.catalog__tabs'),
            tab = tabs.querySelectorAll('.catalog__tab'),
            catalogContent = document.querySelector('.catalog__content'),
            content = catalogContent.querySelectorAll('.catalog__content-item');

        function hideTabContent() {
            tab.forEach(item => {
                item.classList.add('catalog__tab_hide');
                item.classList.remove('catalog__tab_active');
            });
            content.forEach(item => {
                item.classList.add('catalog__content-item_hide');
                item.classList.remove('catalog__content-item_active');
            });
        }

        function showTabContent(i = 0) {
            tab[i].classList.add('catalog__tab_active');
            tab[i].classList.remove('catalog__tab_hide');
            content[i].classList.add('catalog__content-item_active');
            content[i].classList.remove('catalog__content-item_hide');
        }

        hideTabContent();
        showTabContent();

        tabs.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('catalog__tab')) {
                tab.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    } catch (e) { }
    // форма
    try {
        const validator = new JustValidate('form');
        validator
            .addField('#name', [
                {
                    rule: 'required',
                    errorMessage: 'Please fill the name',
                },
                {
                    rule: 'minLength',
                    value: 2,
                    errorMessage: 'Minimum 2 char',
                },
            ])
            .addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'Please fill the email',
                },
                {
                    rule: 'email',
                    errorMessage: 'Please fill the right email',
                },
            ])
            .addField('#question', [
                {
                    rule: 'required',
                    errorMessage: 'Please write your question',
                },
                {
                    rule: 'minLength',
                    value: 10,
                    errorMessage: 'minimum 10 char',
                },
            ], {
                errorsContainer: document.querySelector('#question').parentElement.querySelector('.error-message'),
            })
            .addField('#checkbox', [
                {
                    rule: 'required',
                    errorMessage: 'Checkbox is not checked',
                },
            ], {
                errorsContainer: document.querySelector('#checkbox').parentElement.parentElement.querySelector('.checkbox-error-message'),
            })
            // рабочий шаблон обычного скрипта запроса на сервер с выводом данных в консоль
            // .onSuccess((event) => {
            //     const form = event.currentTarget;
            //     const formData = new FormData(form);

            //     fetch('https://httpbin.org/post', {
            //         method: 'POST',
            //         body: formData,
            //     })
            //         .then(res => res.json())
            //         .then(data => {
            //             console.log('Success', data);
            //             form.reset();
            //         });
            // });
            .onSuccess((event) => {
                (function () {
                    emailjs.init({
                        publicKey: "sb9YVPgGaoSpyQ2kj",
                    });
                })();
                const form = event.currentTarget;

                emailjs.sendForm('service_lmfzgk5', 'template_cg6degm', form)
                    .then(function () {
                        console.log('SUCCESS!');
                        form.reset();
                        showModal();
                    }, function (error) {
                        console.log('FAILED...', error);
                        alert('Ошибка отправки: ' + JSON.stringify(error));
                    });
            });
        function showModal() {
            const modal = document.querySelector('.git__modal'),
                close = document.querySelector('.git__modal-close');

            modal.classList.add('git__modal_active');
            document.body.style.overflow = 'hidden';
            close.addEventListener('click', (e) => {
                modal.classList.remove('git__modal_active');
                document.body.style.overflow = '';
            });
        }
    } catch (e) { }
    try {
        const footer__validator = new JustValidate('.footer__form');
        footer__validator
            .addField('#footer__email', [
                {
                    rule: 'required',
                    errorMessage: 'Please fill the email',
                },
                {
                    rule: 'email',
                    errorMessage: 'Please fill the right email',
                },
            ], {
                errorsContainer: document.querySelector('#footer__email').parentElement.querySelector('.email-error-message'),
            })
            .addField('#footer__checkbox', [
                {
                    rule: 'required',
                    errorMessage: 'Checkbox is not checked',
                },
            ], {
                errorsContainer: document.querySelector('#footer__checkbox').parentElement.parentElement.querySelector('.checkbox-error-message'),
            })
            .onSuccess((event) => {
                event.currentTarget.submit();
            });
    } catch (e) { }
    try {
        const btns = document.querySelectorAll('.btn-read');
        btns.forEach(button => {
            button.addEventListener('click', (event) => {
                const card = button.closest('.blog__card'),
                    textShort = card.querySelector('.blog__card__text'),
                    textMax = card.querySelector('.blog__card__text-max');
                textShort.classList.toggle('hide');
                textMax.classList.toggle('active');
                if (textMax.classList.contains('active')) {
                    button.textContent = 'collapse';
                } else {
                    button.textContent = 'read';
                }
            });
        });
    } catch (e) { }
});
