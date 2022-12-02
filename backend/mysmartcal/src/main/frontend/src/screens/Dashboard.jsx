import React, { useState } from "react";
import { Pie } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = () => {
    const [pieconfig, setPieconfig] = useState({
        appendPadding: 10,
        data: [
            {
                type: 'Free Time',
                value: 27,
              },
              {
                type: 'On Job',
                value: 60,
              },
              {
                type: 'Searching Gigs',
                value: 13,
              },
          ],
        angleField: 'value',
        colorField: 'type',
        width: 200,
        height: 200,
        radius: 0.6,
        label: {
          type: 'outer',
          content: '{name} {percentage}',
        },
        interactions: [
            {
              type: 'pie-legend-active',
            },
            {
              type: 'element-active',
            },
          ],
    });
    const [columnconfig, setColumnconfig] = useState({
        data: [
            {
                type: '5 Stars',
                count: 25,
              },
              {
                type: '4 Stars',
                count: 15,
              },
              {
                type: '3 Stars',
                count: 10,
              },
              {
                type: '2 Stars',
                count: 5,
              },
              {
                type: '1 Stars',
                count: 3,
              },
          ],
        xField: 'type',
        yField: 'count',
        width: 200,
        height: 200,
        title:{
            text: "Customer Reviews",
            position: 'start'
        },
        label: {
          position: 'middle',
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        legend: {
            layout: 'horizontal',
            position: 'right'
          },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: 'Customer Reviews',
          },
          count: {
            alias: 'Review Count',
          },
        },
      });
    const [workcolumnconfig, setWorkcolumnconfig] = useState({
        data: [
            {
                type: '2019',
                count: 1600,
              },
              {
                type: '2020',
                count: 2000,
              },
              {
                type: '2021',
                count: 2400,
              },
              {
                type: '2022',
                count: 800,
              },
          ],
        xField: 'type',
        yField: 'count',
        width: 200,
        height: 200,
        title:{
            text: "Working Hours",
            position: 'center'
        },
        label: {
          position: 'middle',
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: 'Year',
          },
          count: {
            alias: 'Working Hours',
          },
        },
      });
    return (
    <div className="App">
      <Container>
        <Row className="justify-content-md-center" style={{marginTop: "20px"}}>
          <Col style={{height:"300px",width:"300px"}}>
          <Column {...columnconfig} />
          </Col>
          <Col style={{height:"300px",width:"300px"}}>
          <Column {...workcolumnconfig} />
          </Col>
          </Row>
          <Row className="justify-content-md-center">
          <Col style={{height:"300px",width:"300px"}}>
          <Pie {...pieconfig} />
          </Col>
          <Col style={{height:"300px",width:"300px"}}>
          </Col>
      </Row>
      </Container>
      </div>
      );
}

export default Dashboard;
