'use client';

import { useState } from 'react';
import { Search, Filter, Send, Paperclip, Users } from 'lucide-react';

interface Message {
  id: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'draft' | 'scheduled';
}

interface CommunicationFormData {
  recipient: string;
  subject: string;
  content: string;
  urgency: string;
  sendTime: string;
}

export default function GeneralCommunicationsPage() {
  const [formData, setFormData] = useState<CommunicationFormData>({
    recipient: '',
    subject: '',
    content: '',
    urgency: '',
    sendTime: 'now',
  });

  const [messages] = useState<Message[]>([
    {
      id: '1',
      recipient: 'All Parents',
      subject: 'Parent-Teacher Meeting Reminder',
      content: 'This is to remind all parents about the upcoming parent-teacher meeting...',
      timestamp: '2025-05-27 10:30 AM',
      status: 'sent',
    },
    {
      id: '2',
      recipient: 'Year 7 Parents',
      subject: 'Exam Schedule Update',
      content: 'We would like to inform you of a slight change in the exam schedule...',
      timestamp: '2025-05-26 2:15 PM',
      status: 'sent',
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipient || !formData.subject || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Sending message:', formData);
    alert('Message sent successfully!');
    setFormData({
      recipient: '',
      subject: '',
      content: '',
      urgency: '',
      sendTime: 'now',
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">General Communications</h1>
        <p className="text-gray-600">Send messages and announcements to parents, students, and staff</p>
      </div>

      {/* Send New Message Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Send New Message</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Recipient Selection */}
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
              Send To *
            </label>
            <select
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Select message recipient"
            >
              <option value="">Select Recipients</option>
              <option value="all-parents">All Parents</option>
              <option value="all-students">All Students</option>
              <option value="all-staff">All Staff</option>
              <option value="year-7-parents">Year 7 Parents</option>
              <option value="year-8-parents">Year 8 Parents</option>
              <option value="year-9-parents">Year 9 Parents</option>
              <option value="teachers">Teachers Only</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter message subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Message subject"
            />
          </div>

          {/* Message Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Message Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={6}
              placeholder="Type your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label="Message content"
            />
          </div>

          {/* Urgency Level */}
          <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
              Urgency Level
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select urgency level"
            >
              <option value="">Select Urgency</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Send Time */}
          <div>
            <label htmlFor="sendTime" className="block text-sm font-medium text-gray-700 mb-1">
              Send Time
            </label>
            <select
              id="sendTime"
              name="sendTime"
              value={formData.sendTime}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select send time"
            >
              <option value="now">Send Now</option>
              <option value="scheduled">Schedule for Later</option>
              <option value="draft">Save as Draft</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setFormData({
                recipient: '',
                subject: '',
                content: '',
                urgency: '',
                sendTime: 'now',
              })}
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Messages</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{message.recipient}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    message.status === 'sent' ? 'bg-green-100 text-green-700' :
                    message.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {message.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{message.timestamp}</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{message.subject}</h3>
              <p className="text-gray-600 text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}