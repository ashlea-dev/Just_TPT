// js/utils.js - Utility Functions

const Utils = {
  // Format number with Indonesian locale
  formatNumber(num, decimals = 2) {
    if (num === null || num === undefined || isNaN(num)) return '0.00';
    return Number(num).toLocaleString('id-ID', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  },

  // Update last update timestamp
  updateLastUpdate() {
    const element = document.getElementById('lastUpdate');
    if (element) {
      element.textContent = new Date().toLocaleTimeString('id-ID');
    }
  },

  // Generate random data for demo
  generateRandomData(length, min, max) {
    return Array.from({length}, () => Math.random() * (max - min) + min);
  },

  // Generate hours array
  generateHours(count = 24) {
    return Array.from({length: count}, (_, i) => i + ':00');
  },

  // Generate days array
  generateDays(count = 30) {
    return Array.from({length: count}, (_, i) => i + 1);
  },

  // Show/hide element
  toggleElement(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
      if (show) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    }
  },

  // Export data as CSV
  exportToCSV(data, filename) {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};