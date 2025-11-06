// js/charts.js - Chart Management

const Charts = {
  // Initialize live chart
  initLiveChart(data) {
    const ctx = document.getElementById('liveChart');
    if (!ctx) return;

    const hours = [];
    const values = [];
    for (let i = 23; i >= 0; i--) {
      const hour = new Date();
      hour.setHours(hour.getHours() - i);
      hours.push(hour.getHours() + ':00');
      values.push(Math.random() * 5000 + 2000);
    }

    if (STATE.charts.live) {
      STATE.charts.live.destroy();
    }
    
    STATE.charts.live = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hours,
        datasets: [{
          label: 'Power (W)',
          data: values,
          borderColor: CONFIG.COLORS.primary,
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        ...CONFIG.CHART_OPTIONS,
        plugins: {
          legend: { display: false }
        }
      }
    });
  },

  // Initialize daily chart
  initDailyChart() {
    const ctx = document.getElementById('dailyChart');
    if (!ctx) return;

    const hours = Utils.generateHours(24);
    const values = Utils.generateRandomData(24, 1000, 4000);

    if (STATE.charts.daily) {
      STATE.charts.daily.destroy();
    }
    
    STATE.charts.daily = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hours,
        datasets: [{
          label: 'Konsumsi (W)',
          data: values,
          borderColor: CONFIG.COLORS.primary,
          backgroundColor: 'rgba(14, 165, 233, 0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: CONFIG.CHART_OPTIONS
    });
  },

  // Initialize monthly chart
  initMonthlyChart() {
    const ctx = document.getElementById('monthlyChart');
    if (!ctx) return;

    const days = Utils.generateDays(30);
    const values = Utils.generateRandomData(30, 2000, 7000);

    if (STATE.charts.monthly) {
      STATE.charts.monthly.destroy();
    }
    
    STATE.charts.monthly = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          label: 'Daily Consumption (W)',
          data: values,
          backgroundColor: 'rgba(14, 165, 233, 0.6)',
          borderColor: CONFIG.COLORS.primary,
          borderWidth: 1
        }]
      },
      options: CONFIG.CHART_OPTIONS
    });
  },

  // Initialize predictive chart
  initPredictiveChart() {
    const ctx = document.getElementById('predictiveChart');
    if (!ctx) return;

    const days = Array.from({length: 14}, (_, i) => `Day ${i + 1}`);
    const historical = Utils.generateRandomData(7, 2000, 6000);
    const predicted = Utils.generateRandomData(7, 2500, 6500);

    if (STATE.charts.predictive) {
      STATE.charts.predictive.destroy();
    }
    
    STATE.charts.predictive = new Chart(ctx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Historical',
            data: [...historical, ...Array(7).fill(null)],
            borderColor: CONFIG.COLORS.primary,
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Predicted',
            data: [...Array(7).fill(null), ...predicted],
            borderColor: CONFIG.COLORS.purple,
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            borderDash: [5, 5],
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: CONFIG.CHART_OPTIONS
    });
  },

  // Initialize comparison chart
  initComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;

    if (STATE.charts.comparison) {
      STATE.charts.comparison.destroy();
    }
    
    STATE.charts.comparison = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Periode 1',
            data: [3200, 3400, 3100, 3500],
            backgroundColor: 'rgba(14, 165, 233, 0.6)'
          },
          {
            label: 'Periode 2',
            data: [3000, 3300, 2900, 3400],
            backgroundColor: 'rgba(16, 185, 129, 0.6)'
          }
        ]
      },
      options: CONFIG.CHART_OPTIONS
    });
  },

  // Cleanup all charts
  destroyAll() {
    Object.values(STATE.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
  }
};