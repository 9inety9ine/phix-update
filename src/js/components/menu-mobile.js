const mobileMenuToggles = document.querySelectorAll('.menu-mobile__link--toggle');
for (let toggle of mobileMenuToggles)
	toggle.addEventListener('click', e => {
		e.preventDefault();
		toggle.parentNode.classList.add('open');
	});

const mobileBackToggles = document.querySelectorAll('.drawer-back');
for (let toggle of mobileBackToggles)
	toggle.addEventListener('click', e => {
		e.preventDefault();
		const mobileMenuItems = document.querySelectorAll('.menu-mobile__item');
		if (mobileMenuItems) for (let item of mobileMenuItems) item.classList.remove('open');
	});
