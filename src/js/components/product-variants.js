const productVariantOutput = document.getElementById('product-variant-output');
const productVariantSelect = document.getElementById('product-variant-select');

const activateOptions = function () {
	const options = productVariantOutput.querySelectorAll('li');
	for (let option of options)
		option.addEventListener('click', () => {
			const selectedId = option.dataset.id;
			const optionTitle = option.dataset.title;
			const optionInventory = option.dataset.inventory;
			if (optionInventory === 'Out of Stock') return;
			const optionSelectLabel = document.getElementById('option-select-label');
			const productVariantOptions = productVariantSelect.querySelectorAll('option');
			for (let variantOption of productVariantOptions) {
				if (variantOption.value === selectedId) {
					productVariantSelect.value = selectedId;
					optionSelectLabel.textContent = optionTitle;
					let newURL = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + selectedId;
					window.history.replaceState({ path: newURL }, '', newURL);
					const toggleSelect = document.getElementById('toggle-options');
					const addToCartButton = document.querySelector('.button--add-to-cart');
					const addToCartButtonLabel = addToCartButton.querySelector('span');
					if (optionInventory === 'Preorder') {
						addToCartButtonLabel.textContent = label_preorder;
					} else {
						addToCartButtonLabel.textContent = label_add_to_cart;
					}
					toggleSelect.parentNode.classList.remove('open');
					if (!option.classList.contains('active')) {
						for (let option of options) option.classList.remove('active');
						option.classList.add('active');
					}
				}
			}
		});
};

const activateToggle = function () {
	const toggleSelect = document.getElementById('toggle-options');
	if (toggleSelect) {
		toggleSelect.addEventListener('click', e => {
			e.preventDefault();
			toggleSelect.parentNode.classList.toggle('open');
		});
	}
	const variantOutput = document.getElementById('product-variant-output');
	if (variantOutput) {
		variantOutput.addEventListener('mouseover', () => {
			clearTimeout(window.toggleDelay);
		});
		variantOutput.addEventListener('mouseout', () => {
			clearTimeout(window.toggleDelay);
			window.toggleDelay = setTimeout(() => {
				toggleSelect.parentNode.classList.remove('open');
			}, 500);
		});
	}
};

if (productVariantSelect) {
	const productVariantOptions = productVariantSelect.querySelectorAll('option');
	let variantSelect = `<div class="option-select"><button id="toggle-options" aria-label="${label_select_size}"><span class="option-select-label" id="option-select-label">${label_select_size}</span></button><div class="option-select__scroll"><ul>`;
	for (let option of productVariantOptions) {
		let optionTitle = option.dataset.title;
		let optionInventory = option.dataset.inventory;
		let optionId = option.value;
		if (optionInventory === 'Out of Stock') {
			variantSelect += `<li data-id="${optionId}" data-title="${optionTitle}" data-inventory="${optionInventory}" aria-label="${optionTitle}" class="disabled"><span class="option-title">${optionTitle}</span><span>${optionInventory}</span></li>`;
		} else {
			variantSelect += `<li data-id="${optionId}" data-title="${optionTitle}" data-inventory="${optionInventory}" aria-label="${optionTitle}"><span class="option-title">${optionTitle}</span><span>${optionInventory}</span></li>`;
		}
	}
	variantSelect += `</ul></div></div>`;
	productVariantOutput.innerHTML = variantSelect;
	activateOptions();
	activateToggle();
}

const getCurrentVariant = function () {
	const thisPageURL = window.location.search;
	const urlParams = new URLSearchParams(thisPageURL);
	const activeVariant = urlParams.get('variant');
	if (activeVariant) {
		const productVariantOptions = productVariantSelect.querySelectorAll('option');
		const optionSelectLabel = document.getElementById('option-select-label');
		for (let option of productVariantOptions) {
			if (option.value === activeVariant) {
				productVariantSelect.value = activeVariant;
				optionSelectLabel.textContent = option.dataset.title;
			}
		}
	}
};
getCurrentVariant();
