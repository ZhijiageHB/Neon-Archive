import { getGuestbookMessages } from "@/lib/supabase/queries";
import { MessageItem } from "@/components/ui/message-item";

export async function GuestbookList() {
  let messages;
  try {
    messages = await getGuestbookMessages();
  } catch {
    return (
      <div className="py-8 text-center">
        <p className="text-text-muted font-mono text-sm">
          {"// failed to load messages. try refreshing."}
        </p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-text-muted font-mono text-sm">
          {"// no messages yet. be the first."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {messages.map((msg, i) => (
        <MessageItem
          key={msg.id}
          name={msg.name}
          message={msg.message}
          created_at={msg.created_at}
          index={i}
          variant="guestbook"
        />
      ))}
    </div>
  );
}
