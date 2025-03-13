import ChatList from './ChatList';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-[calc(100vh-208px)]">
      <ChatList />
      {children}
    </section>
  );
}
