import React from 'react';
import { FaSearch, FaChartLine, FaLightbulb, FaCog } from 'react-icons/fa';

export const GoogleTheme = {
  Logo: () => (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-blue-600 rounded-lg shadow-lg flex items-center justify-center">
          <FaSearch className="w-6 h-6 text-white" />
        </div>
      </div>
      <span className="text-2xl font-normal text-gray-900">
        Security<span className="font-light">Scanner</span>
      </span>
    </div>
  ),

  SearchBox: ({ onSubmit, value, onChange, loading }) => (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter domain to analyze"
          className="w-full px-6 py-4 text-lg bg-white rounded-full border border-gray-300 shadow-sm hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing</span>
            </>
          ) : (
            <>
              <FaSearch className="w-4 h-4" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>
    </form>
  ),

  Card: ({ icon: Icon, title, value, description, className = "" }) => (
    <div className={`bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all p-6 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <Icon className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-normal text-blue-600">{value}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
};