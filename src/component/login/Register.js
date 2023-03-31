import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import CryptoJS from "crypto-js";
import React, { useState } from "react";
import { api } from "../../api";

const Register = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = (value) => {
    value === 1 ? setShow(!show) : setShow1(!show1);
  };
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mernChatApp");
      data.append("cloud_name", "prathipan");
      fetch("https://api.cloudinary.com/v1_1/prathipan/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserDetails({ ...userDetails, picture: data.url.toString() });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an jpg/png file!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !userDetails.userName ||
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.confirmPassword
    ) {
      toast({
        title: "Please fill the mandatory fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      toast({
        title: "Password doesn't match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const hashedPassword = CryptoJS.AES.encrypt(
      JSON.stringify(userDetails.password),
      "my-secret-key@123"
    ).toString();
    if(userDetails.picture === ""){
      userDetails.picture = undefined;
    }
    userDetails.password = hashedPassword;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${api}/api/auth/register`,
        userDetails,
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      setUserDetails({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        picture: "",
      });
    } catch (error) {
      toast({
        title: "Error occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          name="userName"
          value={userDetails.userName}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="Email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your name"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => handleClick(1)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="Cpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show1 ? "text" : "password"}
            placeholder="Enter your name"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => handleClick(2)}>
              {show1 ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="profile">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          name="picture"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Register;
