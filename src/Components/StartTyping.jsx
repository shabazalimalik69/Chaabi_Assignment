import React from 'react';
import {Box,Button} from "@chakra-ui/react"

const StartTyping = ({handleStart}) => {
   
  return (
    <Box>
      <Button display="flex" bg="blue" color="white" margin="auto" mt="30px" _hover={{bg:"brown",}} onClick={handleStart} >Start Typing</Button>
    </Box>
  )
}

export default StartTyping
