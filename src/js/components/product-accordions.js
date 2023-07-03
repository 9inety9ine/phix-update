const accordionToggles = document.querySelectorAll('.toggle-accordion');
if (accordionToggles)
	for (let toggle of accordionToggles)
		toggle.addEventListener('click', e => {
			e.preventDefault();
			const parent = toggle.parentNode;
			parent.classList.toggle('open');
			window.heightFromTop(window.innerWidth);
		});
