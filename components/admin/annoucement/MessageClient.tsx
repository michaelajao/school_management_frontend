'use client';

import { useState } from 'react';
import { Search, Mic, Image, Smile, X } from 'lucide-react';

// Types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  contactId: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  isOnline?: boolean;
}

interface Group {
  id: string;
  name: string;
  members: number;
}

interface MessagingAppClientProps {
  initialContacts: Contact[];
  initialGroups: Group[];
  initialAllContacts: Contact[];
  initialMessages: Message[];
}

export default function MessagingAppClient({
  initialContacts,
  initialGroups,
  initialAllContacts,
  initialMessages
}: MessagingAppClientProps) {
  // State management (client-side interactivity)
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [allContacts, setAllContacts] = useState<Contact[]>(initialAllContacts);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  
  const [selectedContactId, setSelectedContactId] = useState<string>('contact-0');
  const selectedContact = contacts.find(c => c.id === selectedContactId) || contacts[0];
  
  const [searchQuery, setSearchQuery] = useState('');
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // State for new chat modal
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatSearchQuery, setNewChatSearchQuery] = useState('');
  const filteredNewChatContacts = allContacts.filter(contact =>
    contact.name.toLowerCase().includes(newChatSearchQuery.toLowerCase())
  );
  
  // Filter messages for selected contact
  const currentMessages = messages.filter(message => message.contactId === selectedContactId);
  
  const [inputMessage, setInputMessage] = useState('');
  
  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9), // Use random string instead of Date.now()
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      contactId: selectedContactId
    };
    
    setMessages([...messages, newMessage]);
    
    // Update last message for the contact
    setContacts(contacts.map(contact => 
      contact.id === selectedContactId 
        ? { ...contact, lastMessage: inputMessage } 
        : contact
    ));
    
    setInputMessage('');
  };
  
  return (
    <div className="flex h-screen bg-white">
      {/* Left sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Top navigation */}
        <div className="flex p-3 border-b border-gray-200">
          <button className="text-teal-500 px-4 py-2 font-medium">
            <span className="flex items-center">
              <span className="mr-2 w-2 h-2 bg-teal-500 rounded-full"></span>
              Chat
            </span>
          </button>
          <button className="text-gray-500 px-4 py-2 font-medium flex items-center">
            <span className="flex items-center">
              <span className="mr-2">👥</span>
              Group
            </span>
          </button>
          <button 
            className="text-gray-500 px-4 py-2 ml-auto"
            onClick={() => setShowNewChatModal(true)}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </span>
          </button>
          <button className="text-gray-500 px-4 py-2">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </span>
          </button>
        </div>
        
        {/* Search box */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 text-sm w-full pl-10 pr-4 py-2 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        {/* Contact list */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div key={contact.id} 
              className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${selectedContactId === contact.id ? 'bg-gray-100' : ''}`}
              onClick={() => setSelectedContactId(contact.id)}
            >
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">{contact.name}</h3>
                <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="relative">
            <img
              src={selectedContact.avatar}
              alt={selectedContact.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            {selectedContact.isOnline && (
              <div className="absolute bottom-0 right-2 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-md font-medium">{selectedContact.name}</h2>
            <p className="text-xs text-gray-500">
              {selectedContact.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
          <div className="ml-auto">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {currentMessages.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-teal-50 text-teal-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {message.timestamp.getHours().toString().padStart(2, '0')}:
                      {message.timestamp.getMinutes().toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No messages yet. Start a conversation!
            </div>
          )}
        </div>
        
        {/* Message input */}
        <div className="p-3 border-t border-gray-200 flex items-center">
          <Mic className="h-6 w-6 text-gray-500 mx-2" />
          <Image className="h-6 w-6 text-gray-500 mx-2" />
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 text-sm"
          />
          <Smile className="h-6 w-6 text-gray-500 mx-2" />
        </div>
      </div>
      
      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur flex items-start justify-center z-50">
          <div className="bg-white rounded-lg w-80 mt-20 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">New Chat</h3>
                <button 
                  onClick={() => setShowNewChatModal(false)}
                  className="text-gray-500"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search name"
                  className="bg-gray-100 text-sm w-full pl-10 pr-4 py-2 rounded-md"
                  value={newChatSearchQuery}
                  onChange={(e) => setNewChatSearchQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
            
            {/* Frequently Contacted */}
            <div className="px-4 py-2">
              <h4 className="text-sm text-gray-500 mb-2">Frequently contacted</h4>
              
              {/* Groups */}
              <div className="space-y-3">
                {groups.map(group => (
                  <div key={group.id} className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <span className="text-sm">{group.name}</span>
                  </div>
                ))}
              </div>
              
              {/* All Contacts Header */}
              <h4 className="text-sm text-gray-500 mt-4 mb-2">All Contacts</h4>
              
              {/* Individual Contacts */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredNewChatContacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                    onClick={() => {
                      setSelectedContactId(contact.id);
                      setShowNewChatModal(false);
                    }}
                  >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="text-sm">{contact.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}