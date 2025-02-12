import { Flex, ChakraProvider } from '@chakra-ui/react';
import ChatWindow from './component/ChatWindow';
import ChatList from './component/ChatList';
import React, { useState } from 'react';
import config from './config';

function ChatApp() {
  const [activeUser, setActiveUser] = useState(config.UserId);

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
