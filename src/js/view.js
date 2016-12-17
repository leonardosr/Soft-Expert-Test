import {isEnabled} from './lib/feature';
import {toggleListItemsDisplay, changeFilters} from './lib/filters';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');

    var filters = document.getElementsByClassName("filter");

    var filterChecked = 'all';

    for(var i = 0; i != filters.length; ++i)
    {
        if(filters[i].checked)
            filterChecked = filters[i].value;
    }

    console.log(filterChecked);

    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        renderFilters()
    );

    document.getElementById(filterChecked).checked = true;
    changeFilters(filterChecked);

}

function renderApp(input, todoList, filters) {

    if(!isEnabled('filters')) {
        filters = '';
    }

    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(input, todoList, filters);
    } else {
        return renderAddTodoAtTop(input, todoList, filters);
    }

}

function renderWithFilters(input, todoList, filters) {
    return `<div id="app">
        ${input}
        ${filter}
        ${todoList}
    </div>`;
}


function renderAddTodoAtTop(input, todoList, filters) {
    return `<div id="app">
        ${input}
        ${filters}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList, filters) {
    return `<div id="app">
        ${todoList}
        ${input}
        ${filters}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input"><input type="text" id="todoInput"><button id="addTodo">Add</button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}" style="display:list-item;">
        <label><input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </label></li>`;
}

function renderFilters() {
    return `<label><input type="radio" class="filter" name="filter" id="all" value="all" checked>Mostrar todos</label>
            <label><input type="radio" class="filter" name="filter" id="open" value="open">Somente abertos</label>
            <label><input type="radio" class="filter" name="filter" id="done" value="done">Somente fechados</label>`;
}
