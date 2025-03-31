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
      <SignedIn>
        <ChatSidebar />
      </SignedIn>
      <SidebarInset>
        <SignedIn>
          <SidebarTrigger className="absolute -left-[1px] top-0 z-10 rounded-l-0 bg-surface-surface-0" />
        </SignedIn>
        <SessionScreen />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
