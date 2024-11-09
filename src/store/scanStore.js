import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useScanStore = create(
  persist(
    (set, get) => ({
      scanHistory: [],
      addScan: (scan) => set((state) => ({
        scanHistory: [
          {
            ...scan,
            id: scan.id || crypto.randomUUID(),
            timestamp: scan.timestamp || new Date().toISOString()
          },
          ...state.scanHistory
        ].slice(0, 100) // Keep last 100 scans
      })),
      removeScan: (scanId) => set((state) => ({
        scanHistory: state.scanHistory.filter((scan) => scan.id !== scanId)
      })),
      clearHistory: () => set({ scanHistory: [] }),
      getScanById: (id) => get().scanHistory.find((scan) => scan.id === id),
      getRecentScans: (limit = 10) => get().scanHistory.slice(0, limit)
    }),
    {
      name: 'scan-history',
      version: 1
    }
  )
);

export default useScanStore;