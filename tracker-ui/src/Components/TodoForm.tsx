import React from 'react';
import { withStyles, Theme, StyleRules } from '@material-ui/core/styles';
import { Box, Button, StyledComponentProps } from '@material-ui/core';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';

import { ITodo, IFunc } from '../Interfaces/declarations';

// import './TodoForm.css';


const styles = (theme?: Theme): StyleRules<any> => { 
    return {
      root: {
      '& .MuiTextField-root': {
        margin: theme? theme.spacing(1) : 1 
      },
      display: "flex",
      flexDirection: "column",
      marginLeft: "30%",
      marginRight: "30%"
    },
  }
}
 
interface IState {
  todo_title: string;
  todo_body: string;
  todo_duedate: Date | null;
}

class TodoForm extends React.PureComponent<IFunc & StyledComponentProps, IState> {
  constructor(props: IFunc & StyledComponentProps) {
    super(props);

    this.state = {
      todo_title: '',
      todo_body: '',
      todo_duedate: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTodoTitle = this.handleChangeTodoTitle.bind(this);
    this.handleChangeTodoBody = this.handleChangeTodoBody.bind(this);
    this.handleChangeTodoDueDate = this.handleChangeTodoDueDate.bind(this)
    this.addTodo = this.addTodo.bind(this);
  }
  
  private handleSubmit(event: any) {
    event.preventDefault();
  }

  private handleChangeTodoTitle(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ todo_title: event.target.value })
  }

  private handleChangeTodoBody(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ todo_body: event.target.value })
  }
  
  private handleChangeTodoDueDate(newValue: Date | null) {
    this.setState({ todo_duedate: newValue })
  }

  private addTodo() {
    
    if(this.state.todo_title === '' || this.state.todo_body === '') 
      return;
    this.props.handleAddTodo(this.state.todo_title, this.state.todo_body, this.state.todo_duedate);
    this.setState({ todo_title: '', todo_body: '', todo_duedate: null });
  }
  
  render() {
   
    const todo_title = this.state.todo_title;
    const todo_body  = this.state.todo_body;
    const titleStyle = { marginTop: '10px', marginBottom: '5px' }
    const todo_duedate = this.state.todo_duedate;
    const inputProps = {

    }
    return (    
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <Box> 
          <TextField id="filled-basic" label="Todo Title" style={titleStyle} variant="filled" fullWidth value={todo_title} onChange={this.handleChangeTodoTitle}/>
          <TextField id="filled-multiline-static" label="Todo Body" multiline minRows="4" 
            fullWidth variant="filled" value={todo_body} onChange={this.handleChangeTodoBody} /> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            renderInput={(props) => <TextField variant="outlined" {...props}/>}
              value={todo_duedate}
              onChange={this.handleChangeTodoDueDate}
              
            />
          </LocalizationProvider>
          <Button style={ {marginTop:'10px'}} variant="contained" color="primary" onClick={this.addTodo}>Add Todo</Button>
        </Box>    
      </form>                
    );
  }
  
}

const StyledComponent = withStyles(styles)(TodoForm);
export default StyledComponent; // TodoForm;