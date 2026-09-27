import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Paperclip, 
  Smile, 
  Image, 
  Mic, 
  Plus, 
  Sparkles, 
  Send, 
  Phone, 
  Calendar, 
  MoreVertical,
  CheckCheck
} from 'lucide-react';

// Channel SVGs
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="#25D366">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.059-1.146-.086-.3-.097-.687-.245-1.189-.462-2.115-.916-3.486-3.08-3.592-3.22-.106-.14-1.026-1.365-1.026-2.604 0-1.239.65-1.849.882-2.099.231-.25.505-.313.673-.313.168 0 .337.002.485.009.157.008.368-.06.576.44.216.518.736 1.796.8 1.927.064.13.107.283.021.455-.085.172-.128.28-.255.429-.127.15-.266.335-.38.45-.128.129-.261.27-.113.525.148.254.659 1.087 1.412 1.76 1.002.894 1.846 1.17 2.106 1.299.261.129.412.108.563-.065.151-.172.646-.753.818-1.012.172-.259.344-.216.577-.13.232.086 1.474.695 1.728.824.254.13.424.194.487.302.064.108.064.626-.08 1.031z"/>
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="#0084FF">
    <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.727 7.218V22l3.373-1.851c.905.251 1.867.387 2.9.387 5.523 0 10-4.145 10-9.277C22 6.145 17.523 2 12 2zm1.066 12.483l-2.582-2.753-5.04 2.753 5.54-5.88 2.643 2.753 4.98-2.753-5.541 5.88z"/>
  </svg>
);

// Initial Contacts for Nova Fertility IVF Patient Consultation
const INITIAL_CONTACTS = [
  {
    id: 'saurav_sharma',
    name: 'Saurav Sharma',
    avatar: 'SS',
    avatarBg: '#b94a3a', // Brick Red/Orange
    channel: 'whatsapp',
    lastMessage: 'Need IVF doctor recommendations',
    time: '2:07 PM',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'contact',
        text: 'Need doctor recommendations for IVF consultation',
        time: '2:07 PM'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Namaste Saurav ji 🙏\n\nVrinda here from Nova Fertility. We reviewed your inquiry regarding fertility evaluation and IVF treatment options. Dr. Kavitha Menon (Senior IVF Specialist) has consultation slots open this week. Could we schedule a quick call or book an in-clinic consultation for you and your spouse?',
        time: '3:00 PM'
      },
      {
        id: 3,
        sender: 'contact',
        text: 'Yes, my wife and I have been trying for 3 years and are exploring IVF options in Mumbai / Thane. Do you have slots available with Dr. Kavitha or Dr. Rajesh Rao this Saturday?',
        time: '3:15 PM'
      }
    ]
  },
  {
    id: 'ruth_martinez',
    name: 'Ruth Martinez',
    avatar: 'JD',
    avatarBg: '#d97706', // Amber Orange
    channel: 'messenger',
    lastMessage: 'Inquired about IVF cycle success rates',
    time: '1:45 PM',
    unreadCount: 1,
    messages: [
      {
        id: 1,
        sender: 'contact',
        text: 'Hi, I saw your awareness campaign on Facebook. Could you share details on IVF success rates for age 34+?',
        time: '1:45 PM'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Hello Ruth! For 34+, our blastocyst culture protocol achieves a 68-72% cumulative pregnancy rate. Would you like to schedule an ultrasound and fertility consultation with our specialist?',
        time: '1:50 PM'
      }
    ]
  },
  {
    id: 'oliva_rhye',
    name: 'Oliva Rhye',
    avatar: 'OR',
    avatarBg: '#0ea5e9', // Bright Cyan Blue
    channel: 'whatsapp',
    lastMessage: 'Shared lab reports PDF',
    time: '12:30 PM',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'contact',
        text: 'Hi Vrinda, sharing our recent semen analysis and AMH blood test reports PDF as requested.',
        time: '12:30 PM'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Thank you Oliva ji! I have synced your reports with Nova HIS EHR (MRN: NF-10304). Dr. Kavitha is reviewing the motility parameters now and will update you shortly.',
        time: '12:38 PM'
      }
    ]
  },
  {
    id: 'anvika_mishra',
    name: 'Anvika Mishra',
    avatar: 'AM',
    avatarBg: '#eab308', // Warm Gold Yellow
    channel: 'whatsapp',
    lastMessage: 'Can we schedule a call at 4 PM?',
    time: '11:15 AM',
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: 'contact',
        text: 'Can we schedule a call at 4 PM? We have questions regarding Day 2 follicular scan timing.',
        time: '11:15 AM'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Certainly Anvika ji! Our clinical counsellor will ring you at 4:00 PM today to guide you on the ultrasound and stimulation medication schedule.',
        time: '11:20 AM'
      }
    ]
  },
  {
    id: 'liam_chen',
    name: 'Liam Chen',
    avatar: 'JD',
    avatarBg: '#059669', // Emerald Green
    channel: 'messenger',
    lastMessage: 'Interested in ICSI & PGT-A screening',
    time: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'contact',
        text: 'Interested in ICSI with PGT-A genetic screening. What is the lab turnaround time for embryo testing?',
        time: 'Yesterday'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Hello Liam! Our in-house genetics lab provides PGT-A aneuploidy screening results within 7 to 10 days before the frozen embryo transfer (FET).',
        time: 'Yesterday'
      }
    ]
  },
  {
    id: 'anvika_mishra_2',
    name: 'Kavya Deshmukh',
    avatar: 'OR',
    avatarBg: '#ea580c', // Bright Orange
    channel: 'whatsapp',
    lastMessage: 'Thank you for the quick follow-up!',
    time: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'contact',
        text: 'Thank you for the quick follow-up! The medication reminder on WhatsApp was very reassuring.',
        time: 'Yesterday'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'You are most welcome Kavya ji! Wishing you all the best for your scan tomorrow at Koramangala clinic.',
        time: 'Yesterday'
      }
    ]
  },
  {
    id: 'sofia_patel',
    name: 'Sofia Patel',
    avatar: 'OR',
    avatarBg: '#c2410c', // Deep Amber
    channel: 'messenger',
    lastMessage: 'Are EMI options available?',
    time: 'Sep 25',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'contact',
        text: 'Are 0% interest EMI options available for the full IVF cycle package including stimulation injections?',
        time: 'Sep 25'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Yes Sofia ji! Nova Fertility provides zero-cost EMI plans with easy monthly installments starting at ₹8,500/month with zero processing fees.',
        time: 'Sep 25'
      }
    ]
  },
  {
    id: 'marco_rodriguez',
    name: 'Marco Rodriguez',
    avatar: 'AM',
    avatarBg: '#06b6d4', // Cyan
    channel: 'whatsapp',
    lastMessage: 'Looking forward to meeting tomorrow',
    time: 'Sep 24',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'contact',
        text: 'Looking forward to meeting Dr. Kavitha tomorrow at 11 AM for our first fertility consultation.',
        time: 'Sep 24'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'We look forward to welcoming you and your spouse! Please bring any prior ultrasound scans or blood test reports along.',
        time: 'Sep 24'
      }
    ]
  }
];

export function OmnichannelChatView({ onOpenBookConsultation }) {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [activeContactId, setActiveContactId] = useState('saurav_sharma');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread' | 'groups'
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];

  // Filter contacts by tab and search query
  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'unread') return c.unreadCount > 0;
    if (activeTab === 'groups') return false; // individual chats for now
    return true;
  });

  // Send new message handler
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'agent',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setContacts(prev => prev.map(c => {
      if (c.id === activeContactId) {
        return {
          ...c,
          lastMessage: newMessage.text,
          time: newMessage.time,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    setInputMessage('');
  };

  // AI "Help me write" recommendation prompt
  const handleAiHelpMeWrite = () => {
    const aiDraft = "Namaste Saurav ji! Dr. Kavitha Menon has an open consultation slot this Saturday at 11:30 AM at our Bandra clinic. We will also review your recent AMH reports and fertility history. Shall I confirm this appointment for you?";
    setInputMessage(aiDraft);
  };

  return (
    <div className="sl-omnichannel-chat-shell">
      {/* 1. Left Chats Pane */}
      <div className="sl-chat-sidebar">
        {/* Title */}
        <div className="sl-chat-sidebar-header">
          <h3>Chats</h3>
        </div>

        {/* Search & Filter */}
        <div className="sl-chat-search-wrap">
          <div className="sl-chat-search-box">
            <Search size={14} className="sl-chat-search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sl-chat-search-input"
            />
          </div>
          <button type="button" className="sl-chat-filter-btn" title="Filter chats">
            <Filter size={14} />
          </button>
        </div>

        {/* Filter Pills (All, Unread (99), Groups (2)) */}
        <div className="sl-chat-pills-row">
          <button 
            type="button" 
            className={`sl-chat-pill ${activeTab === 'all' ? 'is-active-mint' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            type="button" 
            className={`sl-chat-pill ${activeTab === 'unread' ? 'is-active-gray' : ''}`}
            onClick={() => setActiveTab('unread')}
          >
            Unread (99)
          </button>
          <button 
            type="button" 
            className={`sl-chat-pill ${activeTab === 'groups' ? 'is-active-gray' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            Groups (2)
          </button>
        </div>

        {/* Chat List */}
        <div className="sl-chat-contacts-list">
          {filteredContacts.map((contact) => {
            const isSelected = contact.id === activeContactId;

            return (
              <div 
                key={contact.id}
                className={`sl-chat-contact-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setActiveContactId(contact.id)}
              >
                {/* Avatar with Channel Overlay Badge */}
                <div className="sl-contact-avatar-wrap">
                  <div 
                    className="sl-contact-avatar" 
                    style={{ backgroundColor: contact.avatarBg }}
                  >
                    <span>{contact.avatar}</span>
                  </div>
                  <div className="sl-channel-overlay-badge">
                    {contact.channel === 'whatsapp' ? <WhatsAppIcon /> : <MessengerIcon />}
                  </div>
                </div>

                {/* Contact Meta */}
                <div className="sl-contact-meta">
                  <div className="sl-contact-name-row">
                    <span className="sl-contact-name">{contact.name}</span>
                    <span className="sl-contact-time">{contact.time}</span>
                  </div>
                  <div className="sl-contact-snippet-row">
                    <p className="sl-contact-last-msg">{contact.lastMessage}</p>
                    {contact.unreadCount > 0 && (
                      <span className="sl-chat-unread-dot">{contact.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Right Conversation Viewport */}
      <div className="sl-conversation-viewport">
        {/* Conversation Header */}
        <div className="sl-conversation-header">
          <div className="sl-conv-header-left">
            <div 
              className="sl-contact-avatar" 
              style={{ backgroundColor: activeContact.avatarBg }}
            >
              <span>{activeContact.avatar}</span>
            </div>
            <div className="sl-conv-title-info">
              <h4 className="sl-conv-contact-name">{activeContact.name}</h4>
            </div>
          </div>

          <div className="sl-conv-header-actions">
            <button 
              type="button" 
              className="sl-conv-action-btn"
              onClick={() => alert(`Calling ${activeContact.name} via Superleap Exotel CTI...`)}
              title="Initiate Phone Call"
            >
              <Phone size={15} />
            </button>
            <button 
              type="button" 
              className="sl-conv-action-btn is-consult"
              onClick={() => onOpenBookConsultation && onOpenBookConsultation({ patient_name: activeContact.name, id: activeContact.id })}
              title="Schedule Consultation"
            >
              <Calendar size={15} />
              <span>Book</span>
            </button>
            <button type="button" className="sl-conv-action-btn" title="Options">
              <MoreVertical size={15} />
            </button>
          </div>
        </div>

        {/* Messages Body with Subtle Pattern */}
        <div className="sl-conversation-messages-body">
          {activeContact.messages.map((msg) => {
            const isContact = msg.sender === 'contact';

            return (
              <div 
                key={msg.id} 
                className={`sl-chat-msg-row ${isContact ? 'is-incoming' : 'is-outgoing'}`}
              >
                <div className={`sl-chat-bubble ${isContact ? 'is-incoming-bubble' : 'is-outgoing-bubble'}`}>
                  <p className="sl-bubble-text">{msg.text}</p>
                  <span className="sl-bubble-time">
                    {msg.time}
                    {!isContact && <CheckCheck size={12} className="sl-check-double" />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Composer Box (Matching User Screenshot with "Help me write") */}
        <div className="sl-composer-container">
          <div className="sl-composer-card">
            {/* AI Suggestion Bar */}
            <div className="sl-composer-ai-bar">
              <button 
                type="button" 
                className="sl-ai-help-write-btn"
                onClick={handleAiHelpMeWrite}
                title="Superleap AI: Auto-draft intelligent context-aware response"
              >
                <span className="sl-ai-pipe">|</span>
                <Sparkles size={13} className="sl-ai-sparkle-icon" />
                <span>Help me write</span>
              </button>
            </div>

            {/* Input Textarea */}
            <form onSubmit={handleSendMessage} className="sl-composer-form">
              <textarea 
                className="sl-composer-textarea"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={2}
              />

              {/* Bottom Toolbar */}
              <div className="sl-composer-toolbar">
                <div className="sl-composer-tools-left">
                  <button type="button" className="sl-composer-tool-icon" title="Add attachment">
                    <Plus size={16} />
                  </button>
                  <button type="button" className="sl-composer-tool-icon" title="Attach document">
                    <Paperclip size={15} />
                  </button>
                  <button type="button" className="sl-composer-tool-icon" title="Insert emoji">
                    <Smile size={15} />
                  </button>
                  <button type="button" className="sl-composer-tool-icon" title="Insert image">
                    <Image size={15} />
                  </button>
                </div>

                <div className="sl-composer-tools-right">
                  <button type="button" className="sl-composer-tool-icon" title="Voice note">
                    <Mic size={16} />
                  </button>
                  {inputMessage.trim() && (
                    <button type="submit" className="sl-btn-send-message" title="Send message">
                      <Send size={14} />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
