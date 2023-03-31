import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import CryptoJS from "crypto-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading,setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [loginDetails,setLoginDetails] = useState({
    email : "",
    password : ""
  })

  const handleClick = () => {
    setShow(!show);
  };


  const handleChange = (e) => {
    const {name,value} = e.target;
    setLoginDetails((prev) => {
      return {...prev,[name] : value}
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    if( !loginDetails.email || !loginDetails.password ) {
      toast({
        title : "Please fill the mandatory fields!",
        status : "warning",
        duration: 5000,
        isClosable : true,
        position : "bottom" 
      })
      setLoading(false)
      return;
    }
      const hashedPassword = CryptoJS.AES.encrypt(JSON.stringify(loginDetails.password), 'my-secret-key@123').toString();
      loginDetails.password = hashedPassword;
      try {
        const config = {
          headers : {
            "Content-type" : "application/json"
          }
        }
        const {data} = await axios.post(`${api}/api/auth/login`,loginDetails,config);
        toast({
          title : "Successfully logged In!",
          status : "success",
          duration: 5000,
          isClosable : true,
          position : "bottom" 
        });
        setLoading(false);
        localStorage.setItem("userInfo",JSON.stringify(data));
        navigate("/chats")
      } catch (error) {
        toast({
          title : "Error occured",
          description : error.response.data.message,
          status : "error",
          duration: 5000,
          isClosable : true,
          position : "bottom" 
        })
      } 
  };

  return (
    <VStack spacing="5px">
      <FormControl id="LEmail" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="Lpassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your name"
            name="password"
            value={loginDetails.password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setLoginDetails({
            email : "guest@example.com",
            password : "123456"
          });
        }}
      >
        signIn with Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
