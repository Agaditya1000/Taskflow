import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import clsx from 'clsx';

export const Column = ({ column, tasks, onEdit }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div className="flex flex-col w-80 flex-shrink-0 h-full">
            <div className="glass-panel h-full flex flex-col bg-white/5 border-none">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white/90">{column.title}</h3>
                    <span className="bg-white/10 text-xs px-2 py-1 rounded-full text-white/60">
                        {tasks.length}
                    </span>
                </div>

                <div ref={setNodeRef} className="flex-1 p-3 overflow-y-auto overflow-x-hidden min-h-[100px]">
                    <SortableContext
                        items={tasks.map(t => t.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {tasks.map(task => (
                            <TaskCard key={task.id} task={task} onEdit={onEdit} />
                        ))}
                    </SortableContext>

                    {tasks.length === 0 && (
                        <div className="h-24 border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center text-white/20 text-sm">
                            Drop here
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
