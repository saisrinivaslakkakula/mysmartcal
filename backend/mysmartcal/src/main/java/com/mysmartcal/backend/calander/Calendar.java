package com.mysmartcal.backend.calander;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;

public class Calendar {
    @Id
    private String id;
    private ObjectId userId;
    ArrayList<CalendarSlot> vacantSlots;
    ArrayList<CalendarSlot> appointmentsGiven;
    ArrayList<CalendarSlot> appointmentsTaken;

    public void setUserId(ObjectId userIdObject) {
        this.userId = userIdObject;
    }
    public void setVacantSlots(ArrayList<CalendarSlot> vacantSlots) {
        this.vacantSlots = vacantSlots;
    }
    public void setAppointmentsGiven(ArrayList<CalendarSlot> appointmentsGiven) {
        this.appointmentsGiven = appointmentsGiven;
    }
    public void setAppointmentsTaken(ArrayList<CalendarSlot> appointmentsTaken) {
        this.appointmentsTaken = appointmentsTaken;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public ArrayList<CalendarSlot> getVacantSlots() {
        return vacantSlots;
    }

    public ArrayList<CalendarSlot> getAppointmentsGiven() {
        return appointmentsGiven;
    }

    public ArrayList<CalendarSlot> getAppointmentsTaken() {
        return appointmentsTaken;
    }
    // pretty print the calendar
    public String JSONString() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"id\":\"" + id + "\",");
        sb.append("\"userId\":\"" + userId + "\",");
        sb.append("Vacant Slots: \n");
        for (CalendarSlot slot : vacantSlots) {
            sb.append(slot.toString());
        }
        sb.append("Appointments Given: \n");
        for (CalendarSlot slot : appointmentsGiven) {
            sb.append(slot.toString());
        }
        sb.append("Appointments Taken: \n");
        for (CalendarSlot slot : appointmentsTaken) {
            sb.append(slot.toString());
        }
        return sb.toString();
    }
}
