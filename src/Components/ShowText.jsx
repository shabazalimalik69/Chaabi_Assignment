import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const ShowText = ({status,words,getCharClass,correct,incorrect}) => {
  return (
    <Box>
        {status === 'started' && (
        <Box >
          <Box>
            <Box>
              <Box>
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split("").map((char, idx) => (
                        <span  className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                      )) }
                    </span>
                    <span> </span>
                  </span>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {status === 'finished' && (
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex">
              <Text fontWeight="bold">Words per minute:&nbsp;</Text>
              <Text fontWeight="bold">
                {correct}
              </Text>
            </Box>

            <Box display="flex">
              <Text fontWeight="bold">Accuracy:&nbsp;</Text>
              {correct !== 0 ? (
                <Text fontWeight="bold">
                  {Math.round((correct / (correct + incorrect)) * 100)}%
                </Text>
              ) : (
                <Text fontWeight="bold">0%</Text>
              )}
            </Box>
          </Box>
        </Box>
      )}

    </Box>
  )
}

export default ShowText
