import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Header from "./header";
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class MyCalendar extends Component {
  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Event1",
      },
    ],
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Event Name')
    if (title) {
      this.setState((state) => { 
        return { events: [...state.events, { start, end, title }] }; 
      });
    }
    console.log(this.state);
  };

  handleSelectEvent = (event) => {
    window.alert(event.title)
  };

  // handleShow = () => {
  //   this.setState({
  //     showModal: true,
  //   });
  // };

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Header />
          </Row>
          <Row className="justify-content-md-center"></Row>
            <DnDCalendar
              dayLayoutAlgorithm={'no-overlap'}
              defaultDate={moment().toDate()}
              defaultView="month"
              events={this.state.events}
              localizer={localizer}
              onEventDrop={this.onEventDrop}
              onEventResize={this.onEventResize}
              onSelectEvent={this.handleSelectEvent}
              onSelectSlot={this.handleSelectSlot}
              resizable
              selectable
              style={{ maxWidth: "100%", padding: "30px", height: "80vh" }}
            />
        </Container>
       </div >
    );
  }
}

export default MyCalendar;