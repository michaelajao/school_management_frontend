// This is the server component

import MessagingAppClient from "@/components/admin/annoucement/MessageClient";

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

// Server-side data preparation
export default function MessagingApp() {
  // Sample data - in a real app, this would come from a database
  const contacts: Contact[] = [
    {
      id: 'contact-0',
      name: 'Ms Thomas',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Please come with your fee for the exam',
      isOnline: true
    },
    {
      id: 'contact-1',
      name: 'John Smith',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'When is the next class?',
      isOnline: false
    },
    {
      id: 'contact-2',
      name: 'Emma Wilson',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Thanks for the notes',
      isOnline: true
    },
    {
      id: 'contact-3',
      name: 'David Johnson',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'I\'ll submit the assignment tomorrow',
      isOnline: false
    },
    {
      id: 'contact-4',
      name: 'Sarah Brown',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Could you explain question 5?',
      isOnline: true
    },
    {
      id: 'contact-5',
      name: 'Michael Davis',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Will there be extra classes?',
      isOnline: false
    },
    {
      id: 'contact-6',
      name: 'Lisa Miller',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Can I reschedule my exam?',
      isOnline: true
    }
  ];
  
  // Create Groups
  const groups: Group[] = [
    { id: 'group-1', name: 'All Staff', members: 12 },
    { id: 'group-2', name: 'All Class Teachers', members: 8 },
    { id: 'group-3', name: 'All Parents', members: 45 },
    { id: 'group-4', name: 'All Subject Teachers', members: 15 },
  ];
  
  // Additional contacts for new chat modal
  const allContacts: Contact[] = [
    ...contacts,
    {
      id: 'contact-7',
      name: 'Ms Annabel',
      avatar: '/api/placeholder/40/40',
      lastMessage: '',
      isOnline: true
    }
  ];
  
  const messages: Message[] = [
    // Ms Thomas - contact-0
    {
      id: '1-0',
      text: 'Hi Ms Thomas\nGood afternoon ma\'am',
      sender: 'other',
      timestamp: new Date(2025, 4, 20, 14, 23),
      contactId: 'contact-0'
    },
    {
      id: '2-0',
      text: 'Today\'s assignment is not clear, what am I expected to do?',
      sender: 'other',
      timestamp: new Date(2025, 4, 20, 14, 25),
      contactId: 'contact-0'
    },
    {
      id: '3-0',
      text: 'Good evening Franklin',
      sender: 'user',
      timestamp: new Date(2025, 4, 20, 17, 10),
      contactId: 'contact-0'
    },
    
    // John Smith - contact-1
    {
      id: '1-1',
      text: 'When is the next class scheduled?',
      sender: 'other',
      timestamp: new Date(2025, 4, 19, 9, 45),
      contactId: 'contact-1'
    },
    {
      id: '2-1',
      text: 'The next class will be on Friday at 3pm',
      sender: 'user',
      timestamp: new Date(2025, 4, 19, 10, 20),
      contactId: 'contact-1'
    },
    {
      id: '3-1',
      text: 'Will we cover the new chapter?',
      sender: 'other',
      timestamp: new Date(2025, 4, 19, 10, 22),
      contactId: 'contact-1'
    },
    {
      id: '4-1',
      text: 'Yes, please read chapters 7-8 before class',
      sender: 'user',
      timestamp: new Date(2025, 4, 19, 10, 25),
      contactId: 'contact-1'
    },
    
    // Emma Wilson - contact-2
    {
      id: '1-2',
      text: 'Thank you for sending the notes from yesterday\'s class',
      sender: 'other',
      timestamp: new Date(2025, 4, 18, 14, 15),
      contactId: 'contact-2'
    },
    {
      id: '2-2',
      text: 'You\'re welcome! Let me know if you have any questions',
      sender: 'user',
      timestamp: new Date(2025, 4, 18, 14, 30),
      contactId: 'contact-2'
    },
    {
      id: '3-2',
      text: 'I\'m a bit confused about the formula on page 3',
      sender: 'other',
      timestamp: new Date(2025, 4, 18, 14, 32),
      contactId: 'contact-2'
    },
    {
      id: '4-2',
      text: 'I can explain that during office hours tomorrow at 2pm',
      sender: 'user',
      timestamp: new Date(2025, 4, 18, 14, 35),
      contactId: 'contact-2'
    },
    {
      id: '5-2',
      text: 'That works for me, thank you!',
      sender: 'other',
      timestamp: new Date(2025, 4, 18, 14, 36),
      contactId: 'contact-2'
    },
    
    // David Johnson - contact-3
    {
      id: '1-3',
      text: 'Professor, I\'ll need to submit my assignment tomorrow',
      sender: 'other',
      timestamp: new Date(2025, 4, 19, 16, 20),
      contactId: 'contact-3'
    },
    {
      id: '2-3',
      text: 'The deadline was yesterday, David',
      sender: 'user',
      timestamp: new Date(2025, 4, 19, 16, 25),
      contactId: 'contact-3'
    },
    {
      id: '3-3',
      text: 'I know, but I\'ve been sick. I have a doctor\'s note',
      sender: 'other',
      timestamp: new Date(2025, 4, 19, 16, 28),
      contactId: 'contact-3'
    },
    {
      id: '4-3',
      text: 'Alright, please submit it by tomorrow 5pm and attach the note',
      sender: 'user',
      timestamp: new Date(2025, 4, 19, 16, 30),
      contactId: 'contact-3'
    },
    {
      id: '5-3',
      text: 'Thank you for understanding!',
      sender: 'other',
      timestamp: new Date(2025, 4, 19, 16, 31),
      contactId: 'contact-3'
    },
    
    // Sarah Brown - contact-4
    {
      id: '1-4',
      text: 'Could you explain question 5 from the homework?',
      sender: 'other',
      timestamp: new Date(2025, 4, 20, 13, 10),
      contactId: 'contact-4'
    },
    {
      id: '2-4',
      text: 'Which part is giving you trouble?',
      sender: 'user',
      timestamp: new Date(2025, 4, 20, 13, 15),
      contactId: 'contact-4'
    },
    {
      id: '3-4',
      text: 'I don\'t understand how to apply the theorem to this specific case',
      sender: 'other',
      timestamp: new Date(2025, 4, 20, 13, 18),
      contactId: 'contact-4'
    },
    {
      id: '4-4',
      text: 'Remember that you need to consider the boundary conditions first',
      sender: 'user',
      timestamp: new Date(2025, 4, 20, 13, 22),
      contactId: 'contact-4'
    },
    {
      id: '5-4',
      text: 'Oh, I see now. I\'ll try again. Thanks!',
      sender: 'other',
      timestamp: new Date(2025, 4, 20, 13, 25),
      contactId: 'contact-4'
    },
    
    // Michael Davis - contact-5
    {
      id: '1-5',
      text: 'Will there be extra classes before the final exam?',
      sender: 'other',
      timestamp: new Date(2025, 4, 17, 11, 5),
      contactId: 'contact-5'
    },
    {
      id: '2-5',
      text: 'Yes, I\'m planning two review sessions next week',
      sender: 'user',
      timestamp: new Date(2025, 4, 17, 11, 10),
      contactId: 'contact-5'
    },
    {
      id: '3-5',
      text: 'Great! What days will they be?',
      sender: 'other',
      timestamp: new Date(2025, 4, 17, 11, 12),
      contactId: 'contact-5'
    },
    {
      id: '4-5',
      text: 'Tuesday and Thursday from 4-6pm in the usual classroom',
      sender: 'user',
      timestamp: new Date(2025, 4, 17, 11, 15),
      contactId: 'contact-5'
    },
    {
      id: '5-5',
      text: 'Will attendance be mandatory?',
      sender: 'other',
      timestamp: new Date(2025, 4, 17, 11, 18),
      contactId: 'contact-5'
    },
    {
      id: '6-5',
      text: 'No, they\'re optional but highly recommended',
      sender: 'user',
      timestamp: new Date(2025, 4, 17, 11, 20),
      contactId: 'contact-5'
    },
    
    // Lisa Miller - contact-6
    {
      id: '1-6',
      text: 'Professor, can I reschedule my exam?',
      sender: 'other',
      timestamp: new Date(2025, 4, 18, 9, 30),
      contactId: 'contact-6'
    },
    {
      id: '2-6',
      text: 'What\'s the reason for rescheduling?',
      sender: 'user',
      timestamp: new Date(2025, 4, 18, 9, 45),
      contactId: 'contact-6'
    },
    {
      id: '3-6',
      text: 'I have a medical procedure scheduled that day',
      sender: 'other',
      timestamp: new Date(2025, 4, 18, 9, 48),
      contactId: 'contact-6'
    },
    {
      id: '4-6',
      text: 'I see. Please email me the documentation and we can arrange an alternate date',
      sender: 'user',
      timestamp: new Date(2025, 4, 18, 9, 52),
      contactId: 'contact-6'
    },
    {
      id: '5-6',
      text: 'Thank you. I\'ll send the doctor\'s note right away',
      sender: 'other',
      timestamp: new Date(2025, 4, 18, 9, 55),
      contactId: 'contact-6'
    },
    {
      id: '6-6',
      text: 'Would next Monday at the same time work for you?',
      sender: 'user',
      timestamp: new Date(2025, 4, 18, 10, 0),
      contactId: 'contact-6'
    },
    {
      id: '7-6',
      text: 'Yes, that would be perfect. Thank you!',
      sender: 'other',
      timestamp: new Date(2025, 4, 18, 10, 2),
      contactId: 'contact-6'
    }
  ];

  // Pass the data to the client component
  return (
    <MessagingAppClient 
      initialContacts={contacts}
      initialGroups={groups}
      initialAllContacts={allContacts}
      initialMessages={messages}
    />
  );
}