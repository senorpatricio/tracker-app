import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IEditTodo } from '../Interfaces/declarations';

export default function EditCard(props: IEditTodo) {
  const [open, setOpen] = React.useState<boolean>(props.open);
  const [title, setTitle] = React.useState<string>(props.title);
  const [body, setBody] = React.useState<string>(props.body);
  // const [duedate, setDueDate] = React.useState<string>(props.duedate);


  const handleChangeTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  
  const handleChangeTodoBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const handleCloseCancel = () => {
    setOpen(false);
    // props.closeDialog('', '','');    
    props.closeDialog('', '');    
  }

  const handleCloseAccept = () => {
    setOpen(false);    
    console.log("Inside EditCard: ", title, body);
    
    // props.closeDialog(title, body, duedate);
    props.closeDialog(title, body);
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