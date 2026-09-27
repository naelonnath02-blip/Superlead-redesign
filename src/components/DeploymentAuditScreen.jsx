import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck2, 
  Dna, 
  Activity, 
  Database, 
  Layers, 
  Sparkles, 
  Download,
  AlertTriangle,
  Zap,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';

export function DeploymentAuditScreen({ onTriggerHisSimulation }) {
  return (
    <div className="sl-audit-screen">
      {/* Top Hero Banner */}
      <div className="sl-audit-hero-card">
        <div className="sl-audit-hero-left">
          <div className="sl-audit-hero-icon">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2>Nova Fertility Deployment Quality Audit</h2>
            <p>
              Auditing deployment health against Superleap's <strong>5 Pillars of Account Excellence</strong>. 
              Verified for CEO Dr. Kavitha and Head of Ops Meera.
            </p>
          </div>
        </div>

        <div className="sl-audit-hero-right">
          <div className="sl-audit-score-ring">
            <span className="sl-score-big">99.8%</span>
            <span className="sl-score-sub">Deployment Health</span>
          </div>
        </div>
      </div>

      {/* 5 Measurable Pillars Scorecards */}
      <div className="sl-pillars-grid">
        {/* Pillar 1: Data Integrity & Unified Trust */}
        <div className="sl-pillar-card">
          <div className="sl-pillar-head">
            <span className="sl-pillar-num">Pillar 1</span>
            <CheckCircle2 size={16} className="sl-text-success" />
          </div>
          <h4>Data Integrity & Unified Trust</h4>
          <p className="sl-pillar-std">Standard: 100% reconciliation with zero variance.</p>
          <div className="sl-pillar-metrics">
            <div className="sl-p-metric">
              <span className="sl-p-val is-green">1,842</span>
              <span className="sl-p-lbl">Zoho ???? Names Restored</span>
            </div>
            <div className="sl-p-metric">
              <span className="sl-p-val is-green">0.0%</span>
              <span className="sl-p-lbl">Variance (1,310 Consults)</span>
            </div>
          </div>
          <div className="sl-pillar-footer">
            <span className="sl-status-tag is-pass">Verified & Passing</span>
          </div>
        </div>

        {/* Pillar 2: Zero-Friction Frontline UX */}
        <div className="sl-pillar-card">
          <div className="sl-pillar-head">
            <span className="sl-pillar-num">Pillar 2</span>
            <CheckCircle2 size={16} className="sl-text-success" />
          </div>
          <h4>Zero-Friction Frontline UX</h4>
          <p className="sl-pillar-std">Standard: Role-optimized views & 0 filter state loss.</p>
          <div className="sl-pillar-metrics">
            <div className="sl-p-metric">
              <span className="sl-p-val is-blue">6 Cols</span>
              <span className="sl-p-lbl">Agent Default (vs 40 Zoho)</span>
            </div>
            <div className="sl-p-metric">
              <span className="sl-p-val is-blue">0</span>
              <span className="sl-p-lbl">Filter Resets Reported</span>
            </div>
          </div>
          <div className="sl-pillar-footer">
            <span className="sl-status-tag is-pass">Verified & Passing</span>
          </div>
        </div>

        {/* Pillar 3: Native Niche Domain Alignment */}
        <div className="sl-pillar-card">
          <div className="sl-pillar-head">
            <span className="sl-pillar-num">Pillar 3</span>
            <CheckCircle2 size={16} className="sl-text-success" />
          </div>
          <h4>Healthcare Domain Fit</h4>
          <p className="sl-pillar-std">Standard: 100% IVF clinical nomenclature & stage clarity.</p>
          <div className="sl-pillar-metrics">
            <div className="sl-p-metric">
              <span className="sl-p-val is-purple">100%</span>
              <span className="sl-p-lbl">"Deal" → "Patient Journey"</span>
            </div>
            <div className="sl-p-metric">
              <span className="sl-p-val is-purple">6</span>
              <span className="sl-p-lbl">Distinct Clinical Stage Icons</span>
            </div>
          </div>
          <div className="sl-pillar-footer">
            <span className="sl-status-tag is-pass">Verified & Passing</span>
          </div>
        </div>

        {/* Pillar 4: Behavioral Adoption */}
        <div className="sl-pillar-card">
          <div className="sl-pillar-head">
            <span className="sl-pillar-num">Pillar 4</span>
            <CheckCircle2 size={16} className="sl-text-success" />
          </div>
          <h4>Frontline Adoption</h4>
          <p className="sl-pillar-std">Standard: ≥90% weekly active usage driven by speed.</p>
          <div className="sl-pillar-metrics">
            <div className="sl-p-metric">
              <span className="sl-p-val is-teal">94.6%</span>
              <span className="sl-p-lbl">Frontline WAU (1,350 Users)</span>
            </div>
            <div className="sl-p-metric">
              <span className="sl-p-val is-teal">1.4s</span>
              <span className="sl-p-lbl">Avg Consultation Booking Time</span>
            </div>
          </div>
          <div className="sl-pillar-footer">
            <span className="sl-status-tag is-pass">Verified & Passing</span>
          </div>
        </div>

        {/* Pillar 5: Product Flywheel */}
        <div className="sl-pillar-card">
          <div className="sl-pillar-head">
            <span className="sl-pillar-num">Pillar 5</span>
            <CheckCircle2 size={16} className="sl-text-success" />
          </div>
          <h4>Productized Vertical Presets</h4>
          <p className="sl-pillar-std">Standard: Reusable IVF assets for subsequent accounts.</p>
          <div className="sl-pillar-metrics">
            <div className="sl-p-metric">
              <span className="sl-p-val">4</span>
              <span className="sl-p-lbl">Healthcare Presets Packaged</span>
            </div>
            <div className="sl-p-metric">
              <span className="sl-p-val">120ms</span>
              <span className="sl-p-lbl">HIS Webhook Response Time</span>
            </div>
          </div>
          <div className="sl-pillar-footer">
            <span className="sl-status-tag is-pass">Verified & Passing</span>
          </div>
        </div>
      </div>

      {/* Deep-Dive Sections */}
      <div className="sl-audit-detail-grid">
        {/* Tiered Data Migration Report */}
        <div className="sl-audit-section-card">
          <div className="sl-card-header-row">
            <div className="sl-card-title-group">
              <Database size={18} className="sl-text-primary" />
              <h3>Tiered 18-Lakh Record Migration Architecture</h3>
            </div>
            <span className="sl-badge-pill sl-badge-highlight">User Challenge #1</span>
          </div>

          <p className="sl-card-desc">
            Instead of a blind "as-is" migration of all 18 Lakh records from Zoho (which would bloat search and pollute active queues with 4-year-old dead records), Superleap executed a tiered strategy:
          </p>

          <div className="sl-migration-tiers-grid">
            <div className="sl-tier-box is-active-tier">
              <div className="sl-tier-top">
                <span className="sl-tier-name">Tier 1: Active Patient Pipelines</span>
                <span className="sl-tier-badge">Live CRM Core</span>
              </div>
              <div className="sl-tier-count">2,20,000 Records</div>
              <p>Leads in progress over last 6–12 months. Fully deduplicated, cleansed of UTF-8 corruptions, and enriched with Exotel & HIS IDs.</p>
            </div>

            <div className="sl-tier-box is-archive-tier">
              <div className="sl-tier-top">
                <span className="sl-tier-name">Tier 2: Historical Read-Only Archive</span>
                <span className="sl-tier-badge">Searchable Archive</span>
              </div>
              <div className="sl-tier-count">15,80,000 Records</div>
              <p>Cold records stored in high-performance compressed parquet lookup object. Accessible via Global Search (⌘K) with zero load on active tables.</p>
            </div>
          </div>
        </div>

        {/* HIS Integration Webhook Status */}
        <div className="sl-audit-section-card">
          <div className="sl-card-header-row">
            <div className="sl-card-title-group">
              <Dna size={18} className="sl-text-teal" />
              <h3>Hospital Information System (HIS) Sync Pipeline</h3>
            </div>
            <span className="sl-badge-pill sl-badge-highlight">User Challenge #3</span>
          </div>

          <p className="sl-card-desc">
            Solving the operational risk of the strict one-way contract. Implemented an asynchronous webhook listener for the critical <strong>"IVF Clinical Cycle Starts"</strong> milestone.
          </p>

          <div className="sl-his-test-widget">
            <div className="sl-his-status-row">
              <div className="sl-his-status-left">
                <span className="sl-dot-live"></span>
                <span>Webhook Endpoint: <code>https://api.superleap.ai/v1/webhooks/his/nova/cycle-start</code></span>
              </div>
              <span className="sl-his-latency">Latency: 92ms</span>
            </div>

            <div className="sl-his-action-row">
              <button 
                className="sl-btn sl-btn-primary"
                onClick={onTriggerHisSimulation}
              >
                <Zap size={14} />
                <span>Simulate HIS Webhook Trigger</span>
              </button>
              <span className="sl-his-action-note">
                Triggers live IVF Cycle Start event for Priyanka Sharma (NF-10294)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
