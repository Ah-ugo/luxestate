/** @format */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { chatApi } from '@/lib/api';
import { Loader2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminChatMessagePage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { email: userEmail } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAdmin && userEmail) {
      chatApi.getHistoryForUser(userEmail as string).then((res) => {
        setMessages(res.data);
        scrollToBottom();
      });

      const token = localStorage.getItem('lux_token');
      const wsUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(
        /^http/,
        'ws',
      );
      ws.current = new WebSocket(`${wsUrl}/api/chat/ws?token=${token}`);

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (
          message.type !== 'status' &&
          (message.sender_email === userEmail ||
            message.recipient_email === userEmail)
        ) {
          setMessages((prev) => [...prev, message]);
        }
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [isAdmin, userEmail]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && ws.current && userEmail) {
      const messagePayload = {
        recipient_email: userEmail,
        message: newMessage,
      };
      ws.current.send(JSON.stringify(messagePayload));
      setNewMessage('');
    }
  };

  if (authLoading || !isAdmin) {
    return <div className='text-gold-400 p-8'>Loading...</div>;
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-display text-gold-100 mb-2'>
          Conversation with <span className='text-gold-400'>{userEmail}</span>
        </h1>
      </div>

      <div className='glass-card h-[60vh] flex flex-col'>
        <div className='flex-1 p-6 space-y-4 overflow-y-auto'>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.sender_email !== userEmail ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-md p-3 rounded-lg ${
                  msg.sender_email !== userEmail
                    ? 'bg-gold-400/10 text-gold-100'
                    : 'bg-obsidian-800 text-gold-100/80'
                }`}
              >
                <p className='text-sm'>{msg.message}</p>
                <p className='text-xs text-gold-100/40 mt-1 text-right'>
                  {new Date(msg.created_at).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className='p-4 border-t border-gold-400/10 flex gap-4'
        >
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='lux-input flex-1'
            placeholder={`Reply to ${userEmail}...`}
          />
          <button type='submit' className='btn-gold px-6'>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
