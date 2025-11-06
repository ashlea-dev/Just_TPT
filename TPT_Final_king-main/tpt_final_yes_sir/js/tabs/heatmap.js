// js/tabs/heatmap.js - Heatmap Tab
const Heatmap = {
  load() {
    const section = document.getElementById('heatmapSection');
    
    section.innerHTML = `
      <div class="section-header">
        <div>
          <h2>🔥 Usage Heatmap</h2>
          <p>Visualisasi pola konsumsi 24/7</p>
        </div>
      </div>

      <div class="heatmap-container">
        <div class="chart-title">📅 Hourly Usage Pattern - Last 7 Days</div>
        <div id="heatmapGrid"></div>
      </div>

      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-label">Peak Hour</div>
          <div class="stat-value">14:00<span class="stat-unit">WIB</span></div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Off-Peak Hour</div>
          <div class="stat-value">03:00<span class="stat-unit">WIB</span></div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Busiest Day</div>
          <div class="stat-value">Rabu</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Quietest Day</div>
          <div class="stat-value">Minggu</div>
        </div>
      </div>
    `;

    this.renderHeatmap();
  },

  renderHeatmap() {
    const container = document.getElementById('heatmapGrid');
    if (!container) return;

    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    let html = '<div style="display: grid; gap: 1rem;">';
    
    days.forEach(day => {
      html += `<div style="display: grid; grid-template-columns: 60px repeat(24, 1fr); gap: 4px; align-items: center;">`;
      html += `<div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">${day}</div>`;
      
      for (let hour = 0; hour < 24; hour++) {
        const intensity = Math.random();
        let color;
        if (intensity < 0.25) color = 'rgba(14, 165, 233, 0.2)';
        else if (intensity < 0.5) color = 'rgba(14, 165, 233, 0.4)';
        else if (intensity < 0.75) color = 'rgba(14, 165, 233, 0.6)';
        else color = 'rgba(14, 165, 233, 0.9)';
        
        html += `<div class="heatmap-cell" style="background: ${color}; height: 30px;" title="${day} ${hour}:00 - ${(intensity * 5000).toFixed(0)}W"></div>`;
      }
      
      html += '</div>';
    });
    
    html += '</div>';
    container.innerHTML = html;
  }
};