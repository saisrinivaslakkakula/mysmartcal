import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaRegUser } from "react-icons/fa";
import mainstyle from "./headerstyle";
import "./styles/Header.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container style={{ maxWidth: "100%", marginLeft: "10px", marginBottom: "15px", marginTop: "20px", marginRight:"10px"}}>
                        <Navbar.Brand href="/freelancer/Calendar" style={{paddingLeft: "5px", textStyle:"bold", fontSize: "28px"}}>SmartCal</Navbar.Brand>
                        <Nav className="justify-content-end">
                            <Nav.Item>
                            <Nav.Link href="/freelancer/Dashboard" style={{ paddingLeft: "10px", paddingRight: "10px" }}>Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link href="/freelancer/Calendar" style={{ paddingLeft: "10px", paddingRight: "10px" }}>Calendar</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link href="/freelancer/Inbox" style={{ paddingLeft: "10px", paddingRight: "80px" }}>Messages</Nav.Link>
                            </Nav.Item>
                            <Nav.Item style={{ paddingLeft: "10px", paddingRight: "20px" }}>
                            <Link to={{ pathname: "/freelancer/Profile", state: "" }}>
                                <FaRegUser
                                    style={{ height: "50px" }}
                                    xs='6'
                                    size='32px'
                                    color='white' />
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default Header;