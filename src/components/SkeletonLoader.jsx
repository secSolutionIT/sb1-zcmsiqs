import React from 'react';
import { motion } from 'framer-motion';

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

export function SubdomainSkeleton() {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="animate-pulse flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2">
              {[1, 2].map((j) => (
                <div key={j} className="h-3 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}