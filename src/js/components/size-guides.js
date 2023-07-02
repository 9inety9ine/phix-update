const sizeGuideToggles = document.querySelectorAll('.size-guide-toggle');
if (sizeGuideToggles)
	for (let toggle of sizeGuideToggles)
		toggle.addEventListener('click', e => {
			e.preventDefault();
			if (toggle.classList.contains('active')) return;
			const parent = toggle.parentNode;
			const superParent = toggle.parentNode.parentNode.parentNode;
			const sizeguides = superParent.querySelectorAll('table');
			for (let guide of sizeguides) guide.classList.add('hidden');
			const toggles = parent.querySelectorAll('button');
			for (let toggle of toggles) toggle.classList.remove('active');
			const target = superParent.querySelector('.' + toggle.dataset.target);
			target.classList.remove('hidden');
			toggle.classList.add('active');
		});
