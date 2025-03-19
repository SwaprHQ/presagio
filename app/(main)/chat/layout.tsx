import ChatList from './ChatList';
import SessionScreen from './SessionScreen';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-[calc(100vh-208px)]">
      <ChatList />
      <SessionScreen />
      {children}
    </section>
  );
}
