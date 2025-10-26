signupForm = document.getElementById('signup-form');


signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    
    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');

    const res = await signupRequest(first_name, last_name, email, username, password);
    console.log(res.data)
    if (res.status == 201) {
        showToast("You're registered successfully!")
        window.location.replace('login.html')
    }
})



async function signupRequest(first_name, last_name, email, username, password) {
    try {
        const res = await axios.post(
        'https://biruk13.pythonanywhere.com/api/signup/',
        {   
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "username": username,
            "password": password
        },
    )
        return res;
    } catch (error) {
        return error.response;
    }
}


function showToast(message, duration = 5000) {
    const container = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = "bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in";
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('animate-fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, duration);
}
