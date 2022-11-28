import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Row, Container } from 'react-bootstrap'
import Message from '../components/Message'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import {getFreelancerVacantSlots, userRequestAppointment} from "../actions/CalendarActions";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";
import UserModal from "../components/UserModal"
import {getFreelancerDetails} from "../actions/userActions";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const FreelancerCalendarScreen = ({match}) => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    if (!userInfo) {
        window.location.href = '/login'
    }

    const freelancerSlots = useSelector(state => state.freelancerSlots )
    const { loading, error, slots } = freelancerSlots

    const freelancerDetails = useSelector(state => state.freelancerDetails)
    const { freelancer } = freelancerDetails

    const [vacantSlots, setVacantSlots] = useState(slots?.filter((s) => s.status === "Vacant").map(s=>{
        s.start = moment(new Date(s.startdate)).add(1,'days').toDate()
        s.end = moment(new Date(s.enddate)).add(1, 'days').toDate()
        s.title = s.serviceID
        return s
    }))

    useEffect(()=>{
        const slotsUpdated = freelancerSlots?.slots
       setVacantSlots(slotsUpdated.filter((s) => s.status === "Vacant"))
    },[freelancerSlots])

    useEffect(() => {
        dispatch(getFreelancerVacantSlots(match.params.id))
    }, [match, dispatch])

    useEffect(() => {
        if(!freelancer){
            dispatch(getFreelancerDetails(match.params.id));
        }
    },[])

    const [eventSelected, setEventSelected] = useState(false)

    const [eventConfirmed, setEventConfirmed] = useState({});

    const handleSelectEvent = (e) => {
        setEventConfirmed(e)
        setEventSelected(true)
    }

    const handleModalClose = () => {
        setEventSelected(false)
    }

    const onConfirm = () => {
        const slotDetails = eventConfirmed
        const freelancerId = match.params.id
        console.log("freelance Id", freelancerId)
        const userId = userInfo.id
        dispatch(userRequestAppointment(slotDetails, userId, freelancerId))
    }

    useEffect(()=>{
        setEventSelected(false)
    },[])

    const eventStyleGetter = (event, start, end, isSelected) => {
        //console.log(event)
        const bg_colors_map = {
            "Vacant": "#99ccff",
            "Confirmed": "#00FF00",
            "Pending": "#ffff00",
        }
        var backgroundColor = bg_colors_map[event.status];
        const color = "black";

        var style = {
            color: color,
            backgroundColor: backgroundColor,
        };
        return {
            style: style
        };
    };


    return(
        <>
            <h3>{freelancer.firstName}'s Calender</h3>
            <Link className='btn btn-light my-3' to='/freelancers'>
                Go Back
            </Link>
            { loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <Container>
                    <Row className="justify-content-md-center"></Row>
                    <DnDCalendar
                        dayLayoutAlgorithm={'no-overlap'}
                        defaultDate={moment().toDate()}
                        defaultView="month"
                        events={vacantSlots}
                        localizer={localizer}
                        eventPropGetter={(eventStyleGetter)}
                        resizable
                        selectable
                        onSelectEvent={handleSelectEvent}
                        style={{ maxWidth: "100%", padding: "30px", height: "80vh" }}
                    />
                </Container>
            )}
            {eventSelected && <UserModal show = {eventSelected} onConfirm = {onConfirm} handleModalClose={handleModalClose}/> }
        </>
    )
}

export default FreelancerCalendarScreen