import { HStack, Avatar, Box, Text, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useBreakpointValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ChatWindow from './ChatWindow';

const ChatItem = ({ userId, isActive, onClick }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const appId = import.meta.env.VITE_TALKJS_APP_ID;
  const authToken = import.meta.env.VITE_TALKJS_AUTH_TOKEN;

  const hoverBg = useColorModeValue('gray.100', '#dbdbdb');
  const activeBg = useColorModeValue('blue.100', 'blue.700'); 

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://api.talkjs.com/v1/${appId}/users/${userId}`,
          {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${authToken}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [appId, authToken, userId]);

  useEffect(() => {
    if (!isMobile) {
      setIsModalOpen(false); 
    }
  }, [isMobile]);

  if (!user) return null;

  const handleClick = () => {
    if (isMobile) {
      setIsModalOpen(true); 
    } else {
      onClick(); 
    }
  };

  return (
    <>
      <HStack
        p={3}
        borderRadius="md"
        bg={isActive ? activeBg : 'transparent'}
        _hover={{ bg: hoverBg }}
        cursor="pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <Avatar name={user.name} src={user.photoUrl} boxSize={10} />
        <Box flex={1}>
          <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>
            {user.name}
          </Text>
          <Text fontSize={'small'}>{user.welcomeMessage}</Text>
        </Box>
      </HStack>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chat with {user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <ChatWindow activeUser={userId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatItem;
