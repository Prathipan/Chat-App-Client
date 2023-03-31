import { Box } from "@chakra-ui/react";
import axios from "axios"
import { useEffect, useState } from "react";
import { api } from "../../api";
import { ChatState } from "../../context/chatProvider";
import ChatBox from "./ChatBox";
import "./chats.css"
import MyChats from "./MyChats";
import SideDrawer from "./SideDrawer";

const Chats = () => {
    const {user} = ChatState();
    const[fetchCall,setFetchCall] = useState()

    // console.log(user)
    
  return (
    <div style={{width : "100%"}}>
      { user && <SideDrawer />}
       <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
         { user && <MyChats fetchCall={fetchCall} /> }
         { user && <ChatBox fetchCall={fetchCall} setFetchCall={setFetchCall} /> }
       </Box>
    </div>
  )
}

export default Chats