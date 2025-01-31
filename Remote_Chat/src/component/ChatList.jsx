import { Box, VStack, Text, Heading, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';

export default function ChatList({ activeUser, setActiveUser }) {
  const [users, setUsers] = useState([]);

  const appId = import.meta.env.VITE_TALKJS_APP_ID;
  const conversationId = import.meta.env.VITE_TALKJS_CONVERSATION_ID;
  const authToken = import.meta.env.VITE_TALKJS_AUTH_TOKEN;

  const scrollbarColor = useColorModeValue('gray.300', 'gray.500');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://api.talkjs.com/v1/${appId}/conversations/${conversationId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsers(Object.keys(data.participants));
        } else {
          console.error("Failed to fetch users:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [appId, conversationId, authToken]);

  const handleActive = (userId) => {
    setActiveUser(userId);
    localStorage.setItem("Current_User", userId);
  };

  return (
    <Box
      p={4}
      w={{ base: "full", md: "400px" }}
      maxW={{ base: "full", md: "md" }}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      height="calc(100vh - 80px)"
      position="fixed"
      top={0}
      left={0}
      zIndex={10}
      mt="80px"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Heading fontSize={{ base: "lg", md: "22px" }} mb={5} fontWeight="bold">
        Chat
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
        overflowY="auto"
        maxH="calc(100vh - 120px)"
        paddingRight={2}
        sx={{
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-thumb": {
            background: scrollbarColor,
            borderRadius: "10px",
          },
        }}
      >
        {users.length === 0 ? (
          <Text>No friends found.</Text>
        ) : (
          users.map((userId) => (
            <ChatItem
              key={userId}
              userId={userId}
              isActive={activeUser === userId}
              onClick={() => handleActive(userId)} 
            />
          ))
        )}
      </VStack>
    </Box>
  );
}
