const swiper_announcements = new Swiper('.swiper-announcements', {
	speed: 1000,
	spaceBetween: 0,
	loop: true,
	slidesPerView: 1,
	init: false,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.announcements__button--next',
		prevEl: '.announcements__button--prev',
	},
});

const regionalAnnouncements = document.querySelectorAll('.swiper-slide-regional');
if (regionalAnnouncements) {
	let client_country = undefined;
	let client_continent = undefined;
	fetch('https://api.ipgeolocation.io/ipgeo?apiKey=4c105c5b2432429894c5cbebca414688&fields=country_code2,continent_code')
		.then(response => {
			return response.json();
		})
		.then(geo => {
			client_country = geo.country_code2;
			client_continent = geo.continent_code;
			console.log(client_continent, client_country);
			// check for valid announcements
			for (let announcement of regionalAnnouncements) {
				const region = announcement.dataset.region;
				const condition = announcement.dataset.condition;
				const code = announcement.dataset.code;
				console.log(region, condition, code);
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
		})
		.finally(() => {
			swiper_announcements.init();
		});
}
