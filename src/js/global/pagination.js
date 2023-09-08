import 'regenerator-runtime/runtime';

const loadMore = document.getElementById('load-more');

if (loadMore) {
	let currentPage = 1;
	let activeLocation = window.location.origin + window.location.pathname;
	let newLocation = ``;
	const collectionContainer = document.getElementById('products');

	// products per page
	let productsPerPage = 8;
	let productsPerPageEl = document.getElementById('products-per-page');
	if (productsPerPageEl) {
		productsPerPage = Number(productsPerPageEl.textContent);
	}

	// total products
	let totalProducts = 16;
	let totalProductsEl = document.getElementById('total-products');
	if (totalProductsEl) {
		totalProducts = Number(totalProductsEl.textContent);
	}

	let totalPages = 1;
	totalPages = Math.ceil(totalProducts / productsPerPage);

	const getCurrentPage = function () {
		let paramCheck = window.location.search;
		if (paramCheck) {
			const urlParams = new URLSearchParams(paramCheck);
			const params = urlParams.entries();
			for (let param of params) {
				if (param[0] === 'page') {
					currentPage = param[1];
				} else {
					currentPage = 1;
				}
			}
		}
		return currentPage;
	};
	getCurrentPage();

	const toggleButton = function () {
		if (loadMore) {
			totalPages > 1 && currentPage < totalPages ? loadMore.classList.remove('hidden') : loadMore.classList.add('hidden');
		}
	};

	const checkParams = function () {
		let paramCheck = window.location.search;
		const urlParams = new URLSearchParams(paramCheck);
		const params = urlParams.entries();
		if (params) {
			let newParams = `?`;
			for (let param of params) {
				if (param[0] !== 'page') {
					newParams += `&${param[0]}=${param[1].replace('%20', '+').replace(' ', '+').replace('&', '%26')}`;
				}
			}
			newLocation = ``;
			newParams += `&page=${currentPage}`;
			newLocation += newParams;
		} else {
			newLocation = ``;
			newLocation += `?&page=${currentPage}`;
		}
		history.replaceState(null, '', activeLocation + newLocation);
	};

	const fetchResults = function () {
		loadMore.parentNode.classList.add('loading');
		checkParams();
		let newParams = newLocation;
		let productCards = '';
		fetch(activeLocation + newParams)
			.then(function (response) {
				return response.text();
			})
			.then(function (html) {
				if (html.indexOf('<!--[product-cards]-->') > 0) {
					productCards = html.split('<!--[product-cards]-->').pop().split('<!--[/product-cards]-->')[0];
				} else {
					collectionContainer.innerHTML = '<p>Nothing here...</p>';
				}
				collectionContainer.innerHTML += productCards;
				window.initProductCardSliders();
				setTimeout(() => {
					window.initializeImageLoad();
				}, 500);
				toggleButton();
			})
			.finally(function () {
				loadMore.parentNode.classList.remove('loading');
			});
	};

	if (currentPage > 1) {
		let pageCount = 1;
		let url = window.location.search;
		let urlParams = new URLSearchParams(url);
		if (urlParams) {
			var newParams = `?`;
			for (let param of urlParams) {
				if (param[0] !== 'page') {
					newParams += `&${param[0]}=${param[1].replace('%20', '+').replace(' ', '+').replace('&', '%26')}`;
				}
			}
		}
		let productCards = '';
		collectionContainer.innerHTML = '';

		async function fetchProducts() {
			while (pageCount <= currentPage) {
				const response = await fetch(activeLocation + newParams + `&page=` + pageCount);
				const text = await response.text();
				if (text.indexOf('<!--[product-cards]-->') > 0) {
					productCards = text.split('<!--[product-cards]-->').pop().split('<!--[/product-cards]-->')[0];
				} else {
					collectionContainer.innerHTML = '<p>Nothing here...</p>';
				}
				collectionContainer.innerHTML += productCards;
				pageCount++;
			}
		}

		fetchProducts().then(() => {
			window.initProductCardSliders();
			setTimeout(() => {
				window.initializeImageLoad();
			}, 500);
			toggleButton();
		});
	}

	window.setTimeout(() => {
		var observer = new IntersectionObserver(
			function (entries) {
				if (entries[0].isIntersecting === true) {
					if (totalPages > Number(currentPage)) {
						currentPage++;
						fetchResults();
					}
				}
			},
			{ threshold: [1] }
		);
		observer.observe(loadMore);
	}, 1500);
}
