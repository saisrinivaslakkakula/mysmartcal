import React, { Fragment, Component } from "react";
import { Route } from "react-router-dom";
import MyCalendar from "./Calendar";
import Inbox from "./Inbox";
import Dashboard from "./Dashboard";
import FreelancerProfile from "./FreelancerProfile";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment key='key'>
        <main>
          
          {/* <Route path='/signin' component={SignIn} /> */}
          <Route path='/freelancer/Dashboard' component={Dashboard} />
          <Route path='/freelancer/Calendar' component={MyCalendar} />
          <Route path='/freelancer/Inbox' component={Inbox} />
          <Route path='/freelancer/Profile' component={FreelancerProfile}/>
        </main>
      </Fragment>
    );
  }
}

export default Main;