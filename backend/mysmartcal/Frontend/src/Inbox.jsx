import React, { Component } from "react";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, Sidebar, ConversationHeader, MessageSeparator, EllipsisButton, TypingIndicator, ConversationList, Search, Avatar, Conversation, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import Header from "./header";
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Inbox extends Component {

    render() {
        const img_src = "https://www.shareicon.net/data/512x512/2016/07/26/802043_man_512x512.png"
        // https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Symbol.jpg";
        return (
          <div className="App">
          <Container>
            <Row>
              <Header />
            </Row>
            <Row className="justify-content-md-center"></Row>
            <div style={{
                height: "600px",
                position: "relative",
                padding: "10px"
              }}>
                        <MainContainer responsive>                
                          <Sidebar position="left" scrollable={false}>
                            <Search placeholder="Search..." />
                            <ConversationList>                                                     
                              <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                                <Avatar src={img_src} name="Lilly" status="available" />
                              </Conversation>
                              
                              <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                                <Avatar src={img_src} name="Joe" status="dnd" />
                              </Conversation>
                              
                              <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                                <Avatar src={img_src} name="Emily" status="available" />
                              </Conversation>
                              
                              <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                                <Avatar src={img_src} name="Kai" status="unavailable" />
                              </Conversation>
                                          
                              <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                                <Avatar src={img_src} name="Akane" status="eager" />
                              </Conversation>
                                                  
                              <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                                <Avatar src={img_src} name="Eliot" status="away" />
                              </Conversation>
                                                                  
                              <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you">
                                <Avatar src={img_src} name="Zoe" status="dnd" />
                              </Conversation>
                              
                              <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                                <Avatar src={img_src} name="Patrik" status="invisible" />
                              </Conversation>                                 
                            </ConversationList>
                          </Sidebar>
                          
                          <ChatContainer>
                            <ConversationHeader>
                              <ConversationHeader.Back />
                              <Avatar src={img_src} name="Zoe" />
                              <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />
                              <ConversationHeader.Actions>
                                <EllipsisButton orientation="vertical" />
                              </ConversationHeader.Actions>          
                            </ConversationHeader>
                            <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
                              <MessageSeparator content="Saturday, 30 November 2019" />
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "single"
                      }}>
                                <Avatar src={img_src} name="Zoe" />
                              </Message>
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "single"
                      }} avatarSpacer />
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "first"
                      }} avatarSpacer />
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "normal"
                      }} avatarSpacer />
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "normal"
                      }} avatarSpacer />
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "last"
                      }}>
                                <Avatar src={img_src} name="Zoe" />
                              </Message>
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "first"
                      }} />
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "normal"
                      }} />
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "normal"
                      }} />
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Patrik",
                        direction: "outgoing",
                        position: "last"
                      }} />
                              
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "first"
                      }} avatarSpacer />
                              <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe",
                        direction: "incoming",
                        position: "last"
                      }}>
                                <Avatar src={img_src} name="Zoe" />
                              </Message>
                            </MessageList>
                            <MessageInput placeholder="Type message here" />
                            {/* value={messageInputValue} onChange={val => setMessageInputValue(val)} /> */}
                          </ChatContainer>                         
                        </MainContainer>
                      </div>
                      </Container>
                      </div>
        );
    }
}

export default Inbox;