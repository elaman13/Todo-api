const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    
    const username = formData.get('username');
    const password = formData.get('password');

    console.log(' username ' + username + ' password ' + password);

    const res = await loginRequest(username, password);
    if (res.status == 200) {
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        window.location.replace('todo.html')
    }
})


async function loginRequest(username, password) {
    try {
        const res = await axios.post(
        'https://biruk13.pythonanywhere.com/api/token/',
        {
            "username": username,
            "password": password
        },
    )
        return res;
    } catch (error) {
        return error.response;
    }
}