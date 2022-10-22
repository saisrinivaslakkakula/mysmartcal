package com.mysmartcal.backend.calander;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface calendarRepository extends MongoRepository<Calendar, String> {


    Object findByUserId(Object userId);

}