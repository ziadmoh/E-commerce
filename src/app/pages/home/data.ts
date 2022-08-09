import { sliderOpt } from 'src/app/shared/data';

export const introSlider = {
    ...sliderOpt,
    nav: false,
    loop: true,
    autoplay: false,
    autoplayTimeout: 6000
}

export const brandSlider = {
    ...sliderOpt,
    nav: false,
    dots: false,
    margin: 0,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1024: {
            items: 6
        },
        1360: {
            items: 7,
            nav: true,
            dots: true
        }
    }
}

export const specialSlider = {
    ...sliderOpt,
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        },
        1600: {
            items: 6,
            nav: true
        }
    }
}

