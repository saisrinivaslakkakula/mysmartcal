package com.mysmartcal.backend.User;

import com.mysmartcal.backend.calander.CalendarSlot;

import java.util.Date;
import java.util.Optional;

public class NotificationMessage {
    private String senderId;
    private String receiverId;
    private String notificationText;
    private Date dateTime;
    private String senderFirstName;
    private String senderLastName;
    private String senderEmail;
    private String notificationType;

    private CalendarSlot calendarSlot;

    public CalendarSlot getCalendarSlot() {
        return calendarSlot;
    }

    public void setCalendarSlot(CalendarSlot calendarSlot) {
        this.calendarSlot = calendarSlot;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public String getNotificationText() {
        return notificationText;
    }

    public void setNotificationText(String notificationText) {
        this.notificationText = notificationText;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getSenderFirstName() {
        return senderFirstName;
    }

    public void setSenderFirstName(String senderFirstName) {
        this.senderFirstName = senderFirstName;
    }

    public String getSenderLastName() {
        return senderLastName;
    }

    public void setSenderLastName(String senderLastName) {
        this.senderLastName = senderLastName;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }
}
