$(document).ready(function () {

	// Анимация span полей формы.
	const formItem = document.querySelectorAll('.form-item input, textarea');
	formItem.forEach(function (item) {
		const placeholder = item.nextElementSibling;
		item.addEventListener('focus', function () {
			placeholder.classList.add("form__item-active")
		})

		item.addEventListener('blur', function () {
			if (item.value === "") {
				placeholder.classList.remove("form__item-active")
			}
		})

	})

	//Menu-burger
	const menuBurger = document.querySelector('.toggle-menu');
	const sideMenu = document.querySelector('.side-menu');
	const overlay = document.querySelector('#overlay');
	const body = document.querySelector('body');

	menuBurger.addEventListener('click', function () {
		this.classList.toggle('active');
		sideMenu.classList.toggle('active');
		overlay.classList.toggle('active');
		body.classList.toggle('noScroll');

	})
	//Скрыть по клику оверлея
	overlay.addEventListener('click', function () {
		menuBurger.classList.remove('active');
		sideMenu.classList.remove('active');
		this.classList.remove('active');
		body.classList.remove('noScroll');
	})
	sideMenu.addEventListener('click', function () {
		this.classList.remove('active');
		menuBurger.classList.remove('active');
		overlay.classList.remove('active');
		body.classList.remove('noScroll');
	})

	//Ресайз
	window.addEventListener('resize', function () {
		sideMenu.classList.remove('active');
		menuBurger.classList.remove('active');
		overlay.classList.remove('active');
		body.classList.remove('noScroll');
	})


	//Fix-scroll
	const fixMenu = document.querySelector('.fix-menu');

	window.addEventListener('scroll', function () {
		if (this.pageYOffset > 10) {
			fixMenu.classList.add('active');
		} else {
			fixMenu.classList.remove('active');
		}

	})


	//mixItUp
	let containerEl = document.querySelector('#projects-list');
	let mixer = mixitup(containerEl, {
		classNames: {
			block: ""
		}
	})

	//Валидация формы
	$('#contacts__form').validate({
		rules: {
			form_email: {
				required: true,
				email: true
			},
			form_email_subject: {
				required: true
			},
			form_text: {
				required: true
			}
		},
		messages: {
			form_email: {
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			form_email_subject: {
				required: 'Введите тему сообщения'
			},
			form_text: {
				required: 'Введите текст сообщения'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	})


	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $("#contact-form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$("#contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});

		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}
})