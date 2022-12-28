import React from 'react';

import { ITodo, IProps, IContentState } from '../Interfaces/declarations';

import Todo from './Todo';
import TodoForm from './TodoForm';

// import './Content.css';

export default class Content extends React.PureComponent<any, IContentState> {
  constructor(props: IProps) {
    super(props);

    this.state = { dataLoaded: false, todos: [] };
     
    this.fetchTodos = this.fetchTodos.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }
  
  handleAddTodo(ntitle: string, nbody: string, nduedate: Date | null) {        
     const newTodo: ITodo = { todo_id: Date.now(), todo_title: ntitle, todo_body: nbody, todo_duedate: nduedate }     
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     // Using Fetch to post the new todo:
     const request = new Request('http://localhost:5000/todos/', { method: 'POST', headers: headers, body: JSON.stringify(newTodo), mode: 'cors' });
     
     fetch(request)
       .then(response => {
         if(response.status === 200) {
           console.log("Todo saved");          
           console.log("dataLoaded: ", this.state.dataLoaded);                             
           return response.json();
         }
       })
       .then(data => {
         this.setState({ dataLoaded: !this.state.dataLoaded, todos: data});
       })         
       .catch(err => {
         if (err) {
           console.error(err);
         }
       })
   }  

  // private handleEditTodo(id: number, title: string, body: string, duedate: string) {
  private handleEditTodo(id: number, title: string, body: string) {
    if( isNaN(id) || id === undefined )
      return;
    // const theTodo: ITodo = { todo_id: id, todo_title: title, todo_body: body, todo_duedate: duedate }
    const theTodo: ITodo = { todo_id: id, todo_title: title, todo_body: body }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request('http://localhost:5000/todos/' + id, { method: 'PUT', headers: headers, body: JSON.stringify(theTodo), mode: 'cors'} );
    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState(state => ({ todos: data, dataLoaded:!this.state.dataLoaded }));       
      })
      .catch(err => {
        console.error(err);
      })
  }

  handleDeleteTodo(id: number) {
    if(isNaN(id) || id === undefined )
      return;
    
    let actualState = this.state.todos;
    
    const index = actualState.findIndex((currentValue) =>{
      return currentValue.todo_id === id;
    }, id);   

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');    
    const request = new Request('http://localhost:5000/todos/' + id, { method: 'DELETE', headers: headers, body: '', mode: 'cors'} );  
    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ todos: data }, () => { this.setState({ dataLoaded: !this.state.dataLoaded }) });        
      })
      .catch(err => {
        console.error(err);
      })     
  }

  private fetchTodos() {
    const url = 'http://localhost:5000/todos/';
    fetch(url)
      .then(response => {
        if(response.status === 200) {
          return response.json(); 
        }
        else {
          throw new Error(`Status: ${response.status}. Something is wrong with server!`)
        }        
      })
      .then(response => {        
        const todos = response;
        this.setState({ todos: todos}, () => { this.setState({dataLoaded: !this.state.dataLoaded }) });
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.fetchTodos();
    this.forceUpdate();
  }

  private createTodo = (todoData: ITodo) => {
    return (
      <Todo key={todoData.todo_id} 
            todo_id={todoData.todo_id} 
            todo_title={todoData.todo_title} 
            todo_body={todoData.todo_body}
            todo_duedate={todoData.todo_duedate}
            handleDeleteTodo={this.handleDeleteTodo} 
            handleEditTodo={this.handleEditTodo} 
            />
    )
  } 

  public render() { 
    
    return(
      <>
        <TodoForm handleAddTodo={this.handleAddTodo}/>
        { ((!this.state.todos) || (this.state.todos.length <= 0)) && (<h3>No todos to show!</h3>)  }
        
        {
          (this.state.todos.map(todo => this.createTodo(todo)))
        }
      </>
    );
  }
}