// Handle Signup Form Submission
document.querySelector('#signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('#password').value;

    try {
        const response = await fetch('http://127.0.0.1:5001/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        // If signup is successful, save the token and redirect to the login page
        if (response.status === 201) {
            localStorage.setItem('token', data.token);
            window.location.href = 'login.html';  // Redirect to login page
        } else {
            // Show the error message if signup fails
            document.getElementById('feedback-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error during signup:', error);
        document.getElementById('feedback-message').textContent = 'Something went wrong. Please try again.';
    }
});

// Handle Login Form Submission
document.querySelector('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('#login-password').value;

    try {
        const response = await fetch('http://127.0.0.1:5001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        // If login is successful, save the token and redirect to the dashboard
        if (response.status === 200) {
            localStorage.setItem('authToken', data.token);  // Use the same key for the token
            window.location.href = 'dashboard.html';  // Redirect to the dashboard
        } else {
            document.getElementById('login-feedback-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error logging in:', error);
        document.getElementById('login-feedback-message').textContent = 'Something went wrong. Please try again.';
    }
});


// Password visibility toggle for Signup
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash');
});

// Password visibility toggle for Login
const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const loginPasswordInput = document.getElementById('login-password');
toggleLoginPassword.addEventListener('click', () => {
    const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPasswordInput.setAttribute('type', type);
    toggleLoginPassword.classList.toggle('fa-eye-slash');
});
