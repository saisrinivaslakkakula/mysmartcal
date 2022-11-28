import Footer from './components/Footer'
import Header from './components/Header'
import {Container} from 'react-bootstrap'
import Homescreen from './screens/Homescreen'
import CalendarScreen from './screens/Calendar'
import Loginscreen from './screens/loginScreen'
import Registerscreen from './screens/registerScreen'
import ProfileScreen from './screens/profileScreen'
import UserProfileScreen from "./screens/UserProfileScreen";
import FreelancersScreen from "./screens/FreelancersScreen";
import FreelancerScreen from "./screens/FreelancerScreen";
import FreelancerCalendarScreen from "./screens/FreelancerCalendarScreen";
import {BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {
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
        <Route path='/' component={Homescreen} exact/>
      </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
