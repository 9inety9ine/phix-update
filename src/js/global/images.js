window.initializeImageLoad = function () {
	let imagesToLoad = document.querySelectorAll('img[data-src]');
	if (imagesToLoad) {
		const loadImages = image => {
			image.setAttribute('src', image.getAttribute('data-src'));
			image.onload = () => {
				image.removeAttribute('data-src');
				image.classList.remove('preload');
				image.parentNode.classList.remove('preload');
				image.parentNode.parentNode.classList.remove('preload');
				image.parentNode.parentNode.parentNode.classList.remove('preload');
			};
		};
		if ('IntersectionObserver' in window) {
			const observer = new IntersectionObserver((items, observer) => {
				items.forEach(item => {
					if (item.isIntersecting) {
						loadImages(item.target);
						observer.unobserve(item.target);
					}
				});
			});
			imagesToLoad.forEach(img => {
				observer.observe(img);
			});
		} else {
			imagesToLoad.forEach(img => {
				loadImages(img);
			});
		}
	}
};
window.initializeImageLoad();
