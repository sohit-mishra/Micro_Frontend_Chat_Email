import AllRoutes from './AllRoutes/AllRoutes';
import Header from './component/Header';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box width={'100%'}>
      <Header />
      <AllRoutes />
    </Box>
  )
}

export default App
