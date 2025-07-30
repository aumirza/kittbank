import { ReplyIcon, SendIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TicketReplyBoxProps {
  onSendReply?: (message: string) => void;
}

export function TicketReplyBox({ onSendReply }: TicketReplyBoxProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      return;
    }
    if (!onSendReply) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSendReply(replyMessage.trim());
      setReplyMessage('');
      setShowReplyInput(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelReply = () => {
    setReplyMessage('');
    setShowReplyInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSendReply();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelReply();
    }
  };

  if (showReplyInput) {
    return (
      <div className="w-full space-y-3">
        <div className="space-y-2">
          <Textarea
            className="min-h-20 resize-none"
            disabled={isSubmitting}
            onChange={(e) => setReplyMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your reply..."
            value={replyMessage}
          />
          <p className="text-muted-foreground text-xs">
            Press Ctrl+Enter to send, Esc to cancel
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            disabled={isSubmitting}
            onClick={handleCancelReply}
            size="sm"
            type="button"
            variant="outline"
          >
            <XIcon className="size-4" />
            <span>Cancel</span>
          </Button>
          <Button
            disabled={!replyMessage.trim() || isSubmitting}
            onClick={handleSendReply}
            size="sm"
            type="button"
          >
            <SendIcon className="size-4" />
            <span>{isSubmitting ? 'Sending...' : 'Send Reply'}</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1 text-center">
      <p className="text-muted-foreground text-sm">
        This Request is open and our team is working on it.
      </p>
      <p className="text-muted-foreground text-xs">
        you can expect reply before:
        <span className="font-semibold text-foreground"> Apr 2, 2025</span>
      </p>
      <Button
        className="my-1 rounded-full py-0"
        onClick={() => setShowReplyInput(true)}
        size="sm"
        type="button"
        variant="outline"
      >
        <ReplyIcon className="size-4" />
        <span>Send a reply</span>
      </Button>
    </div>
  );
}
