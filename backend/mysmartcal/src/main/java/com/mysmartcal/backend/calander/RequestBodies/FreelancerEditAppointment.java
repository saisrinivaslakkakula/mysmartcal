package com.mysmartcal.backend.calander.RequestBodies;

import com.mysmartcal.backend.calander.CalendarSlot;
import org.bson.types.ObjectId;

public class FreelancerEditAppointment {
    private String userId;
    private String freelancerId;
    private ObjectId calendarSlotId;
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFreelancerId() {
        return freelancerId;
    }

    public void setFreelancerId(String freelancerId) {
        this.freelancerId = freelancerId;
    }

    public ObjectId getCalendarSlotId() {
        return calendarSlotId;
    }

    public void setCalendarSlotId(ObjectId calendarSlotId) {
        this.calendarSlotId = calendarSlotId;
    }
}
