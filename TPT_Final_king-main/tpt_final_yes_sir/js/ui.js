// js/ui.js - UI Interactions

const UI = {
  // Toggle theme
  toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
  },

  // Toggle fullscreen
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  },

  // Toggle notifications
  toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('active');
  },

  // Open modal
  openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
  },

  // Close modal
  closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
  },

  // Switch tab
  switchTab(tab) {
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Update sections
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    
    const sectionMap = {
      'overview': 'overviewSection',
      'daily': 'dailySection',
      'monthly': 'monthlySection',
      'predictive': 'predictiveSection',
      'comparison': 'comparisonSection',
      'heatmap': 'heatmapSection'
    };

    const sectionId = sectionMap[tab];
    if (sectionId) {
      document.getElementById(sectionId).classList.add('active');
      
      // Load specific tab data
      switch(tab) {
        case 'daily':
          Daily.load();
          break;
        case 'monthly':
          Monthly.load();
          break;
        case 'predictive':
          Predictive.load();
          break;
        case 'comparison':
          Comparison.load();
          break;
        case 'heatmap':
          Heatmap.load();
          break;
      }
    }
  },

  // Setup event listeners
  setupEventListeners() {
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });

    // Close notification panel when clicking outside
    document.addEventListener('click', (e) => {
      const panel = document.getElementById('notificationPanel');
      const btn = document.querySelector('.notification-btn');
      if (panel && !panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.remove('active');
      }
    });
  },

  // Initialize UI
  init() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }

    // Setup event listeners
    this.setupEventListeners();
  }
};