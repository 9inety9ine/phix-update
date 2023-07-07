const accordionTitles = document.querySelectorAll('.accordion__title');
if (accordionTitles)
	for (let title of accordionTitles)
		title.addEventListener('click', e => {
			e.preventDefault();
			title.parentNode.classList.toggle('open');
		});
