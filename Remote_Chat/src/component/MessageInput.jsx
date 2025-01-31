import { Box, Input, IconButton, HStack, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function MessageInput({ activeUser, setDataLoading }) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);  

  const handleSend = async () => {
    if (!message.trim()) return;

    const appId = import.meta.env.VITE_TALKJS_APP_ID;
    const conversationId = import.meta.env.VITE_TALKJS_CONVERSATION_ID;
    const userId = activeUser;
    const authToken = import.meta.env.VITE_TALKJS_AUTH_TOKEN;

    const url = `https://api.talkjs.com/v1/${appId}/conversations/${conversationId}/messages`;

    setSending(true); 

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify([
          {
            text: message,
            sender: userId,
            type: "UserMessage",
          },
        ]),
      });

      if (response.ok) {
        console.log("Message sent successfully");
        setMessage('');
      } else {
        console.error("Failed to send message", await response.text());
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false); 
      setDataLoading(true);
    }
  };

  return (
    <Box
      p={4}
      bg={'#f7f3f3'}
      width={{base:'100%',md:"calc(100% - 400px)"}}
      position={'fixed'}
      bottom={0}
      right={0}
      border={'1px solid #c7c7c7'}
    >
      <HStack>
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          isDisabled={sending}  
        />
        <IconButton
          aria-label="Send Message"
          icon={sending ? <Spinner size="sm" /> : <FaPaperPlane />} 
          onClick={handleSend}
          borderRadius={'full'}
          isDisabled={sending}  
        />
      </HStack>
    </Box>
  );
}
