'use strict'

let todos = getSavedTodos();

const filters = {
  title: '',
  hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', (event)=>{
  filters.title = event.target.value;
  renderTodos(todos, filters);
})

document.querySelector('#new-todo').addEventListener('submit', (event)=>{
  event.preventDefault();

  const newTodo = event.target.elements.todosInput.value;
  if(newTodo.trim().length > 0){
  todos.push({
    id: uuidv4(),
    text: event.target.elements.todosInput.value,
    completed: false,
  })
  saveToLocalStorage(todos);
  event.target.todosInput.value = '';
  renderTodos(todos, filters);
}
})

document.querySelector('#hide-completed').addEventListener('change', (event)=>{

  filters.hideCompleted = event.target.checked;
  renderTodos(todos, filters);
})