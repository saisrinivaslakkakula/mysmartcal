import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import LoginScreen from '../screens/loginScreen'

Enzyme.configure({ adapter: new Adapter() });

it("render the LoginScreen Page component correctly", () => {
  const LoginScreenComponent = renderer
    .create(
      <Router>
        <LoginScreen />
      </Router>
    )
    .toJSON();
  expect(LoginScreenComponent).toMatchSnapshot();
});