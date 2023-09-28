const deliveryMessaging = document.querySelector('.section-delivery-messaging');
if (deliveryMessaging) {
	// console.log(client_continent, client_country);
	if (client_country !== undefined && client_continent !== undefined) {
		if (client_country === 'US' || (client_continent === 'EU' && client_country !== 'GB')) {
			deliveryMessaging.classList.remove('hidden');
		} else {
			deliveryMessaging.classList.add('hidden');
		}
	}
}
