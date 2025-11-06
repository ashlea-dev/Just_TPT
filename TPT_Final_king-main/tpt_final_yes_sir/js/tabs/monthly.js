
// js/tabs/monthly.js - Monthly Monitoring
const Monthly = {
  load() {
    if (!STATE.currentData || !STATE.currentData.today_data) return;
    
    const today = STATE.currentData.today_data;
    const section = document.getElementById('monthlySection');
    
    section.innerHTML = `
      <div class="section-header">
        <div>
          <h2>📊 Monitoring Bulanan</h2>
          <p>Tren dan pola penggunaan energi bulanan</p>
        </div>
        <div class="quick-actions">
          <button class="btn btn-secondary" onclick="Monthly.exportData()">📥 Export</button>
        </div>
      </div>

      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">Bulan</label>
          <input type="month" class="filter-input" id="monthlyDateFilter" />
        </div>
        <div class="filter-group">
          <label class="filter-label">Tipe Analisis</label>
          <select class="filter-select" id="monthlyAnalysisType">
            <option value="trend">Tren Harian</option>
            <option value="comparison">Perbandingan Lantai</option>
            <option value="peak">Peak Hours</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="Monthly.applyFilter()">🔍 Terapkan</button>
      </div>

      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-label">Total Bulanan</div>
          <div class="stat-value">${Utils.formatNumber((today.total_daya * 30) / 1000, 1)}<span class="stat-unit">kW</span></div>
          <div class="stat-trend up">↑ 4.2%</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Biaya Bulanan</div>
          <div class="stat-value">${Utils.formatNumber((today.total_cost * 30) / 1000000, 2)}<span class="stat-unit">Jt</span></div>
          <div class="stat-trend up">↑ 3.8%</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Efisiensi</div>
          <div class="stat-value">87.5<span class="stat-unit">%</span></div>
          <div class="stat-trend up">↑ 2.1%</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">vs Bulan Lalu</div>
          <div class="stat-value" style="color: #10b981;">-5.2<span class="stat-unit">%</span></div>
          <div class="stat-trend down" style="color: #10b981;">Lebih hemat</div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-title">
          <span>📈 Monthly Trend Analysis</span>
        </div>
        <canvas id="monthlyChart" height="80"></canvas>
      </div>
    `;

    document.getElementById('monthlyDateFilter').value = new Date().toISOString().slice(0, 7);
    Charts.initMonthlyChart();
  },

  applyFilter() {
    const month = document.getElementById('monthlyDateFilter').value;
    const type = document.getElementById('monthlyAnalysisType').value;
    alert(`Filter diterapkan:\nBulan: ${month}\nTipe: ${type}`);
  },

  exportData() {
    if (!STATE.currentData?.today_data) return;
    const today = STATE.currentData.today_data;
    let csvContent = 'Periode,Total Daya (W),Total Biaya,Efisiensi\n';
    csvContent += `${new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })},${today.total_daya * 30},${today.total_cost * 30},87.5%\n`;
    Utils.exportToCSV(csvContent, 'monthly_energy_data.csv');
  }
};