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



  const roles = ["Full-Stack Web Developer", ".NET Developer"];
  const roleElement = document.getElementById("role");
  let roleIndex = 0;
  let charIndex = 0;
  let typing = true;

  function typeEffect() {
    if (typing) {
      if (charIndex < roles[roleIndex].length) {
        roleElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 150);  // سرعة الكتابة (150 مللي ثانية)
      } else {
        typing = false;
        setTimeout(typeEffect, 500); // انتظر ثانيتين قبل الحذف
      }
    } else {
      if (charIndex > 0) {
        roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, 100); // سرعة الحذف (100 مللي ثانية)
      } else {
        typing = true;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500); // انتظر قبل الكتابة من جديد
      }
    }
  }

  typeEffect();
