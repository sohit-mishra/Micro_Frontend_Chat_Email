import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,Image
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from '../assets/logo.png';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={4} bg={'white'} py={2} width={'full'} borderBottom={'2px solid #dddddd'}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
      
        <Box fontSize="xl" fontWeight="bold">
          <Image src={logo} width={150}/>
        </Box>

      
        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/email">Email</Link>
        </HStack>


        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>


      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4} alignItems={'center'}>
            <Link to="/" onClick={onClose}>Home</Link>
            <Link to="/chat" onClick={onClose}>Chat</Link>
            <Link to="/email" onClick={onClose}>Email</Link>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
