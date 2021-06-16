const prevArrow= "<button class=\"prevButton\" type=\"button\"><img src=\"img/arrow.png\"></button>"
const nextArrow = "<button class=\"nextButton\" type=\"button\"><img src=\"img/arrow.png\"></button>"

$(window).load(function() {
    var phones = [{ "mask": "+7(###)###-##-##"}, { "mask": "+7(###)###-##-##"}];
    $('.requestForCall-phone').inputmask({
        mask: phones,
        greedy: false,
        definitions: { '#': { validator: "[0-9]", cardinality: 1}} });

        AOS.init();
});

$('.header-brick').hide();
$('.header-brick:first').show();
$('.header-navbar button:first').addClass('active');
function toggleTabs(nthchild) {
    $('.header-navbar button').removeClass('active');
    $(`.header-navbar button:nth-child(${nthchild})`).addClass('active');
    $('.header-brick').hide();
    $(`.header-bricksWrapper div:nth-child(${nthchild})`).fadeIn();
}

$('.main-slider').owlCarousel({
    nav: true,
    loop: true,
    margin: 9,
    navText: [prevArrow, nextArrow],
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 6000,
    responsive : {
        279 : {
            items: 1,
        },
        540 : {
            items: 2,
        },
        769 : {
            items: 5,
        },
    }
});

function openMenu() {
    document.getElementById('burgerButton').classList.toggle('open');
    document.getElementById('contact').classList.toggle('open');
}