import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowUp, 
  User, 
  Calendar, 
  ArrowRight, 
  MessageSquare,
  PlusCircle,
  RotateCcw
} from 'lucide-react';

export function HomeSuperAgentView({
  leads = [],
  onNavigateToLeads,
  onOpenBookConsultation,
  onQuickWhatsApp,
  onQuickCall,
  onSelectLead
}) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const streamEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messages.length > 0) {
      streamEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input on initial mount
  useEffect(() => {
    inputRef.current?.focus();
  }, [messages.length]);

  // Derived Account Metrics
  const totalLeads = leads.length;
  const highIntentLeads = leads.filter(l => l.intent_score >= 85);
  const ivfCycleLeads = leads.filter(l => l.stage === 'ivf_cycle');
  const firstConsultLeads = leads.filter(l => l.stage === 'first_consultation');
  const diagnosticsLeads = leads.filter(l => l.stage === 'diagnostics');
  const restoredZohoLeads = leads.filter(l => l.migration_clean_status?.includes('Restored'));

  const totalPipelineValue = leads.reduce((acc, curr) => acc + (curr.cycle_value || 210000), 0);
  const formattedPipelineValue = `₹${(totalPipelineValue / 10000000).toFixed(2)} Cr`;

  // Quick Starter Questions
  const starterPrompts = [
    {
      label: '📊 Account & pipeline summary',
      query: 'Show me an executive overview of Nova Fertility accounts, total pipeline revenue, and conversion health.'
    },
    {
      label: '🚨 High-intent IVF leads',
      query: 'Which high-intent IVF candidates (score 85+) require immediate follow-up today?'
    },
    {
      label: '🩺 Dr. Kavitha availability today',
      query: 'Check doctor consultation capacity and open slots for Dr. Kavitha Menon in Bangalore Koramangala today.'
    },
    {
      label: '🛡️ Zoho data migration status',
      query: 'What is the status of our Zoho CRM data migration and UTF-8 character encoding repairs?'
    }
  ];

  // Dynamic AI response generation based on user query
  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Executive Summary / Pipeline / Revenue
    if (q.includes('executive') || q.includes('overview') || q.includes('pipeline') || q.includes('revenue') || q.includes('account')) {
      return {
        text: `### 📊 Nova Fertility Account Summary\n\nAcross **140 clinics** in **28 cities**:\n\n* **Total Active Inquiries:** ${totalLeads} patient leads tracked\n* **Total Pipeline Revenue:** **${formattedPipelineValue}** across all treatment stages\n* **Active IVF Cycles in Stimulation:** **${ivfCycleLeads.length} cycles** (Verified via Hospital HIS Webhook)\n* **First Consultations Scheduled:** **${firstConsultLeads.length} patients**\n* **Diagnostic Workups Pending:** **${diagnosticsLeads.length} couples**\n\n**Frontline Conversion Velocity:** 28.4% inquiry-to-consultation rate (+3.2% vs Zoho benchmark). Zero consultation drop recorded since deployment.`,
        actionType: 'leads_overview',
        actionLabel: 'View Full Deals Pipeline (140 Leads) →'
      };
    }

    // 2. High-Intent Leads / Follow-ups
    if (q.includes('high intent') || q.includes('follow') || q.includes('urgent') || q.includes('85') || q.includes('patient')) {
      const top3 = highIntentLeads.slice(0, 3);
      return {
        text: `### 🚨 Prioritized High-Intent IVF Candidates (Score ≥ 85%)\n\nWe identified **${highIntentLeads.length} patients** with critical intent requiring contact today:\n\n${top3.map((l, i) => `**${i + 1}. ${l.patient_name}** (${l.id}) · *Score: ${l.intent_score}%*\n• **Clinic:** ${l.clinic_name} | **Concern:** ${l.primary_concern}\n• **Assigned Doctor:** ${l.assigned_doctor || 'Dr. Kavitha Menon'}\n• **Next Follow-up:** ${l.next_followup}`).join('\n\n')}\n\n*Recommended Action:* Schedule First Consultation before Day 3 of menstrual cycle.`,
        actionType: 'high_intent_view',
        actionLabel: `Filter to ${highIntentLeads.length} High-Intent Leads →`,
        leadsData: top3
      };
    }

    // 3. Zoho Migration / UTF-8 Health
    if (q.includes('zoho') || q.includes('migration') || q.includes('utf') || q.includes('data') || q.includes('clean') || q.includes('corrupt')) {
      return {
        text: `### 🛡️ Zoho CRM Data Migration Audit\n\nSuperAgent verified data reconciliation across all 140 clinics:\n\n* **Deduplication Rate:** **100% verified** (1,240 duplicate Zoho contact stubs consolidated)\n* **Regional Encoding Restorations (UTF-8):** **${restoredZohoLeads.length} patient records** successfully repaired from legacy question-mark mojibake (\`???? ????\`) into verified Tamil, Marathi, and Hindi names.\n* **Example Repaired Records:** *Soundarya Ramakrishnan* (Chennai), *Aarav & Kavya Deshmukh* (Mumbai).\n* **HIS Data Integrity:** 100% of patient MRNs mapped cleanly to core Hospital Information Systems.\n\nZero records lost, zero duplicate outreach, and 100% auditable under the ART Act 2021.`,
        actionType: 'leads_overview',
        actionLabel: 'View Repaired Leads in Deals Pipeline →'
      };
    }

    // 4. Clinic Capacity / Doctors / Slots
    if (q.includes('doctor') || q.includes('clinic') || q.includes('capacity') || q.includes('slot') || q.includes('bangalore') || q.includes('mumbai') || q.includes('kavitha')) {
      return {
        text: `### 🩺 Specialist Doctor Capacity & Availability\n\n* **Bangalore (Koramangala Clinic):**\n  • **Dr. Kavitha Menon (Senior Fertility Specialist):** 4 slots open today (11:30 AM, 2:00 PM, 4:30 PM, 6:00 PM)\n  • **Dr. Ananya Iyer (Embryologist & Gynaec):** 6 slots available (In-clinic & Video)\n\n* **Mumbai (Bandra West Clinic):**\n  • **Dr. Rajesh Rao (Andrology / ICSI Specialist):** 3 morning slots open tomorrow\n  • *Current Clinic Occupancy:* 74% (Optimal consultation flow)\n\nCounsellors can book appointments in **1 click** directly from any patient row.`,
        actionType: 'book_consult_suggest',
        actionLabel: 'Book Consultation with Dr. Kavitha →'
      };
    }

    // 5. Default Fallback
    return {
      text: `### 💡 SuperAgent Response\n\nBased on your query: *"${query}"*:\n\n* **Active Pipeline:** ${totalLeads} leads across 6 clinical stages\n* **Frontline Triage:** 86.6% of counsellors are actively utilizing 1-click consultation scheduling\n* **HIS Webhooks:** All cycle progression events are streaming live with zero latency.\n\nWould you like me to filter the deals pipeline, check doctor schedules, or summarize leads for a specific clinic?`,
      actionType: 'leads_overview',
      actionLabel: 'Explore Patient Journey Deals Pipeline →'
    };
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: 'Just now',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateAIResponse(text);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        timestamp: 'Just now',
        text: responseData.text,
        actionType: responseData.actionType,
        actionLabel: responseData.actionLabel,
        leadsData: responseData.leadsData
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 500);
  };

  const handleActionClick = (actionType) => {
    if (actionType === 'leads_overview') {
      onNavigateToLeads();
    } else if (actionType === 'high_intent_view') {
      onNavigateToLeads('high_intent');
    } else if (actionType === 'book_consult_suggest') {
      if (leads.length > 0) {
        onOpenBookConsultation(leads[0]);
      }
    }
  };

  // ==========================================
  // 1. SIMPLE STARTER VIEW (Lovable Style)
  // ==========================================
  if (messages.length === 0) {
    return (
      <div className="sl-lovable-starter-canvas">
        <div className="sl-lovable-starter-center">
          {/* Minimalist Icon Badge */}
          <div className="sl-lovable-avatar">
            <Sparkles size={24} className="sl-lovable-sparkle" />
          </div>

          {/* Clean Headline & Subtitle */}
          <h1 className="sl-lovable-title">Ask SuperAgent</h1>
          <p className="sl-lovable-subtitle">
            Ask any question about accounts, patient journeys, doctors, or clinic data.
          </p>

          {/* Simple Prominent Input Box */}
          <div className="sl-lovable-input-wrapper">
            <textarea
              ref={inputRef}
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask a question about your accounts, patient leads, doctors, or revenue..."
              className="sl-lovable-textarea"
            />
            <div className="sl-lovable-input-bottom">
              <span className="sl-lovable-hint">Ask anything · Press Enter to send</span>
              <button 
                type="button" 
                className="sl-lovable-send-btn"
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                title="Send question"
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Subtle Suggestions Underneath */}
          <div className="sl-lovable-chips-row">
            {starterPrompts.map((p, i) => (
              <button 
                key={i}
                type="button" 
                className="sl-lovable-chip"
                onClick={() => handleSend(p.query)}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. ACTIVE CONVERSATION VIEW (When chatting)
  // ==========================================
  return (
    <div className="sl-home-superagent-container">
      {/* Minimal Top Bar with Reset button */}
      <div className="sl-home-ai-header">
        <div className="sl-home-ai-brand">
          <div className="sl-home-ai-avatar">
            <Sparkles size={16} />
          </div>
          <div className="sl-home-ai-title-wrap">
            <h2>SuperAgent AI</h2>
            <p>Nova Fertility Account & Operations</p>
          </div>
        </div>

        <button 
          type="button" 
          className="sl-btn-new-query"
          onClick={() => {
            setMessages([]);
            setInputValue('');
          }}
          title="Start a new question"
        >
          <RotateCcw size={13} />
          <span>New Question</span>
        </button>
      </div>

      {/* Chat Stream */}
      <div className="sl-home-chat-viewport">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`sl-chat-row ${msg.sender === 'user' ? 'is-user-row' : 'is-ai-row'}`}
          >
            <div className="sl-chat-avatar-col">
              {msg.sender === 'user' ? (
                <div className="sl-user-avatar">
                  <User size={15} />
                </div>
              ) : (
                <div className="sl-bot-avatar">
                  <Sparkles size={15} />
                </div>
              )}
            </div>

            <div className="sl-chat-content-col">
              <div className="sl-chat-sender-info">
                <strong>{msg.sender === 'user' ? 'You' : 'SuperAgent'}</strong>
                <span className="sl-chat-time">{msg.timestamp}</span>
              </div>

              <div className="sl-chat-bubble">
                {msg.text.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return <h4 key={idx} className="sl-ai-h4">{paragraph.replace('### ', '')}</h4>;
                  }
                  if (paragraph.startsWith('* ') || paragraph.startsWith('• ')) {
                    return (
                      <ul key={idx} className="sl-ai-list">
                        {paragraph.split('\n').map((line, lIdx) => (
                          <li key={lIdx} dangerouslySetInnerHTML={{ 
                            __html: line.replace(/^[\*\•]\s*/, '')
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              .replace(/`(.*?)`/g, '<code>$1</code>')
                          }} />
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} dangerouslySetInnerHTML={{ 
                      __html: paragraph
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`(.*?)`/g, '<code>$1</code>')
                    }} />
                  );
                })}

                {/* Interactive Action Buttons */}
                {msg.actionType && (
                  <div className="sl-ai-bubble-actions">
                    <button 
                      type="button" 
                      className="sl-btn-ai-action"
                      onClick={() => handleActionClick(msg.actionType)}
                    >
                      <span>{msg.actionLabel}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}

                {/* Lead cards if surfaced */}
                {msg.leadsData && (
                  <div className="sl-ai-mini-leads-grid">
                    {msg.leadsData.map(l => (
                      <div key={l.id} className="sl-ai-mini-lead-card">
                        <div className="sl-mini-card-head">
                          <strong>{l.patient_name}</strong>
                          <span className="sl-mini-score">{l.intent_score}% Intent</span>
                        </div>
                        <div className="sl-mini-card-body">
                          <span>{l.clinic_name}</span> · <span>{l.primary_concern}</span>
                        </div>
                        <div className="sl-mini-card-actions">
                          <button 
                            type="button" 
                            className="sl-mini-btn-book"
                            onClick={() => onOpenBookConsultation(l)}
                          >
                            <Calendar size={11} />
                            <span>Book Consultation</span>
                          </button>
                          <button 
                            type="button" 
                            className="sl-mini-btn-wa"
                            onClick={() => onQuickWhatsApp(l)}
                            title="Open WhatsApp message"
                          >
                            <MessageSquare size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="sl-chat-row is-ai-row">
            <div className="sl-chat-avatar-col">
              <div className="sl-bot-avatar">
                <Sparkles size={15} />
              </div>
            </div>
            <div className="sl-chat-content-col">
              <div className="sl-chat-bubble sl-typing-bubble">
                <span className="sl-dot-flashing"></span>
                <span className="sl-dot-flashing"></span>
                <span className="sl-dot-flashing"></span>
                <span className="sl-typing-text">SuperAgent is analyzing data...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={streamEndRef} />
      </div>

      {/* Docked Chat Input */}
      <div className="sl-home-input-dock">
        <form 
          className="sl-chatgpt-input-box"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask SuperAgent a follow-up question..."
            className="sl-chatgpt-textarea"
          />
          <button 
            type="submit" 
            className="sl-btn-chatgpt-send"
            disabled={!inputValue.trim() || isTyping}
            title="Send query"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </div>
  );
}
