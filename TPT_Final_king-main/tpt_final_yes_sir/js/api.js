// js/api.js - API Data Fetching

const API = {
  // Fetch data from API
  async fetchData() {
    const loadingBox = document.getElementById('loadingBox');
    const errorBox = document.getElementById('errorBox');
    const statusDot = document.getElementById('statusDot');

    Utils.toggleElement('loadingBox', true);
    Utils.toggleElement('errorBox', false);

    try {
      const response = await fetch(CONFIG.API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      STATE.currentData = data;
      
      Utils.toggleElement('loadingBox', false);
      statusDot.style.background = CONFIG.COLORS.secondary;
      
      // Render overview after data loaded
      Overview.render(data);
      Charts.initLiveChart(data);
      Utils.updateLastUpdate();
      
    } catch (error) {
      console.error('Error fetching data:', error);
      Utils.toggleElement('loadingBox', false);
      Utils.toggleElement('errorBox', true);
      document.getElementById('errorMessage').textContent = error.message;
      statusDot.style.background = CONFIG.COLORS.danger;
    }
  },

  // Refresh data
  refreshData() {
    this.fetchData();
  },

  // Start auto-refresh
  startAutoRefresh() {
    STATE.refreshTimer = setInterval(() => {
      this.fetchData();
    }, CONFIG.REFRESH_INTERVAL);
  },

  // Stop auto-refresh
  stopAutoRefresh() {
    if (STATE.refreshTimer) {
      clearInterval(STATE.refreshTimer);
      STATE.refreshTimer = null;
    }
  }
};