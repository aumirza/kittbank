import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useCreateFaqMutation, useUpdateFaqMutation } from '@/api/mutations';
import { useGetAllFaqsQuery } from '@/api/queries';
import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { IFaqItem } from '@/types/page';

const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

type FaqFormValues = z.infer<typeof faqSchema>;

export function FaqForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<IFaqItem | null>(null);

  // Queries and mutations
  const {
    data: faqs = [],
    isLoading: isFaqsLoading,
    refetch: refetchFaqs,
  } = useGetAllFaqsQuery(true);
  const { mutateAsync: createFaq, isPending: isCreatingFaq } =
    useCreateFaqMutation();
  const { mutateAsync: updateFaq, isPending: isUpdatingFaq } =
    useUpdateFaqMutation();

  // Form setup
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: '', answer: '' },
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const handleSubmit = async (values: FaqFormValues) => {
    try {
      if (editingFaq) {
        await updateFaq({ id: editingFaq._id, data: values });
        toast.success('FAQ updated successfully');
      } else {
        await createFaq(values);
        toast.success('FAQ created successfully');
      }
      reset();
      setIsDialogOpen(false);
      setEditingFaq(null);
      refetchFaqs();
    } catch {
      toast.error('Failed to save FAQ. Please try again.');
    }
  };

  const handleEditFaq = (faq: IFaqItem) => {
    setEditingFaq(faq);
    reset({ question: faq.question, answer: faq.answer });
    setIsDialogOpen(true);
  };

  const handleAddFaq = () => {
    setEditingFaq(null);
    reset({ question: '', answer: '' });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingFaq(null);
    reset();
  };

  const isLoading = isCreatingFaq || isUpdatingFaq;

  return (
    <div className="mt-6">
      {/* Header with Add FAQ Button */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Frequently Asked Questions</h2>
        <Button onClick={handleAddFaq} size="sm">
          <PlusIcon className="mr-2 size-4" />
          Add FAQ
        </Button>
      </div>

      {/* FAQ Dialog */}
      <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
            <DialogDescription>
              {editingFaq
                ? 'Update the question and answer for this FAQ.'
                : 'Add a new frequently asked question and its answer.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter FAQ question"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        disabled={isLoading}
                        placeholder="Enter FAQ answer"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  onClick={handleCloseDialog}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <LoadingButton isLoading={isSubmitting} type="submit">
                  {editingFaq ? 'Update FAQ' : 'Add FAQ'}
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* FAQ List */}
      <div className="mt-8">
        <h3 className="mb-4 font-semibold text-lg">All FAQs</h3>
        {isFaqsLoading && (
          <div className="py-8 text-center text-muted-foreground">
            Loading FAQs...
          </div>
        )}
        {!isFaqsLoading && faqs && faqs.length > 0 && (
          <div className="space-y-4">
            {faqs.map((faq: IFaqItem) => (
              <div
                className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
                key={faq._id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium leading-none">{faq.question}</h4>
                    <p className="text-muted-foreground text-sm">
                      {faq.answer}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleEditFaq(faq)}
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isFaqsLoading && (!faqs || faqs.length === 0) && (
          <div className="py-8 text-center text-muted-foreground">
            No FAQs found. Create your first FAQ above.
          </div>
        )}
      </div>
    </div>
  );
}
