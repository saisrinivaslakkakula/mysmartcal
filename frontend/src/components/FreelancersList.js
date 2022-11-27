import React from 'react';
import {Col} from "react-bootstrap";
import Freelancer from "./Freelancer";

const FreelancersList = ({freelancers}) => {

    return(
        <>
            { freelancers.map(freelancer => (
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Freelancer freelancer={freelancer} />
                </Col>
            ))}
        </>
    )
}

export default FreelancersList