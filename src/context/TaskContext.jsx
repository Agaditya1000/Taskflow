import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext(null);

export const useTasks = () => useContext(TaskContext);

const DEFAULT_COLUMNS = [
    { id: 'todo', title: 'To Do' },
    { id: 'doing', title: 'Doing' },
    { id: 'done', title: 'Done' }
];

const STORAGE_KEYS = {
    TASKS: 'taskflow_tasks',
    LOGS: 'taskflow_logs'
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [activityLog, setActivityLog] = useState([]);
    const [columns] = useState(DEFAULT_COLUMNS); // Fixed columns for now
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState('all'); // all, high, medium, low

    // Load from storage
    useEffect(() => {
        const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
        const storedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);

        if (storedTasks) {
            try {
                setTasks(JSON.parse(storedTasks));
            } catch (e) {
                console.error("Failed to parse tasks", e);
            }
        }

        if (storedLogs) {
            try {
                setActivityLog(JSON.parse(storedLogs));
            } catch (e) {
                console.error("Failed to parse logs", e);
            }
        }
    }, []);

    // Persist to storage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(activityLog));
    }, [activityLog]);

    const logAction = useCallback((action, taskTitle, details = null) => {
        const newLog = {
            id: uuidv4(),
            action,
            taskTitle,
            details,
            timestamp: new Date().toISOString(),
        };
        setActivityLog(prev => {
            const updated = [newLog, ...prev];
            return updated.slice(0, 50);
        });
    }, []);

    const addTask = (taskData) => {
        const newTask = {
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            status: 'todo', // Default column
            ...taskData
        };
        setTasks(prev => [...prev, newTask]);
        logAction('created', newTask.title);
        console.log('Task created, log action called');
    };

    const updateTask = (id, updates, originalTask = null) => {
        setTasks(prev => prev.map(t => {
            if (t.id === id) {
                return { ...t, ...updates };
            }
            return t;
        }));

        const task = originalTask || tasks.find(t => t.id === id);
        if (task) {
            logAction('updated', task.title);
        }
    };

    const deleteTask = (id) => {
        const task = tasks.find(t => t.id === id);
        setTasks(prev => prev.filter(t => t.id !== id));
        if (task) logAction('deleted', task.title);
    };

    const moveTask = (taskId, newStatus) => {
        setTasks(prev => prev.map(t => {
            if (t.id === taskId) {
                return { ...t, status: newStatus };
            }
            return t;
        }));
        const task = tasks.find(t => t.id === taskId);
        if (task && task.status !== newStatus) {
            // Find column title
            const column = columns.find(c => c.id === newStatus);
            const statusTitle = column ? column.title : newStatus;
            logAction('moved', task.title, { to: statusTitle });
        }
    };

    const resetBoard = () => {
        if (window.confirm("Are you sure you want to reset the board? This cannot be undone.")) {
            setTasks([]);
            setActivityLog([]);
            localStorage.removeItem(STORAGE_KEYS.TASKS);
            localStorage.removeItem(STORAGE_KEYS.LOGS);
            // Optional: Add some default tasks back?
        }
    };

    // Derived state for filtering
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
        return matchesSearch && matchesPriority;
    }).sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    const value = {
        tasks: filteredTasks,
        allTasks: tasks, // For stats if needed
        columns,
        activityLog,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        resetBoard,
        searchQuery,
        setSearchQuery,
        filterPriority,
        setFilterPriority
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};
