const togglecollection = document.querySelector('.toggle-collection-drawer');
if (togglecollection) {
	togglecollection.addEventListener('click', function (event) {
		event.preventDefault();
		toggleDrawer('collection', false);
	});
}

const productList = document.getElementById('products');
const toggleSingle = document.querySelector('.collection-view-toggle--single');
const toggleMulti = document.querySelector('.collection-view-toggle--multi');

window.chooseLayout = function () {
	const customerPreference = window.getCookie('collection_view');
	if (customerPreference && customerPreference == 'single') {
		toggleSingle.classList.add('active');
		toggleMulti.classList.remove('active');
		productList.classList.add('single');
	} else {
		toggleSingle.classList.remove('active');
		toggleMulti.classList.add('active');
		productList.classList.remove('single');
	}
};
window.addEventListener('DOMContentLoaded', () => {
	window.chooseLayout();
});

if (toggleSingle)
	toggleSingle.addEventListener('click', function () {
		window.setCookie('collection_view', 'single', 7);
		window.chooseLayout();
	});

if (toggleMulti)
	toggleMulti.addEventListener('click', function () {
		window.setCookie('collection_view', 'multi', 7);
		window.chooseLayout();
	});
