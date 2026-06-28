"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Mail, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Ganti dengan nomor WhatsApp CS A (format internasional tanpa +)
const WA_CS_A_NUMBER = '6281234567890';
const WA_CS_A_NAME = 'CS A - Talita Umroh';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'chat'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: 'Halo! Selamat datang di Talita Umroh. Ada yang bisa kami bantu?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (step === 'chat') {
      scrollToBottom();
    }
  }, [messages, step, showWhatsApp]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (step === 'chat') {
      setShowWhatsApp(false);
      timeoutId = setTimeout(() => {
        setShowWhatsApp(true);
      }, 5000); // 5 detik setelah tidak ada pesan/ketikan
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [messages, step, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.whatsapp) {
      setIsLoading(true);
      try {
        // Asumsikan backend berjalan di localhost:8080.
        // Pada production, gunakan env variable (misal: process.env.NEXT_PUBLIC_API_URL).
        const res = await fetch('http://localhost:8080/api/v1/chat/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          setSessionId(data.session_id);
          setStep('chat');
        } else {
          console.error("Failed to start chat session");
          // Fallback if backend is down
          setStep('chat');
        }
      } catch (err) {
        console.error("Error connecting to chat API", err);
        setStep('chat');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputValue('');
    setIsLoading(true);

    if (sessionId) {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/chat/${sessionId}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg })
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
        } else {
          setMessages(prev => [...prev, { sender: 'bot', text: "Maaf, terjadi kesalahan saat menghubungi asisten. Silakan coba lagi." }]);
        }
      } catch (err) {
        setMessages(prev => [...prev, { sender: 'bot', text: "Maaf, sistem sedang offline." }]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Fallback
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Terima kasih. Pesan diterima, namun sesi tidak valid.' }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleWhatsAppRedirect = () => {
    const greeting = formData.name
      ? `Halo, perkenalkan saya *${formData.name}*.%0A`
      : '';
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user');
    const msgText = lastUserMsg
      ? `${greeting}Saya ingin bertanya: ${lastUserMsg.text}`
      : `${greeting}Saya ingin mendapatkan informasi tentang paket Umroh.`;
    const url = `https://wa.me/${WA_CS_A_NUMBER}?text=${encodeURIComponent(msgText.replace(/%0A/g, '\n'))}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-surface shadow-2xl rounded-2xl border border-primary/20 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-primary-container text-on-primary p-4 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5 text-on-primary" />
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-[16px]">Talita Assistant</h3>
                  <p className="text-[12px] opacity-80 font-body-sm">Online - Siap membantu</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-on-primary hover:bg-white/20 p-2 rounded-full transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-hidden flex flex-col bg-surface-container-lowest">
              {step === 'form' ? (
                <div className="p-6 overflow-y-auto h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <h4 className="font-headline-sm text-primary-container mb-2">Selamat Datang!</h4>
                    <p className="text-on-surface-variant text-[14px] font-body-sm">
                      Silakan isi data diri Anda sebelum memulai percakapan dengan tim kami.
                    </p>
                  </div>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-label-sm text-on-surface-variant mb-1">Nama Lengkap</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-[14px] outline-none transition-all"
                          placeholder="Masukkan nama Anda"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-label-sm text-on-surface-variant mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-[14px] outline-none transition-all"
                          placeholder="nama@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-label-sm text-on-surface-variant mb-1">No. WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                        <input 
                          type="tel" 
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-[14px] outline-none transition-all"
                          placeholder="0812xxxx"
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center items-center bg-primary-container text-on-primary py-2.5 rounded-lg font-label-md hover:bg-primary-fixed-dim transition-colors mt-2 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Mulai Percakapan"
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            msg.sender === 'user' 
                              ? 'bg-primary-container text-on-primary rounded-tr-sm' 
                              : 'bg-surface-container text-on-surface rounded-tl-sm border border-outline-variant/30'
                          }`}
                        >
                          <p className="text-[14px] font-body-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-2xl bg-surface-container text-on-surface rounded-tl-sm border border-outline-variant/30 flex items-center gap-2">
                          <div className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    )}
                    {/* WhatsApp CTA */}
                    {showWhatsApp && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 pb-2"
                      >
                        <button
                          onClick={handleWhatsAppRedirect}
                          className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white py-2 px-4 rounded-xl font-label-md text-[13px] transition-all duration-200 hover:scale-[1.02] shadow-sm"
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          Chat langsung dengan {WA_CS_A_NAME}
                          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                        </button>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-3 border-t border-outline-variant/30 bg-surface">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ketik pesan..."
                        className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                      <button 
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="w-10 h-10 bg-primary-container text-on-primary rounded-full flex items-center justify-center hover:bg-primary-fixed-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                      >
                        <Send className="w-4 h-4 ml-0.5" />
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary-container text-on-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary-fixed-dim hover:scale-105 transition-all duration-300 gold-glow relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification dot when closed */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-surface rounded-full"></span>
        )}
      </button>
    </div>
  );
}
