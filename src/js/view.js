import {isEnabled} from './lib/feature';

export function render(el, state) {

    const filters = state.filters.map(renderFilterItem).join('');
    const todoItems = state.todos.map(renderTodoItem).join('');

    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        renderFilters(filters)
    );

}

function renderApp(input, todoList, filters) {

    if(!isEnabled('filter')) {
        filters = '';
    }

    if(isEnabled('renderBottom')) {
        if(isEnabled('filterTop'))
            return renderViews(filters, todoList, input);
        else
            return renderViews(todoList, input, filters);
    } else {
        console.log('aqui');
        return renderViews(input, filters, todoList);
    }

}

function renderViews(section1, section2, section3) {
    return `<div id="app"><h2 class="title">Lista de Tarefas</h2>
        ${section1}
        ${section2}
        ${section3}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input"><button id="addTodo"></button><input type="text" id="todoInput" placeholder="Adicione uma nova tarefa"></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {

    const className = todo.done ? 'done' : 'open';

    if(isEnabled('filter')) {

        let activeFilter = checkFilters();

        if(activeFilter != 'all' && activeFilter != className)
            return;

    }

    return `<li class="todo__item todo__item--${className}" style="display:list-item;">
        <label class="custom-checkbox"><input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}<span></span>
    </label></li>`;
}

function renderFilters(flters) {
    return `<div class="filters">${flters}</div>`;
}

function renderFilterItem(filter) {
    return `<label class="custom-radio"><input type="radio" class="filter" name="filter" id="${filter.value}" value="${filter.value}" ${filter.checked}>${filter.name}<span></span></label>`;
}

function checkFilters() {

    var filters = document.getElementsByClassName('filter');

    var filterChecked = 'all';

    for(var i = 0; i != filters.length; ++i)
    {
        if(filters[i].checked)
            filterChecked = filters[i].value;
    }

    return filterChecked;

}