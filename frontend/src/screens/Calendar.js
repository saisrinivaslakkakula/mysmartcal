import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Link } from 'react-router-dom'
import { Row, Button, Container, Modal } from 'react-bootstrap'
import * as allIcons from "react-icons/all"
import Loader from '../components/Loader'
import Message from '../components/Message'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addVacantSlot, getAllSlots } from '../actions/CalendarActions';
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const CalendarScreen = () => {

  const [showModal, setShowModal] = useState(false)
  const [startDateForModal, setStartDateForModal] = useState('');
  const [vacantSlotsArray, setVacantSlotsArray] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [slotDate, setSlotDate] = useState('');
  const userid = useSelector(state => state.userLogin.userInfo.id)
  const AllSlots = useSelector(state => state.calendarSlots.calendarSlots)
  const [calendarSlotsState, setCalendarSlotsState] = useState(AllSlots);
  const [currentEventSelected, setCurrentEventSelected] = useState({});
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllSlots(userid))
    setCalendarSlotsState(AllSlots)


  }, [dispatch])
  const handleClose = () => {
    setShowModal(false)
  }
  const handleAddSlots = () => {
    console.log("start Time", startTime);
    console.log("end Time", endTime);
    const calendarSlot = {
      date: slotDate,
      fromTime: startTime,
      toTime: endTime,
      status: "Vacant",
      serviceID: serviceName
    }
    dispatch(addVacantSlot(userid, calendarSlot))
    handleClose();
  }

  const handleEditSlots = () => {
    console.log("start Time", startTime);
    console.log("end Time", endTime);
  }
  var state = {
    events: []
  }
  const setState = (state, start, end) => {
    state.events[0].start = start;
    state.events[0].end = end;
    return { events: [...state.events] };
  }
  const onEventResize = (data) => {
    const { start, end } = data;

    setState(state, start, end)
  };

  const onEventDrop = (data) => {
    console.log(data);
  };

  const handleSelectSlot = ({ start, end }) => {
    const YYYY_MM_DD = moment(start).format("YYYY-MM-DD");
    setSlotDate(YYYY_MM_DD)
    const fullDateinWords = moment(start).format("dddd, MMMM Do YYYY");
    setStartDateForModal(fullDateinWords);
    setShowModal(true)
    console.log(fullDateinWords);
  };

  const handleSelectEvent = (event) => {
    //window.alert(event.title)
    setCurrentEventSelected(event)
    setShowModal(true)
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = '#f0f0f0';
    var style = {
      backgroundColor: backgroundColor,
    };
    return {
      style: style
    };
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center"></Row>
        <DnDCalendar
          dayLayoutAlgorithm={'no-overlap'}
          defaultDate={moment().toDate()}
          defaultView="month"
          events={AllSlots}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          resizable
          selectable
          style={{ maxWidth: "100%", padding: "30px", height: "80vh" }}
        />
      </Container>
      {showModal &&
        <div>
          <Modal show={showModal}>
            <Modal.Header>
              <h2> Add Vacant Time Slots</h2>
              <p style={{ marginLeft: '5%' }}><allIcons.GrFormClose onClick={handleClose}></allIcons.GrFormClose></p>

            </Modal.Header>
            <Modal.Body>
              {currentEventSelected ?
                <div>

                  <div className="container">
                    <div className="row menuItemModal">
                      <h4 style={{ textTransform: 'capitalize' }}>{startDateForModal}</h4>
                      <div className='row'>
                        <div className='col-6'>
                          <input type="text" name="startTime" defaultValue={currentEventSelected.fromTime} onChange={(e) => setStartTime(e.target.value)} placeholder="Enter Start Time Slot" />
                        </div>
                        <div className='col-6'>
                          <input type="text" name="endTime" defaultValue={currentEventSelected.toTime} onChange={(e) => setEndTime(e.target.value)} placeholder="Enter End Time Slot" />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-6'>
                          <input type="text" name="serviceName" defaultValue={currentEventSelected.title} onChange={(e) => setServiceName(e.target.value)} placeholder="Enter Service Name" />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                :
                <div>
                  <div className="container">
                    <div className="row menuItemModal">
                      <h4 style={{ textTransform: 'capitalize' }}>{startDateForModal}</h4>
                      <div className='row'>
                        <div className='col-6'>
                          <input type="text" name="startTime" onChange={(e) => setStartTime(e.target.value)} placeholder="Enter Start Time Slot" />
                        </div>
                        <div className='col-6'>
                          <input type="text" name="endTime" onChange={(e) => setEndTime(e.target.value)} placeholder="Enter End Time Slot" />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-6'>
                          <input type="text" name="serviceName" onChange={(e) => setServiceName(e.target.value)} placeholder="Enter Service Name" />
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              }
            </Modal.Body>
            {currentEventSelected ?
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Delete Slot
                </Button>
                <Button variant="dark" onClick={() => handleEditSlots()}>
                  Edit
                </Button>
              </Modal.Footer>

              :
              <Modal.Footer>
                <Button variant="dark" onClick={() => handleAddSlots()}>
                  Add
                </Button>
              </Modal.Footer>}

          </Modal>
        </div>

      }
    </>
  )
}

export default CalendarScreen
