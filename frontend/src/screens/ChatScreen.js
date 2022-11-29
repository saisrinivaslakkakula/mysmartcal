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
    
    const {id} = userInfo
    const uid = id
    // if user is not logged in, redirect to login page
    
        CometChat.login(uid, AUTH_KEY).then(
            user => {
                console.log("Login Successful:", { user });
            },
            error => {
                console.log("Login failed with exception:", { error });
            }
        );

  return (
    <div>
        <CometChatUI />
    </div>
    
  )
}

export default ChatScreen