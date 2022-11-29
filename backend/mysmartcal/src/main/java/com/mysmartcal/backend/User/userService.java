package com.mysmartcal.backend.User;

import com.mysmartcal.backend.calander.Calendar;
import com.mysmartcal.backend.calander.CalendarSlot;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor
public class userService {
    private final userRepository userRepository;
    private final com.mysmartcal.backend.calander.calendarRepository calendarRepository;
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getAllFreelancers() {
        List<User> usersList = userRepository.findAll();
        List<User> freelancers = new ArrayList<>();
        for(User user: usersList){
            if(user.isFreelancer()){
                freelancers.add(user);
            }
        }
        return freelancers;
    }
    public User addUser(User user) {
        // check if user already exists by email else throw exception
        System.out.println(user);
        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            throw new RuntimeException("User already exists");
        }
        Calendar calendar = new Calendar();
        user.setNotifications(new ArrayList<>());
        user.setMessages(new ArrayList<>());
        userRepository.save(user);
        Optional<User> createdUser = userRepository.findByEmail(user.getEmail());
        if (createdUser.isPresent()) {
            String userId = createdUser.get().getId();
            ObjectId userObjectId = new ObjectId(userId);
            calendar.setUserId(userObjectId);
            ArrayList<CalendarSlot> vacantSlots = new ArrayList<>();
            ArrayList<CalendarSlot> appointmentsGiven = new ArrayList<>();
            ArrayList<CalendarSlot> appointmentsTaken = new ArrayList<>();
            calendar.setVacantSlots(vacantSlots);
            calendar.setAppointmentsGiven(appointmentsGiven);
            calendar.setAppointmentsTaken(appointmentsTaken);
            calendarRepository.save(calendar);
        }
        return user;
    }


    public User login(User user) {
        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User does not exist");
        }
        User user1 = userOptional.get();
        if (!user1.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return user1;
    }

    public User getProfile(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("Cannot Fetch Profile Details");
        }
        return userOptional.get();
    }

    public User updateProfile(User user) {
        Optional<User> userOptional = userRepository.findById(user.getId());
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User does not exist");
        }
        User user1 = userOptional.get();
        user1.setFirstName(user.getFirstName());
        user1.setEmail(user.getEmail());
        user1.setLastName(user.getLastName());
        user1.setPassword(user.getPassword());
        user1.setImageUrl(user.getImageUrl());
        user1.setServicesOffered(user.getServicesOffered());
        userRepository.save(user1);
        return user1;
    }

    public ArrayList<NotificationMessage> getNotificationFromMongoDB(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User does not exist");
        }
        User user = userOptional.get();
        return (ArrayList<NotificationMessage>) user.getNotifications();
    }
}

