'use strict';
// сторонние из npm пакетов, pure.css
// import "purecss/build/grids-min.css"; // мы берем не из Npm пакету уже, а из локальных папок Libs т.к. мы перенесли для нормальной натсройки промежутков media 1024 и 1200. Далее удалили Purecss из проекта за ненадобностью, т.к. перенесли нужные файлы из node modules -> purecss -> dist -> grids-min.css / grids-responsive-min.css которые мы использовали в проекте, и так-же просто подключили их в style.scss
// import "purecss/build/grids-responsive-min.css";

// мои файлики
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

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
});
