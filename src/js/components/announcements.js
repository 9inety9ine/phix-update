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
				const condition = announcement.dataset.condition;
				const code = announcement.dataset.code;
				if (region === 'country') {
					if (client_country === code) {
						if (condition !== 'equals') announcement.remove();
					} else {
						if (condition !== 'does_not_equal') announcement.remove();
					}
				} else {
					if (client_continent === code) {
						if (condition !== 'equals') announcement.remove();
					} else {
						if (condition !== 'does_not_equal') announcement.remove();
					}
				}
			}
		} else {
			for (let announcement of regionalAnnouncements) announcement.remove();
		}
		swiper_announcements.init();
	}
}
