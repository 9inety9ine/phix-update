const swiper_cart = new Swiper('.swiper-recommended', {
	speed: 1000,
	spaceBetween: 0,
	loop: false,
	slidesPerView: 1.5,
	centeredSlides: true,
	init: false,
});
window.cart_drawer_recommendations = function () {
	swiper_cart.init();
};
