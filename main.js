const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-items");
hamburger.addEventListener("click", event => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});


const newsletterButton = document.querySelectorAll(".newsletter");
const modal = document.querySelector(".modal");
newsletterButton.forEach(button => {
    button.addEventListener("click", event => {
        modal.classList.add("show");
    });
});


const close = document.querySelector(".close");
close.addEventListener("click", event => {
    modal.classList.remove("show");
})


const accordions = document.querySelectorAll(".accordions .title");
accordions.forEach(accordion => {
    accordion.addEventListener("click", () => {
        accordion.classList.toggle("active");
        if (accordion.nextElementSibling) {
            accordion.nextElementSibling.classList.toggle("active");
        }
    });
});

function updateCarousel() {
    var swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
        960: {
        slidesPerView: 3,
        spaceBetween: 30,
        },
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
});
}

updateCarousel();