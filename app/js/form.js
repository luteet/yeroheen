export default function form() {
	
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
			if(form.querySelector('.is-error')) event.preventDefault();
		})
	})
	
	document.querySelectorAll('.form textarea').forEach(textarea => {
	
		textarea.addEventListener('input', function (event) {
			textarea.parentElement.dataset.value = textarea.value;
		})
	
		textarea.addEventListener('blur', function (event) {
			if(scrollSmoother) {
				scrollSmoother.paused(true);
				setTimeout(() => {
					scrollSmoother.scrollTrigger.refresh();
					scrollSmoother.paused(false);
				},100)
			}
		})
		
		textarea.addEventListener('blur', function (event) {
			if(textarea.value != "") {
				textarea.closest('label').classList.add('is-valid');
			} else {
				textarea.closest('label').classList.remove('is-valid');
			}
		})
		
	})
	
	document.querySelectorAll('.tel-input').forEach(telInput => {
		const intl = window.intlTelInput(telInput, {
			utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/js/utils.js",
			initialCountry: "auto",
			useFullscreenPopup: false,
			geoIpLookup: function(callback) {
				fetch("https://ipapi.co/json")
				.then(function(res) { return res.json(); })
				.then(function(data) { callback(data.country_code); })
				.catch(function() { callback("us"); });
			}
		});
	
		document.querySelectorAll('.iti__country-list').forEach(list => {
			const lenis2 = new Lenis({
				wrapper: list
			})
	
			function raf(time) {
				lenis2.raf(time)
				requestAnimationFrame(raf)
			}
		
			requestAnimationFrame(raf)
		})
	
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
		//telInput.closest('label').classList.add('tel-input-label')
		telInput.addEventListener("countrychange", function() {
			label.classList.add('is-active');
			telInput.value = '+' + intl.getSelectedCountryData()['dialCode'];
		});
	})
}