'use strict'
// fitch existing todos from localstorage
const getSavedTodos = () => {

  let todoJSON = localStorage.getItem('todos');

    try {
      return todoJSON ? JSON.parse(todoJSON) : [];
    } catch (error) {
      return [];
    }
}
//save todos to localstorage 

const saveToLocalStorage = (todos)  => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

//render to dos

const renderTodos = (todos, filters) => {
  let filterTodoList = todos.filter((element) => element.text.toLowerCase().includes(filters.title.toLowerCase()));
  filterTodoList = filterTodoList.filter((element) => {


    if (filters.hideCompleted) {
      return !element.completed
    } else {
      return true
    }
  })
  

  const incompleteTodos = filterTodoList.filter((element) => !element.completed);

  document.querySelector('#summary').appendChild(generateSummeryDOM(incompleteTodos));

  document.querySelector('#todos').innerHTML = '';
  filterTodoList.forEach(element => {
    const p = generateTodoDOM(element);
    document.querySelector('#todos').appendChild(p);
  });
}

// removeTodo function for removing todo

const removeTodo =  (id) => {
  const findIndex = todos.findIndex((todo) => todo.id === id );
  if(findIndex > -1){
    todos.splice(findIndex, 1);
  }
}

const modifyTodos = function (id) {
  const findedObject = todos.find(todo => todo.id === id);
  if(findedObject){
    findedObject.completed = !findedObject.completed
  }
}

const generateTodoDOM = (element) => {
  
 
  const label = document.createElement('label');
  const divElement = document.createElement('div');
  const checkbox = document.createElement('input');
  const spanElement = document.createElement('span');
  const button = document.createElement('button');

  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = element.completed;
  divElement.appendChild(checkbox);

  checkbox.addEventListener('change', () =>{ 
  modifyTodos(element.id);
  saveToLocalStorage(todos);
  renderTodos(todos,filters);
  })

  spanElement.textContent = `    ${element.text}    `;
  divElement.appendChild(spanElement);

  label.classList.add('list-item');
  divElement.classList.add('list-item__container');
  label.appendChild(divElement)

  button.textContent = 'Remove';
  button.classList.add('button','button--text')
  label.appendChild(button); 

  button.addEventListener('click', ()=>{
    removeTodo(element.id);
    saveToLocalStorage(todos);
    renderTodos(todos,filters);
  })

  return label;
}

const generateSummeryDOM = (incompleteTodos) => {
  document.querySelector('#summary').innerHTML = '';
  const summary = document.createElement('h3');
  summary.classList.add('list-title');

  if(incompleteTodos.length === 0){
    summary.textContent = `Nothing left to do.`;
    summary.classList.add('list-title__none');
  }
  else if(incompleteTodos.length === 1)
    summary.textContent = `You have ${incompleteTodos.length} todo left .`;
  else
    summary.textContent = `You have ${incompleteTodos.length} todos left .`;
  
  return summary;
}
