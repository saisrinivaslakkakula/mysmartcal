import React from 'react'
import { useSelector } from 'react-redux'
import { CometChat } from "@cometchat-pro/chat";
import{CometChatConversationListWithMessages,CometChatUI} from '../cometchat-pro-react-ui-kit/CometChatWorkspace/src'
import { AUTH_KEY } from '../constants/ComeChatConstants';
const ChatScreen = () => {
    const {userInfo} = useSelector(state => state.userLogin)
    if(!userInfo){
        window.location.href = '/login'
    }
// user is getting authenticated in cometchat once my app is asking for login to my app.

  return (
    <div>
        <CometChatUI />
    </div>
    
  )
}

export default ChatScreen