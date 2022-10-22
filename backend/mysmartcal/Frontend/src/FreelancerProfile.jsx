import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PropTypes from "prop-types";
// import "react-times/css/classic/default.css";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Container,
  Col,
  Card,
  Row,
  Alert,
} from "react-bootstrap";
import Header from "./header";


class FreelancerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    };
  }
  handleUploadImage(e) {
    e.preventDefault();
  }
  handleChange(e) {
    e.preventDefault();
  }
  closeAlert = () => {
    this.setState({ showAlert: false });
  };
  handleChangesSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    const src = "https://cdn.icon-icons.com/icons2/2468/PNG/128/user_kids_avatar_user_profile_icon_149314.png";
    const {
        email_id,
        name,
        nick_name,
        phone_num,
        address_line_1,
        date_of_birth,
        city,
        state,
        password,
        country,
        zipcode,
        profile_pic_file_path,
        showAlert,
        errorMessage,
        message
      } = this.state;
    return (
      <Container fluid='true' style={{ overflow: "hidden", marginLeft: "2%" }}>
        <Row>
          <Header />
        </Row>
        <Row style={{ marginTop: "3%" }}>
          <Form
            onSubmit={this.handleChangesSubmit}
            style={{ fontSize: "18px", fontFamily: "sans-serif" }}>
            <Col align='left'>
              <Row style={{ padding: "0px" }}>
                <Col style={{ marginLeft: "30px" }}>
                  <h4>Profile Update</h4>
                  <Card style={{ width: "16rem", height: "12rem" }}>
                    <div style={{ width: "16rem", height: "8rem" }}>
                      <img src={src} alt='Preview' />
                    </div>
                    <input
                      type='file'
                      name='image'
                      encType='multipart/form-data'
                      className='form-control'
                      style={{ display: "none" }}
                      accept='image/*'
                      ref={(fileInput) => (this.fileInput = fileInput)}
                    />
                    <Card.Footer align='center'>
                      <Button
                        variant='light'
                        style={{
                          paddingTop: "10px",
                          width: "40%",
                          paddingRight: "15px",
                        }}
                        onClick={() => this.fileInput.click()}>
                        Add File
                      </Button>
                      <Button
                        variant='dark'
                        style={{ paddingTop: "10px", width: "40%" }}
                        onClick={this.handleUploadImage}>
                        Upload
                      </Button>
                    </Card.Footer>
                  </Card>
                  <br />
                  <br />
                  <h5>Basic Info</h5>

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Name</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='text'
                        name='name'
                        onChange={this.handleChange}
                        value={name}
                        maxLength='30'
                        required
                        pattern='^[A-Za-z0-9 ]+$'
                      />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Nick Name</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='text'
                        name='nick_name'
                        onChange={this.handleChange}
                        value={nick_name}
                        maxLength='8'
                        pattern='^[A-Za-z0-9 ]+$'
                      />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Date of Birth</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='date'
                        name='date_of_birth'
                        onChange={this.handleChange}
                        value={date_of_birth}
                        required
                      />
                    </Col>
                  </Row>
                  <br />
                  <h5>Security Info</h5>

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Password</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='password'
                        name='password'
                        onChange={this.handleChange}
                        maxLength='8'
                        required
                        pattern='^[A-Za-z0-9 ]+$'
                      />
                    </Col>
                  </Row>
                  <br />
                </Col>
                <Col>
                  <h4>Contact Info</h4>

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Email</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='email'
                        name='email_id'
                        onChange={this.handleChange}
                        value={email_id}
                        maxLength='32'
                        required
                        pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={2}>
                      <Form.Label>Phone Number</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='text'
                        name='phone_num'
                        onChange={this.handleChange}
                        value={phone_num}
                        minLength='10'
                        maxLength='10'
                        required
                        pattern='^[0-9]+$'
                      />
                    </Col>
                  </Row>
                  <br />

                  <h4>Address Info</h4>

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Address Line1</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='text'
                        name='address_line_1'
                        onChange={this.handleChange}
                        value={address_line_1}
                        maxLength='32'
                        required
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={2}>
                      <Form.Label>City</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='text'
                        name='city'
                        onChange={this.handleChange}
                        value={city}
                        minLength='3'
                        maxLength='30'
                        required
                      />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col xs={2}>
                      <Form.Label>State</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <RegionDropdown
                        style={{
                          width: "100%",
                          height: "2.6rem",
                          borderColor: "#eeeee",
                        }}
                        name='state'
                        disableWhenEmpty
                        whitelist={{ US: ["CA"] }}
                        country={country}
                        value={state}
                        onChange={(val) => this.selectRegion(val)}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={2}>
                      <Form.Label>Country</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <CountryDropdown
                        style={{
                          width: "100%",
                          height: "2.6rem",
                          borderColor: "#eeeee",
                        }}
                        name='country'
                        whitelist={["US"]}
                        value={country}
                        onChange={(val) => this.selectCountry(val)}
                      />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Zip Code</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='number'
                        name='zipcode'
                        onChange={this.handleChange}
                        value={zipcode}
                        minLength='5'
                        maxLength='5'
                        required
                        pattern='^[0-9]+$'
                      />
                    </Col>
                  </Row>

                  <br />
                  <Row>
                    <Col xs={2}>
                      <Button variant='dark' type='submit'>
                        Save Changes
                      </Button>
                      {errorMessage && (
                        <Alert
                          style={{
                            fontFamily: "sans-serif",
                            width: "15rem",
                          }}
                          variant='error'>
                          {errorMessage}
                        </Alert>
                      )}
                      <br />
                    </Col>
                  </Row>
                  <br />
                  {showAlert && message && (
                    <Alert
                      style={{
                        fontFamily: "sans-serif",
                        width: "20rem",
                      }}
                      variant='success'
                      dismissible
                      onClose={this.closeAlert}>
                      {message}
                    </Alert>
                  )}
                </Col>
              </Row>
            </Col>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default FreelancerProfile;