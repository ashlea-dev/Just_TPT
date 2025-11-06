// js/tabs/comparison.js - Comparison Tab
const Comparison = {
  load() {
    const section = document.getElementById('comparisonSection');
    
    section.innerHTML = `
      <div class="section-header">
        <div>
          <h2>⚖️ Advanced Comparison</h2>
          <p>Bandingkan performa antar periode dan lokasi</p>
        </div>
      </div>

      <div class="filter-bar">
        <div class="filter-group">
          <label class="filter-label">Periode 1</label>
          <input type="date" class="filter-input" id="comp1Date" />
        </div>
        <div class="filter-group">
          <label class="filter-label">Periode 2</label>
          <input type="date" class="filter-input" id="comp2Date" />
        </div>
        <div class="filter-group">
          <label class="filter-label">Metrik</label>
          <select class="filter-select">
            <option>Total Konsumsi</option>
            <option>Biaya</option>
            <option>Efisiensi</option>
          </select>
        </div>
        <button class="btn btn-primary">📊 Bandingkan</button>
      </div>

      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-header">
            <div class="comparison-title">Periode 1</div>
            <div class="comparison-badge">Oct 2024</div>
          </div>
          <div class="data-info">
            <div class="data-item">
              <span class="data-label">Total Daya</span>
              <span class="data-value">45,230 W</span>
            </div>
            <div class="data-item">
              <span class="data-label">Total Biaya</span>
              <span class="data-value">Rp 125,400</span>
            </div>
            <div class="data-item">
              <span class="data-label">Efisiensi</span>
              <span class="data-value">82.5%</span>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <div class="comparison-header">
            <div class="comparison-title">Periode 2</div>
            <div class="comparison-badge" style="background: rgba(16, 185, 129, 0.2); color: var(--secondary);">Sep 2024</div>
          </div>
          <div class="data-info">
            <div class="data-item">
              <span class="data-label">Total Daya</span>
              <span class="data-value" style="color: var(--secondary);">42,890 W</span>
            </div>
            <div class="data-item">
              <span class="data-label">Total Biaya</span>
              <span class="data-value" style="color: var(--secondary);">Rp 118,700</span>
            </div>
            <div class="data-item">
              <span class="data-label">Efisiensi</span>
              <span class="data-value" style="color: var(--secondary);">85.3%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-title">📊 Side-by-Side Comparison</div>
        <canvas id="comparisonChart" height="80"></canvas>
      </div>
    `;

    Charts.initComparisonChart();
  }
};