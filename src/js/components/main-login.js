const forgotPasswordForm = document.querySelector('.section-login__form--forgot-password');
const loginForm = document.querySelector('.section-login__form--login');

const formOneToggle = document.querySelector('.toggle-login-form');
const formTwoToggle = document.querySelector('.toggle-register-form');

const forgotPasswordLink = document.querySelector('.toggle-forgot-password');
const loginLink = document.querySelector('.toggle-login');

const formOne = document.querySelector('.section-login__account-login');
const formTwo = document.querySelector('.section-login__account-register');

forgotPasswordLink.addEventListener('click', function (e) {
	e.preventDefault();
	forgotPasswordForm.classList.add('show');
	loginForm.classList.remove('show');
});

loginLink.addEventListener('click', function (e) {
	e.preventDefault();
	loginForm.classList.add('show');
	forgotPasswordForm.classList.remove('show');
});

formOneToggle.addEventListener('click', function (e) {
	e.preventDefault();
	formOne.classList.add('active');
	formTwo.classList.remove('active');
	formOneToggle.classList.add('active');
	formTwoToggle.classList.remove('active');
});

formTwoToggle.addEventListener('click', function (e) {
	e.preventDefault();
	formTwo.classList.add('active');
	formOne.classList.remove('active');
	formTwoToggle.classList.add('active');
	formOneToggle.classList.remove('active');
});
