import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import UserProfileScreen from '../screens/UserProfileScreen'

Enzyme.configure({ adapter: new Adapter() });

it("render the UserProfileScreen Page component correctly", () => {
  const UserProfileScreenComponent = renderer
    .create(
      <Router>
        <UserProfileScreen />
      </Router>
    )
    .toJSON();
  expect(UserProfileScreenComponent).toMatchSnapshot();
});