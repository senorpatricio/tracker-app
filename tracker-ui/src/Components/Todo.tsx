import React from 'react';

import TodoCard from './TodoCard';

import { ITodo, ITodoHandlers } from '../Interfaces/declarations';

class Todo extends React.PureComponent<ITodo & ITodoHandlers, ITodo> {
    constructor(props: ITodo & ITodoHandlers ) {
        super(props);
        
        this.state = {
          todo_id: props.todo_id,
          todo_title: props.todo_title,
          todo_body: props.todo_body,
          todo_duedate: props.todo_duedate
        }        
    }        

    render() {    
      const todo: ITodo = this.props;
      return (
        <TodoCard todo_id={todo.todo_id} todo_title={todo.todo_title} todo_body={todo.todo_body} todo_duedate={todo.todo_duedate}
            handleDeleteTodo={this.props.handleDeleteTodo} handleEditTodo={this.props.handleEditTodo}/>
      );
    }
}

export default Todo;