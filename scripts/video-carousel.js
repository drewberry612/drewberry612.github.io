$(document).ready(function(){
    $('.video-carousel').slick({
        arrows: true, // Enable custom arrows
        dots: false,  // Disable numbered dots
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>'
    });

    // Update the title based on the current slide
    $('.video-carousel').on('afterChange', function(event, slick, currentSlide){
        const currentTitle = $('.video-carousel .slick-slide[data-slick-index="' + currentSlide + '"]').data('title');
        $('#video-title').text(currentTitle);
    });
});
