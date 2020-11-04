document.addEventListener("DOMContentLoaded", function () {

	var formItem = document.querySelectorAll('.form-item input, textarea');

	formItem.forEach(function (item) {
		const placeHolderItem = item.nextElementSibling;

		item.addEventListener('focus', function () {
			placeHolderItem.classList.add("form__item-active")
		})

		item.addEventListener('blur', function () {
			if (item.value === "") {
				placeHolderItem.classList.remove("form__item-active")
			}
		})

	})


})