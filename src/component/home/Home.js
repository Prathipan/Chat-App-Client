import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../login/Login";
import Register from "../login/Register";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
     const user = JSON.parse(localStorage.getItem("userInfo"));
     if(user) navigate("/chats");
  },[navigate])

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work Sans">
          CHAT-APP
        </Text>
      </Box>
      <Box bg="white" w="100%" p={3} borderRadius="lg" borderWidth="1px">
        <Tabs  variant='soft-rounded'>
          <TabList>
            <Tab w='50%'>Login</Tab>
            <Tab w='50%'>Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
