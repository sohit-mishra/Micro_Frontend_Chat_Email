import SendMail from './components/SendMail';
import { Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'


export default function App() {
  return (
    <ChakraProvider>
      <Box width={'full'}>
        <SendMail />
      </Box>
    </ChakraProvider>
  );
}
