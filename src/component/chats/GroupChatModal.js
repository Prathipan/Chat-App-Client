import {
    Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { api } from "../../api";
import { ChatState } from "../../context/chatProvider";
import UserBadge from "./UserBadge";
import UserListItem from "./UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGorupChatName] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleSearch = async(query) => {
    setSearch(query);
    if(!search) {
        return;
    }
    try {
        setLoading(true);
        const config = {
            headers : {
                Authorization : `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`${api}/api/user/all-users?search=${search}`,config);
        setLoading(false);
        setSearchResult(data);
    } catch (error) {
        toast({
            title: "Error Occured",
            description: "Failed to load chats",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
    }
  }

  const handleSubmit = async() => {
     if(!groupChatName || !selectedUser) {
        toast({
            title: "Please enter required fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          return;
     }
     try {
        const config = {
            headers : {
                Authorization : `Bearer ${user.token}`
            }
        }
        const {data} = await axios.post(`${api}/api/chat/create-group-chat`,{
            name : groupChatName,
            users : JSON.stringify(selectedUser.map(u => u._id))
        },config)
        setChats({data,...chats});
        onClose();
        toast({
            title: "New Group chat created",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
     } catch (error) {
        toast({
            title: "Failed to create the Chat!",
            description: error.response.data,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom ",
          });
     }
  }

  const handleDelete = (userToDel) => {
    setSelectedUser(selectedUser.filter(user => user._id !== userToDel._id))
  }

  const handleGroup = (userToAdd) => {
    if(selectedUser.includes(userToAdd)) {
        toast({
            title: "User Already added",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          return;
    }
    setSelectedUser([...selectedUser,userToAdd]);
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <Input placeholder="Enter Group Name" mb={2} onChange={(e) => setGorupChatName(e.target.value)} />
            </FormControl>
            <FormControl>
                <Input placeholder="Add members Eg: John" mb={2} onChange={(e) => handleSearch(e.target.value)} />
            </FormControl> 
            <Box w="100%" display="flex" flexWrap="wrap">
            {selectedUser.map((u) => (
                <UserBadge   
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? ( <div>Loading...</div>) : (
                searchResult?.slice(0,4).map((user) => {
                   return <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                })
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
