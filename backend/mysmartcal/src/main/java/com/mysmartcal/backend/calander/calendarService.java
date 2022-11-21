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
            // check if slot with same date and time already exists. Also start time should not fall in between any other slot start and end time
            ArrayList<CalendarSlot> vacantSlots = calendar.getVacantSlots();
            for (CalendarSlot slot : vacantSlots) {
                if (slot.getDate().equals(calendarSlot.getDate())) {
                    if (slot.getFromTime().equals(calendarSlot.getFromTime()) || slot.getToTime().equals(calendarSlot.getToTime())) {
                        throw new RuntimeException("Slot already exists");
                    }
                    if (slot.getFromTime().compareTo(calendarSlot.getFromTime()) < 0 && slot.getToTime().compareTo(calendarSlot.getFromTime()) > 0) {
                        throw new RuntimeException("Slot already exists");
                    }
                    if (slot.getFromTime().compareTo(calendarSlot.getToTime()) < 0 && slot.getToTime().compareTo(calendarSlot.getToTime()) > 0) {
                        throw new RuntimeException("Slot already exists");
                    }
                }
            }
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
                    // kafka set status to pending
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
    public Calendar FreelancerEditVacantSlot(String userId, String slotId, String fromTime, String toTime){
        // get user calendar by user id
        ObjectId userIdObject = new ObjectId(userId);
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        // get the slot by slot id
        System.out.println(slotId);
        for (CalendarSlot slot : calendar.getVacantSlots()) {
            if (slot.getSlotId().equals(slotId)) {
                // update the slot with the new from time and to time
                // check if slot time falls in between any other slot time of same date
                // if the slot id is same as the slot id passed in the request, then skip the check
                for (CalendarSlot slot1 : calendar.getVacantSlots()) {
                    if (slot1.getDate().equals(slot.getDate())) {
                        if (slot1.getFromTime().compareTo(fromTime) < 0 && slot1.getToTime().compareTo(fromTime) > 0 && !slot1.getSlotId().equals(slotId)) {
                            throw new RuntimeException("Slot already exists");
                        }
                        if (slot1.getFromTime().compareTo(toTime) < 0 && slot1.getToTime().compareTo(toTime) > 0 && !slot1.getSlotId().equals(slotId)) {
                            throw new RuntimeException("Slot already exists");
                        }
                    }
                }
                slot.setFromTime(fromTime);
                slot.setToTime(toTime);
            }
        }
        calendarRepository.save(calendar);
        System.out.println(calendar.JSONString());
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

    public Object removeFreelancerVacantSlot(String userId, String slotId) {
        // remove the slot from the calendar
        ObjectId userIdObject = new ObjectId(userId);
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        calendar.getVacantSlots().removeIf(slot -> slot.getSlotId().equals(slotId));
        calendarRepository.save(calendar);
        return calendar;
    }
}
