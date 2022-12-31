import React, { useEffect, useState } from 'react';
import { useMsal, useAccount } from "@azure/msal-react";
import { ITodo, IProps, IContentState } from '../Interfaces/declarations';

import Todo from './Todo';
import TodoForm from './TodoForm';

// export default class Content extends React.PureComponent<any, IContentState> {
const Content = (props: IProps) => {
  console.log('props', props)
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, [account]);

  useEffect(() => {}, [todos])

  
  const handleAddTodo = (ntitle: string, nbody: string, nTodoUserId: string, nTodoCompleted: boolean, nduedate: Date | null) => {        
     const newTodo: ITodo = { todo_id: Date.now(), todo_title: ntitle, todo_body: nbody, todo_user_id: nTodoUserId, todo_completed: nTodoCompleted, todo_duedate: nduedate }     
     const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     const request = new Request('http://localhost:5000/todos/', { method: 'POST', headers: headers, body: JSON.stringify(newTodo), mode: 'cors' });
     
     fetch(request)
       .then(response => {
         if(response.status === 200) {
           console.log("Todo saved");          
           return response.json();
         }
       })
       .then(data => {
         setDataLoaded(!dataLoaded);
         setTodos(data);
       })         
       .catch(err => {
         if (err) {
           console.error(err);
         }
       })
   }  

  const handleEditTodo = (id: number, title: string, body: string, user_id: string, completed: boolean, due_date?: Date |null|undefined) => {
    if( isNaN(id) || id === undefined )
      return;
    const theTodo: ITodo = { todo_id: id, todo_title: title, todo_body: body, todo_user_id: user_id, todo_completed: completed,  todo_duedate: due_date }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request('http://localhost:5000/todos/' + id, { method: 'PUT', headers: headers, body: JSON.stringify(theTodo), mode: 'cors'} );
    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTodos(data);
        setDataLoaded(!dataLoaded)
      })
      .catch(err => {
        console.error(err);
      })
  }

  const handleDeleteTodo = (id: number) => {
    if(isNaN(id) || id === undefined )
      return;
    
    let actualState = todos;
    
    const index = actualState.findIndex((currentValue: ITodo) =>{
      // if(currentValue.todo_id) {}
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
        setTodos(data);
        setDataLoaded(!dataLoaded); 
      })
      .catch(err => {
        console.error(err);
      })     
  }

  const fetchTodos = () => {
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
        const todosResponse = response;
        setTodos(todosResponse);
        setDataLoaded(!dataLoaded);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const createTodo = (todoData: ITodo) => {
    return (
      <Todo key={todoData.todo_id} 
            todo_id={todoData.todo_id} 
            todo_title={todoData.todo_title} 
            todo_body={todoData.todo_body}
            todo_duedate={todoData.todo_duedate}
            todo_completed={todoData.todo_completed}
            todo_user_id={todoData.todo_user_id}
            handleDeleteTodo={handleDeleteTodo} 
            handleEditTodo={handleEditTodo} 
            />
    )
  } 

  // public render() { 
    
    return(
      <>
        <TodoForm handleAddTodo={handleAddTodo} user_id={account?.localAccountId} />
        { ((todos !== null && todos.length !<= 0)) && (<h3>No todos to show!</h3>)  }
        {
          (todos.map(todo => createTodo(todo)))
        }
      </>
    );
  // }
}

export default Content;