const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const resetButton = document.getElementById('reset-button');
const logoutButton = document.getElementById('logout-button');
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-button');
const emailInput = document.getElementById('email-input');
const password2Input = document.getElementById('password2-input');
const goToIndexButton = document.getElementById('go-to-index-button');

// Check if user is logged in
if (localStorage.getItem('user')) {
    showLogoutState();
}

// Event listener for form submission
form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateInputs()) {
        const userData = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        // Save user data to localStorage (registration)
        localStorage.setItem('user', JSON.stringify(userData));
        alert('User registered successfully!');
        showLogoutState();
    }
});

// Logout button listener
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    showLoginState();
});

// Reset button listener
resetButton.addEventListener('click', () => {
    form.reset();
    const inputControls = document.querySelectorAll('.input-control');
    inputControls.forEach(inputControl => {
        inputControl.classList.remove('error', 'success');
        inputControl.querySelector('.error').innerText = '';
    });
});

// Validate inputs function
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    let isValid = true;

    if (usernameValue === '') {
        setError(username, 'Username is required');
        isValid = false;
    } else {
        setSuccess(username);
    }

    if (emailInput.style.display !== 'none') {
        if (emailValue === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }

        if (passwordValue === '') {
            setError(password, 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 characters.');
            isValid = false;
        } else {
            setSuccess(password);
        }

        if (password2Value === '') {
            setError(password2, 'Please confirm your password');
            isValid = false;
        } else if (password2Value !== passwordValue) {
            setError(password2, "Passwords don't match");
            isValid = false;
        } else {
            setSuccess(password2);
        }
    }

    return isValid;
};

// Utility functions
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// Show logout state (user logged in)
function showLogoutState() {
    const userData = JSON.parse(localStorage.getItem('user'));
    username.value = userData.username;
    emailInput.style.display = 'none';
    password2Input.style.display = 'none';
    formTitle.innerText = `Welcome, ${userData.username}`;
    submitButton.style.display = 'none';
    logoutButton.style.display = 'block';
}

// Show login state (user logged out)
function showLoginState() {
    emailInput.style.display = 'block';
    password2Input.style.display = 'block';
    formTitle.innerText = 'Registration';
    submitButton.style.display = 'block';
    logoutButton.style.display = 'none';
}

form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateInputs()) {
        const userData = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        localStorage.setItem('user', JSON.stringify(userData));
        alert('User registered successfully!');
        showLogoutState();

        goToIndexButton.style.display = 'block';
    }
});

goToIndexButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});