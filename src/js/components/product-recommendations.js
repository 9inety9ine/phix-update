window.flickity_product_slider_recommendations = function () {
	let tickerSpeed = 1.25;

	if (window.innerWidth <= 768) {
		tickerSpeed = 1.5;
	}

	let flickity = null;
	let isPaused = false;
	const slideshowEl = document.querySelector('.product-slider-recommendations');

	const update = () => {
		if (isPaused) return;
		if (flickity.slides) {
			flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
			flickity.selectedIndex = flickity.dragEndRestingSelect();
			flickity.updateSelectedSlide();
			flickity.settle(flickity.x);
		}
		window.requestAnimationFrame(update);
	};

	const pause = () => {
		isPaused = true;
	};

	const play = () => {
		if (isPaused) {
			isPaused = false;
			window.requestAnimationFrame(update);
		}
	};

	flickity = new Flickity(slideshowEl, {
		autoPlay: false,
		prevNextButtons: false,
		pageDots: false,
		draggable: true,
		wrapAround: true,
		selectedAttraction: 0.015,
		friction: 0.25,
	});

	flickity.x = 0;

	// slideshowEl.addEventListener('mouseenter', pause, false);
	// slideshowEl.addEventListener('focusin', pause, false);
	slideshowEl.addEventListener('mouseleave', play, false);
	slideshowEl.addEventListener('focusout', play, false);

	flickity.on('dragStart', () => {
		isPaused = true;
	});

	update();

	window.initializeImageLoad();
};
