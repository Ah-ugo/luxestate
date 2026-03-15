/** @format */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/useAuth';
import { chatApi } from '@/lib/api';
import { Loader2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MessagesPage() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (user) {
      chatApi.getHistory().then((res) => {
        setMessages(res.data);
        scrollToBottom();
      });

      const token = localStorage.getItem('lux_token');
      const wsUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(
        /^https/,
        'wss',
      );
      ws.current = new WebSocket(`${wsUrl}/api/chat/ws?token=${token}`);

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type !== 'status') {
          setMessages((prev) => [...prev, message]);
        }
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && ws.current && user) {
      const messagePayload = {
        recipient_email: 'admin_inbox', // Users always send to the admin inbox
        message: newMessage,
      };
      ws.current.send(JSON.stringify(messagePayload));
      setNewMessage('');
    }
  };

  if (authLoading || !user) {
    return <div className='text-gold-400 p-8'>Loading Messages...</div>;
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-display text-gold-100 mb-2'>
          Conversation with Admin
        </h1>
        <p className='text-gold-100/60 font-light'>
          Send a direct inquiry to our concierge team.
        </p>
      </div>

      {/* Removed glass-card class to prevent pseudo-element overlapping issues on mobile */}
      <div className='bg-obsidian-900/60 backdrop-blur-xl border border-gold-400/10 rounded-2xl h-[65vh] sm:h-[75vh] flex flex-col relative overflow-hidden'>
        <div className='flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto'>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.sender_email === user.email
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-md p-3 rounded-lg ${
                  msg.sender_email === user.email
                    ? 'bg-gold-400/10 text-gold-100'
                    : 'bg-obsidian-800 text-gold-100/80'
                }`}
              >
                {msg.sender_email !== user.email && (
                  <p className='text-xs font-bold text-gold-400 mb-1'>Admin</p>
                )}
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
          className='p-3 sm:p-4 border-t border-gold-400/10 flex gap-3 sm:gap-4 bg-obsidian-900 relative z-20'
        >
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='lux-input flex-1 text-base text-gold-100 caret-gold-400 bg-obsidian-950/50'
            placeholder='Type your message...'
          />
          <button type='submit' className='btn-gold px-6'>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
