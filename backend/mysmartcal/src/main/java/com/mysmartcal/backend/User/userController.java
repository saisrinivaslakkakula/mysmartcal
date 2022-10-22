package com.mysmartcal.backend.User;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class userController {
    private userService userService;

    @PostMapping("/add")
    public Object addUser(@RequestBody User user){
        try {
            return new ResponseEntity<User>(userService.addUser(user), HttpStatus.OK);
            //userService.addUser(user);
        } catch (Exception e) {
            String s = e.getMessage();
            System.out.println(e.getMessage());
            return new ResponseEntity<>(s, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/login")
    public Object login(@RequestBody User user){
        try {
            return new ResponseEntity<User>(userService.login(user), HttpStatus.OK);
            //userService.addUser(user);
        } catch (Exception e) {
            String s = e.getMessage();
            return new ResponseEntity<>(s, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/profile")
    public Object getProfile(@RequestParam(value = "id") String id){
        try {
            return new ResponseEntity<User>(userService.getProfile(id), HttpStatus.OK);
        } catch (Exception e) {
            String s = "Internal Server Error. Please try again later.";
            return new ResponseEntity<>(s, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update/profile")
    public Object updateProfile(@RequestBody User user){
        try {
            return new ResponseEntity<User>(userService.updateProfile(user), HttpStatus.OK);
        } catch (Exception e) {
            String s = "Internal Server Error. Please try again later.";
            return new ResponseEntity<>(s, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
