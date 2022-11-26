import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import ProfileScreen from '../screens/profileScreen'

Enzyme.configure({ adapter: new Adapter() });

it("render the ProfileScreen Page component correctly", () => {
  const ProfileScreenComponent = renderer
    .create(
      <Router>
        <ProfileScreen />
      </Router>
    )
    .toJSON();
  expect(ProfileScreenComponent).toMatchSnapshot();
});