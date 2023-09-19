let client_country = undefined;
let client_continent = undefined;

fetch('https://api.ipgeolocation.io/ipgeo?apiKey=4c105c5b2432429894c5cbebca414688&fields=country_code2,continent_code')
	.then(response => {
		return response.json();
	})
	.then(geo => {
		client_country = geo.country_code2;
		client_continent = geo.continent_code;
		if (client_continent !== undefined || client_country !== undefined) {
			// console.log('Continent:', client_continent);
			// console.log('Country:', client_country);
		} else {
			console.log('Geolocation lookup failed.');
		}
	})
	.catch(error => {
		console.log(error);
	});
