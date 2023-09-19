const announcementSlider = document.querySelector('.swiper-announcements');
if (announcementSlider) {
	const swiper_announcements = new Swiper('.swiper-announcements', {
		speed: 500,
		spaceBetween: 0,
		loop: true,
		slidesPerView: 1,
		init: false,
		crossFade: true,
		effect: 'fade',
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
	});
	announcementSlider.addEventListener('mouseover', () => {
		swiper_announcements.autoplay.stop();
	});
	announcementSlider.addEventListener('mouseleave', () => {
		swiper_announcements.autoplay.start();
	});
	const regionalAnnouncements = document.querySelectorAll('.swiper-slide-regional');
	if (regionalAnnouncements) {
		if (client_country !== undefined && client_continent !== undefined) {
			for (let announcement of regionalAnnouncements) {
				const region = announcement.dataset.region;
				const code = announcement.dataset.code.replaceAll(' ', '').split(',');
				// console.log(region);
				let match = false;
				if (region === 'country') {
					for (let i = 0; i < code.length; i++) {
						if (client_country === code[i]) {
							match = true;
							continue;
						}
					}
				}
				if (region === 'continent') {
					for (let i = 0; i < code.length; i++) {
						if (client_continent === code[i]) {
							match = true;
							continue;
						}
					}
				}
				if (match === false) announcement.remove();
			}
		}
	}
	const globalAnnouncements = document.querySelectorAll('.swiper-slide-global');
	if (globalAnnouncements) {
		if (client_country !== undefined && client_continent !== undefined) {
			for (let announcement of globalAnnouncements) {
				const region = announcement.dataset.region;
				const code = announcement.dataset.code;
				let match = false;
				if (region && code) {
					const codeArray = code.replaceAll(' ', '').split(',');
					if (region === 'country') {
						for (let i = 0; i < codeArray.length; i++) {
							if (client_country === codeArray[i]) {
								match = true;
								continue;
							}
						}
					}
					if (region === 'continent') {
						for (let i = 0; i < codeArray.length; i++) {
							if (client_continent === codeArray[i]) {
								match = true;
								continue;
							}
						}
					}
				}
				if (match === true) announcement.remove();
			}
		}
	}
	swiper_announcements.init();
}
