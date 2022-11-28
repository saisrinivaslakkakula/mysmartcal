package com.mysmartcal.backend.calander;

import com.mysmartcal.backend.User.NotificationMessage;
import com.mysmartcal.backend.calander.RequestBodies.AddVacantCalendarSlotRequestBody;
import com.mysmartcal.backend.calander.RequestBodies.FreelancerEditAppointment;
import com.mysmartcal.backend.calander.RequestBodies.UserBookAppointmentSlotRequestBody;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.CorsConfiguration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/calendar")
@AllArgsConstructor
public class calendarController {
    private final calendarService calendarService;
    @Autowired
    private KafkaTemplate<String, NotificationMessage> kafkaTemplate;

    @PostMapping("/addVacantSlot")
    public Object addVacantSlot(@RequestBody AddVacantCalendarSlotRequestBody calendarSlotRequestBody) {
        try {
            System.out.println(calendarSlotRequestBody.getUserId());
            return new ResponseEntity<>(calendarService.addVacantSlot(calendarSlotRequestBody.getCalendarSlot(),calendarSlotRequestBody.getUserId()), HttpStatus.CREATED);
        }
        catch (Exception e) {
            // return exception message back to client
            String s = e.getMessage();
            return new ResponseEntity<>(s, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @PostMapping("/userRequestAppointmentKafka")
    public void notifyFreelancer(@RequestBody UserBookAppointmentSlotRequestBody UserBookAppointmentSlotRequestBody) {
        try {
            /* setting CORS */
            CorsConfiguration configAutenticacao = new CorsConfiguration();
            configAutenticacao.setAllowCredentials(false);
            configAutenticacao.setAllowedOriginPatterns(Collections.singletonList("*"));

            System.out.println(UserBookAppointmentSlotRequestBody);
            /* setting notification message */
            NotificationMessage notificationMessage = new NotificationMessage();
            notificationMessage.setSenderId(UserBookAppointmentSlotRequestBody.getUserId());
            notificationMessage.setReceiverId(UserBookAppointmentSlotRequestBody.getFreelancerId());
            notificationMessage.setNotificationType("Appointment Request");
            notificationMessage.setCalendarSlot(UserBookAppointmentSlotRequestBody.getCalendarSlot());
            notificationMessage.setDateTime(new Date());
            String UserName = calendarService.getUserName(UserBookAppointmentSlotRequestBody.getUserId());

            String notificationText = "User " + UserName + " has requested an appointment with you on " + UserBookAppointmentSlotRequestBody.getCalendarSlot().getStartdate() + " at " + UserBookAppointmentSlotRequestBody.getCalendarSlot().getFromTime() + " to " + UserBookAppointmentSlotRequestBody.getCalendarSlot().getToTime();
            notificationMessage.setNotificationText(notificationText);


            // call calendar service to add the appointment to the calendar. once the appointment is added, send the notification to the freelancer
            calendarService.UserRequestAppintment(UserBookAppointmentSlotRequestBody.getCalendarSlot(),UserBookAppointmentSlotRequestBody.getUserId(),UserBookAppointmentSlotRequestBody.getFreelancerId(),notificationMessage);
            kafkaTemplate.send("notification1", notificationMessage);
        }
        catch (Exception e) {
            String s = "Internal Server Error. Please try again later.";
            System.out.println(e.getMessage());
        }

    }

    @PostMapping("/FreelancerDeleteAppointment")
    public void notifyUser(@RequestBody UserBookAppointmentSlotRequestBody UserBookAppointmentSlotRequestBody) {
        try {
            /* setting CORS */
            CorsConfiguration configAutenticacao = new CorsConfiguration();
            configAutenticacao.setAllowCredentials(false);
            configAutenticacao.setAllowedOriginPatterns(Collections.singletonList("*"));

            /* setting notification message */
            NotificationMessage notificationMessage = new NotificationMessage();
            notificationMessage.setSenderId(UserBookAppointmentSlotRequestBody.getUserId());
            notificationMessage.setReceiverId(UserBookAppointmentSlotRequestBody.getFreelancerId());
            notificationMessage.setNotificationType("Appointment Delete");
            notificationMessage.setCalendarSlot(UserBookAppointmentSlotRequestBody.getCalendarSlot());
            notificationMessage.setDateTime(new Date());
            String notificationText = "Freelancer " + UserBookAppointmentSlotRequestBody.getFreelancerId()+ " has deleted the appointment booked with you on " + UserBookAppointmentSlotRequestBody.getCalendarSlot().getStartdate() + " at " + UserBookAppointmentSlotRequestBody.getCalendarSlot().getFromTime() + " to " + UserBookAppointmentSlotRequestBody.getCalendarSlot().getToTime()+". Please book another appointment.";
            notificationMessage.setNotificationText(notificationText);

            // call calendar service to add the appointment to the calendar. once the appointment is added, send the notification to the freelancer
            calendarService.UserRequestAppintment(UserBookAppointmentSlotRequestBody.getCalendarSlot(),UserBookAppointmentSlotRequestBody.getUserId(),UserBookAppointmentSlotRequestBody.getFreelancerId(),notificationMessage);
            kafkaTemplate.send("notification1", notificationMessage);
        }
        catch (Exception e) {
            String s = "Internal Server Error. Please try again later.";
            System.out.println(e.getMessage());
        }

    }



    @PostMapping("/freelancerEditAppointment")
    public Object FreelancerEditAppointment(@RequestBody FreelancerEditAppointment freelancerEditAppointment) {
        try {
            return new ResponseEntity<>(calendarService.FreelancerEditAppintment(freelancerEditAppointment.getCalendarSlotId(),freelancerEditAppointment.getUserId(),freelancerEditAppointment.getFreelancerId(),freelancerEditAppointment.getStatus()), HttpStatus.CREATED);
        }
        catch (Exception e) {
            String s = "Internal Server Error. Please try again later.";
            System.out.println(e.getMessage());
            return new ResponseEntity<>(s, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/freelancerEditVacantSlot")
    public Object FreelancerEditVacantSlot(@RequestParam(value="userId") String userId,@RequestParam(value="slotId") String slotId,@RequestParam(value="fromTime") String fromTime,@RequestParam(value="toTime") String toTime) {
        try {
            System.out.println("API CALLED");
            return new ResponseEntity<>(calendarService.FreelancerEditVacantSlot(userId,slotId,fromTime,toTime), HttpStatus.CREATED);
        }
        catch (Exception e) {
            String s = "Already Vacant Slot exists at the requested time. Please check and edit the time.";
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

   // @GetMapping("/allSlots") by taking userid as a parameter
    @GetMapping("/getCalendarSlots")
    public ArrayList<CalendarSlot> getAllSlots( @RequestParam(value = "userId") String userId){
        return calendarService.getAllSlots(userId);
    }

    @DeleteMapping("/freelancerRemoveVacantSlot")
    public Object freeLancerRemoveVacantSlot (@RequestParam(value = "userId") String userId, @RequestParam(value = "slotId") String slotId,@RequestParam(value="status") String status){
        return calendarService.removeFreelancerVacantSlot(userId,slotId,status);
    }

    @DeleteMapping("/freelancerRemoveConfirmedSlot")
    public Object freeLancerRemoveConfirmedSlot (@RequestParam(value = "userId") String userId, @RequestParam(value = "slotId") String slotId,@RequestParam(value="status") String status){
        return calendarService.removeFreelancerconfirmedSlot(userId,slotId,status);
    }
    @DeleteMapping("/userRemoveConfirmedSlot")
    public Object userRemoveConfirmedSlot (@RequestParam(value = "userId") String userId, @RequestParam(value = "slotId") String slotId,@RequestParam(value="status") String status){
        return calendarService.removeUserconfirmedSlot(userId,slotId,status);
    }

    @GetMapping("/freeLancerApproveAppointment")
    // pass the calendar slot id and the freelancer id and the user id
    public Object freeLancerApproveAppointment (@RequestParam(value = "userId") String userId, @RequestParam(value = "slotId") String slotId, @RequestParam(value = "freelancerId") String freelancerId){
       // System.out.println("API CALLED");
        NotificationMessage notificationMessage = new NotificationMessage();
        notificationMessage.setSenderId(freelancerId);
        notificationMessage.setReceiverId(userId);
        notificationMessage.setNotificationType("Appointment Confirm");
        notificationMessage.setDateTime(new Date());
        String FreelancerName = calendarService.getUserName(freelancerId);
        //String SlotTimeForMEssage = calendarService.getSlotIdForMessage(userId,slotId);
        String notificationText = "Freelancer " + FreelancerName + " has approved your appointment ";
        notificationMessage.setNotificationText(notificationText);
        //kafkaTemplate.send("notification1", notificationMessage);
        return calendarService.freeLancerApproveAppointment(userId,slotId,freelancerId,notificationMessage);

    }

    @GetMapping("/freeLancerRejectAppointment")
    // pass the calendar slot id and the freelancer id and the user id
    public Object freeLancerRejectAppointment (@RequestParam(value = "userId") String userId, @RequestParam(value = "slotId") String slotId, @RequestParam(value = "freelancerId") String freelancerId){
        // System.out.println("API CALLED");
        return calendarService.freeLancerRejectAppointment(userId,slotId,freelancerId);
    }




}
