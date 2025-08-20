export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  user: {
    id: string;
    name: string;
    email: string;
  };
  assigned_to?: {
    id: string;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  attachments: Attachment[];
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: 'user' | 'support';
  };
  created_at: string;
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  file_type: string;
  file_size: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful_count: number;
  not_helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  views: number;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
}