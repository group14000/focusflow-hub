'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, BellIcon, XIcon } from 'lucide-react'
import { format } from 'date-fns'

type Priority = 'Low' | 'Medium' | 'High'
type RecurrenceType = 'None' | 'Daily' | 'Weekly' | 'Monthly'

interface Subtask {
    id: string
    title: string
    completed: boolean
}

interface Task {
    id: string
    title: string
    description: string
    priority: Priority
    category: string
    labels: string[]
    recurrence: RecurrenceType
    subtasks: Subtask[]
    dueDate: Date | undefined
    reminder: boolean
}

export default function TaskManager() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<Task>({
        id: '',
        title: '',
        description: '',
        priority: 'Medium',
        category: '',
        labels: [],
        recurrence: 'None',
        subtasks: [],
        dueDate: undefined,
        reminder: false,
    })
    const [categories, setCategories] = useState<string[]>(['Work', 'Personal'])
    const [newCategory, setNewCategory] = useState('')
    const [newLabel, setNewLabel] = useState('')
    const [newSubtask, setNewSubtask] = useState('')

    const handleAddTask = () => {
        if (newTask.title) {
            setTasks([...tasks, { ...newTask, id: Date.now().toString() }])
            setNewTask({
                id: '',
                title: '',
                description: '',
                priority: 'Medium',
                category: '',
                labels: [],
                recurrence: 'None',
                subtasks: [],
                dueDate: undefined,
                reminder: false,
            })
        }
    }

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory])
            setNewCategory('')
        }
    }

    const handleAddLabel = () => {
        if (newLabel && !newTask.labels.includes(newLabel)) {
            setNewTask({ ...newTask, labels: [...newTask.labels, newLabel] })
            setNewLabel('')
        }
    }

    const handleAddSubtask = () => {
        if (newSubtask) {
            setNewTask({
                ...newTask,
                subtasks: [...newTask.subtasks, { id: Date.now().toString(), title: newSubtask, completed: false }],
            })
            setNewSubtask('')
        }
    }

    const handleRemoveLabel = (label: string) => {
        setNewTask({ ...newTask, labels: newTask.labels.filter((l) => l !== label) })
    }

    const handleRemoveSubtask = (id: string) => {
        setNewTask({ ...newTask, subtasks: newTask.subtasks.filter((s) => s.id !== id) })
    }

    const mockSendReminder = (task: Task) => {
        console.log(`Reminder sent for task: ${task.title}`)
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            placeholder="Enter task title"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            placeholder="Enter task description"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                                value={newTask.priority}
                                onValueChange={(value: Priority) => setNewTask({ ...newTask, priority: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={newTask.category}
                                onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category"
                        />
                        <Button onClick={handleAddCategory}>Add Category</Button>
                    </div>

                    <div>
                        <Label>Labels</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {newTask.labels.map((label) => (
                                <span key={label} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                                    {label}
                                    <button onClick={() => handleRemoveLabel(label)} className="ml-1 text-blue-600 hover:text-blue-800">
                                        <XIcon size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <Input
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                placeholder="New label"
                            />
                            <Button onClick={handleAddLabel}>Add Label</Button>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="recurrence">Recurrence</Label>
                        <Select
                            value={newTask.recurrence}
                            onValueChange={(value: RecurrenceType) => setNewTask({ ...newTask, recurrence: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select recurrence" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="None">None</SelectItem>
                                <SelectItem value="Daily">Daily</SelectItem>
                                <SelectItem value="Weekly">Weekly</SelectItem>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Subtasks</Label>
                        <ul className="space-y-2 mb-2">
                            {newTask.subtasks.map((subtask) => (
                                <li key={subtask.id} className="flex items-center space-x-2">
                                    <Checkbox id={subtask.id} />
                                    <label htmlFor={subtask.id} className="text-sm">{subtask.title}</label>
                                    <button onClick={() => handleRemoveSubtask(subtask.id)} className="text-red-600 hover:text-red-800">
                                        <XIcon size={14} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex space-x-2">
                            <Input
                                value={newSubtask}
                                onChange={(e) => setNewSubtask(e.target.value)}
                                placeholder="New subtask"
                            />
                            <Button onClick={handleAddSubtask}>Add Subtask</Button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div>
                            <Label>Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {newTask.dueDate ? format(newTask.dueDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={newTask.dueDate}
                                        onSelect={(date) => setNewTask({ ...newTask, dueDate: date || undefined })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="reminder"
                                checked={newTask.reminder}
                                onCheckedChange={(checked) => setNewTask({ ...newTask, reminder: checked as boolean })}
                            />
                            <Label htmlFor="reminder">Set Reminder</Label>
                        </div>
                    </div>

                    <Button onClick={handleAddTask} className="w-full">Add Task</Button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Task List</h2>
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks added yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li key={task.id} className="border-b pb-4">
                                <h3 className="text-lg font-semibold">{task.title}</h3>
                                <p className="text-gray-600">{task.description}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                        }`}>
                                        {task.priority}
                                    </span>
                                    {task.category && (
                                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                                            {task.category}
                                        </span>
                                    )}
                                    {task.labels.map((label) => (
                                        <span key={label} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                            {label}
                                        </span>
                                    ))}
                                </div>
                                {task.subtasks.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {task.subtasks.map((subtask) => (
                                            <li key={subtask.id} className="flex items-center space-x-2">
                                                <Checkbox id={`${task.id}-${subtask.id}`} />
                                                <label htmlFor={`${task.id}-${subtask.id}`} className="text-sm">{subtask.title}</label>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                    {task.dueDate && <span>{format(task.dueDate, "PPP")}</span>}
                                    {task.recurrence !== 'None' && <span>Recurring: {task.recurrence}</span>}
                                    {task.reminder && (
                                        <button onClick={() => mockSendReminder(task)} className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                                            <BellIcon size={14} />
                                            <span>Send Reminder</span>
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}