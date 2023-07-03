const siteHeader = document.getElementById('shopify-section-header');
const productSection = document.querySelector('.section-product');
const productWrapper = productSection.querySelector('.wrap');
const breadcrumbs = productWrapper.querySelector('.breadcrumbs');
const productDetails = document.querySelector('.section-product__container');

window.heightFromTop = function (width) {
	if (width >= 768) {
		// let windowHeight = window.innerHeight;
		// // console.log('Window:', windowHeight);
		// let productDetailsHeight = productDetails.offsetHeight;
		// // console.log('Details:', productDetailsHeight);
		// let headerHeight = siteHeader.offsetHeight;
		// let breadcrumbsHeight = breadcrumbs.offsetHeight;
		// let wrapperPadding = window.getComputedStyle(productWrapper, null).getPropertyValue('padding-top');
		// let wrapperPaddingValue = Number(wrapperPadding.replace('px', ''));
		// let combinedTopElementsTotal = headerHeight + breadcrumbsHeight + wrapperPaddingValue;
		// let ViewableArea = windowHeight - combinedTopElementsTotal;
		// // console.log('View:', ViewableArea);
		// if (ViewableArea < productDetailsHeight) {
		// 	let difference = productDetailsHeight - ViewableArea;
		// 	console.log(difference);
		// 	productDetails.style.top = 'sticky';
		// 	productDetails.style.position = difference + 'px';
		// } else {
		// 	productDetails.style.top = combinedTopElementsTotal + 'px';
		// 	productDetails.style.position = 'sticky';
		// }
		// 	let windowHeight = window.innerHeight;
		// 	let productDetailsHeight = productDetails.offsetHeight;
		// 	let headerHeight = siteHeader.offsetHeight;
		// 	let breadcrumbsHeight = breadcrumbs.offsetHeight;
		// 	let wrapperPadding = window.getComputedStyle(productWrapper, null).getPropertyValue('padding-top');
		// 	let wrapperPaddingValue = Number(wrapperPadding.replace('px', ''));
		// 	let totalValue = 0;
		// 	let combinedValue = headerHeight + breadcrumbsHeight + wrapperPaddingValue;
		// 	let difference = windowHeight - combinedValue;
		// 	if (difference < productDetailsHeight) {
		// 		console.log('details taller');
		// 		console.log('Window:', windowHeight - combinedValue);
		// 		console.log('Details:', productDetailsHeight);
		// 		totalValue = productDetailsHeight - windowHeight;
		// 		productDetails.style.top = `${totalValue}px`;
		// 		console.log(`-${totalValue}px`);
		// 		productDetails.style.position = 'sticky';
		// 	}
		// 	if (difference >= productDetailsHeight) {
		// 		console.log('details shorter');
		// 		totalValue = combinedValue;
		// 		console.log(totalValue);
		// 		productDetails.style.top = totalValue + 'px';
		// 		productDetails.style.position = 'sticky';
		// 	}
	} else {
		// 	productDetails.style.position = 'relative';
		// 	productDetails.style.top = 'auto';
	}
};

window.addEventListener('DOMContentLoaded', function () {
	window.heightFromTop(window.innerWidth);
});
window.addEventListener('resize', function () {
	window.heightFromTop(window.innerWidth);
});
window.addEventListener('scroll', function () {
	window.heightFromTop(window.innerWidth);
});

window.addEventListener('DOMContentLoaded', () => {
	fetch('https://api.ipgeolocation.io/ipgeo?apiKey=4c105c5b2432429894c5cbebca414688&fields=country_code2,continent_code')
		.then(response => {
			return response.json();
		})
		.then(geo => {
			// console.log(geo);
			const country = geo.country_code2;
			const continent = geo.continent_code;
			// console.log(country);
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
		});
});
