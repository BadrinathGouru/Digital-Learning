import React from 'react';
import { useSync } from '../context/SyncContext';

export default function SyncStatus() {
    const { isOnline, queueSize, isSyncing, syncNow } = useSync();

    if (isSyncing) {
        return (
            <div className="flex items-center gap-2 bg-indigo-900/30 border border-indigo-500/30 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Syncing...</span>
            </div>
        );
    }

    if (!isOnline) {
        return (
            <div className="flex items-center gap-2 bg-amber-900/30 border border-amber-500/30 px-3 py-1.5 rounded-full">
                <span className="text-amber-400 text-xs">☁️</span>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    Offline ({queueSize} Pending)
                </span>
            </div>
        );
    }

    if (queueSize > 0) {
        return (
            <button
                onClick={syncNow}
                className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 px-3 py-1.5 rounded-full hover:bg-red-900/50 transition-colors"
                title="Click to retry sync"
            >
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Sync failed - Retry</span>
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-500/30 px-3 py-1.5 rounded-full opacity-70">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Cloud Synced</span>
        </div>
    );
}
