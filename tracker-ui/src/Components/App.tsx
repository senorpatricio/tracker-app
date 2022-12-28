import React from 'react';

import Header from './Header';
import Content from './Content';
import { IAppState } from '../Interfaces/declarations';
import Container from '@mui/material/Container';
// import '../components/App.css';

class App extends React.PureComponent<any, IAppState> {

  constructor(props: any) {
    super(props);
        
    this.state = { dataLoaded: false }   
  }
  
  private checkIndex = (current: number, needed: number) => {
    return current === needed;
  }

  render() {
    return (
      <div className="App">
        <Header /> 
        <Container>
          <Content />
        </Container>                   
      </div>
    );
  }
}

export default App;