import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { VStack, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react'

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:8080/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTasks(res.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    fetchTasks()
  }, [])

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">Tasks</Heading>
      {tasks.length === 0 ? (
        <Text>No tasks found.</Text>
      ) : (
        <UnorderedList>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              {task.title} - {task.status}
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </VStack>
  )
}

export default TaskList