package com.mysmartcal.backend.User;

import java.util.List;

public class Address {
    private String streetName;
    private String appartmentNumber;
    private String city;
    private String state;
    private String zipCode;

    public Address(String streetName, String appartmentNumber, String city, String state, String zipCode) {
        this.streetName = streetName;
        this.appartmentNumber = appartmentNumber;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getAppartmentNumber() {
        return appartmentNumber;
    }

    public void setAppartmentNumber(String appartmentNumber) {
        this.appartmentNumber = appartmentNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}
