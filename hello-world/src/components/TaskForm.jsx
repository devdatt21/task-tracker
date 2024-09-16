import React, { useState } from 'react'
import axios from 'axios'
import { VStack, FormControl, FormLabel, Input, Textarea, Select, Button } from '@chakra-ui/react'

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', status: 'Pending' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8080/api/tasks', task, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTask({ title: '', description: '', dueDate: '', status: 'Pending' })
      alert('Task added successfully!')
    } catch (error) {
      console.error('Error adding task:', error)
      alert('Failed to add task. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Due Date</FormLabel>
          <Input
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="blue">Add Task</Button>
      </VStack>
    </form>
  )
}

export default TaskForm