// js/tabs/overview.js - Overview Tab

const Overview = {
  render(data) {
    const section = document.getElementById('overviewSection');
    
    section.innerHTML = `
      <div class="section-header">
        <div>
          <h2>📈 Dashboard Overview</h2>
          <p>Real-time monitoring dengan AI analytics</p>
        </div>
        <div class="quick-actions">
          <button class="btn btn-primary" onclick="UI.openModal('detailModal')">📊 Detail Report</button>
          <button class="btn btn-secondary" onclick="Overview.exportData('overview')">📥 Export</button>
          <button class="btn btn-success" onclick="API.refreshData()">🔄 Refresh</button>
        </div>
      </div>

      <!-- Alerts Panel -->
      <div class="alerts-panel">
        <h3 style="margin-bottom: 1rem;">⚡ Live Alerts & Insights</h3>
        <div class="alert-item critical">
          <div class="alert-icon">🚨</div>
          <div class="alert-content">
            <div class="alert-title">Critical: High Power Consumption</div>
            <div class="alert-time">Lantai 3 melebihi threshold 20% - Sekarang</div>
          </div>
        </div>
        <div class="alert-item info">
          <div class="alert-icon">💡</div>
          <div class="alert-content">
            <div class="alert-title">Rekomendasi: Shift Load</div>
            <div class="alert-time">Optimalkan penggunaan di off-peak hours</div>
          </div>
        </div>
        <div class="alert-item">
          <div class="alert-icon">✅</div>
          <div class="alert-content">
            <div class="alert-title">Sistem Normal</div>
            <div class="alert-time">Semua sensor aktif dan berfungsi</div>
          </div>
        </div>
      </div>

      <!-- Live Chart -->
      <div class="live-chart-card">
        <div class="live-indicator">
          <span class="live-dot"></span>
          LIVE
        </div>
        <div class="chart-title">
          <span>📈 Real-time Power Consumption</span>
          <div class="chart-controls">
            <button class="chart-btn active">1H</button>
            <button class="chart-btn">6H</button>
            <button class="chart-btn">24H</button>
          </div>
        </div>
        <canvas id="liveChart" height="80"></canvas>
      </div>
      
      <div id="overviewCards" class="dashboard-grid"></div>
    `;

    this.renderCards(data);
  },

  renderCards(data) {
    const container = document.getElementById('overviewCards');
    
    if (!data.today_data) {
      container.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1; text-align: center;">Data tidak tersedia</p>';
      return;
    }

    const today = data.today_data;
    
    container.innerHTML = `
      <div class="data-card">
        <div class="card-icon">📅</div>
        <h3 class="card-title">Data Hari Ini</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">Total Daya</span>
            <span class="data-value">${Utils.formatNumber(today.total_daya)} W</span>
          </div>
          <div class="data-item">
            <span class="data-label">Rata-rata Daya</span>
            <span class="data-value">${Utils.formatNumber(today.avg_daya)} W</span>
          </div>
          <div class="data-item">
            <span class="data-label">Total Biaya</span>
            <span class="data-value">Rp ${Utils.formatNumber(today.total_cost)}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Status</span>
            <span class="data-value" style="color: #10b981;">Normal</span>
          </div>
        </div>
      </div>

      <div class="data-card">
        <div class="card-icon">📊</div>
        <h3 class="card-title">Analisis Bulanan</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">Proyeksi Bulanan</span>
            <span class="data-value">${Utils.formatNumber(today.total_daya * 30)} W</span>
          </div>
          <div class="data-item">
            <span class="data-label">Est. Biaya</span>
            <span class="data-value">Rp ${Utils.formatNumber(today.total_cost * 30)}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Efisiensi</span>
            <span class="data-value">87.5%</span>
          </div>
          <div class="data-item">
            <span class="data-label">Tren</span>
            <span class="data-value" style="color: #10b981;">↑ 5.2%</span>
          </div>
        </div>
      </div>

      <div class="data-card prediction-card">
        <div class="card-icon">🤖</div>
        <h3 class="card-title">AI Prediction</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">Prediksi 7 Hari</span>
            <span class="data-value">${Utils.formatNumber(today.total_daya * 7.2)} W</span>
          </div>
          <div class="data-item">
            <span class="data-label">Akurasi Model</span>
            <span class="data-value">94.2%</span>
          </div>
          <div class="data-item">
            <span class="data-label">Confidence</span>
            <span class="data-value">87%</span>
          </div>
          <div class="data-item">
            <span class="data-label">Status</span>
            <span class="data-value" style="color: #10b981;">Active</span>
          </div>
        </div>
        <div class="confidence-bar">
          <div class="confidence-fill" style="width: 87%"></div>
        </div>
      </div>

      <div class="data-card">
        <div class="card-icon">🌍</div>
        <h3 class="card-title">Carbon Footprint</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">CO₂ Hari Ini</span>
            <span class="data-value">${Utils.formatNumber(today.total_daya * 0.0005, 3)} kg</span>
          </div>
          <div class="data-item">
            <span class="data-label">Bulanan</span>
            <span class="data-value">${Utils.formatNumber(today.total_daya * 0.015, 2)} kg</span>
          </div>
          <div class="data-item">
            <span class="data-label">Setara Pohon</span>
            <span class="data-value">${Math.floor(today.total_daya * 0.00001)} pohon</span>
          </div>
          <div class="data-item">
            <span class="data-label">Status</span>
            <span class="data-value" style="color: #10b981;">Low Impact</span>
          </div>
        </div>
      </div>

      <div class="data-card">
        <div class="card-icon">💰</div>
        <h3 class="card-title">Cost Optimization</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">Biaya Hari Ini</span>
            <span class="data-value">Rp ${Utils.formatNumber(today.total_cost)}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Potensi Hemat</span>
            <span class="data-value" style="color: #10b981;">Rp ${Utils.formatNumber(today.total_cost * 0.125)}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Saving Rate</span>
            <span class="data-value">12.5%</span>
          </div>
          <div class="data-item">
            <span class="data-label">Action Items</span>
            <span class="data-value">3 rekomendasi</span>
          </div>
        </div>
      </div>

      <div class="data-card">
        <div class="card-icon">⚙️</div>
        <h3 class="card-title">System Health</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">Sensor Aktif</span>
            <span class="data-value">24/24</span>
          </div>
          <div class="data-item">./9-
            <span class="data-label">Uptime</span>
            <span class="data-value">99.8%</span>
          </div>
          <div class="data-item">
            <span class="data-label">Last Maintenance</span>
            <span class="data-value">3 hari lalu</span>
          </div>
          <div class="data-item">
            <span class="data-label">Status</span>
            <span class="data-value" style="color: #10b981;">Excellent</span>
          </div>
        </div>
      </div>
    `;
  },

  exportData(type) {
    if (!STATE.currentData || !STATE.currentData.today_data) {
      alert('Tidak ada data untuk diekspor');
      return;
    }

    const today = STATE.currentData.today_data;
    let csvContent = 'Type,Value\n';
    csvContent += `Total Daya,${today.total_daya}\n`;
    csvContent += `Avg Daya,${today.avg_daya}\n`;
    csvContent += `Total Biaya,${today.total_cost}\n`;
    
    Utils.exportToCSV(csvContent, 'overview_energy_data.csv');
  }
};