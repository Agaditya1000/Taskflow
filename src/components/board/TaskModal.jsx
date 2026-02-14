import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTasks } from '../../context/TaskContext';
import { Calendar } from 'lucide-react';

export const TaskModal = ({ isOpen, onClose, taskToEdit = null }) => {
    const { addTask, updateTask } = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setPriority(taskToEdit.priority || 'medium');
            setDueDate(taskToEdit.dueDate || '');
            setTags(taskToEdit.tags ? taskToEdit.tags.join(', ') : '');
        } else {
            resetForm();
        }
    }, [taskToEdit, isOpen]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        setTags('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const taskData = {
            title,
            description,
            priority,
            dueDate,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean)
        };

        if (taskToEdit) {
            updateTask(taskToEdit.id, taskData, taskToEdit);
        } else {
            addTask(taskData);
        }

        onClose();
        resetForm();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={taskToEdit ? 'Edit Task' : 'New Task'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Title"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    autoFocus
                />

                <div className="input-group">
                    <label className="input-label">Description</label>
                    <textarea
                        className="input-field min-h-[100px] resize-none"
                        placeholder="Add a more detailed description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                        <label className="input-label">Priority</label>
                        <select
                            className="input-field"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <Input
                        label="Due Date"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        icon={<Calendar size={16} />}
                    />
                </div>

                <Input
                    label="Tags (comma separated)"
                    placeholder="Design, Dev, Marketing"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />

                <div className="flex justify-end gap-3 pt-4 border-t border-white/30 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        {taskToEdit ? 'Save Changes' : 'Create Task'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
