const getLocalItems = name => {
	const newData = [];
	const storedData = JSON.parse(localStorage.getItem(name));
	if (storedData !== null)
		storedData.forEach(data => {
			newData.push(data);
		});
	return newData;
};

const addToLocalItems = (name, entry, cutoff) => {
	const storedData = getLocalItems(name);
	if ((storedData !== null || storedData.length > 0) && storedData.includes(entry)) return;
	storedData.push(entry);
	while (storedData.length > cutoff) {
		storedData.splice(0, 1);
	}
	localStorage.setItem(name, JSON.stringify(storedData));
};

const removeFromLocalItems = (name, entry) => {
	const storedData = getLocalItems(name);
	const targetIndex = storedData.indexOf(entry);
	storedData.splice(targetIndex, 1);
	localStorage.setItem(name, JSON.stringify(storedData));
};

const recentProductsToShow = getLocalItems('recent_phix_products');

const getRecentProductCards = async () => {
	let productList = '';
	for (let recent of Array.from(recentProductsToShow).reverse()) {
		let response = await fetch(window.Shopify.routes.root + 'products/' + recent + '?view=product-card-small');
		if (response.status == 404) {
			removeFromLocalItems('recent_phix_products', recent);
			continue;
		}
		let product = await response.text();
		if (product.indexOf('<!--[product-card]-->') > 0) {
			const productCard = product.split('<!--[product-card]-->').pop().split('<!--[/product-card]-->')[0];
			productList += `<li>${productCard}</li>`;
		}
	}
	return productList;
};

window.addEventListener('DOMContentLoaded', () => {
	const recentProductcontainer = document.querySelector('.recent-products');
	if (recentProductcontainer) {
		getRecentProductCards()
			.then(productList => {
				if (productList.length == 0) {
					const recentElement = document.querySelector('.section-recently-viewed');
					if (recentElement) recentElement.style.display = 'none';
				} else {
					recentProductcontainer.innerHTML = productList;
				}
			})
			.finally(() => {
				window.initializeImageLoad();
				window.initProductCardSliders();
			});
	}
	addToLocalItems('recent_phix_products', localProductHandle, 6);
});

// console.log(getLocalItems('recent_phix_products'));
