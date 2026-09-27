import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  MessageSquare, 
  Calendar, 
  Check, 
  FileText, 
  Languages, 
  Dna,
  Zap
} from 'lucide-react';

export function SuperAgentCopilotDrawer({
  isOpen,
  onClose,
  activeLead,
  onOpenBookConsultation,
  onQuickWhatsApp
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      time: 'Just now',
      text: activeLead 
        ? `Hello! I'm SuperAgent AI. I've analyzed patient ${activeLead.patient_name} (${activeLead.id}). They have an Intent Score of ${activeLead.intent_score}/100 with concern: "${activeLead.primary_concern}". What would you like to do?`
        : "Hello! I'm SuperAgent AI. I can help summarize patient journeys, draft regional WhatsApp messages, or check HIS synchronization health. Ask me anything!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    { label: 'Draft WhatsApp Follow-up', action: 'draft_wa' },
    { label: 'Summarize Clinical Risk', action: 'summarize_risk' },
    { label: 'Suggest Next Best Action', action: 'next_action' },
    { label: 'Book Consult with Dr. Kavitha', action: 'book_kavitha' }
  ];

  const handleAction = (actionKey) => {
    if (actionKey === 'book_kavitha' && activeLead) {
      onOpenBookConsultation(activeLead);
      return;
    }

    if (actionKey === 'draft_wa' && activeLead) {
      const waDraft = `Namaste ${activeLead.patient_name} ji. This is Priya from Nova Fertility ${activeLead.clinic_name}. We reviewed your inquiry regarding ${activeLead.primary_concern}. Dr. Kavitha Menon has an open consultation slot tomorrow at 11:00 AM. Would you like us to reserve this for you and your spouse?`;
      
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', time: 'Just now', text: 'Draft a personalized WhatsApp follow-up.' },
        { 
          id: Date.now() + 1, 
          sender: 'ai', 
          time: 'Just now', 
          text: `Here is the personalized WhatsApp outreach template:\n\n"${waDraft}"`,
          hasWaSend: true,
          waText: waDraft
        }
      ]);
      return;
    }

    if (actionKey === 'summarize_risk' && activeLead) {
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', time: 'Just now', text: 'Summarize clinical risk factors.' },
        { 
          id: Date.now() + 1, 
          sender: 'ai', 
          time: 'Just now', 
          text: `Clinical Analysis for ${activeLead.patient_name}:\n• Patient Age: ${activeLead.age} (Partner: ${activeLead.partner_age})\n• AMH Indicator: ${activeLead.amh_level || 'Pending test'}\n• Prior Attempts: ${activeLead.previous_attempts || 'None reported'}\n• Risk Score: Moderate-High. Advise scheduling dual-marker diagnostic screening before cycle formulation.` 
        }
      ]);
      return;
    }

    if (actionKey === 'next_action') {
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', time: 'Just now', text: 'What is the Next Best Action?' },
        { 
          id: Date.now() + 1, 
          sender: 'ai', 
          time: 'Just now', 
          text: `Next Best Action for frontline counsellor: Immediately lock in a First Consultation slot before Day 3 of menstrual cycle. High-converting window is within 24 hours of enquiry.` 
        }
      ]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setInputMessage('');

    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', time: 'Just now', text: userText }
    ]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now() + 1, 
          sender: 'ai', 
          time: 'Just now', 
          text: `Superleap AI processed your request: "${userText}". Based on Nova Fertility's clinical protocol, this patient journey is prioritized in the active pipeline.` 
        }
      ]);
    }, 600);
  };

  return (
    <div className="sl-copilot-backdrop" onClick={onClose}>
      <aside className="sl-copilot-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sl-copilot-header">
          <div className="sl-copilot-title-group">
            <div className="sl-copilot-avatar">
              <Sparkles size={18} />
            </div>
            <div>
              <h3>SuperAgent AI</h3>
              <p className="sl-copilot-subtitle">Clinical Intelligence Agent for Nova Fertility</p>
            </div>
          </div>
          <button className="sl-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Quick Context Pill */}
        {activeLead && (
          <div className="sl-copilot-context-bar">
            <span>Active Context:</span>
            <strong>{activeLead.patient_name}</strong>
            <span className="sl-context-tag">{activeLead.id}</span>
            <span className="sl-context-score">{activeLead.intent_score}/100</span>
          </div>
        )}

        {/* Quick Action Chips */}
        <div className="sl-copilot-chips-wrap">
          {quickPrompts.map(p => (
            <button 
              key={p.action}
              className="sl-copilot-chip"
              onClick={() => handleAction(p.action)}
            >
              <Zap size={12} />
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="sl-copilot-stream">
          {messages.map(m => (
            <div key={m.id} className={`sl-copilot-msg ${m.sender === 'user' ? 'is-user' : 'is-ai'}`}>
              <div className="sl-msg-bubble">
                <p className="sl-msg-content">{m.text}</p>
                {m.hasWaSend && activeLead && (
                  <button 
                    className="sl-btn sl-btn-secondary sl-btn-sm sl-mt-2"
                    onClick={() => onQuickWhatsApp(activeLead)}
                  >
                    <MessageSquare size={13} />
                    <span>Send via WhatsApp API</span>
                  </button>
                )}
              </div>
              <span className="sl-msg-time">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="sl-copilot-input-bar">
          <input 
            type="text" 
            placeholder="Ask SuperAgent to summarize, draft WhatsApp, or check HIS..." 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="sl-copilot-input"
          />
          <button type="submit" className="sl-btn-copilot-send" disabled={!inputMessage.trim()}>
            <Send size={15} />
          </button>
        </form>
      </aside>
    </div>
  );
}
