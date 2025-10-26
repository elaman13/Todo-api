const addForm = document.getElementById('add-todo-form')

addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    form = new FormData(addForm);
    title = form.get('title');
    content = form.get('content');

    const res = await addTodo(title, content);
    window.location.reload();

})

// new todo add
async function addTodo(title, content) {
    const access = localStorage.getItem('access');

    try {
        const res = await axios.post(
        'https://biruk13.pythonanywhere.com/api/todos/',
        {
            "title": title,
            "content": content
        },
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Accept': 'application/json'
            }
        }
    )

    return res;
        
    } catch (error) {
        return error.response;
    }
}


const todoLists = document.getElementById('todo-list')

function listTodos(title) {
    const div = document.createElement('div');
    div.className = 'group flex items-center justify-between gap-x-3 py-3 border-b border-slate-200 dark:border-slate-700';

    div.innerHTML = `
        <label class="flex items-center gap-x-4 flex-1 cursor-pointer">
<input class="h-5 w-5 rounded border-slate-300 dark:border-slate-600 border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-primary/50 focus:ring-offset-0 focus:border-slate-300 dark:focus:border-slate-600" type="checkbox"/>
<p class="text-[#333333] dark:text-slate-300 text-base font-normal leading-normal">${title}</p>
</label>
<div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50 text-red-500">
<span class="material-symbols-outlined text-xl">delete</span>
</button>
    `;

    todoLists.appendChild(div);
}


async function listFromDb() {
    const access = localStorage.getItem('access');

    try {
        const res = await axios.get(
            'https://biruk13.pythonanywhere.com/api/todos/',
            {
                headers: {
                    'Authorization': `Bearer ${access}`,
                    'Accept': 'application/json'
                }
            }
        )

        return res
    } catch (error) {
        return error.response;
    }
}


listFromDb().then(res => {
    if (res.status == 200) {
        todo = res.data
        for (let i=0; i < todo.length; i++) 
            {
                listTodos(todo[i].title);
            }
    } else {
        console.error("Request failed or no response received");
    }
});