'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ContactForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations('Home.ContactForm');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6">{t('title')}</h2>
        
        {submitted ? (
          <div className="text-center">
            <p className="text-green-400 font-semibold">{t('success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">{t('name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-800 text-white rounded border border-gray-600 focus:border-secondary focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">{t('email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-800 text-white rounded border border-gray-600 focus:border-secondary focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">{t('message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 bg-slate-800 text-white rounded border border-gray-600 focus:border-secondary focus:outline-none"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blueRadial hover:opacity-90 text-white font-semibold py-2 rounded disabled:opacity-50"
              >
                {loading ? t('sending') : t('send')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded"
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
