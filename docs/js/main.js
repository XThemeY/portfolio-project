$(document).ready(function () {

	// Анимация span полей формы.
	const formItem = document.querySelectorAll('.form-item input, textarea');
	formItem.forEach(function (item) {

		item.addEventListener('focus', function () {
			this.nextElementSibling.classList.add("form__item-active")
		})

		item.addEventListener('blur', function () {
			if (item.value === "") {
				this.nextElementSibling.classList.remove("form__item-active")
			}
		})

	})

	//Menu-burger
	const menuBurger = document.querySelector('.toggle-menu');
	const sideMenu = document.querySelector('.side-menu');

	menuBurger.addEventListener('click', function () {
		this.classList.toggle('active');
		sideMenu.classList.toggle('active');
	})
})