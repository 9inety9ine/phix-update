const addAddressButton = document.querySelector('.button--new-address');
if (addAddressButton)
	addAddressButton.addEventListener('click', function (e) {
		e.preventDefault();
		const newAddressForm = document.querySelector('.address--new');
		const editAddressForms = document.querySelectorAll('.address--edit');
		if (editAddressForms) for (let address of editAddressForms) address.classList.add('address--hidden');
		if (newAddressForm) newAddressForm.classList.remove('address--hidden');
		addAddressButton.classList.add('button--hidden');
	});

const cancelButtons = document.querySelectorAll('.button--cancel');
if (cancelButtons)
	for (let button of cancelButtons)
		button.addEventListener('click', function (e) {
			e.preventDefault();
			const newAddressForm = document.querySelector('.address--new');
			if (newAddressForm) newAddressForm.classList.add('address--hidden');
			const editAddressForms = document.querySelectorAll('.address--edit');
			if (editAddressForms) for (let form of editAddressForms) form.classList.add('address--hidden');
			if (addAddressButton) addAddressButton.classList.remove('button--hidden');
		});

const editButtons = document.querySelectorAll('.button-edit-address');
if (editButtons)
	for (let button of editButtons)
		button.addEventListener('click', function (e) {
			e.preventDefault();
			const addressId = button.dataset.address;
			const addressToEdit = document.getElementById(addressId);
			const addressContainers = document.querySelectorAll('.address');
			if (addressContainers) for (let address of addressContainers) address.classList.add('address--hidden');
			if (addressToEdit) addressToEdit.classList.remove('address--hidden');
		});

const deleteAddressButtons = document.querySelectorAll('.button-delete-address');
if (deleteAddressButtons)
	for (let button of deleteAddressButtons)
		button.addEventListener('click', e => {
			const agree = confirm(confirm_delete);
			if (agree) {
				return true;
			} else {
				e.preventDefault();
			}
		});
