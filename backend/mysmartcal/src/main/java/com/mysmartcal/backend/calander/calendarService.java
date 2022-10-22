package com.mysmartcal.backend.calander;
import com.mysmartcal.backend.User.userRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class calendarService {
    private final userRepository userRepository;
    private final calendarRepository calendarRepository;
    public Calendar addVacantSlot(CalendarSlot calendarSlot, String userId) {
        ObjectId userIdObject = new ObjectId(userId);
        System.out.println(calendarSlot);
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        if (calendar != null) {
            calendarSlot.setSlotId();
            calendar.getVacantSlots().add(calendarSlot);
        }
        else{
            Calendar calendarObj = new Calendar();
            calendarObj.setUserId(userIdObject);
            calendarObj.setVacantSlots(new ArrayList<>());
            calendarObj.setAppointmentsGiven(new ArrayList<>());
            calendarObj.setAppointmentsTaken(new ArrayList<>());
            calendarRepository.insert(calendarObj);
            Calendar calendarNew = (Calendar) calendarRepository.findByUserId(userIdObject);
            calendarSlot.setSlotId();
            calendarNew.getVacantSlots().add(calendarSlot);
            calendar = calendarNew;
        }
        calendarRepository.save(calendar);
        System.out.println(calendar.JSONString());
        return calendar;

    }

    public Calendar UserRequestAppintment(CalendarSlot calendarSlot, String userId, String freelancerId) {
        ObjectId freeLancerIdObject = new ObjectId(freelancerId);
        ObjectId userIdObject = new ObjectId(userId);
        Calendar Freelancercalendar = (Calendar) calendarRepository.findByUserId(freeLancerIdObject);
        Calendar Usercalendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        // check if the slot is vacant in the calendar by checking the status of the slot in vacant slots
        for (CalendarSlot slot : Freelancercalendar.getVacantSlots()) {
            if (slot.getSlotId().equals(calendarSlot.getSlotId())) {
                if (slot.getStatus().equals("Vacant")) {
                    // if the slot is vacant, then add the appointment to the appointments taken
                    Freelancercalendar.getAppointmentsGiven().add(calendarSlot);
                    break;
                }
                else{
                    // if the slot is not vacant, then return null
                    return null;
                }
            }
        }
        Usercalendar.getAppointmentsTaken().add(calendarSlot);
        calendarRepository.save(Usercalendar);
        calendarRepository.save(Freelancercalendar);
        return Freelancercalendar;

    }


    public Calendar FreelancerEditAppintment(ObjectId calendarSlotId, String userId, String freelancerId, String status) {
        ObjectId freeLancerIdObject = new ObjectId(freelancerId);
        ObjectId userIdObject = new ObjectId(userId);
        Calendar Freelancercalendar = (Calendar) calendarRepository.findByUserId(freeLancerIdObject);
        Calendar Usercalendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        // update the status of the slot in the freelancer calendar to the status passed in the request
        for (CalendarSlot slot : Freelancercalendar.getAppointmentsGiven()) {
            System.out.println(slot.getSlotId()+"|"+calendarSlotId);
            if (slot.getSlotId().equals(calendarSlotId.toString())) {
                slot.setStatus(status);
            }
        }
        // update the status of the slot in the user calendar to the status passed in the request
        for (CalendarSlot slot : Usercalendar.getAppointmentsTaken()) {
            System.out.println(slot.getSlotId()+"|"+calendarSlotId);
            if (slot.getSlotId().equals(calendarSlotId.toString())) {
                slot.setStatus(status);
            }
        }
        // if stauus is Confirmed, then remove the slot from the freelancer calendar
        if (status.equals("Confirmed")) {
            Freelancercalendar.getVacantSlots().removeIf(slot -> slot.getSlotId().equals(calendarSlotId.toString()));
        }

        calendarRepository.save(Usercalendar);
        calendarRepository.save(Freelancercalendar);
        return Freelancercalendar;
    }
    public Calendar FreelancerEditVacantSlot(String userId, CalendarSlot calendarSlot){
        // edit calendar slot time
        ObjectId userIdObject = new ObjectId(userId);
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        // check if new  date and time is already added by checking all vacant slots in the calendar
        for (CalendarSlot slot : calendar.getVacantSlots()) {
            if(!slot.getSlotId().equals(calendarSlot.getSlotId()) && checkIfStartTimeFallsBetweenGivenStartAndEndTimes(calendarSlot.getFromTime(), calendarSlot.getToTime(),slot.getFromTime(), slot.getToTime())){
                throw new RuntimeException("Time slot already exists. Please try again with new start and end times.");
            }
        }
        // if new date and time is not added, then update the date and time of the slot in the calendar
        for (CalendarSlot slot : calendar.getAppointmentsGiven()) {
            if (slot.getSlotId().equals(calendarSlot.getSlotId())) {
                slot.setDate(calendarSlot.getDate());
                slot.setFromTime(calendarSlot.getFromTime());
                slot.setToTime(calendarSlot.getToTime());
            }
        }
        calendarRepository.save(calendar);
        return calendar;
    }

    boolean checkIfStartTimeFallsBetweenGivenStartAndEndTimes(String startTime,String endTime,String givenStartTime,String givenEndTime){
        // check if the given start time falls between the start and end time
        if(startTime.compareTo(givenStartTime) <= 0 && endTime.compareTo(givenStartTime) >= 0){
            return true;
        }
        // check if the given end time falls between the start and end time
        if(startTime.compareTo(givenEndTime) <= 0 && endTime.compareTo(givenEndTime) >= 0){
            return true;
        }
        // check if the given start time is less than the start time and the given end time is greater than the end time
        if(startTime.compareTo(givenStartTime) >= 0 && endTime.compareTo(givenEndTime) <= 0){
            return true;
        }
        return false;
    }

    public ArrayList<CalendarSlot> getAllSlots(String userId) {
        ObjectId userIdObject = new ObjectId(userId);
        ArrayList<CalendarSlot> calendarSlots = new ArrayList<>();
        // find the calendar of the user
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        // add all the vacant slots to the calendarSlots array
        calendarSlots.addAll(calendar.getVacantSlots());
        // add all the appointments taken to the calendarSlots array
        calendarSlots.addAll(calendar.getAppointmentsTaken());
        // add all the appointments given to the calendarSlots array
        calendarSlots.addAll(calendar.getAppointmentsGiven());
        return calendarSlots;
    }
}
