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

    // Update the title and description based on the current slide
    $('.video-carousel').on('afterChange', function(event, slick, currentSlide){
        const currentSlideElement = $('.video-carousel .slick-slide[data-slick-index="' + currentSlide + '"]');
        const currentTitle = currentSlideElement.data('title');
        const currentDescription = currentSlideElement.data('description');
        $('#video-title').text(currentTitle); // Update the video title
        $('#video-description').text(currentDescription); // Update the video description
    });
});
