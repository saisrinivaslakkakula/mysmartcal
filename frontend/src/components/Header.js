import React from 'react'
import {Navbar,Nav,Container,Form,FormControl,Button, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../actions/userActions'

const Header = () => {
  const userLogin = useSelector(state=>state.userLogin)
  const dispatch = useDispatch()
  const {userInfo} = userLogin
  const logoutHandler = () =>{
    dispatch(logout())
  }

    return (
        <header>
          <Navbar bg="dark" variant="dark"expand="lg" collapseOnSelect>
             <Container>
               <LinkContainer to="/">
                <Navbar.Brand ><span><i className='fa fa-calendar'> &nbsp;</i></span>My Smart Cal</Navbar.Brand>
               </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button ><i className="fa fa-search"></i></Button>
                  </Form>
                  <Nav className="ml-auto">
                    {userInfo
                    ? 
                    <NavDropdown title={userInfo.name} id='user-name'>
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>profile</NavDropdown.Item>
                      </LinkContainer> 
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      
                    </NavDropdown>
                    :
                    <LinkContainer to="/login">
                    <Nav.Link ><i className='fas fa-user'></i>Sign in</Nav.Link>
                    </LinkContainer> 
                    }
                    
                  </Nav>
                </Navbar.Collapse>
              </Container>
          </Navbar>
        </header>
    )
}

export default Header

