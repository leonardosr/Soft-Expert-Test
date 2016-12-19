import {isEnabled} from './lib/feature';
import {todos} from './state';
import React from 'react';
import ReactDOM from 'react-dom';

export function renderView(state) {

    ReactDOM.render(<TodoApp />, document.getElementById('container'));

    document.getElementById("todoInput").focus();

}

class TodoApp extends React.Component{

    constructor(props){

        super(props);

        this.state = todos.getState();

    }

    render(){

        let section1 = null;
        let section2 = null;
        let section3 = null;

        let input = <TodoInput />;
        let filters = <FilterList filters={this.state.filters} />;
        let todoList = <TodoList todos={this.state.todos} />;

        if(!isEnabled('filter')) {
            filters = null;
        }

        if(isEnabled('renderBottom')) {
            if(isEnabled('filterTop')) {
                section1 = filters;
                section2 = todoList;
                section3 = input;
            } else {
                section1 = todoList;
                section2 = input;
                section3 = filters;
            }
        } else {
                section1 = input;
                section2 = filters;
                section3 = todoList;
        }

        <TodoInput />;
        <FilterList filters={this.state.filters} />;
        <TodoList todos={this.state.todos} />;

        return (
                <div id="app"><h2 className="title">Lista de Tarefas</h2>
                    {section1}
                    {section2}
                    {section3}
                </div>
        );

    }

}

class TodoInput extends React.Component{
  render(){
    return (
        <div className="todo__input"><button id="addTodo">+</button><input type="text" id="todoInput" placeholder="Adicione uma nova tarefa" /></div>
    );
  }
}

const Todo = ({todo}) => {

    let classComplement = todo.done ? 'done' : 'open';

    let className = "todo__item todo__item--" + classComplement;

    if(isEnabled('filter')) {

        let activeFilter = checkFilters();

        if(activeFilter != 'all' && activeFilter != classComplement)
            return null;

    }

    return (
        <li className={className}>
            <label className="custom-checkbox">
                <input className="js_toggle_todo" type="checkbox" data-id={todo.id} checked={todo.done ? 'checked' : ''}/>
                    {todo.text}<span></span>
            </label>
        </li>
    );
}

const TodoList = ({todos}) => {

    const todoItem = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} />)
    });
    return (<ul className="todo">{todoItem}</ul>);
}

const Filter = ({filter}) => {

    return (
        <label className="custom-radio">
            <input type="radio" className="filter" name="filter" id={filter.value} value={filter.value} checked={filter.checked} />{filter.name}
            <span></span>
        </label>
    );
}

const FilterList = ({filters}) => {

    const filterItem = filters.map((filter) => {
        return (<Filter filter={filter} key={filter.value} />)
    });
    return (<div className="filters">{filterItem}</div>);
}

function checkFilters() {

    let filters = document.getElementsByClassName('filter');

    let filterChecked = 'all';

    for(let i = 0; i != filters.length; ++i)
    {
        if(filters[i].checked)
            filterChecked = filters[i].value;
    }

    return filterChecked;

}