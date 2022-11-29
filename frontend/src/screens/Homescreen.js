import React from 'react'
import { Link } from 'react-router-dom';

const Homescreen = () => {

    const divStyle = {
        color: 'black',
        marginLeft: '30%',
        marginTop: '10%',
      };

    return (
        <>
         {/* create a big heading called " Welcome to My Smart Cal" at the center of the screen */}
         <h1 style={divStyle}>Welcome to My Smart Cal</h1>
            <Link style={divStyle} to='/login'>Login</Link>  <br></br> <br></br>
            <Link style={divStyle} to='/register'>Register</Link>
        </>
    )
}

export default Homescreen
