import React from 'react';
import { Box, Button, Heading, Text, Image, Flex } from '@chakra-ui/react';
import HomeImage from '../assets/home.svg';


export default function Home() {
  return (
    <Flex align="center" justify="space-between" p={8} flexDirection={{base:'column',md:'row'}}>
      <Box order={{base:'1',md:0}} mt={{base:'10',md:'0'}} p={{base:'0',md:'20'}}>
        <Heading as="h1" size="xl" mb={4}>
          Welcome to Our Website
        </Heading>
        <Text fontSize="lg" mb={4}>
          Discover amazing content and explore our<br/> features to enhance your experience.
        </Text>
        <Button colorScheme="blue">Get Started</Button>
      </Box>

      <Box mt={{base:'0',md:'0'}}  p={{base:'0',md:'20'}}>
        <Image 
          src={HomeImage}
          alt="Placeholder Image" 
          borderRadius="md"
          width={{base:'80%',md:'550px'}}
          m={{base:'0 auto'}}
        />
      </Box>
    </Flex>
  );
}