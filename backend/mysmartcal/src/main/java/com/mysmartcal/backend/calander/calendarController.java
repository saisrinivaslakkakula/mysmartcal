package com.mysmartcal.backend.calander;

import com.mysmartcal.backend.calander.RequestBodies.AddVacantCalendarSlotRequestBody;
import com.mysmartcal.backend.calander.RequestBodies.FreelancerEditAppointment;
import com.mysmartcal.backend.calander.RequestBodies.UserBookAppointmentSlotRequestBody;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/calendar")
@AllArgsConstructor
public class calendarController {
    private final calendarService calendarService;

    @PostMapping("/addVacantSlot")
    public Object addVacantSlot(@RequestBody AddVacantCalendarSlotRequestBody calendarSlotRequestBody) {
        try {
            System.out.println(calendarSlotRequestBody.getUserId());
            return new ResponseEntity<>(calendarService.addVacantSlot(calendarSlotRequestBody.getCalendarSlot(),calendarSlotRequestBody.getUserId()), HttpStatus.CREATED);
        }
        catch (Exception e) {
            String s = "Internal Server Error. Please try again later.";
            return new ResponseEntity<>(s, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/userRequestAppointment")
    public Object UserRequestAppintment(@RequestBody UserBookAppointmentSlotRequestBody UserBookAppointmentSlotRequestBody) {
        try {
            return new ResponseEntity<>(calendarService.UserRequestAppintment(UserBookAppointmentSlotRequestBody.getCalendarSlot(),UserBookAppointmentSlotRequestBody.getUserId(),UserBookAppointmentSlotRequestBody.getFreelancerId()), HttpStatus.CREATED);
        }
        catch (Exception e) {
            String s = "Internal Server Error. Please try again later.";
            System.out.println(e.getMessage());
            return new ResponseEntity<>(s, HttpStatus.INTERNAL_SERVER_ERROR);
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

    @PostMapping("/freelancerEditVacantSlot")
    public Object FreelancerEditVacantSlot(@RequestBody AddVacantCalendarSlotRequestBody calendarSlotRequestBody) {
        try {
            return new ResponseEntity<>(calendarService.FreelancerEditVacantSlot(calendarSlotRequestBody.getUserId(),calendarSlotRequestBody.getCalendarSlot()), HttpStatus.CREATED);
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



}
