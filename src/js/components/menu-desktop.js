const menuLinks = document.querySelectorAll('.menu-desktop__link');
const menuItems = document.querySelectorAll('.menu-desktop__item');
const menuDevice = document.querySelector('.menu-desktop-device');
const menuMask = document.querySelector('.menu-desktop-mask');

const setMenuDevicePosition = link => {
	const linkWidth = link.offsetWidth;
	const linkPos = link.offsetLeft;
	const linkColor = link.style.color;
	menuDevice.style.left = linkPos + 'px';
	menuDevice.style.width = linkWidth + 'px';
	menuDevice.style.backgroundColor = linkColor;
	link.classList.add('active');
	link.parentNode.classList.add('open');
	menuDevice.classList.add('visible');
	menuMask.classList.add('show');
};

if (menuItems && menuLinks && menuDevice)
	for (let item of menuItems) {
		const link = item.querySelector('.menu-desktop__link');
		item.addEventListener('mouseover', () => {
			window.mainHoverDelay = setTimeout(() => {
				clearTimeout(window.fadeDelay);
				let current_item = item;
				if (!link.classList.contains('active')) {
					for (let link of menuLinks) link.classList.remove('active');
				}
				setMenuDevicePosition(link);
				window.fadeDelay = setTimeout(function () {
					for (let item of menuItems) {
						if (item === current_item) continue;
						item.classList.remove('open');
					}
				}, 250);
				clearTimeout(window.hoverDelay);
			}, 250);
		});
		item.addEventListener('mouseout', () => {
			clearTimeout(window.hoverDelay);
			clearTimeout(window.mainHoverDelay);
			window.hoverDelay = setTimeout(function () {
				link.classList.remove('active');
				item.classList.remove('open');
				menuDevice.classList.remove('visible');
				menuMask.classList.remove('show');
			}, 500);
		});
	}

if (menuMask)
	menuMask.addEventListener('click', () => {
		for (let item of menuItems) {
			const link = item.querySelector('.menu-desktop__link');
			link.classList.remove('active');
			item.classList.remove('open');
			menuDevice.classList.remove('visible');
			menuMask.classList.remove('show');
		}
	});
