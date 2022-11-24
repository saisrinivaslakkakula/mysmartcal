import React from 'react'
import { Container } from 'react-bootstrap'
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
const NotificationsBadge = () => {
    const [notificationCount, setNotificationCount] = useState(3);
  return (
    <Container>
        {/* create a bell icon with a notification badge */}
        <i className="fa fa-bell" style={{color:'white',fontSize:'20px',marginTop:'10px',marginRight:'10px'}}></i>
        <NotificationBadge count={notificationCount} effect={Effect.SCALE} />
    </Container>
  )
}

export default NotificationsBadge