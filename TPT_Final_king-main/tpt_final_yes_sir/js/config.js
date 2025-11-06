// js/config.js - Configuration & Constants

const CONFIG = {
  API_URL: 'https://elisa.itb.ac.id/api/now?faculty=FTI&building=LABTEK%20VI&floor=',
  REFRESH_INTERVAL: 60000, // 60 seconds
  
  CHART_OPTIONS: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#94a3b8'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { 
          color: 'rgba(148, 163, 184, 0.1)' 
        },
        ticks: { 
          color: '#94a3b8' 
        }
      },
      x: {
        grid: { 
          display: false 
        },
        ticks: { 
          color: '#94a3b8' 
        }
      }
    }
  },

  COLORS: {
    primary: '#0ea5e9',
    secondary: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    purple: '#a855f7'
  }
};

// Global state
const STATE = {
  currentData: null,
  refreshTimer: null,
  charts: {
    live: null,
    daily: null,
    monthly: null,
    predictive: null,
    comparison: null
  }
};