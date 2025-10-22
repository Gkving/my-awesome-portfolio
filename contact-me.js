
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');

        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');

        const nameSuccess = document.getElementById('nameSuccess');
        const emailSuccess = document.getElementById('emailSuccess');
        const subjectSuccess = document.getElementById('subjectSuccess');
        const messageSuccess = document.getElementById('messageSuccess');

        function validateName() {
            const value = fullName.value.trim();
            if (value === '') {
                showError(fullName, nameError, nameSuccess, 'Please enter your full name');
                return false;
            } else if (value.length < 2) {
                showError(fullName, nameError, nameSuccess, 'Name must be at least 2 characters');
                return false;
            } else {
                showSuccess(fullName, nameError, nameSuccess);
                return true;
            }
        }

        function validateEmail() {
            const value = email.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (value === '') {
                showError(email, emailError, emailSuccess, 'Please enter your email address');
                return false;
            } else if (!emailRegex.test(value)) {
                showError(email, emailError, emailSuccess, 'Please enter a valid email address');
                return false;
            } else {
                showSuccess(email, emailError, emailSuccess);
                return true;
            }
        }

        function validateSubject() {
            const value = subject.value.trim();
            if (value === '') {
                showError(subject, subjectError, subjectSuccess, 'Please enter a subject');
                return false;
            } else if (value.length < 3) {
                showError(subject, subjectError, subjectSuccess, 'Subject must be at least 3 characters');
                return false;
            } else {
                showSuccess(subject, subjectError, subjectSuccess);
                return true;
            }
        }

        function validateMessage() {
            const value = message.value.trim();
            if (value === '') {
                showError(message, messageError, messageSuccess, 'Please enter your message');
                return false;
            } else if (value.length < 10) {
                showError(message, messageError, messageSuccess, 'Message must be at least 10 characters');
                return false;
            } else {
                showSuccess(message, messageError, messageSuccess);
                return true;
            }
        }

        function showError(input, errorElement, successIcon, errorText) {
            input.classList.add('error');
            input.classList.remove('success');
            errorElement.textContent = errorText;
            errorElement.classList.add('show');
            successIcon.classList.remove('show');
        }

        function showSuccess(input, errorElement, successIcon) {
            input.classList.remove('error');
            input.classList.add('success');
            errorElement.classList.remove('show');
            successIcon.classList.add('show');
        }

        function showErrorAlert(message) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message,
                confirmButtonColor: '#3280c9',
                confirmButtonText: 'Got it!',
                customClass: {
                    popup: 'animated-popup'
                }
            });
        }

        fullName.addEventListener('blur', validateName);
        email.addEventListener('blur', validateEmail);
        subject.addEventListener('blur', validateSubject);
        message.addEventListener('blur', validateMessage);

        fullName.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateName();
            }
        });

        email.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateEmail();
            }
        });

        subject.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateSubject();
            }
        });

        message.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateMessage();
            }
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const formDataObject = Object.fromEntries(formData.entries());
            console.log(formDataObject);

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;


                setTimeout(function() {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;

                    Swal.fire({
                        icon: 'success',
                        title: 'Message Sent!',
                        text: 'Thank you for reaching out. I\'ll get back to you soon!',
                        confirmButtonColor: '#3280c9',
                        confirmButtonText: 'Awesome!',
                        timer: 5000,
                        timerProgressBar: true,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });

                    form.reset();

                    fullName.classList.remove('success');
                    email.classList.remove('success');
                    subject.classList.remove('success');
                    message.classList.remove('success');

                    nameSuccess.classList.remove('show');
                    emailSuccess.classList.remove('show');
                    subjectSuccess.classList.remove('show');
                    messageSuccess.classList.remove('show');
                }, 1000);
            } else {
                showErrorAlert('Please fill in all required fields correctly.');
                
                const firstError = document.querySelector('.form-input.error, .form-textarea.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }


        })






