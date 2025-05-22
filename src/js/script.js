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

try {
    new Swiper('.works__slider', {
        slidesPerView: 1,
        spaceBetween: 5,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
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
} catch (e) {

}

