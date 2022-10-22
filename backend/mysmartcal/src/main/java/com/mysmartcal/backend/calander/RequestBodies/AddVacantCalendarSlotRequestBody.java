package com.mysmartcal.backend.calander.RequestBodies;

import com.mysmartcal.backend.calander.CalendarSlot;

public class AddVacantCalendarSlotRequestBody {
    private String userId;
    private CalendarSlot calendarSlot;
    public CalendarSlot getCalendarSlot() {
        return calendarSlot;
    }
    public String getUserId() {
        return userId;
    }
}
