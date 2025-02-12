import { Box, Text, Spinner, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import config from '../config';

export default function Message({ activeUser, dataLoading, setDataLoading }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const appId = config.AppId;
  const conversationId = config.ConversationId;
  const authToken = config.AuthToken;

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.talkjs.com/v1/${appId}/conversations/${conversationId}/messages`,
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
        setMessages(data.data.reverse() || []);
      } else {
        console.error("Failed to fetch messages.");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeUser) {
      fetchMessages();
    }
  }, [activeUser, appId, conversationId, authToken]);

  // Trigger fetch when `dataLoading` is true
  useEffect(() => {
    if (dataLoading) {
      fetchMessages();
      setDataLoading(false); // Reset loading state after fetching
    }
  }, [dataLoading, setDataLoading]);

  return (
    <Box
      p="5px 50px 20px"
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": { width: "5px" },
        "&::-webkit-scrollbar-thumb": { background: "#c7c7c7", borderRadius: "10px" },
      }}
      mt="80px"
      h="500px"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      {loading ? (
        <Spinner />
      ) : messages.length === 0 ? (
        <Text color="gray.500">No messages yet.</Text>
      ) : (
        messages.map((msg, index) => (
          <Flex key={index} mt={2} justifyContent={msg.senderId === activeUser ? "flex-end" : "flex-start"}>
            <Box maxWidth="300px" bg={msg.senderId === activeUser ? "blue.200" : "gray.200"} borderRadius="md" p="10px 14px">
              <Text fontWeight="bold">{msg.text}</Text>
            </Box>
          </Flex>
        ))
      )}
    </Box>
  );
}
