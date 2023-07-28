const langSelectorLink = document.querySelector('.lang-select');
if (langSelectorLink)
	langSelectorLink.addEventListener('click', e => {
		e.preventDefault();
		mdApp_openAndRefreshModal();
	});
