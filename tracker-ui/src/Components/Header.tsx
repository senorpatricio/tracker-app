import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'; 
import SignInSignOutButton from "./SignInSignOutButton";
import UserNameDisplay from './UserNameDisplay';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


export default function HeaderAppBar() {
    const classes = useStyles();
    return (        
        <header id="header" className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">               
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                  Track your Todos here!
              </Typography> 
              <UserNameDisplay/>
              <SignInSignOutButton />           
            </Toolbar>
          </AppBar>            
        </header>               
    );
}
