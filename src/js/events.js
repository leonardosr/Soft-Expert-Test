import {todos} from './state';
import {listen} from './lib/events';
import {toggleListItemsDisplay, changeFilters} from './lib/filters';
import {addTodo, toggleTodoState} from './actions';

export function registerEventHandlers() {
    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');

        todos.dispatch(addTodo(todoInput.value));

        document.getElementById("todoInput").focus();

        event.stopPropagation();
    });

    listen('keypress', '#todoInput', event => {
        const todoInput = document.getElementById('todoInput');
        
        if(event.which == 13) 
        	todos.dispatch(addTodo(todoInput.value));

        document.getElementById("todoInput").focus();
        
        event.stopPropagation();
    });

    listen('click', '.filter', event => {

        changeFilters(event.target.value);

    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });

}