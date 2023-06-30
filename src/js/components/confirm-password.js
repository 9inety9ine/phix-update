const passwordField = document.getElementById('password');
const passwordConfirmField = document.getElementById('password-confirm');
const submitButton = document.getElementById('register-submit');

submitButton.addEventListener('click', function (event) {
	if (passwordField.value !== passwordConfirmField.value) {
		event.preventDefault();
		alert('Passwords do not match');
	}
});
