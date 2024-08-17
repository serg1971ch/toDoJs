'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const addTaskButton = document.querySelector('.header-button');
let todoData = JSON.parse(localStorage.getItem('todoData')) || [];
//const todoData = [];

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    todoData.forEach(function (item) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>'
            + '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            saveToLocalStorage();
            render();
        })

        li.querySelector('.todo-remove').addEventListener('click', function () {
            const index = todoData.findIndex(task => task.text === item.text);
            if (index > -1) {
                todoData.splice(index, 1);
                saveToLocalStorage();
            }
            render();
        })
    })
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    const newToDoText = headerInput.value.trim();

    if (newToDoText !== "") {
        const newToDo = {
            text: headerInput.value,
            completed: false
        }
        todoData.push(newToDo);
        saveToLocalStorage();
        headerInput.value = '';
        render();
    } else if (newToDoText !== "" && addTaskButton.disabled ==='true' ) {
            addTaskButton.disabled ='false';
        } else {
       // addTaskButton.disabled ='true';
        alert('Пожалуйста, введите текст задачи.');  // Вывод сообщения об ошибке
    }

    headerInput.addEventListener('input', function () {
        const newToDoText = headerInput.value.trim();
        addTaskButton.disabled = newToDoText === '';  // Блокировка кнопки, если поле пустое
    });

// Инициализация кнопки при загрузке страницы
    document.addEventListener('DOMContentLoaded', function () {
        addTaskButton.disabled = true;
    });

    render();
})

const saveToLocalStorage = function () {
    localStorage.setItem('todoData', JSON.stringify(todoData));
};

document.addEventListener("DOMContentLoaded", function () {
    render()
})