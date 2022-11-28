package com.mysmartcal.backend.calander;
import com.mysmartcal.backend.User.NotificationMessage;
import com.mysmartcal.backend.User.User;
import com.mysmartcal.backend.User.userRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class calendarService {
    private final userRepository userRepository;
    private final calendarRepository calendarRepository;
    @Autowired
    private KafkaTemplate<String, NotificationMessage> kafkaTemplate;
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
            calendarSlot.setRequestedFreeLancerId(userId);
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
            calendarSlot.setRequestedFreeLancerId(userId);
            calendarNew.getVacantSlots().add(calendarSlot);
            calendar = calendarNew;
        }
        calendarRepository.save(calendar);
        System.out.println(calendar.JSONString());
        return calendar;

    }

    public Calendar UserRequestAppintment(CalendarSlot calendarSlot, String userId, String freelancerId, NotificationMessage notificationMessage) {
        ObjectId freeLancerIdObject = new ObjectId(freelancerId);
        ObjectId userIdObject = new ObjectId(userId);
        Calendar Freelancercalendar = (Calendar) calendarRepository.findByUserId(freeLancerIdObject);
        Calendar Usercalendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        Optional<User> freelancer = userRepository.findById(String.valueOf(freeLancerIdObject));
        Optional<User> user = userRepository.findById(String.valueOf(userIdObject));
        String FreelancerName = freelancer.get().getFirstName() + " " + freelancer.get().getLastName();
        String UserName = user.get().getFirstName() + " " + user.get().getLastName();
        boolean FreelancerAddedTemporaryAppointmentGiven = false;
        boolean UserAddedTemporaryAppointmentTaken = false;


        // check if the slot is vacant in the calendar by checking the status of the slot in vacant slots
        for (CalendarSlot slot : Freelancercalendar.getVacantSlots()) {
            if (slot.getSlotId().equals(calendarSlot.getSlotId())) {
                if (slot.getStatus().equals("Vacant")) {
                    calendarSlot.setStatus("Pending");
                    calendarSlot.setRequestedUserId(userId);
                    calendarSlot.setRequestedFreeLancerId(freelancerId);
                    // if appointments given is null then create a new arraylist
                    if (Freelancercalendar.getAppointmentsGiven() == null) {
                        Freelancercalendar.setAppointmentsGiven(new ArrayList<>());
                    }
                    if(Freelancercalendar.getAppointmentsGiven().add(calendarSlot)) FreelancerAddedTemporaryAppointmentGiven = true;
                    // if appointmentsTaken is null, create a new arraylist and add the appointment
                    if(Usercalendar.getAppointmentsTaken() == null) {
                        Usercalendar.setAppointmentsTaken(new ArrayList<>());
                    }
                    if(Usercalendar.getAppointmentsTaken().add(calendarSlot)) UserAddedTemporaryAppointmentTaken = true;
                    // if both the boolean values are true then save the calendar
                    if(FreelancerAddedTemporaryAppointmentGiven && UserAddedTemporaryAppointmentTaken){
                        calendarRepository.save(Freelancercalendar);
                        calendarRepository.save(Usercalendar);
                        List<NotificationMessage> notificationMessages = freelancer.get().getNotifications();
                        if (notificationMessages == null) {
                            notificationMessages = new ArrayList<>();
                        }
                        notificationMessages.add(notificationMessage);
                        freelancer.get().setNotifications(notificationMessages);
                        userRepository.save(freelancer.get());
                    }
                    //else throw an exception
                    else{
                        throw new RuntimeException("Error in booking the appointment");
                    }
                }
           }
        }
        String message = "User " + UserName + " has requested an appointment with you on " + calendarSlot.getDate() + " from " + calendarSlot.getFromTime() + " to " + calendarSlot.getToTime();
        notificationMessage.setNotificationType("Appointment Request");
        notificationMessage.setNotificationText(message);
        System.out.println(notificationMessage);
        return Freelancercalendar;
    }

    public Calendar FreelancerDeleteAppointment(CalendarSlot calendarSlot, String userId, String freelancerId, NotificationMessage notificationMessage) {
        ObjectId freeLancerIdObject = new ObjectId(freelancerId);
        ObjectId userIdObject = new ObjectId(userId);
        Calendar Freelancercalendar = (Calendar) calendarRepository.findByUserId(freeLancerIdObject);
        Calendar Usercalendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        Optional<User> freelancer = userRepository.findById(String.valueOf(freeLancerIdObject));
        boolean freelancerAppointmentDeleted = false;
        boolean userAppointmentDeleted = false;
        boolean freelancerVacantSlotCreatedBack = false;


        // remove the appointment from the freelancer's calendar in appointments given
        // remove the appointment from the user's calendar in appointments taken
        // add the slot back to the freelancer's calendar in vacant slots
        for (CalendarSlot slot : Freelancercalendar.getAppointmentsGiven()) {
            if (slot.getSlotId().equals(calendarSlot.getSlotId())) {
                if(Freelancercalendar.getAppointmentsGiven().remove(slot)) freelancerAppointmentDeleted = true;
                if(Freelancercalendar.getVacantSlots().add(slot)) freelancerVacantSlotCreatedBack = true;
                break;
            }
        }
        for (CalendarSlot slot : Usercalendar.getAppointmentsTaken()) {
            if (slot.getSlotId().equals(calendarSlot.getSlotId())) {
                if(Usercalendar.getAppointmentsTaken().remove(slot)) userAppointmentDeleted = true;
                break;
            }
        }
        // notify the user that the appointment has been cancelled
        List<NotificationMessage> notifications = freelancer.get().getNotifications();
        // if notifications is null, create a new list and add the notification
        if (notifications == null) {
            notifications = new ArrayList<>();
            notifications.add(notificationMessage);
        }
        else {
            notifications.add(notificationMessage);
        }
        //save the notification in the freelancer's notifications
        // if all the operations are successful, save the calendar else throw an exception
        if (freelancerAppointmentDeleted && userAppointmentDeleted && freelancerVacantSlotCreatedBack) {
            freelancer.get().setNotifications(notifications);
            userRepository.save(freelancer.get());
            calendarRepository.save(Usercalendar);
            calendarRepository.save(Freelancercalendar);
            return Freelancercalendar;
        }
        else{
            throw new RuntimeException("Error in deleting appointment");
        }


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

    public Object removeFreelancerVacantSlot(String userId, String slotId, String status) {
        // remove the slot from the calendar
        System.out.println("Remove Slot");
        ObjectId userIdObject = new ObjectId(userId);
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        calendar.getVacantSlots().removeIf(slot -> slot.getSlotId().equals(slotId));
        calendarRepository.save(calendar);
        return calendar;
    }

    public Object freeLancerApproveAppointment(String userId, String slotId, String freelancerId, NotificationMessage notificationMessage) {
        ObjectId userIdObject = new ObjectId(userId.trim());
        ObjectId freelancerIdObject = new ObjectId(freelancerId.trim());
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        Calendar freelancerCalendar = (Calendar) calendarRepository.findByUserId(freelancerIdObject);
        Optional<User> freelancer = userRepository.findById(freelancerId.trim());
        Optional<User> user = userRepository.findById(userId.trim());
        boolean FreelancerUpdated = false;
        boolean UserUpdated = false;
        // remove the slot from the freelancer calendar
        // update the status of the slot in the user calendar to the status passed in the request
        for (CalendarSlot slot : calendar.getAppointmentsTaken()) {
            if (slot.getSlotId().trim().equals(slotId.trim())) {
                slot.setStatus("Confirmed");
                //notificationMessage.setNotificationText("Your appointment with "+freelancer.get().getFirstName()+" "+freelancer.get().getLastName()+" has been confirmed");
                notificationMessage.setCalendarSlot(slot);
                // add notification to the user
                user.get().getNotifications().add(notificationMessage);
                System.out.println("User Notification Added");
                System.out.println(user.get().getNotifications().size());
                kafkaTemplate.send("notification1", notificationMessage);
                UserUpdated = true;
                // send notification to the user using kafka

                //System.out.println(slot.getSlotId()+"|"+slotId+"|"+slot.getStatus());
            }
        }
        // update status of freelancer calendar as confirmed in appintments given
        for (CalendarSlot slot : freelancerCalendar.getAppointmentsGiven()) {
            System.out.println(slot.getSlotId()+"|"+slotId);
            if (slot.getSlotId().trim().equals(slotId.trim())) {

                slot.setStatus("Confirmed");
                FreelancerUpdated = true;
                System.out.println(slot.getStatus());
            }
        }
        // remove the slot from the freelancer calendar
        freelancerCalendar.getVacantSlots().removeIf(slot -> slot.getSlotId().trim().equals(slotId.trim()));
        calendarRepository.save(calendar);
        calendarRepository.save(freelancerCalendar);
        //return freelancerCalendar;
        // return success message to the client
        if(FreelancerUpdated && UserUpdated){
            // get freelancer notifications
            List<NotificationMessage> notifications = freelancer.get().getNotifications();
            // iterate through the notifications and remove the notification with the same slot id
            notifications.removeIf(notification -> notification.getCalendarSlot().getSlotId().trim().equals(slotId.trim()));
            userRepository.save(freelancer.get());
            return "Appointment Confirmed";


        }
        else{
            return "Appointment not confirmed";
        }
    }

    public Object freeLancerRejectAppointment(String userId, String slotId, String freelancerId) {
        ObjectId userIdObject = new ObjectId(userId.trim());
        ObjectId freelancerIdObject = new ObjectId(freelancerId.trim());
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        Calendar freelancerCalendar = (Calendar) calendarRepository.findByUserId(freelancerIdObject);
        Optional<User> freelancer = userRepository.findById(freelancerId.trim());
        boolean FreelancerUpdated = false;
        boolean UserUpdated = false;
        // remove slot from freelancer appointments given
        if(freelancerCalendar.getAppointmentsGiven().removeIf(slot -> slot.getSlotId().trim().equals(slotId.trim()))) FreelancerUpdated = true;
        // romove slot from user appointments taken
        if(calendar.getAppointmentsTaken().removeIf(slot -> slot.getSlotId().trim().equals(slotId.trim()))) UserUpdated = true;
        // iterate through freelancer calendar vacant slots and update the status of the slot to Vacant
        for (CalendarSlot slot : freelancerCalendar.getVacantSlots()) {
            if (slot.getSlotId().trim().equals(slotId.trim())) {
                slot.setStatus("Vacant");
                FreelancerUpdated = true;
            }
        }

        if(FreelancerUpdated && UserUpdated){
            // get freelancer notifications
            List<NotificationMessage> notifications = freelancer.get().getNotifications();
            // iterate through the notifications and remove the notification with the same slot id
            notifications.removeIf(notification -> notification.getCalendarSlot().getSlotId().trim().equals(slotId.trim()));
            userRepository.save(freelancer.get());
            return "Appointment Rejected";


        }
        else{
            return "Appointment not Rejected";
        }
    }

    public Object removeFreelancerconfirmedSlot(String userId, String slotId, String status) {
        // remove the slot from the calendar
        System.out.println("Remove Slot");
        ObjectId userIdObject = new ObjectId(userId);
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        // iterate through the calendar slots and get get requestedUserId and slotId
        for (CalendarSlot slot : calendar.getAppointmentsGiven()) {
            if (slot.getSlotId().equals(slotId)) {
                // get the user id of the user who requested the appointment
                String requestedUserId = slot.getRequestedUserId();
                System.out.println(requestedUserId);
                Calendar requestedUserCalendar = (Calendar) calendarRepository.findByUserId(new ObjectId(requestedUserId));
                // iterate through the requested user calendar and remove the slot from appointments taken
                requestedUserCalendar.getAppointmentsTaken().removeIf(slot1 -> slot1.getSlotId().equals(slotId));
                calendar.getAppointmentsGiven().removeIf(slot1 -> slot1.getSlotId().equals(slotId));
                // add the slot to the vacant slots
                slot.setStatus("Vacant");
                slot.setRequestedFreeLancerId(null);
                calendar.getVacantSlots().add(slot);
                calendarRepository.save(calendar);
                calendarRepository.save(requestedUserCalendar);
            }
        }
        return calendar;
    }

    public Object removeUserconfirmedSlot(String userId, String slotId, String status) {
        // remove the slot from the calendar
        System.out.println("Remove Slot");
        ObjectId userIdObject = new ObjectId(userId);
        Calendar Usercalendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        // iterate through the calendar slots and get get requestedUserId and slotId
        for (CalendarSlot slot : Usercalendar.getAppointmentsTaken()) {
            if (slot.getSlotId().equals(slotId)) {
                // get the user id of the user who requested the appointment
                String requestedFreelancerId = slot.getRequestedFreeLancerId();
                System.out.println(requestedFreelancerId);
                Calendar FreelancerCalendar = (Calendar) calendarRepository.findByUserId(new ObjectId(requestedFreelancerId));
                // iterate through the requested user calendar and remove the slot from appointments taken
                FreelancerCalendar.getAppointmentsGiven().removeIf(slot1 -> slot1.getSlotId().equals(slotId));
                Usercalendar.getAppointmentsTaken().removeIf(slot1 -> slot1.getSlotId().equals(slotId));
                // add the slot to the vacant slots
                slot.setStatus("Vacant");
                slot.setRequestedFreeLancerId(null);
                FreelancerCalendar.getVacantSlots().add(slot);
                calendarRepository.save(Usercalendar);
                calendarRepository.save(FreelancerCalendar);
            }
        }
        return Usercalendar;
    }

    public String getUserName(String userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.get().getFirstName() + " " + user.get().getLastName();
    }

    public String getSlotIdForMessage(String slotId, String id) {
        ObjectId userIdObject = new ObjectId(id);
        Calendar calendar = (Calendar) calendarRepository.findByUserId(userIdObject);
        for (CalendarSlot slot : calendar.getAppointmentsTaken()) {
            if (slot.getSlotId().equals(slotId)) {
                return slot.getFromTime() + " - " + slot.getToTime();
            }
        }
        return null;
    }
}
