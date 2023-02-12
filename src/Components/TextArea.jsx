import { Box, Textarea } from '@chakra-ui/react'
import React from 'react'

const TextArea = ({textInput,handleKeyDown,currInput,setCurrInput}) => {
  return (
    <Box>
      <Textarea mt="20px" border="1px solid" ref={textInput}  type="text" className="input" onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)}  />
    </Box>
  )
}

export default TextArea
