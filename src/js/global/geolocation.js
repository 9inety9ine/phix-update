const toggleCountryMessages = country => {
	const country_messages = document.querySelectorAll('.country-message');
	if (country_messages) {
		for (let message of country_messages) {
			let target = message.dataset.code;
			let condition = message.dataset.condition;
			if (target === country && condition === 'equals') message.classList.remove('hidden');
			if (target === country && condition === 'does_not_equal') message.classList.add('hidden');
			if (target !== country && condition === 'does_not_equal') message.classList.remove('hidden');
		}
	}
};

const toggleContinentMessages = continent => {
	const continent_messages = document.querySelectorAll('.continent-message');
	if (continent_messages) {
		for (let message of continent_messages) {
			let target = message.dataset.code;
			let condition = message.dataset.condition;
			if (target === continent && condition === 'equals') message.classList.remove('hidden');
			if (target === continent && condition === 'does_not_equal') message.classList.add('hidden');
			if (target !== continent && condition === 'does_not_equal') message.classList.remove('hidden');
		}
	}
};

window.addEventListener('DOMContentLoaded', () => {
	fetch('https://api.ipgeolocation.io/ipgeo?apiKey=4c105c5b2432429894c5cbebca414688&fields=country_code2,continent_code')
		.then(response => {
			return response.json();
		})
		.then(geo => {
			const country = geo.country_code2;
			const continent = geo.continent_code;
			toggleCountryMessages(country);
			toggleContinentMessages(continent);
		});
});
