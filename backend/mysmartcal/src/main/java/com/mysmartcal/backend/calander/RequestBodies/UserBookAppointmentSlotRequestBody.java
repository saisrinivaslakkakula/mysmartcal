package com.mysmartcal.backend.calander.RequestBodies;

import com.mysmartcal.backend.calander.CalendarSlot;

public class UserBookAppointmentSlotRequestBody {
    private String userId;
    private String freelancerId;
    private CalendarSlot calendarSlot;

    public CalendarSlot getCalendarSlot() {
        return calendarSlot;
    }

    public String getUserId() {
        return userId;
    }
    public String getFreelancerId() {
        return freelancerId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setFreelancerId(String FreelancerId) {
        freelancerId = FreelancerId;
    }

    public void setCalendarSlot(CalendarSlot calendarSlot) {
        this.calendarSlot = calendarSlot;
    }

    // pretty print the object
    @Override
    public String toString() {
        return "UserBookAppointmentSlotRequestBody{" +
                "userId='" + userId + '\'' +
                ", FreelancerId='" + freelancerId + '\'' +
                ", calendarSlot=" + calendarSlot +
                '}';
    }
}
