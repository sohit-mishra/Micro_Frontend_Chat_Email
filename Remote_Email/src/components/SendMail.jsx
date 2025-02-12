import { useState } from 'react';
import { Box, Button, Input, Textarea, FormControl, Heading, FormLabel, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import config from '../config';


export default function SendMail() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const toast = useToast();

  const onSendMail = async () => {
    if (!email || !subject || !body) {
      setStatus('Please fill in all fields.');
      return;
    }
    

    const templateParams = {
      reply_to: email,
      from_subject: subject,
      message: body,
    };

    setLoading(true);
    setStatus('Sending...');

    try {
      const response = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        {
          service_id: config.serviceId,
          template_id: config.templateId,
          user_id: config.userId,
          template_params: templateParams,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );


      if (response.data === 'OK') {
        setStatus('Email sent successfully!');
        setEmail('');
        setSubject('');
        setBody('');
        
        toast({
          title: 'Email sent.',
          description: "Your email has been successfully sent.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          id: 'email-sent-toast',  
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('Failed to send email. Please try again.');
      
      toast({
        title: 'Error sending email.',
        description: 'There was an issue with sending the email. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        id: 'email-error-toast', 
      });
    } finally {
      setLoading(false);
      setEmail('');
      setSubject('');
      setBody('');
    }
  };

  return (
    <Box
      width={'400px'}
      display={'flex'}
      flexDirection={'column'}
      border={'1px solid #dddddd'}
      m={'26px auto'}
      borderRadius={'5px'}
      p={'20px 30px'}
    >
      <Heading textAlign={'center'} fontWeight={'bold'} fontSize={'32px'}>
        Send Mail
      </Heading>

      <FormControl id="email" mt={'30px'} isRequired>
        <FormLabel>To</FormLabel>
        <Input
          type="email"
          placeholder="Enter recipient's email"
          width="100%"
          mt={2}
          p={'5px 10px'}
          outline={'none'}
          border={'1px solid #c5c5c5'}
          borderRadius={'5px'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="subject" mt={'18px'} isRequired>
        <FormLabel>Subject</FormLabel>
        <Input
          type="text"
          placeholder="Enter subject"
          width="100%"
          mt={2}
          p={'5px 10px'}
          outline={'none'}
          border={'1px solid #c5c5c5'}
          borderRadius={'5px'}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </FormControl>

      <FormControl id="message" mt={'18px'} isRequired>
        <FormLabel>Message</FormLabel>
        <Textarea
          placeholder="Write your message here"
          resize="vertical"
          width="100%"
          mt={2}
          p={'5px 10px'}
          outline={'none'}
          border={'1px solid #c5c5c5'}
          borderRadius={'5px'}
          height={200}
          sx={{ resize: 'none' }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </FormControl>

      {status && (
        <Box mt={2} color={status.includes('success') ? 'green' : 'red'}>
          {status}
        </Box>
      )}

      <Button
        colorScheme="blue"
        mt={4}
        bg={'green'}
        borderRadius={'5px'}
        p={'10px 20px'}
        color={'white'}
        onClick={onSendMail}
        isLoading={loading}
        loadingText="Sending..."
        isDisabled={loading}
        _hover={{
          bg: 'darkgreen',
        }}
      >
        {loading ? <Spinner size="sm" /> : 'Send Email'}
      </Button>
    </Box>
  );
}
