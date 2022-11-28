package com.mysmartcal.backend.calander;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.*;

public interface calendarRepository extends MongoRepository<Calendar, String> {

    Object findByUserId(Object userId);

    Calendar findCalendarByUserIdEquals(String userId);

}