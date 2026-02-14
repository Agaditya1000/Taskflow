import { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    closestCorners
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useTasks } from '../context/TaskContext';
import { Column } from '../components/board/Column';
import { TaskCard } from '../components/board/TaskCard';
import { Button } from '../components/ui/Button';
import { Plus, Filter, RotateCw } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { TaskModal } from '../components/board/TaskModal';

export default function BoardPage() {
    const { tasks, columns, moveTask, resetBoard, searchQuery, setSearchQuery, filterPriority, setFilterPriority } = useTasks();
    const [activeId, setActiveId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Prevent accidental drags
            },
        })
    );

    const openNewTaskModal = () => {
        setTaskToEdit(null);
        setIsModalOpen(true);
    };

    const openEditTaskModal = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeId = active.id;
        const activeTask = tasks.find(t => t.id === activeId);

        // Identified drop target
        let targetColumnId = over.id;

        // Check if over.id is a column
        const isOverColumn = columns.some(c => c.id === over.id);

        if (!isOverColumn) {
            // Find the task we dropped over to get its column
            const overTask = tasks.find(t => t.id === over.id);
            if (overTask) {
                targetColumnId = overTask.status;
            } else {
                setActiveId(null);
                return;
            }
        }

        if (activeTask && activeTask.status !== targetColumnId) {
            moveTask(activeId, targetColumnId);
        }

        setActiveId(null);
    };

    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };

    const activeTask = activeId ? tasks.find(t => t.id === activeId) : null;

    return (
        <div className="h-full flex flex-col">
            {/* Header / Controls */}
            <div className="flex justify-between items-center mb-6 pl-2">
                <h1 className="text-2xl font-bold text-white">My Board</h1>
                <div className="flex gap-4">
                    {/* Search & Filter */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field w-48"
                        />
                        <select
                            className="input-field w-48 cursor-pointer"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <Button variant="ghost" onClick={resetBoard} className="text-white/60 hover:text-red-400">
                        <RotateCw size={16} />
                        Reset
                    </Button>

                    <Button variant="primary" onClick={openNewTaskModal}>
                        <Plus size={16} />
                        New Task
                    </Button>
                </div>
            </div>

            {/* Board Columns */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-6 h-full min-w-max px-2">
                        {columns.map(col => (
                            <Column
                                key={col.id}
                                column={col}
                                tasks={getTasksByStatus(col.id)}
                                onEdit={openEditTaskModal}
                            />
                        ))}
                    </div>

                    <DragOverlay>
                        {activeTask ? <TaskCard task={activeTask} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                taskToEdit={taskToEdit}
            />
        </div>
    );
}
