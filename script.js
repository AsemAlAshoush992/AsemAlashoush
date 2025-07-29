function sendMail(event) {
	// منع إعادة تحميل الصفحة
	event.preventDefault();
	// استرجاع القيم المدخلة من المستخدم
	var name = document.getElementById("name").value.trim();
	var email = document.getElementById("email").value.trim();
	var subject = document.getElementById("subject").value.trim();
	var message = document.getElementById("message").value.trim();

	// التحقق من إدخال البيانات
	if (name === "" || email === "" || subject === "" || message === "") {
		Swal.fire({
			icon: 'warning',
			title: 'Missing Information',
			text: 'Please fill in all required fields.',
			confirmButtonText: 'OK',
			timer: 4000
		});
		return;
	}

	// التحقق من صحة البريد الإلكتروني
	if (!validateEmail(email)) {
		Swal.fire({
			icon: 'warning',
			title: 'Invalid Email',
			text: 'Please enter a valid email address.',
			confirmButtonText: 'OK',
			timer: 4000
		});
		return;
	}

	// إعداد المعاملات لإرسالها إلى EmailJS
	var params = {
		name: name,
		email: email,
		subject: subject,
		message: message,
	};

	const serviceID = "service_l6liqrm";
	const templateID = "template_q25o4pe";

	// إرسال الرسالة عبر EmailJS
	emailjs.send(serviceID, templateID, params)
		.then(res => {
			Swal.fire({
				icon: 'success',
				title: 'Message Sent',
				text: 'Your message was sent successfully!',
				confirmButtonText: 'OK',
				timer: 4000
			});
		})
		.catch(err => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'An error occurred while sending the message. Please try again.',
				confirmButtonText: 'OK',
				timer: 4000
			});
		});
}

// دالة للتحقق من صحة البريد الإلكتروني
function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
