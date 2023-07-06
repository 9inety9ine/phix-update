const siteHeader = document.getElementById('shopify-section-header');
const productSection = document.querySelector('.section-product');
const productWrapper = productSection.querySelector('.wrap');
const breadcrumbs = productWrapper.querySelector('.breadcrumbs');
const productDetails = document.querySelector('.section-product__container');

window.heightFromTop = function (width) {
	if (width >= 768) {
		let windowHeight = window.innerHeight;
		let productDetailsHeight = productDetails.offsetHeight;
		let headerHeight = siteHeader.offsetHeight;
		let breadcrumbsHeight = breadcrumbs.offsetHeight;
		let wrapperPadding = window.getComputedStyle(productWrapper, null).getPropertyValue('padding-top');
		let wrapperPaddingValue = Number(wrapperPadding.replace('px', ''));
		let combinedTopElementsTotal = headerHeight + breadcrumbsHeight + wrapperPaddingValue;
		let ViewableArea = windowHeight - combinedTopElementsTotal;
		if (ViewableArea > productDetailsHeight) {
			productDetails.style.top = combinedTopElementsTotal + 'px';
		} else {
			let difference = productDetailsHeight - ViewableArea;
			let positionResult = combinedTopElementsTotal - difference;
			productDetails.style.top = positionResult + 'px';
		}
		productDetails.style.position = 'sticky';
	} else {
		productDetails.style.position = 'relative';
		productDetails.style.top = 'auto';
	}
};

window.addEventListener('DOMContentLoaded', function () {
	window.heightFromTop(window.innerWidth);
	Fancybox.bind('[data-fancybox="gallery"]', {
		Thumbs: false,
		Toolbar: false,
	});
});
window.addEventListener('resize', function () {
	window.heightFromTop(window.innerWidth);
});
window.addEventListener('scroll', function () {
	window.heightFromTop(window.innerWidth);
});

const modalToggle = document.querySelector('.toggle-size-modal');
if (modalToggle)
	modalToggle.addEventListener('click', e => {
		e.preventDefault();
		const docBody = document.querySelector('body');
		docBody.classList.toggle('size-modal-open');
	});

const sizeModal = document.querySelector('.section-product__modal__mask');
if (sizeModal)
	sizeModal.addEventListener('click', e => {
		e.preventDefault();
		const docBody = document.querySelector('body');
		docBody.classList.toggle('size-modal-open');
	});
