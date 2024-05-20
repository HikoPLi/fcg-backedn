import React, { useEffect, useState } from 'react'
import { Box, Center, Text } from '@chakra-ui/react'
import axios from 'axios';

const AutoApiRequestComponent = () => {
  const [data, setData] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const url = 'http://localhost:8000/getData';

  const fetchData = () => {
    axios
      .get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    // 初始化请求
    fetchData();

    // 每秒请求一次数据
    const intervalId = setInterval(fetchData, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // useEffect(() => {
  //   const eventSource = new EventSource('http://0.0.0.0:8000/getData')

  //   eventSource.onmessage = (event) => {
  //     const jsonData = JSON.parse(event.data)
  //     setData(jsonData[0])
  //   }

  //   eventSource.onerror = (error) => {
  //     console.log('SSE error:', error)
  //   }

  //   return () => {
  //     eventSource.close()
  //   }
  // }, [])

  return (
    <Center height="100vh">
      <Box
        minW="500px"
        minH="300px"
        padding="3rem"
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        overflow="auto"
      >
        <Text textAlign="right" color="gray.500" mb="1rem">
          {currentTime}
        </Text>

        {data ? (
          <div>
            <Center>
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb="1rem"
                color={data.success ? '#95ff95' : 'red'}
              >
                SUCCESS: {data.success.toString().toUpperCase()}
              </Text>
            </Center>

            {data.success && (
              <div>
                <Box>
                  <Text>
                    <strong>OBJECT: {data.object.toUpperCase()}</strong>
                  </Text>
                  <Text>
                    <strong>MATERIAL: {data.material.toUpperCase()}</strong>
                  </Text>
                  <Text>
                    <strong>
                      IS METAL: {data.isMetal.toString().toUpperCase()}
                    </strong>
                  </Text>
                </Box>

                <Box display="flex" justifyContent="space-between" mt="1.5rem">
                  <Text>
                    <strong>TYPE: </strong>
                  </Text>
                  {data.type.metal && (
                    <Text color="blue">
                      <strong>Metal</strong>
                    </Text>
                  )}
                  {data.type.plastic && (
                    <Text color="red">
                      <strong>Plastic</strong>
                    </Text>
                  )}
                  {data.type.paper && (
                    <Text color="green">
                      <strong>Paper</strong>
                    </Text>
                  )}
                  {data.type.glass && (
                    <Text color="gray">
                      <strong>Glass</strong>
                    </Text>
                  )}
                </Box>
              </div>
            )}
            <Text mt="1.5rem">
              <strong>DETAIL: {data.detail}</strong>
            </Text>
          </div>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </Center>
  )
}

export default AutoApiRequestComponent
