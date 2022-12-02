package com.mysmartcal.backend;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
public class AppController {

    @RequestMapping({"/", "/profile", "/login", "/register", "/calendar", "calendar/*","freelancers","/chat","/freelancer/*","/freelancerCalendar","/freelancerCalendar/*"})
    public String loadUI() {
        System.out.println("Loading UI");
        return "forward:/index.html";
    }

}
