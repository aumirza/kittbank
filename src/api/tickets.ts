import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Ticket, TicketMessage, TicketStatus } from '@/types/ticket';

// Firebase collection names
const TICKETS_COLLECTION = 'tickets';
const TICKET_MESSAGES_COLLECTION = 'ticketMessages';

// Convert Firebase Timestamp to Date
const convertTimestamp = (timestamp: Timestamp | Date): Date => {
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return timestamp.toDate();
};

// Ticket service functions
export const ticketService = {
  // Get all tickets
  async getTickets(): Promise<Ticket[]> {
    const ticketsQuery = query(
      collection(db, TICKETS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(ticketsQuery);

    return snapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        title: data.title,
        category: data.category,
        status: data.status,
        description: data.description,
        author: data.author,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
        isActive: data.isActive ?? true,
      } as Ticket;
    });
  },

  // Get tickets by status
  async getTicketsByStatus(status: TicketStatus): Promise<Ticket[]> {
    const ticketsQuery = query(
      collection(db, TICKETS_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(ticketsQuery);

    return snapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        title: data.title,
        category: data.category,
        status: data.status,
        description: data.description,
        author: data.author,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
        isActive: data.isActive ?? true,
      } as Ticket;
    });
  },

  // Get ticket counts by status using Firestore aggregation (fast, no docs transfer)
  async getTicketCounts(): Promise<{
    all: number;
    open: number;
    closed: number;
  }> {
    const ticketsRef = collection(db, TICKETS_COLLECTION);

    const [allSnap, openSnap, closedSnap] = await Promise.all([
      getCountFromServer(query(ticketsRef)),
      getCountFromServer(query(ticketsRef, where('status', '==', 'open'))),
      getCountFromServer(query(ticketsRef, where('status', '==', 'closed'))),
    ]);

    return {
      all: allSnap.data().count,
      open: openSnap.data().count,
      closed: closedSnap.data().count,
    };
  },

  // Create new ticket
  async createTicket(
    ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const docRef = await addDoc(collection(db, TICKETS_COLLECTION), {
      ...ticketData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // Update ticket
  async updateTicket(
    ticketId: string,
    updates: Partial<Omit<Ticket, 'id' | 'createdAt'>>
  ): Promise<void> {
    const ticketRef = doc(db, TICKETS_COLLECTION, ticketId);
    await updateDoc(ticketRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  // Delete ticket
  async deleteTicket(ticketId: string): Promise<void> {
    const ticketRef = doc(db, TICKETS_COLLECTION, ticketId);
    await deleteDoc(ticketRef);
  },

  // Get messages for a ticket
  async getTicketMessages(ticketId: string): Promise<TicketMessage[]> {
    const messagesQuery = query(
      collection(db, TICKET_MESSAGES_COLLECTION),
      where('ticketId', '==', ticketId),
      orderBy('timestamp', 'asc')
    );
    const snapshot = await getDocs(messagesQuery);

    return snapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        ticketId: data.ticketId,
        author: data.author,
        message: data.message,
        timestamp: convertTimestamp(data.timestamp),
      } as TicketMessage;
    });
  },

  // Add message to ticket
  async addTicketMessage(
    messageData: Omit<TicketMessage, 'id' | 'timestamp'>
  ): Promise<string> {
    const docRef = await addDoc(collection(db, TICKET_MESSAGES_COLLECTION), {
      ...messageData,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  },
};

// React Query hooks for tickets
export const useTicketsQuery = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: ticketService.getTickets,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTicketsByStatusQuery = (status: TicketStatus) => {
  return useQuery({
    queryKey: ['tickets', status],
    queryFn: () => ticketService.getTicketsByStatus(status),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (previousData) => previousData,
  });
};

export const useTicketMessagesQuery = (ticketId: string | undefined) => {
  return useQuery({
    queryKey: ['ticketMessages', ticketId],
    queryFn: () => {
      if (!ticketId) {
        throw new Error('Ticket ID is required');
      }
      return ticketService.getTicketMessages(ticketId);
    },
    enabled: !!ticketId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Lightweight aggregate counts for the filter tabs
export const useTicketCountsQuery = () => {
  return useQuery({
    queryKey: ['ticketCounts'],
    queryFn: ticketService.getTicketCounts,
    staleTime: 5 * 60 * 1000,
  });
};

// React Query mutations for tickets
export const useCreateTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ticketService.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

export const useUpdateTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      updates,
    }: {
      ticketId: string;
      updates: Partial<Omit<Ticket, 'id' | 'createdAt'>>;
    }) => ticketService.updateTicket(ticketId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

export const useDeleteTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ticketService.deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

export const useAddTicketMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ticketService.addTicketMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['ticketMessages', variables.ticketId],
      });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};
