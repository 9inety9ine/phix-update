const targetElement = document.getElementById('trustpilot-reviews');
const targetElementWrapper = document.querySelector('.section-product__details');

const swiper_reviews = new Swiper('.swiper-reviews', {
	speed: 1000,
	spaceBetween: 0,
	loop: true,
	slidesPerView: 2,
	centeredSlides: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	init: false,
});

fetch(window.Shopify.routes.root + 'pages/contact-us?view=trustpilot')
	.then(function (response) {
		return response.text();
	})
	.then(function (html) {
		let reviewContent = '';
		if (html.indexOf('<!--[reviews]-->') > 0) {
			reviewContent = html.split('<!--[reviews]-->').pop().split('<!--[/reviews]-->')[0];
			targetElement.innerHTML = reviewContent;
		} else {
			return;
		}
	})
	.finally(function () {
		swiper_reviews.init();
		window.heightFromTop(window.innerWidth);
	})
	.catch(function (err) {
		console.error(err);
	});
