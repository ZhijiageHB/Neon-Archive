import { getCommentsBySlug } from "@/lib/supabase/queries";
import { MessageItem } from "@/components/ui/message-item";

interface CommentListProps {
  slug: string;
}

export async function CommentList({ slug }: CommentListProps) {
  let comments;
  try {
    comments = await getCommentsBySlug(slug);
  } catch {
    return (
      <div className="py-6 text-center">
        <p className="text-text-muted font-mono text-sm">
          {"// unable to load comments"}
        </p>
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-text-muted font-mono text-sm">
          {"// no comments yet. be the first."}
        </p>
      </div>
    );
  }

  return (
    <div>
      {comments.map((comment, i) => (
        <MessageItem
          key={comment.id}
          name={comment.name}
          message={comment.message}
          created_at={comment.created_at}
          index={i}
          variant="comment"
        />
      ))}
    </div>
  );
}
