import { useTasks } from '../context/TaskContext';
import { Clock, CheckCircle2, Move, Trash2, Edit } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';

export default function ActivityPage() {
    const { activityLog } = useTasks();

    const getIcon = (action) => {
        switch (action) {
            case 'created': return <CheckCircle2 size={16} className="text-green-400" />;
            case 'moved': return <Move size={16} className="text-blue-400" />;
            case 'deleted': return <Trash2 size={16} className="text-red-400" />;
            case 'updated': return <Edit size={16} className="text-yellow-400" />;
            default: return <Clock size={16} className="text-gray-400" />;
        }
    };

    const formattedAction = (action) => {
        switch (action) {
            case 'created': return 'created task';
            case 'moved': return 'moved task';
            case 'deleted': return 'deleted task';
            case 'updated': return 'updated task';
            default: return action;
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Activity Log</h1>

            <div className="glass-panel p-0 overflow-hidden">
                {activityLog.length === 0 ? (
                    <div className="p-8 text-center text-white/40">
                        No activity recorded yet.
                    </div>
                ) : (
                    <div className="divide-y divide-white/10">
                        {activityLog.map(log => (
                            <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    {getIcon(log.action)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-white/90">
                                        <span className="font-semibold text-primary-300">User</span> {formattedAction(log.action)} <span className="font-medium text-white">"{log.taskTitle}"</span>
                                        {log.details && log.details.to && (
                                            <span className="text-white/60"> to <span className="text-white font-medium">{log.details.to}</span></span>
                                        )}
                                    </p>
                                    <p className="text-xs text-white/40 mt-0.5">
                                        {format(new Date(log.timestamp), 'MMM d, yyyy h:mm a')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
