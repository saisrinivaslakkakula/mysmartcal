package com.mysmartcal.backend.calander;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Data
@Document
public class CalendarSlot {
    @Id
    private String slotId;
    private String requestedUserId;
    private String requestedFreeLancerId;

    public void setSlotId(String slotId) {
        this.slotId = slotId;
    }

    public String getRequestedUserId() {
        return requestedUserId;
    }

    public void setRequestedUserId(String requestedUserId) {
        this.requestedUserId = requestedUserId;
    }

    public String getRequestedFreeLancerId() {
        return requestedFreeLancerId;
    }

    public void setRequestedFreeLancerId(String requestedFreeLancerId) {
        this.requestedFreeLancerId = requestedFreeLancerId;
    }

    public String getStartdate() {
        return startdate;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public String getEnddate() {
        return enddate;
    }

    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }

    private String startdate;
    private String enddate;
    private String fromTime;
    private String toTime;
    private String status;
    private String serviceID;

    public void setSlotId() {
        ObjectId objectId = new ObjectId();
        this.slotId = objectId.toString();
    }

    public String getDate() {
        return startdate;
    }

    public void setDate(String date) {
        this.startdate= date;
        this.enddate= date;
    }

    public String getFromTime() {
        return fromTime;
    }

    public void setFromTime(String fromTime) {
        this.fromTime = fromTime;
    }

    public String getToTime() {
        return toTime;
    }

    public void setToTime(String toTime) {
        this.toTime = toTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getServiceID() {
        return serviceID;
    }

    public void setServiceID(String serviceID) {
        this.serviceID = serviceID;
    }

    public String getSlotId() {
        return slotId;
    }
    public void setSlotIDExplicit(String slotId) {
        this.slotId = slotId;
    }
}
