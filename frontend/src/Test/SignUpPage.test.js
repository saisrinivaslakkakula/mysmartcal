import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import RegisterScreen from '../screens/registerScreen'

Enzyme.configure({ adapter: new Adapter() });

it("render the RegisterScreen Page component correctly", () => {
  const RegisterScreenComponent = renderer
    .create(
      <Router>
        <RegisterScreen />
      </Router>
    )
    .toJSON();
  expect(RegisterScreenComponent).toMatchSnapshot();
});