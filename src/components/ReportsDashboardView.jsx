import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  UserCheck, 
  Clock, 
  Download, 
  Calendar, 
  ChevronDown, 
  BarChart2, 
  ArrowUpRight 
} from 'lucide-react';

export function ReportsDashboardView({ onNavigateToLeads }) {
  const [activeSubTab, setActiveSubTab] = useState('enrollment');

  return (
    <div className="sl-reports-dashboard-viewport">
      {/* 1. Header & Sub-Tab Bar (Matching Image 3) */}
      <div className="sl-dashboard-subtab-bar">
        <button 
          type="button"
          className={`sl-dash-subtab ${activeSubTab === 'enrollment' ? 'is-active' : ''}`}
          onClick={() => setActiveSubTab('enrollment')}
        >
          <span>Student / Patient Enrollment</span>
        </button>
        <button 
          type="button"
          className={`sl-dash-subtab ${activeSubTab === 'conversion' ? 'is-active' : ''}`}
          onClick={() => setActiveSubTab('conversion')}
        >
          <span>Conversion Funnel</span>
        </button>
        <button 
          type="button"
          className={`sl-dash-subtab ${activeSubTab === 'channel' ? 'is-active' : ''}`}
          onClick={() => setActiveSubTab('channel')}
        >
          <span>Channel ROI</span>
        </button>
      </div>

      {/* 2. Top KPI Cards Row (Matching Image 3: 2,345 | 24 | 08) */}
      <div className="sl-dash-kpi-grid">
        {/* KPI 1 */}
        <div className="sl-kpi-card">
          <div className="sl-kpi-title">Total Students / Patients</div>
          <div className="sl-kpi-value-row">
            <span className="sl-kpi-number">2,345</span>
            <span className="sl-kpi-delta is-positive">
              <TrendingUp size={12} />
              <span>23% vs last month</span>
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="sl-kpi-card">
          <div className="sl-kpi-title">Students Enrolled Today</div>
          <div className="sl-kpi-value-row">
            <span className="sl-kpi-number">24</span>
            <span className="sl-kpi-delta is-positive">
              <TrendingUp size={12} />
              <span>15% vs last month</span>
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="sl-kpi-card">
          <div className="sl-kpi-title">Pending Consultations</div>
          <div className="sl-kpi-value-row">
            <span className="sl-kpi-number">08</span>
            <span className="sl-kpi-sub-text">Awaiting counselor action</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Charts Row: Fresh Lead Analysis & Agent-Wise Conversion (Matching Image 3) */}
      <div className="sl-dash-charts-grid">
        {/* Chart 1: Fresh Lead Analysis (Multi-Bar Chart) */}
        <div className="sl-chart-card sl-card-leads-analysis">
          <div className="sl-chart-header">
            <h3>Fresh Lead Analysis</h3>
          </div>

          <div className="sl-bar-chart-container">
            {/* Y Axis */}
            <div className="sl-bar-y-axis">
              <span>50K</span>
              <span>40K</span>
              <span>30K</span>
              <span>20K</span>
              <span>10K</span>
              <span>0</span>
            </div>

            {/* Bars Area */}
            <div className="sl-bar-plot-area">
              {/* Grid Lines */}
              <div className="sl-grid-line" style={{ bottom: '100%' }}></div>
              <div className="sl-grid-line" style={{ bottom: '80%' }}></div>
              <div className="sl-grid-line" style={{ bottom: '60%' }}></div>
              <div className="sl-grid-line" style={{ bottom: '40%' }}></div>
              <div className="sl-grid-line" style={{ bottom: '20%' }}></div>
              <div className="sl-grid-line" style={{ bottom: '0%' }}></div>

              {/* Month 1: Jan */}
              <div className="sl-bar-month-group">
                <div className="sl-bar-columns">
                  <div className="sl-bar-col sl-bar-yellow" style={{ height: '24%' }} title="Organic: 12K"></div>
                  <div className="sl-bar-col sl-bar-orange" style={{ height: '36%' }} title="Facebook Ads: 18K"></div>
                  <div className="sl-bar-col sl-bar-purple" style={{ height: '52%' }} title="Social Media: 26K"></div>
                  <div className="sl-bar-col sl-bar-lime" style={{ height: '78%' }} title="Referrals: 39K"></div>
                  <div className="sl-bar-col sl-bar-teal" style={{ height: '42%' }} title="Google Ads: 21K"></div>
                </div>
                <span className="sl-month-label">Jan</span>
              </div>

              {/* Month 2: Feb */}
              <div className="sl-bar-month-group">
                <div className="sl-bar-columns">
                  <div className="sl-bar-col sl-bar-yellow" style={{ height: '44%' }} title="Organic: 22K"></div>
                  <div className="sl-bar-col sl-bar-orange" style={{ height: '26%' }} title="Facebook Ads: 13K"></div>
                  <div className="sl-bar-col sl-bar-purple" style={{ height: '68%' }} title="Social Media: 34K"></div>
                  <div className="sl-bar-col sl-bar-lime" style={{ height: '38%' }} title="Referrals: 19K"></div>
                  <div className="sl-bar-col sl-bar-teal" style={{ height: '34%' }} title="Google Ads: 17K"></div>
                </div>
                <span className="sl-month-label">Feb</span>
              </div>

              {/* Month 3: Mar */}
              <div className="sl-bar-month-group">
                <div className="sl-bar-columns">
                  <div className="sl-bar-col sl-bar-yellow" style={{ height: '18%' }} title="Organic: 9K"></div>
                  <div className="sl-bar-col sl-bar-orange" style={{ height: '82%' }} title="Facebook Ads: 41K"></div>
                  <div className="sl-bar-col sl-bar-purple" style={{ height: '58%' }} title="Social Media: 29K"></div>
                  <div className="sl-bar-col sl-bar-lime" style={{ height: '64%' }} title="Referrals: 32K"></div>
                  <div className="sl-bar-col sl-bar-teal" style={{ height: '48%' }} title="Google Ads: 24K"></div>
                </div>
                <span className="sl-month-label">Mar</span>
              </div>

              {/* Month 4: Apr */}
              <div className="sl-bar-month-group">
                <div className="sl-bar-columns">
                  <div className="sl-bar-col sl-bar-yellow" style={{ height: '80%' }} title="Organic: 40K"></div>
                  <div className="sl-bar-col sl-bar-orange" style={{ height: '34%' }} title="Facebook Ads: 17K"></div>
                  <div className="sl-bar-col sl-bar-purple" style={{ height: '52%' }} title="Social Media: 26K"></div>
                  <div className="sl-bar-col sl-bar-lime" style={{ height: '28%' }} title="Referrals: 14K"></div>
                  <div className="sl-bar-col sl-bar-teal" style={{ height: '46%' }} title="Google Ads: 23K"></div>
                </div>
                <span className="sl-month-label">Apr</span>
              </div>

              {/* Month 5: May */}
              <div className="sl-bar-month-group">
                <div className="sl-bar-columns">
                  <div className="sl-bar-col sl-bar-yellow" style={{ height: '42%' }} title="Organic: 21K"></div>
                  <div className="sl-bar-col sl-bar-orange" style={{ height: '36%' }} title="Facebook Ads: 18K"></div>
                  <div className="sl-bar-col sl-bar-purple" style={{ height: '62%' }} title="Social Media: 31K"></div>
                  <div className="sl-bar-col sl-bar-lime" style={{ height: '74%' }} title="Referrals: 37K"></div>
                  <div className="sl-bar-col sl-bar-teal" style={{ height: '22%' }} title="Google Ads: 11K"></div>
                </div>
                <span className="sl-month-label">May</span>
              </div>
            </div>
          </div>

          {/* Chart Legend (Matching Image 3) */}
          <div className="sl-chart-legend">
            <span className="sl-legend-item"><span className="sl-legend-dot sl-bg-yellow"></span>Organic</span>
            <span className="sl-legend-item"><span className="sl-legend-dot sl-bg-orange"></span>Facebook Ads</span>
            <span className="sl-legend-item"><span className="sl-legend-dot sl-bg-purple"></span>Social Media</span>
            <span className="sl-legend-item"><span className="sl-legend-dot sl-bg-lime"></span>Referrals</span>
            <span className="sl-legend-item"><span className="sl-legend-dot sl-bg-teal"></span>Google Ads</span>
          </div>
        </div>

        {/* Chart 2: Agent-Wise Student Conversion Donut Chart (Matching Image 3) */}
        <div className="sl-chart-card sl-card-donut-conversion">
          <div className="sl-chart-header">
            <h3>Agent-Wise Student Conversion</h3>
          </div>

          <div className="sl-donut-container">
            {/* SVG Donut Chart */}
            <svg viewBox="0 0 100 100" className="sl-donut-svg">
              {/* Segment 1: Ria (240) - Orange */}
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f59e0b" strokeWidth="18" strokeDasharray="95 144" strokeDashoffset="0" />
              {/* Segment 2: Samarth (64) - Lime */}
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#a3e635" strokeWidth="18" strokeDasharray="36 203" strokeDashoffset="-98" />
              {/* Segment 3: Aman (48) - Teal */}
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#0d9488" strokeWidth="18" strokeDasharray="30 209" strokeDashoffset="-137" />
              {/* Segment 4: Ashish (32) - Slate Blue */}
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#60a5fa" strokeWidth="18" strokeDasharray="22 217" strokeDashoffset="-170" />
              {/* Segment 5: Others - Purple Blue */}
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#6366f1" strokeWidth="18" strokeDasharray="40 199" strokeDashoffset="-195" />
            </svg>
          </div>

          {/* Donut Legend (Matching Image 3) */}
          <div className="sl-donut-legend">
            <span className="sl-donut-legend-item"><span className="sl-legend-dot sl-bg-teal"></span>Aman (48)</span>
            <span className="sl-donut-legend-item"><span className="sl-legend-dot sl-bg-lime"></span>Samarth (64)</span>
            <span className="sl-donut-legend-item"><span className="sl-legend-dot sl-bg-blue"></span>Ashish (32)</span>
            <span className="sl-donut-legend-item"><span className="sl-legend-dot sl-bg-orange"></span>Ria (240)</span>
            <span className="sl-donut-legend-item sl-more-agents">+2</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Cards: New vs Returning & Conversion Rates (Matching Image 3) */}
      <div className="sl-dash-bottom-grid">
        <div className="sl-chart-card">
          <div className="sl-chart-header">
            <h3>New vs Returning Student Enrollment</h3>
          </div>
          <div className="sl-mini-chart-placeholder">
            <div className="sl-chart-empty-text">300 Target Monthly Enrollment Achieved (100% SLA)</div>
          </div>
        </div>

        <div className="sl-chart-card">
          <div className="sl-chart-header">
            <h3>Organic vs. Ads Conversion Rate</h3>
          </div>
          <div className="sl-mini-bars-row">
            <div className="sl-mini-bar-group">
              <div className="sl-mini-bar sl-bar-purple" style={{ height: '62%' }}></div>
              <span>Organic 62%</span>
            </div>
            <div className="sl-mini-bar-group">
              <div className="sl-mini-bar sl-bar-lime" style={{ height: '54%' }}></div>
              <span>Meta 54%</span>
            </div>
            <div className="sl-mini-bar-group">
              <div className="sl-mini-bar sl-bar-blue" style={{ height: '48%' }}></div>
              <span>Google 48%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
