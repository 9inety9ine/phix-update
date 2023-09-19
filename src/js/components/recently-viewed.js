const initRecentSlider = () => {
	const recentSwiper = new Swiper('.swiper-recent', {
		loop: false,
		spaceBetween: 12,
		slidesPerView: 2,
		allowTouchMove: true,
		navigation: {
			nextEl: '.recent-nav--next',
			prevEl: '.recent-nav--prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
				spaceBetween: 12,
			},
			1024: {
				slidesPerView: 6,
				spaceBetween: 12,
			},
			1440: {
				slidesPerView: 6,
				spaceBetween: 12,
			},
		},
	});
};

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
			productList += `<div class="swiper-slide">${productCard}</div>`;
		}
	}
	return productList;
};

window.addEventListener('DOMContentLoaded', () => {
	const recentProductcontainer = document.querySelector('.recent-products');
	if (recentProductcontainer) {
		recentProductcontainer.innerHTML = '';
		let productsExist = false;
		getRecentProductCards()
			.then(productList => {
				if (productList.length == 0) {
					document.querySelector('.section-recently-viewed').classList.add('hidden');
				} else {
					recentProductcontainer.innerHTML = productList;
					productsExist = true;
				}
			})
			.then(() => {
				initRecentSlider();
				window.initializeImageLoad();
			})
			.finally(() => {
				if (productsExist) document.querySelector('.section-recently-viewed').classList.remove('hidden');
				addToLocalItems('recent_phix_products', localProductHandle, 12);
			});
	}
});

const clearRecentButton = document.querySelector('.clear-recent');
const recentElement = document.querySelector('.section-recently-viewed');
if (clearRecentButton && recentElement)
	clearRecentButton.addEventListener('click', e => {
		e.preventDefault();
		localStorage.removeItem('recent_phix_products');
		recentElement.style.display = 'none';
	});

// console.log(getLocalItems('recent_phix_products'));
