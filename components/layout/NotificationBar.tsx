import { Bell, MessageSquareMore, AlarmClock } from "lucide-react";
import Link from "next/link";

export default function NotificationBar() {
  const unread = {
    // this will be fetched
    // for now they're just hardcoded
    notifications: 3,
    messages: 5,
    alarms: 2,
  };

  return (
    <div className="flex items-center gap-8 mr-4">
      {/* Notification */}
      <Link className="relative cursor-pointer" href='#'>
        <Bell className="w-[28px] h-[28px] text-muted-foreground" style={{color: '#1B5B5E', backgroundColor: '#ebfefe'}} />
        {unread.notifications > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-[15px] w-[15px] rounded-full bg-red-500 text-white text-xs font-bold">
            {unread.notifications}
          </span>
        )}
      </Link>

      {/* Messages */}
      <Link className="relative cursor-pointer" href='#'>
        <MessageSquareMore className="w-[28px] h-[28px] text-muted-foreground" style={{color: '#1B5B5E', backgroundColor: '#ebfefe'}}  />
        {unread.messages > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-[15px] w-[15px] rounded-full bg-red-500 text-white text-xs font-bold">
            {unread.messages}
          </span>
        )}
      </Link>

      {/* Alarms */}
      <Link className="relative cursor-pointer" href='#'>
        <AlarmClock className="w-[28px] h-[28px] text-muted-foreground" style={{color: '#1B5B5E', backgroundColor: '#ebfefe'}}  />
        {unread.alarms > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-[15px] w-[15px] rounded-full bg-red-500 text-white text-xs font-bold">
            {unread.alarms}
          </span>
        )}
      </Link>
    </div>
  );
}
