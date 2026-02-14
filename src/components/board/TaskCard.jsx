import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Trash2, Edit2 } from 'lucide-react';
import clsx from 'clsx';
import { useTasks } from '../../context/TaskContext';

export const TaskCard = ({ task, onEdit }) => {
    const { deleteTask } = useTasks();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const priorityColors = {
        high: 'border-l-4 border-l-red-500',
        medium: 'border-l-4 border-l-yellow-500',
        low: 'border-l-4 border-l-green-500',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={clsx(
                "glass-panel p-4 mb-3 touch-none group relative overflow-hidden",
                "hover:bg-white/5 transition-colors cursor-grab active:cursor-grabbing",
                priorityColors[task.priority] || 'border-l-4 border-l-gray-500' // Fallback
            )}
        >
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white/90 pr-6">{task.title}</h4>
                <div className="flex gap-1 opacity-100 items-center absolute top-2 right-2 bg-black/50 rounded-md p-0.5 backdrop-blur-sm transition-opacity">
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                        className="p-1 hover:text-white text-white/60 bg-transparent"
                        aria-label="Edit task"
                    >
                        <Edit2 size={14} />
                    </button>
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                        className="p-1 hover:text-red-400 text-white/60 bg-transparent"
                        aria-label="Delete task"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-sm text-white/60 mb-3 line-clamp-2">{task.description}</p>
            )}

            <div className="flex items-center justify-between text-xs text-white/40 mt-3 border-t border-white/5 pt-2">
                <div className="flex items-center gap-2">
                    {task.dueDate && (
                        <span className={clsx("flex items-center gap-1",
                            new Date(task.dueDate) < new Date() ? "text-red-400" : ""
                        )}>
                            <Calendar size={12} />
                            {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    )}
                </div>

                {task.tags && task.tags.length > 0 && (
                    <div className="flex gap-1">
                        {task.tags.map(tag => (
                            <span key={tag} className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
