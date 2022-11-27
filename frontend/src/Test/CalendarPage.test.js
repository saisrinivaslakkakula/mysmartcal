import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import CalendarScreen from '../screens/Calendar'

Enzyme.configure({ adapter: new Adapter() });

it("render the CalendarScreen Page component correctly", () => {
  const CalendarScreenComponent = renderer
    .create(
      <Router>
        <CalendarScreen />
      </Router>
    )
    .toJSON();
  expect(CalendarScreenComponent).toMatchSnapshot();
});