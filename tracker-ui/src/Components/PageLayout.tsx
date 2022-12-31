import Typography from "@mui/material/Typography";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Header from './Header';
import Content from './Content';
import Container from '@mui/material/Container';
import { msalInstance } from "..";

import { IUser } from "../Interfaces/declarations";

type Props = {
    children?: React.ReactNode;
};

export const PageLayout: React.FC<Props> = () => {
  const { instance } = useMsal();
  const activeUser = instance.getActiveAccount();
  console.log('active user', activeUser);
  
  const handleAddUser = (nUserName: string, nUserId: string, nUserEmail: string) => {        
    const newUser: IUser = { user_id: nUserId, username: nUserName, user_email: nUserEmail }     
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request('http://localhost:5000/users/', { method: 'POST', headers: headers, body: JSON.stringify(newUser), mode: 'cors' });
    
    fetch(request)
      .then(response => {
        if(response.status === 200) {
          console.log("Todo saved");          
          // console.log("dataLoaded: ", this.state.dataLoaded);                             
          return response.json();
        }
      })
      .then(data => {
        // this.setState({ dataLoaded: !this.state.dataLoaded, todos: data});
      })         
      .catch(err => {
        if (err) {
          console.error(err);
        }
      })
  }
  
  if(activeUser !== null) {
    handleAddUser(activeUser.username, activeUser.localAccountId, activeUser.username)
  }
    return (
        <>
          <div className="App">
            <Header /> 
            <Container>
              <AuthenticatedTemplate>
                <Content dataLoaded={false} />
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <Typography variant="h6" align="center">Please sign in to see your todos.</Typography>
              </UnauthenticatedTemplate>
            </Container>                   
          </div>
        </>
    );
};