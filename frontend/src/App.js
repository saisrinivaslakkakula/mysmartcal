import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Footer from './components/Footer'
import Header from './components/Header'
import {Container} from 'react-bootstrap'
import Homescreen from './screens/Homescreen'
import CalendarScreen from './screens/Calendar'
import Loginscreen from './screens/loginScreen'
import Registerscreen from './screens/registerScreen'
import UserProfileScreen from "./screens/UserProfileScreen";
import FreelancersScreen from "./screens/FreelancersScreen";
import FreelancerScreen from "./screens/FreelancerScreen";
import FreelancerCalendarScreen from "./screens/FreelancerCalendarScreen";
import Dashboard from './screens/Dashboard'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  //const{freelancer} = userInfo
  return (
    <Router>
    <Header></Header>
    <main className='py-5'>
      <Container>
        
        <Route path='/login' component={Loginscreen}/> 
        <Route path='/register' component={Registerscreen}/> 
        <Route path='/profile' component={UserProfileScreen}/>
        <Route path='/calendar' component={CalendarScreen}/>
        <Route path='/freelancers' component={FreelancersScreen}/>
        <Route path='/freelancer/:id' component={FreelancerScreen}/>
        <Route path='/freelancerCalendar/:id' component={FreelancerCalendarScreen} />
        {userInfo? userInfo.freelancer? <Route path='/' exact component={Dashboard}/> : <Route path='/' exact component={FreelancersScreen}/> : <Route path='/' exact component={Homescreen}/> }
      </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
