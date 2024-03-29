export default function form(geoData) {
	
	function validateEmail(email) {
		let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		return reg.test(email);
	}
	
	function validateName(name) {
		let reg = /\d/;
		return reg.test(name);
	}
	
	document.querySelectorAll('.form input').forEach(input => {
		if(input.name == "first-name" || input.name == "last-name" && input.type == "text") {
			input.addEventListener('blur', function (event) {
				if(input.value) {
					if(!validateName(input.value)) {
						input.closest('label').classList.remove('is-error');
						if(input.value != "") input.closest('label').classList.add('is-valid');
					} else {
						input.closest('label').classList.add('is-error');
						input.closest('label').classList.remove('is-valid');
					}
				}
			})
		}
	
		if(input.type == "email") {
			input.addEventListener('blur', function (event) {
				if(input.value) {
					if(validateEmail(input.value)) {
						input.closest('label').classList.remove('is-error');
						if(input.value != "") input.closest('label').classList.add('is-valid');
					} else {
						input.closest('label').classList.add('is-error');
						input.closest('label').classList.remove('is-valid');
					}
				}
			})
		}
	})
	
	document.querySelectorAll('.form').forEach(form => {
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			console.log("submit");

			if(!form.querySelector('.is-error') && admin_ajax_url) {

				form.classList.add("is-loading");

				let data = "action=" + form.getAttribute("action");

				form.querySelectorAll('input, textarea').forEach(element => {
					if(element.value) {
						data += `&${element.name}=${element.value}`;
					}
				})

				fetch(admin_ajax_url, {
					method: "POST",
					body: data,
					headers:{"content-type": "application/x-www-form-urlencoded"}
				})
				
				.then( (response) => {
					if(response.status !== 200) return Promise.reject();
					return response.text()
				})
				.then(result => {
					if(result == "success") {
						form.classList.remove("is-loading");
						form.classList.add("is-loaded");
					} else {
						form.classList.remove("is-loading");
					}
				})
				.catch((error) => {
					console.log(error)
					form.classList.remove("is-loading");
				});

			}
			
		})
	})
	
	document.querySelectorAll('.form textarea').forEach(textarea => {
	
		textarea.addEventListener('input', function (event) {
			textarea.parentElement.dataset.value = textarea.value;
		})
		
		textarea.addEventListener('blur', function (event) {
			if(textarea.value != "") {
				textarea.closest('label').classList.add('is-valid');
			} else {
				textarea.closest('label').classList.remove('is-valid');
			}
		})
		
	})

	let forms = document.querySelectorAll('form');
	forms.forEach(form => {
		form.style.setProperty('--width-form', form.offsetWidth + 'px');
	})

	const telLabels = document.querySelectorAll('.tel-input-label');
	telLabels.forEach(tel => {
		tel.style.setProperty('--width', tel.offsetWidth + 'px');
	})
	
	document.querySelectorAll('.tel-input').forEach(telInput => {
		//telInput.destroy();
		const 
			intl = window.intlTelInput(telInput, {
			utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/js/utils.js",
			initialCountry: "auto",
			useFullscreenPopup: false,
			geoIpLookup: function(callback) {
				callback(geoData);
			}
		});

		if(window.innerWidth >= 992) {
			document.querySelectorAll('.iti__country-list').forEach(list => {

				list.setAttribute("data-lenis-prevent", true);
				
			})
		}
		
	
		const label = telInput.closest('.tel-input-label');
		telInput.addEventListener('focus', function (event) {
			label.classList.add('is-active');
		})
	
		telInput.addEventListener('blur', function (event) {
			if(telInput.value == "") label.classList.remove('is-active');
	
			if(telInput.value != "" && telInput.value != `+${intl.getSelectedCountryData()['dialCode']}`) {
				if(intl.isValidNumber()) {
					label.classList.remove('is-error');
					if(telInput.value != "") label.classList.add('is-valid');
				} else {
					label.classList.add('is-error');
					label.classList.remove('is-valid');
				}
			}
		})
		
		telInput.addEventListener("countrychange", function() {
			label.classList.add('is-active');
			if(intl.getSelectedCountryData()['dialCode']) {
				//telInput.value = '+' + intl.getSelectedCountryData()['dialCode'];
			}
			
			/* if(lenis) {
				lenis.scrollTo(document.querySelector(".iti__active"))
			} */
		});

		setTimeout(() => {
			if(intl.getSelectedCountryData()['dialCode']) {
				telInput.value = '+' + intl.getSelectedCountryData()['dialCode'];
			}
		},0)

		/* telInput.addEventListener("open:countrydropdown", function() {
			
		}); */

		telInput.addEventListener("input", function() {
			telInput.value = telInput.value.replace(/[^+\d]/g, "");
			/* label.classList.add('is-active');
			telInput.value = '+' + intl.getSelectedCountryData()['dialCode']; */
		});

		
		//telInput.value = '+' + intl.getSelectedCountryData()['dialCode'];
	})
}