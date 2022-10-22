// import React, { Component } from "react";
// import "./App.css";
// import MyCalendar from "./Calendar";
// import Inbox from "./Inbox"
// import Header from "./header";
// import Container from "react-bootstrap/Container"
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Container>
//           <Row>
//             <Header />
//           </Row>
//           <Row className="justify-content-md-center">
//           <MyCalendar/>
//           {/* <Inbox/> */}
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }

// export default App;

import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { Switch } from "react-router";
import Main from "./Main";
// import { createStore } from 'redux'

import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <React.Fragment key='key'>
        <Switch>
          <Main />
        </Switch>
      </React.Fragment>
    </Provider>
  );
}

export default App;