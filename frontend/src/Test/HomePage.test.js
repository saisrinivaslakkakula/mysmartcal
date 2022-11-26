import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import Homescreen from '../screens/Homescreen'

Enzyme.configure({ adapter: new Adapter() });

it("render the Landing Page component correctly", () => {
  const HomescreenComponent = renderer
    .create(
      <Router>
        <Homescreen />
      </Router>
    )
    .toJSON();
  expect(HomescreenComponent).toMatchSnapshot();
});