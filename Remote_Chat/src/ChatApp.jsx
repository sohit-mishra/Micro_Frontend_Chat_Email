import { Flex, ChakraProvider } from '@chakra-ui/react';
import ChatWindow from './component/ChatWindow';
import ChatList from './component/ChatList';
import React, { useState } from 'react';

function ChatApp() {
  const [activeUser, setActiveUser] = useState(import.meta.env.VITE_TALKJS_USER_ID);

  return (
    <ChakraProvider>
      <Flex justifyContent="space-between" mt="80px">
        <ChatList activeUser={activeUser} setActiveUser={setActiveUser} />
        <ChatWindow activeUser={activeUser} width="calc(100% - 400px)" display={{base:'none'}}/>
      </Flex>
    </ChakraProvider>
  );
}

export default ChatApp;
