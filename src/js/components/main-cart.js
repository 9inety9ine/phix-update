const checkPreorder = () => {
	let hasPreorder = false;
	fetch(window.Shopify.routes.root + 'cart.js')
		.then(response => {
			return response.json();
		})
		.then(cart => {
			for (const item of cart.items) {
				if (item.properties) {
					let obj = item.properties;
					let objItems = Object.entries(obj);
					for (const entry of objItems) {
						// console.log(entry[0]);
						if (entry[0] == 'Preorder Note') {
							hasPreorder = true;
						}
					}
				}
			}
		})
		.finally(() => {
			const cartWarning = document.querySelector('.preorder-warning');
			if (hasPreorder === true) {
				cartWarning.classList.add('active');
			} else {
				cartWarning.classList.remove('active');
			}
		});
};
checkPreorder();
