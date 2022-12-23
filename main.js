const addForm = document.querySelector('.add');
const todoList = document.querySelector('.todos');
const search = document.querySelector('.search input');
// Local Storage
let objArrayTodo = [];
if (localStorage.todos) {
	objArrayTodo = JSON.parse(localStorage.getItem('todos'))
}


const createTodo = todo => {
	const todoHTML = `
		<li class='list-group-item d-flex justify-content-between align-items-center w-25 mx-auto rounded-4 mt-3 py-3 border-0'>
			<span>${todo}</span>
			<i class="fa-solid fa-trash pe-auto delete" role='button'></i>
		</li>
	`
	todoList.insertAdjacentHTML('beforeend', todoHTML);
}

addForm.addEventListener('submit', e => {
	e.preventDefault();
	const todo = addForm.add.value.trim();

	if (todo.length > 0) {
		createTodo(todo)

		// Local Storage
		const objTodo = {
			value: todo,
			finished: false,
		}

		objArrayTodo.push(objTodo)
		localStorage.setItem('todos', JSON.stringify(objArrayTodo))
	}
	addForm.reset();
})

// Local Storage
const parsedTodos = JSON.parse(localStorage.getItem('todos'));
if (parsedTodos) {
	parsedTodos.forEach(todo => {
		createTodo(todo.value)
	})
}

// delete todo
todoList.addEventListener('click', e => {
	if (e.target.classList.contains('delete')) {
		e.target.parentElement.remove();
	}
})

const filterTodos = term => {
	Array.from(todoList.children)
		.filter(todo => !todo.textContent.toLowerCase().includes(term))
		.forEach(todo => todo.classList.add('filtered'))

	Array.from(todoList.children)
		.filter(todo => todo.textContent.toLowerCase().includes(term))
		.forEach(todo => todo.classList.remove('filtered'))
}

// Search
search.addEventListener('keyup', e => {
	const term = search.value.trim().toLowerCase();
	filterTodos(term)
})