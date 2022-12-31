import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IEditTodo } from '../Interfaces/declarations';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export default function EditCard(props: IEditTodo) {
  const [open, setOpen] = React.useState<boolean>(props.open);
  const [title, setTitle] = React.useState<string>(props.title);
  const [body, setBody] = React.useState<string>(props.body);
  const [completed, setCompleted] = React.useState<boolean>(false)
  const [duedate, setDueDate] = React.useState<Date | null | undefined>(props.duedate);
  const [todoUserId, setTodoUserId] = React.useState<string>(props.userId);


  const handleChangeTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  
  const handleChangeTodoBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const handleChangeCompleted = () => {
    setCompleted(!completed);  
  }

  const handleChangeTodoDueDate = (newValue: Date | null | undefined) => {
    setDueDate(newValue)
  }
  const handleCloseCancel = () => {
    setOpen(false);
    props.closeDialog('', '', '', completed, null);    
  }

  const handleCloseAccept = () => {
    setOpen(false);    
    console.log("Inside EditCard: ", title, body, duedate, todoUserId);
    
    props.closeDialog(title, body, todoUserId, completed, duedate);
  };

  return (
    <div>     
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the todo's title and body text:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Todo Title"
            type="email"
            fullWidth
            value={title}
            onChange={handleChangeTodoTitle}
          />
          <TextField id="filled-multiline-static-edit" label="Todo Body" multiline minRows="4" 
          fullWidth variant="filled" value={body} onChange={handleChangeTodoBody}/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            renderInput={(props) => <TextField variant="outlined" {...props}/>}
              value={duedate}
              onChange={handleChangeTodoDueDate}
              
            />
          </LocalizationProvider>
          {completed ? 
            <Button style={ {margin: "10px"}} endIcon={ <CheckBoxIcon/>} onClick={handleChangeCompleted} variant="outlined" color="primary">
              Complete
            </Button> 
            :

            <Button style={ {margin: "10px"}} endIcon={ <CheckBoxOutlineBlankIcon/>} onClick={handleChangeCompleted} variant="outlined" color="primary">
              Incomplete
            </Button>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCloseAccept} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}