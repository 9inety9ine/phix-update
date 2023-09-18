const productVariantOutput = document.getElementById('product-variant-output');
const productVariantSelect = document.getElementById('product-variant-select');

const triggerChange = el => {
	const changeEvent = new Event('change');
	el.dispatchEvent(changeEvent);
};

const addElement = date => {
	const newInput = document.createElement('input');
	newInput.setAttribute('type', 'hidden');
	newInput.setAttribute('id', 'preorder-note');
	newInput.setAttribute('name', 'properties[Preorder Note]');
	newInput.setAttribute('value', 'This is a pre-order item to be despatched on ' + date + '.');
	const targetEl = document.querySelector('.section-product__details__variants');
	targetEl.insertBefore(newInput, productVariantOutput.nextSibling);
};

const removeElement = id => {
	const elToRemove = document.getElementById(id);
	if (elToRemove) elToRemove.remove();
};

const activateOptions = function () {
	const options = productVariantOutput.querySelectorAll('li');
	for (let option of options)
		option.addEventListener('click', () => {
			const selectedId = option.dataset.id;
			const optionTitle = option.dataset.title;
			const optionInventory = option.dataset.inventory;
			let optionDate = undefined;
			if (option.dataset.date !== null) optionDate = option.dataset.date;
			// if (optionInventory === 'Out of Stock') return;
			const optionSelectLabel = document.getElementById('option-select-label');
			const productVariantOptions = productVariantSelect.querySelectorAll('option');
			const preorderMessage = document.querySelector('.preorder-message');
			const preorderMessageDate = preorderMessage.querySelector('.date');
			for (let variantOption of productVariantOptions) {
				if (variantOption.value === selectedId) {
					productVariantSelect.value = selectedId;
					const hiddenSelectOptions = productVariantSelect.querySelectorAll('option');
					for (const option of hiddenSelectOptions) {
						if (option.value == selectedId) option.selected = true;
					}
					triggerChange(productVariantSelect);
					optionSelectLabel.textContent = optionTitle;
					let newURL = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + selectedId;
					window.history.replaceState({ path: newURL }, '', newURL);
					const toggleSelect = document.getElementById('toggle-options');
					const addToCartButton = document.querySelector('.button--add-to-cart');
					const addToCartButtonLabel = addToCartButton.querySelector('span');
					console.log(optionInventory);
					if (optionInventory === 'Out of Stock') {
						addToCartButtonLabel.textContent = label_sold_out;
						addToCartButton.disabled = true;
						optionSelectLabel.classList.add('oos');
						preorderMessage.classList.add('hidden');
						removeElement('preorder-note');
					} else if (optionInventory === 'Preorder') {
						addToCartButtonLabel.textContent = label_preorder;
						addToCartButton.disabled = false;
						optionSelectLabel.classList.remove('oos');
						if (optionDate !== undefined) {
							preorderMessageDate.textContent = optionDate;
							preorderMessage.classList.remove('hidden');
							addElement(optionDate);
						}
					} else {
						addToCartButtonLabel.textContent = label_add_to_cart;
						addToCartButton.disabled = false;
						optionSelectLabel.classList.remove('oos');
						preorderMessage.classList.add('hidden');
						removeElement('preorder-note');
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
		let optionDate = undefined;
		if (option.dataset.date !== null) optionDate = option.dataset.date;
		let optionId = option.value;
		if (optionInventory === 'Out of Stock') {
			variantSelect += `<li data-id="${optionId}" data-title="${optionTitle}" data-inventory="${optionInventory}" aria-label="${optionTitle}" class="disabled"><span class="option-title">${optionTitle}</span><span>${optionInventory}</span></li>`;
		} else {
			if (optionDate != undefined) {
				variantSelect += `<li data-id="${optionId}" data-date="${optionDate}" data-title="${optionTitle}" data-inventory="${optionInventory}" aria-label="${optionTitle}"><span class="option-title">${optionTitle}</span><span>${optionInventory}</span></li>`;
			} else {
				variantSelect += `<li data-id="${optionId}" data-title="${optionTitle}" data-inventory="${optionInventory}" aria-label="${optionTitle}"><span class="option-title">${optionTitle}</span><span>${optionInventory}</span></li>`;
			}
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
		const preorderMessage = document.querySelector('.preorder-message');
		const preorderMessageDate = preorderMessage.querySelector('.date');
		for (let option of productVariantOptions) {
			if (option.value === activeVariant) {
				const optionInventory = option.dataset.inventory;
				const addToCartButton = document.querySelector('.button--add-to-cart');
				const addToCartButtonLabel = addToCartButton.querySelector('span');
				productVariantSelect.value = activeVariant;
				optionSelectLabel.textContent = option.dataset.title;
				let optionDate = undefined;
				if (option.dataset.date !== null) optionDate = option.dataset.date;
				option.selected = true;
				if (optionInventory === 'Out of Stock') {
					addToCartButtonLabel.textContent = label_sold_out;
					addToCartButton.disabled = true;
					optionSelectLabel.classList.add('oos');
					preorderMessage.classList.add('hidden');
				} else if (optionInventory === 'Preorder') {
					addToCartButtonLabel.textContent = label_preorder;
					addToCartButton.disabled = false;
					optionSelectLabel.classList.remove('oos');
					if (optionDate !== undefined) {
						preorderMessageDate.textContent = optionDate;
						preorderMessage.classList.remove('hidden');
					}
				} else {
					addToCartButtonLabel.textContent = label_add_to_cart;
					addToCartButton.disabled = false;
					optionSelectLabel.classList.remove('oos');
					preorderMessage.classList.add('hidden');
				}
			}
		}
		triggerChange(productVariantSelect);
	}
};
getCurrentVariant();
