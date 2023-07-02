const openCollectionDrawer = function () {
	const documentBody = document.querySelector('body');
	const collectionDrawer = document.querySelector('.drawer-collection');
	if (documentBody && collectionDrawer) {
		if (documentBody.classList.contains('drawer-open')) {
			window.closeAllDrawers();
		} else {
			documentBody.classList.add('drawer-open', 'drawer-collection-open', 'no-overflow');
			window.setTimeout(function () {
				documentBody.classList.add('mask-visible');
			}, 150);
		}
	}
};

const togglecollection = document.querySelector('.toggle-collection-drawer');
if (togglecollection) {
	togglecollection.addEventListener('click', function (event) {
		event.preventDefault();
		const documentBody = document.querySelector('body');
		if (documentBody && documentBody.classList.contains('drawer-collection-open')) {
			window.closeAllDrawers();
			return;
		} else {
			window.closeAllDrawers();
			openCollectionDrawer();
		}
	});
}
