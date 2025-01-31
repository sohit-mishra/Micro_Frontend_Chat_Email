import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home';
import Chat from 'remoteChat/Chat';
import Email from 'remoteEmail/Email';
import {Box} from '@chakra-ui/react';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="chat" element={<Chat mt={10}/>} />
      <Route path="email" element={<Email />} />
    </Routes>
  );
}
