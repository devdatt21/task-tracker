import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { Box, VStack, Heading, HStack } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box p={5}>
          <VStack spacing={5}>
            <Heading>Task Tracker</Heading>
            <HStack spacing={5}>
              <Link to="/">Task List</Link>
              <Link to="/add">Add Task</Link>
            </HStack>
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add" element={<TaskForm />} />
            </Routes>
          </VStack>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App