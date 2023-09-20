window.initializeImageLoad = function () {
	let imagesToLoad = document.querySelectorAll('img[data-src]');
	if (imagesToLoad) {
		const loadImages = image => {
			const imageSRC = image.getAttribute('data-src');
			if (imageSRC) {
				image.setAttribute('src', imageSRC);
				image.onload = () => {
					image.removeAttribute('data-src');
					image.classList.remove('preload');
					image.parentNode.classList.remove('preload');
					image.parentNode.parentNode.classList.remove('preload');
					image.parentNode.parentNode.parentNode.classList.remove('preload');
					image.parentNode.parentNode.parentNode.parentNode.classList.remove('preload');
					image.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove('preload');
					image.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove('preload');
				};
			}
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
	let videosToLoad = document.querySelectorAll('video[data-src]');
	if (videosToLoad) {
		const loadVideos = video => {
			const videoSRC = video.getAttribute('data-src');
			if (videoSRC) {
				const videoSource = video.querySelector('source');
				videoSource.setAttribute('src', videoSRC);
				video.load();
				video.onloadstart = () => {
					video.removeAttribute('data-src');
					video.classList.remove('preload');
					video.parentNode.classList.remove('preload');
					video.parentNode.parentNode.classList.remove('preload');
					video.parentNode.parentNode.parentNode.classList.remove('preload');
				};
			}
		};
		if ('IntersectionObserver' in window) {
			const video_observer = new IntersectionObserver((items, video_observer) => {
				items.forEach(item => {
					if (item.isIntersecting) {
						loadVideos(item.target);
						video_observer.unobserve(item.target);
					}
				});
			});
			videosToLoad.forEach(video => {
				video_observer.observe(video);
			});
		} else {
			videosToLoad.forEach(video => {
				loadImages(video);
			});
		}
	}
};
window.addEventListener('DOMContentLoaded', window.initializeImageLoad);
