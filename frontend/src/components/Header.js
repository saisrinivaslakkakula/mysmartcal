import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import SockJsClient from 'react-stomp';
import axios from 'axios'
import { freeLancerApproveSlot, freeLancerRejectSlot } from '../actions/CalendarActions'

const SOCKET_URL = 'http://100.25.48.11:8080/ws-chat/';
const Header = ({history}) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const userLogin = useSelector(state => state.userLogin)
  const calendarSlots = useSelector(state => state.calendarSlots)
  const dispatch = useDispatch()
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
    //history.push('/')
  }

  const getAllPendingNotifications = async () => {
    const { data } = await axios.get(`/api/user/getNotificationFromMongoDB?userId=${userInfo.id}`)
    //console.log("Notifications from MongoDB in Header",data)
    setNotificationCount(data.length)
    //console.log("data Header", data)
    // filter out the data with receiverId = userInfo.id
    //const filteredData = data.filter((item) => item.receiverId === userInfo.id)
    setMessages(data)
  }
  // use effect and fetch the notifications from the backend
  useEffect(() => {
    // fetch the notifications from the backend
    // set the notification count
    //const messages = await axios.get()
    if (userInfo) {
      getAllPendingNotifications()
    }
    // stop infinite loop
  }, [userInfo, calendarSlots])
  const onConnected = () => {
    console.log("Connected!!")
  }
  const handleNotificationClick = (message, action) => {
    if (action === "Approve") {
      //slotId,userId,freelancerId
      dispatch(freeLancerApproveSlot(message.calendarSlot.slotId, message.calendarSlot.requestedUserId, userInfo.id))
    }
    else {
      dispatch(freeLancerRejectSlot(message.calendarSlot.slotId, message.calendarSlot.requestedUserId, userInfo.id))
    }
    //
  }


  const onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    // concat message only if message id is not already present in the state
    if (!messages.some(message => message.id === msg.id) && msg.receiverId === userInfo.id) {
      setMessages(messages.concat(msg));
      setNotificationCount(notificationCount + 1)
    }

  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container style={{ flexDirection: "column" }}>
          <Row style={{ width: "100%" }}>
            <LinkContainer to="/">
              <Navbar.Brand ><span><i className='fa fa-calendar'> &nbsp;</i></span>My Smart Cal</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">


              <Nav className="ml-auto">


                {userInfo
                  ?
                  <>
                    <SockJsClient
                      url={SOCKET_URL}
                      topics={['/topic/group']}
                      onConnect={onConnected}
                      onDisconnect={console.log("Disconnected!")}
                      onMessage={msg => onMessageReceived(msg)}
                      debug={false}

                    />
                    <NavDropdown title={
                      <div>
                        <i className="fa fa-bell" style={{ color: 'white', fontSize: '20px', marginTop: '10px', marginRight: '10px' }}></i>
                        <NotificationBadge count={notificationCount} effect={Effect.SCALE} />

                      </div>

                    } >
                      {console.log("Messages", messages)}
                      {
                         
                        messages && messages.length > 0 ? messages.map((message, index) => {
                          return (
                            <div>
                              <NavDropdown.Item className="text-wrap" key={index}>{
                                <div>
                                  <Row>
                                    {message.notificationText}
                                  </Row>
                                  <Row>
                                    {message.notificationDate}
                                  </Row>
                                  <Row>
                                    <Button variant="success" size="sm" onClick={() => {
                                      handleNotificationClick(message, "Approve")
                                    }}>Approve</Button>
                                    <Button className="col-sm-4" variant="danger" size="sm" onClick={() => {

                                      handleNotificationClick(message, "Reject")
                                    }}>Reject</Button>

                                  </Row>


                                </div>}
                              </NavDropdown.Item>
                              <hr></hr>

                            </div>


                          )
                        }) :
                          <NavDropdown.Item>no notifications</NavDropdown.Item>}


                    </NavDropdown>
                    <NavDropdown title={<span> <i className='fa fa-user'></i></span>} id='user-name'>
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                    </NavDropdown>
                  </>


                  :
                  <LinkContainer to="/login">
                    <Nav.Link ><i className='fas fa-user'></i>Sign in</Nav.Link>
                  </LinkContainer>
                }


              </Nav>
            </Navbar.Collapse>
          </Row>
          {userInfo && (
            <Row style={{ width: "100%" }}>
              <Nav>
                {userInfo.id && 
                (<Nav.Item>
                  <Nav.Link href="/chat" style={{ paddingLeft: "10px", paddingRight: "10px" }}>Messages</Nav.Link>
                </Nav.Item>)}
                {userInfo.freelancer ?
                  (<Nav.Item>
                    <Nav.Link href="/" style={{ paddingLeft: "10px", paddingRight: "10px" }}>Dashboard</Nav.Link>
                  </Nav.Item>)
                  :
                  (<Nav.Item>
                    <Nav.Link href="/freelancers" style={{ paddingLeft: "10px", paddingRight: "10px" }}>Freelancers</Nav.Link>
                  </Nav.Item>)}

                <Nav.Item>
                  <Nav.Link href="/calendar" style={{ paddingLeft: "10px", paddingRight: "10px" }}>Calendar</Nav.Link>
                </Nav.Item>


              </Nav>
            </Row>

          )}

        </Container>
      </Navbar>
    </header>
  )
}

export default Header

