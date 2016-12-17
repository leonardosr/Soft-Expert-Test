import {isEnabled} from './lib/feature';
import {toggleListItemsDisplay, changeFilters} from './lib/filters';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');

    if(isEnabled('filter')) {
        var filters = document.getElementsByClassName('filter');

        var filterChecked = 'all';

        for(var i = 0; i != filters.length; ++i)
        {
            if(filters[i].checked)
                filterChecked = filters[i].value;
        }

    }

    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems),
        renderFilters()
    );

    if(isEnabled('filter')) {

        document.getElementById(filterChecked).checked = true;
        changeFilters(filterChecked);

    }

}

function renderApp(input, todoList, filters) {

    if(!isEnabled('filter')) {
        filters = '';
    }

    if(isEnabled('renderBottom')) {
        if(isEnabled('filterTop'))
            return renderViews(filters, todoList, input);
        else
            return renderViews(todoList, input,filters);
    } else {
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
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}" style="display:list-item;">
        <label class="custom-checkbox"><input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}<span></span>
    </label></li>`;
}

function renderFilters() {
    return `<div class="filters"><label class="custom-radio"><input type="radio" class="filter" name="filter" id="all" value="all" checked>Todos<span></span></label>
            <label class="custom-radio"><input type="radio" class="filter" name="filter" id="open" value="open">Abertos<span></span></label>
            <label class="custom-radio"><input type="radio" class="filter" name="filter" id="done" value="done">Fechados<span></span></label></div>`;
}
