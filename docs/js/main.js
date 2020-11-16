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
	const menuBurger = document.querySelectorAll('.toggle-menu');
	const sideMenu = document.querySelector('.side-menu');
	const overlay = document.querySelector('#overlay');
	const body = document.querySelector('body');


	function menuBurgerToggle(type) {

		if (type === "resize") {
			for (let i = 0; i < menuBurger.length; i++) {
				const element = menuBurger[i];
				element.classList.remove('active');
			}
		} else {
			for (let i = 0; i < menuBurger.length; i++) {
				const element = menuBurger[i];
				element.classList.toggle('active');
			}
		}

	}

	menuBurger[0].addEventListener('click', function () {
		menuBurgerToggle('click');
		sideMenu.classList.toggle('active');
		overlay.classList.toggle('active');
		body.classList.toggle('noScroll');

	})
	//Скрыть по клику оверлея
	overlay.addEventListener('click', function () {
		menuBurgerToggle('click');
		sideMenu.classList.remove('active');
		this.classList.remove('active');
		body.classList.remove('noScroll');
	})
	sideMenu.addEventListener('click', function () {
		menuBurgerToggle('click');
		this.classList.remove('active');
		overlay.classList.remove('active');
		body.classList.remove('noScroll');
	})

	//Ресайз
	window.addEventListener('resize', function () {
		sideMenu.classList.remove('active');
		overlay.classList.remove('active');
		body.classList.remove('noScroll');
		menuBurgerToggle('resize');
	})


	//Fix-scroll and BackTop button
	const fixMenu = document.querySelector('.fix-menu');
	window.addEventListener("scroll", function () {
		if (this.pageYOffset > 10) {
			fixMenu.classList.add('active');
		} else {
			fixMenu.classList.remove('active');
		}
	})



	$('#backTop').hide();
	$(window).scroll(function () {

		if ($(this).scrollTop() > 200) {
			$('#backTop').fadeIn();
		} else {
			$('#backTop').fadeOut();
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
			Email: {
				required: true,
				email: true
			},
			Phone: {
				required: true,
			},
			Theme: {
				required: true
			},
			Text: {
				required: true
			}
		},
		messages: {
			Email: {
				required: 'Введите email',
				email: 'Отсутсвует символ @'
			},
			Phone: {
				required: 'Введите телефон'
			},
			Theme: {
				required: 'Введите тему сообщения'
			},
			Text: {
				required: 'Введите текст сообщения'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	})


	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $("#contacts__form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$("#contacts__form").slideUp(800);
				$('#answer').html(html);
			}
		});

		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

	//Nav-Page
	$('#page-nav').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
		begin: function () { },
		end: function () { },
		scrollChange: function ($currentListItem) { }
	});

	//валидация поля телефона 
	$(".phone").mask("+7(999)999-99-99");
	//ф-ция для позиции курсора
	$.fn.setCursorPosition = function (pos) {
		if ($(this).get(0).setSelectionRange) {
			$(this).get(0).setSelectionRange(pos, pos);
		} else if ($(this).get(0).createTextRange) {
			var range = $(this).get(0).createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};
	//ф-ция для позиции курсора для нашего поля phone
	$('.phone').click(function () {
		$(this).setCursorPosition(3); // set position number
	});


	//Всплывающая подсказка о копировании
	var elementBtn = document.getElementById("discord_btn");
	var elementSpan = document.getElementById("discord_spn")
	var labelAlert = document.createElement('div');
	elementBtn.addEventListener("click", copy_text);
	elementSpan.addEventListener("click", triggerBtn)
	labelAlert.classList.add('clpBoard-copy')
	labelAlert.appendChild(document.createTextNode('Текст скопирован'));
	elementBtn.appendChild(labelAlert);

	function triggerBtn() {
		$("#discord_btn").trigger("click");
	}
	function copy_text() {
		labelAlert.style.opacity = "1";
		setTimeout(function () {
			labelAlert.style.opacity = "0";
		}, 1500)

		var copyText = document.getElementById("discord_spn");
		var textArea = document.createElement("textarea");
		textArea.value = copyText.textContent;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		textArea.remove();

	}
})