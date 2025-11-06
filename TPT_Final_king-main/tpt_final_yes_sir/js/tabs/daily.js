// js/tabs/daily.js - Daily Monitoring Tab

const Daily = {
  load() {
    if (!STATE.currentData || !STATE.currentData.today_data) return;

    const section = document.getElementById('dailySection');
    const today = STATE.currentData.today_data;

    section.innerHTML = `
      <div class="section-header">
        <div>
          <h2>📅 Monitoring Harian</h2>
          <p>Analisis detail penggunaan energi hari ini</p>
        </div>
        <div class="quick-actions">
          <button class="btn btn-secondary" onclick="Daily.exportData()">📥 Export CSV</button>
        </div>
      </div>

      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">Tanggal</label>
          <input type="date" class="filter-input" id="dailyDateFilter" />
        </div>
        <div class="filter-group">
          <label class="filter-label">Lantai</label>
          <select class="filter-select" id="dailyFloorFilter">
            <option value="">Semua Lantai</option>
            <option value="1">Lantai 1</option>
            <option value="2">Lantai 2</option>
            <option value="3">Lantai 3</option>
            <option value="4">Lantai 4</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="Daily.applyFilter()">🔍 Terapkan</button>
      </div>

      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-label">Total Daya</div>
          <div class="stat-value">${Utils.formatNumber(today.total_daya, 0)}<span class="stat-unit">W</span></div>
          <div class="stat-trend up">↑ 3.2%</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Rata-rata</div>
          <div class="stat-value">${Utils.formatNumber(today.avg_daya, 0)}<span class="stat-unit">W</span></div>
          <div class="stat-trend down">↓ 1.5%</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Total Biaya</div>
          <div class="stat-value">${Utils.formatNumber(today.total_cost / 1000, 1)}<span class="stat-unit">K</span></div>
          <div class="stat-trend up">↑ 2.8%</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Peak Hour</div>
          <div class="stat-value">14:00<span class="stat-unit">WIB</span></div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-title">
          <span>📊 Hourly Distribution</span>
          <div class="chart-controls">
            <button class="chart-btn active">Line</button>
            <button class="chart-btn">Bar</button>
            <button class="chart-btn">Area</button>
          </div>
        </div>
        <canvas id="dailyChart" height="80"></canvas>
      </div>

      <div class="dashboard-grid">
        ${this.renderFloorCards(today)}
      </div>
    `;

    // Set default date
    document.getElementById('dailyDateFilter').value = new Date().toISOString().split('T')[0];
    
    // Initialize chart
    Charts.initDailyChart();
  },

  renderFloorCards(today) {
    return `
      <div class="data-card">
        <div class="card-icon">🏢</div>
        <h3 class="card-title">Lantai 1</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">Konsumsi</span>
            <span class="data-value">${Utils.formatNumber(today.total_daya * 0.25)} W</span>
          </div>
          <div class="data-item">
            <span class="data-label">Biaya</span>
            <span class="data-value">Rp ${Utils.formatNumber(today.total_cost * 0.25)}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Sensor</span>
            <span class="data-value">6/6 aktif</span>
          </div>
          <div class="data-item">
            <span class="data-label">Status</span>
            <span class="data-value" style="color: #10b981;">Normal</span>
          </div>
        </div>
      </div>

      <div class="data-card">
        <div class="card-icon">🏢</div>
        <h3 class="card-title">Lantai 2</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">Konsumsi</span>
            <span class="data-value">${Utils.formatNumber(today.total_daya * 0.28)} W</span>
          </div>
          <div class="data-item">
            <span class="data-label">Biaya</span>
            <span class="data-value">Rp ${Utils.formatNumber(today.total_cost * 0.28)}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Sensor</span>
            <span class="data-value">6/6 aktif</span>
          </div>
          <div class="data-item">
            <span class="data-label">Status</span>
            <span class="data-value" style="color: #10b981;">Normal</span>
          </div>
        </div>
      </div>

      <div class="data-card">
        <div class="card-icon">🏢</div>
        <h3 class="card-title">Lantai 3</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">Konsumsi</span>
            <span class="data-value">${Utils.formatNumber(today.total_daya * 0.27)} W</span>
          </div>
          <div class="data-item">
            <span class="data-label">Biaya</span>
            <span class="data-value">Rp ${Utils.formatNumber(today.total_cost * 0.27)}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Sensor</span>
            <span class="data-value">6/6 aktif</span>
          </div>
          <div class="data-item">
            <span class="data-label">Status</span>
            <span class="data-value" style="color: #f59e0b;">High Usage</span>
          </div>
        </div>
      </div>

      <div class="data-card">
        <div class="card-icon">🏢</div>
        <h3 class="card-title">Lantai 4</h3>
        <div class="data-info">
          <div class="data-item">
            <span class="data-label">Konsumsi</span>
            <span class="data-value">${Utils.formatNumber(today.total_daya * 0.20)} W</span>
          </div>
          <div class="data-item">
            <span class="data-label">Biaya</span>
            <span class="data-value">Rp ${Utils.formatNumber(today.total_cost * 0.20)}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Sensor</span>
            <span class="data-value">6/6 aktif</span>
          </div>
          <div class="data-item">
            <span class="data-label">Status</span>
            <span class="data-value" style="color: #10b981;">Normal</span>
          </div>
        </div>
      </div>
    `;
  },

  applyFilter() {
    const date = document.getElementById('dailyDateFilter').value;
    const floor = document.getElementById('dailyFloorFilter').value;
    alert(`Filter diterapkan:\nTanggal: ${date}${floor ? '\nLantai: ' + floor : ''}`);
  },

  exportData() {
    if (!STATE.currentData || !STATE.currentData.today_data) {
      alert('Tidak ada data untuk diekspor');
      return;
    }

    const today = STATE.currentData.today_data;
    let csvContent = 'Tanggal,Total Daya (W),Avg Daya (W),Total Biaya,Avg Biaya\n';
    csvContent += `${new Date().toLocaleDateString('id-ID')},${today.total_daya},${today.avg_daya},${today.total_cost},${today.avg_cost}\n`;
    
    Utils.exportToCSV(csvContent, 'daily_energy_data.csv');
  }
};