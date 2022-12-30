import Typography from "@mui/material/Typography";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Header from './Header';
import Content from './Content';
import Container from '@mui/material/Container';

type Props = {
    children?: React.ReactNode;
};

export const PageLayout: React.FC<Props> = () => {
    return (
        <>
          <div className="App">
            <Header /> 
            <Container>
              <AuthenticatedTemplate>
                <Content />
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <Typography variant="h6" align="center">Please sign in to see your todos.</Typography>
              </UnauthenticatedTemplate>
            </Container>                   
          </div>
        </>
    );
};