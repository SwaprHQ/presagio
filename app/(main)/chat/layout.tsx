import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/app/components/ui/Sidebar';
import { ChatSidebar } from './ChatSidebar';
import SessionScreen from './SessionScreen';
import SignedIn from './SignedIn';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-[calc(100vh-208px)]">
      <ChatSidebar />
      <SidebarInset>
        <SidebarTrigger className="absolute top-0 z-10 m-3" />
        {children}
      </SidebarInset>
      <SessionScreen />
    </SidebarProvider>
  );
}
