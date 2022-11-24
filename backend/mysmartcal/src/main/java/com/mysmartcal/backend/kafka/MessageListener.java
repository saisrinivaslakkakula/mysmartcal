package com.mysmartcal.backend.kafka;

import com.mysmartcal.backend.User.NotificationMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {
    @Autowired
    SimpMessagingTemplate template;
    public static final String KAFKA_TOPIC = "notification1";
    public static final String GROUP_ID = "notification_group";

    @KafkaListener(
            topics = KAFKA_TOPIC,
            groupId = GROUP_ID
    )
    public void listen(NotificationMessage message) {
        System.out.println("sending via kafka listener..");
        template.convertAndSend("/topic/group", message);
    }
}
