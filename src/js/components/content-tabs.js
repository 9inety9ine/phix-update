const toggleButtons = document.querySelectorAll('.button--toggle');
if (toggleButtons)
	for (let button of toggleButtons)
		button.addEventListener('click', e => {
			e.preventDefault();
			if (!button.classList.contains('button--secondary')) return;
			const target = button.dataset.target;
			const contentBoxes = document.querySelectorAll('.section-content-tabs__page');
			for (let box of contentBoxes) box.classList.remove('active');
			for (let button of toggleButtons) button.classList.add('button--secondary');
			button.classList.remove('button--secondary');
			document.getElementById(target).classList.add('active');
		});
