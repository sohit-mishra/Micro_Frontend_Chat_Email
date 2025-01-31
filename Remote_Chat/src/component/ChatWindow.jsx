import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import MessageInput from './MessageInput';
import Message from './Message';
import { useState, useEffect } from 'react';

export default function ChatWindow({ activeUser }) {
  const [user, setUser] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const appId = import.meta.env.VITE_TALKJS_APP_ID;
  const authToken = import.meta.env.VITE_TALKJS_AUTH_TOKEN;

  useEffect(() => {
    if (!activeUser) {
      setUser(null);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://api.talkjs.com/v1/${appId}/users/${activeUser}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    fetchUserDetails();
  }, [activeUser, appId, authToken]);

  return (
    <Box
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width={{base:'100%',md:"calc(100% - 400px)"}}
      position="fixed"
      bottom={0}
      right={0}
      top={0}
      mt="80px"
      bg="white"
    >
      <Box flex={1} overflowY="auto">
        <Flex
          alignItems="center"
          p="10px 20px"
          bg="gray.100"
          boxShadow="sm"
          border="1px solid #dddddd"
          borderLeft="0"
          position="fixed"
          width="full"
        >
          <>
            <Avatar name={user?.name} src={user?.photoUrl} boxSize={12} />
            <Text fontWeight="bold" ml={3}>{user?.name}</Text>
          </>
        </Flex>

        <Message activeUser={activeUser} dataLoading={dataLoading} setDataLoading={setDataLoading} />
      </Box>

      {activeUser && <MessageInput activeUser={activeUser} setDataLoading={setDataLoading} />}
    </Box>
  );
}
