import React, { createContext, useContext, useState, useEffect } from 'react';
import { flushQueue, getQueueSize } from '../offline/syncQueue';

const SyncContext = createContext();

export function SyncProvider({ children }) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [queueSize, setQueueSize] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSynced, setLastSynced] = useState(null);

    const checkQueue = async () => {
        try {
            const size = await getQueueSize();
            setQueueSize(size);
        } catch (error) {
            console.error('[SyncProvider] Error checking queue size', error);
        }
    };

    const handleSync = async () => {
        if (!navigator.onLine) return; // Wait for network
        setIsSyncing(true);
        try {
            const size = await flushQueue();
            if (size > 0 || queueSize > 0) {
                console.log(`[SyncProvider] Successfully synced ${size} items.`);
                setLastSynced(new Date().toISOString());
            }
        } catch (error) {
            console.error('[SyncProvider] Flush queue failed', error);
        } finally {
            checkQueue();
            setIsSyncing(false);
        }
    };

    useEffect(() => {
        checkQueue();

        const handleOnline = () => {
            console.log('[SyncProvider] Network detected: Back online!');
            setIsOnline(true);
            handleSync(); // Auto-flush on reconnect
        };

        const handleOffline = () => {
            console.log('[SyncProvider] Network lost: Switched to offline mode.');
            setIsOnline(false);
            checkQueue();
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Also check periodically for new queued items
        const checkInterval = setInterval(checkQueue, 5000);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(checkInterval);
        };
    }, []);

    return (
        <SyncContext.Provider value={{
            isOnline,
            queueSize,
            isSyncing,
            lastSynced,
            syncNow: handleSync,
            refreshQueue: checkQueue
        }}>
            {children}
        </SyncContext.Provider>
    );
}

export function useSync() {
    return useContext(SyncContext);
}
