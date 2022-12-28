import React, { FunctionComponent, useState } from 'react';
import { ITodo, ITodoHandlers } from '../Interfaces/declarations';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditCard from './EditCard';

const useStyles = makeStyles({
    root: {
      minWidth: "300px",
      marginLeft: '20vh',
      marginRight: '20vh',
      marginTop: '20px',
      borderTop: '1px solid #eeeeee',
      visibility: 'visible' 
    },
    todoDate: {
      fontSize: 14,
      color: '#0066ff' 
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
    button: {
        marginRight: 2,
        alignItems: "right"
    }
  });

const TodoCard = (props: ITodo & ITodoHandlers) => {
     
  const [todoID, setTodoID] = useState<number>(props.todo_id);
  const [todo_title, setTodoTitle] = useState<string>(props.todo_title);
  const [todo_body, setTodoBody] = useState<string>(props.todo_body);
  // const [todo_duedate, setTodoDueDate] = useState<string>(props.todo_duedate | '');
  const [open, setOpen] = useState<boolean>(false);
  
  const datetime = (dt: number) => {
    let date: Date = new Date(dt);
    let result: string = date.toLocaleDateString() + ':' + date.toLocaleTimeString();
    return result;
  }

  const delTodo = () => {
    const current_id = todoID;
    props.handleDeleteTodo(current_id);       
    setTodoTitle('');
    setTodoBody('');    
  }
  
  const edTodo = () => {
    setOpen(true);
  }

  // const closeDialog = (title: string, body: string, duedate: string) => {
  const closeDialog = (title: string, body: string) => {
    if(title === '' || body === '') {
      setOpen(false);
      return;
    }

    setTodoTitle(title);
    setTodoBody(body);
    // setTodoDueDate(duedate)
    setOpen(false);
    console.log("Inside TodoCard closeDialog: ", todoID, title, body);
    // console.log("Inside TodoCard closeDialog: ", todoID, title, body, duedate);
    // props.handleEditTodo(todoID, title, body, duedate);        
    props.handleEditTodo(todoID, title, body);        
  }

  const classes = useStyles();  

  return (                 
    <>
    <Card key={todoID} className={classes.root} >        
        <CardContent>
          <Typography className={classes.todoDate}>
            {datetime(todoID)}
          </Typography>  
          <Typography className={classes.title} color="textPrimary" gutterBottom>
          { todo_title }
          </Typography>
          <Typography variant="h5" component="h2">            
          { todo_body }
          </Typography>               
        </CardContent>
        <CardActions>
            <Button id="edTodo" size="small" variant="contained" color="primary" onClick={edTodo}>Edit</Button>
            <Button id="delTodo" size="small" variant="contained" color="secondary" onClick={delTodo}>X</Button>
        </CardActions>
    </Card>           
    {/* <EditCard title={todo_title} body={todo_body} duedate={todo_duedate} open={open} closeDialog={closeDialog} /> */}
    <EditCard title={todo_title} body={todo_body}  open={open} closeDialog={closeDialog} />
    </>
  );
}  

export default TodoCard;