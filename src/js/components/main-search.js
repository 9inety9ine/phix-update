const togglecollection = document.querySelector('.toggle-search-drawer');
if (togglecollection) {
	togglecollection.addEventListener('click', function (event) {
		event.preventDefault();
		toggleDrawer('search-filters', false);
	});
}

const filterForm = document.getElementById('search-filter-form');
if (filterForm) {
	const applyfilterButtons = filterForm.querySelectorAll('.button-apply-filters');
	if (applyfilterButtons && filterForm)
		for (let button of applyfilterButtons)
			button.addEventListener('click', function (e) {
				e.preventDefault();
				const filterFormData = new FormData(filterForm);
				//const sortFormData = new FormData();
				//sortFormData.append('sort_by', sortSelect.value);
				const urlParams = window.location.search;
				if (urlParams) {
					const urlParamsObject = new URLSearchParams(urlParams);
					const entries = urlParamsObject.entries();
					for (let param of entries) {
						if (param[0] === 'q') filterFormData.append(param[0], param[1]);
					}
				}
				//for (entry of sortFormData.entries()) filterFormData.append(entry[0], entry[1]);
				const location = window.location.origin + window.location.pathname;
				let newParams = '?';
				for (let param of filterFormData.entries()) {
					newParams += `${param[0]}=${param[1]}&`;
				}
				window.location = location + newParams;
			});
}

const productList = document.getElementById('products');
const toggleSingle = document.querySelector('.collection-view-toggle--single');
const toggleMulti = document.querySelector('.collection-view-toggle--multi');

window.chooseLayout = function () {
	const customerPreference = window.getCookie('search_view');
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
		window.setCookie('search_view', 'single', 7);
		window.chooseLayout();
	});

if (toggleMulti)
	toggleMulti.addEventListener('click', function () {
		window.setCookie('search_view', 'multi', 7);
		window.chooseLayout();
	});
