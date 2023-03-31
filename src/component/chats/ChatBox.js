import { Box } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../context/chatProvider'
import SingleChat from './SingleChat'

const ChatBox = ({fetchCall,setFetchCall}) => {

  const {selectedChat}  = ChatState()

  return (
    <Box display={{base : selectedChat? "flex" : "nonde", md : "flex"}}
    alignItems = "center"
    flexDir= "column"
    p={3}
    bg="white"
    w={{base : "100%",md : "68%"}}
    borderRadius = "lg"
    borderWidth= "1px"
    >
      <SingleChat fetchCall={fetchCall} setFetchCall={setFetchCall} />
    </Box>
  )
}

export default ChatBox