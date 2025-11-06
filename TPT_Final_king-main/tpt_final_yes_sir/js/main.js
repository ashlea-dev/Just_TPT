// js/main.js - Main Application Initialization

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Energy Monitoring System Initialized');
  
  // Initialize UI
  UI.init();
  
  // Fetch initial data
  API.fetchData();
  
  // Start auto-refresh
  API.startAutoRefresh();
  
  // Update time every second
  setInterval(() => {
    Utils.updateLastUpdate();
  }, 1000);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  // Stop auto-refresh
  API.stopAutoRefresh();
  
  // Destroy all charts
  Charts.destroyAll();
  
  console.log('👋 Application cleanup completed');
});