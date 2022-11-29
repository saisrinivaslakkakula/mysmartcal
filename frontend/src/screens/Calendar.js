import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Row, Button, Container, Modal } from 'react-bootstrap'
import * as allIcons from "react-icons/all"
import Message from '../components/Message'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addVacantSlot, getAllSlots, removeVacantSlot,editVacantSlot, FreelancerremoveConfirmedSlot, UserremoveConfirmedSlot } from '../actions/CalendarActions';
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const CalendarScreen = () => {
  // if not logged in redirect to login page
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  if (!userInfo) {
    window.location.href = '/login'
  }
  const times_array = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];
  const times_map = {
    "12:00 AM": 0,
    "1:00 AM": 1,
    "2:00 AM": 2,
    "3:00 AM": 3,
    "4:00 AM": 4,
    "5:00 AM": 5,
    "6:00 AM": 6,
    "7:00 AM": 7,
    "8:00 AM": 8,
    "9:00 AM": 9,
    "10:00 AM": 10,
    "11:00 AM": 11,
    "12:00 PM": 12,
    "1:00 PM": 13,
    "2:00 PM": 14,
    "3:00 PM": 15,
    "4:00 PM": 16,
    "5:00 PM": 17,
    "6:00 PM": 18,
    "7:00 PM": 19,
    "8:00 PM": 20,
    "9:00 PM": 21,
    "10:00 PM": 22,
    "11:00 PM": 23,
  };


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
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const dispatch = useDispatch()
  const calendarSlotsObj = useSelector(state => state.calendarSlots)
 // console.log(calendarSlotsObj)
  const { loading, error, calendarSlots } = calendarSlotsObj
  

  //console.log(calendarSlots)
  useEffect(() => {
    dispatch(getAllSlots(userid))
    //setCalendarSlotsState(calendarSlots.calendarSlots)



  }, [dispatch])
  const handleClose = () => {
    setDeleteConfirmationModal(false)
    setCurrentEventSelected(false)
    setShowModal(false)
  }

  const handleAddSlots = async() => {
    const calendarSlot = {
      startdate: moment(slotDate).format("YYYY-MM-DD"),
      enddate: moment(slotDate).format("YYYY-MM-DD"),
      fromTime: startTime,
      toTime: endTime,
      status: "Vacant",
      serviceID: serviceName
    }
    dispatch(addVacantSlot(userid, calendarSlot))
    handleClose();
  }

  

  const handleEditSlots = () => {
    dispatch(editVacantSlot(userid,currentEventSelected.slotId,startTime,endTime))
    handleClose();
  }

  const handleDeleteSlotConfirmation = () => {
    setShowModal(false)
    setDeleteConfirmationModal(true)

  }
  const handleDeleteSlot = () => {
    if(currentEventSelected.status === "Vacant"){
    dispatch(removeVacantSlot(userid, currentEventSelected.slotId,currentEventSelected.status))
    }
    else if(currentEventSelected.status === "Confirmed"){
      if(userInfo.freelancer){
        dispatch(FreelancerremoveConfirmedSlot(userid, currentEventSelected.slotId,currentEventSelected.status))
      }
      else{
        dispatch(UserremoveConfirmedSlot(userid, currentEventSelected.slotId,currentEventSelected.status))
      }
     
    }
    handleClose();
    setCurrentEventSelected(false)
    setDeleteConfirmationModal(false)
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
    //console.log(event)
    const bg_colors_map = {
      "Vacant": "#99ccff",
      "Confirmed": "#00FF00",
      "Pending": "#ffff00",
    }
    var backgroundColor = bg_colors_map[event.status];
    const color = "black";
    console.log(event)
    var style = {
      color: color,
      backgroundColor: backgroundColor,
    };
    return {
      style: style
    };
  };
  return (
    <>
    {error && <Message variant='danger'>{error}</Message>}
      <Container>
        <Row className="justify-content-md-center"></Row>
          <DnDCalendar
          dayLayoutAlgorithm={'no-overlap'}
          defaultDate={moment().toDate()}
          defaultView="month"
          events={calendarSlots}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          eventPropGetter={(eventStyleGetter)}
          resizable
          selectable
          style={{ maxWidth: "100%", padding: "30px", height: "80vh" }}
        />
      </Container>
      {showModal &&
        <div>
          <Modal show={showModal}>
            <Modal.Header>
              {currentEventSelected?<h2>Edit {currentEventSelected.status} Slot</h2>:<h2> Add Vacant Time Slots</h2>}
              
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
                         
                          <select className="form-control" onChange={(e) => setStartTime(e.target.value)}>
                           <option value={currentEventSelected.fromTime}>{currentEventSelected.fromTime}</option>
                           {/* iterate over the times array and create options */}
                           {times_array.map((time) => {
                              return <option value={time}>{time}</option>
                            }
                            )}
                          </select>
                          

                          
                        </div>
                        <div className='col-6'>
                         {/* 
                         <input type="text" name="endTime" defaultValue={currentEventSelected.toTime} onChange={(e) => setEndTime(e.target.value)} placeholder="Enter End Time Slot" />
                         */} 
                          <select className="form-control" onChange={(e) => setEndTime(e.target.value)}>
                          <option value={currentEventSelected.toTime}>{currentEventSelected.toTime}</option>
                            
                            {times_array.map((time) => {
                              if (times_map[time] > times_map[startTime]) {
                                return <option value={time}>{time}</option>
                              }
                            }
                            )}
                          </select>
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
                        <select className="form-control" onChange={(e) => setStartTime(e.target.value)}>
                            <option value="">From Time</option>
                           {/* iterate over the times array and create options */}
                           {times_array.map((time) => {
                              return <option value={time}>{time}</option>
                            }
                            )}
                          </select>
                        </div>
                        <div className='col-6'>
                        <select className="form-control" onChange={(e) => setEndTime(e.target.value)}>
                            <option value="">To Time</option>
                            
                            {times_array.map((time) => {
                              if (times_map[time] > times_map[startTime]) {
                                return <option value={time}>{time}</option>
                              }
                            }
                            )}
                          </select>
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
                <Button variant="danger" onClick={() => handleDeleteSlotConfirmation()}>
                  Delete Slot
                </Button>
                {currentEventSelected.status === "Vacant" &&
                <Button variant="dark" onClick={() => handleEditSlots()}>
                Edit
              </Button>}
                
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
      {deleteConfirmationModal &&
        <div>
          <Modal show={deleteConfirmationModal}>
            <Modal.Header>
              <h2> Delete Confirmation</h2>
              <p style={{ marginLeft: '5%' }}><allIcons.GrFormClose onClick={handleClose}></allIcons.GrFormClose></p>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h4>Are you sure you want to delete this slot?</h4>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => handleDeleteSlot()}>
                Delete
              </Button>
              <Button variant="dark" onClick={() => handleClose()}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      }


    </>
  )
}

export default CalendarScreen
