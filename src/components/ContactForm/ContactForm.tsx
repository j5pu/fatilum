'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ContactForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations('Home.ContactForm');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
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
        setFormData({ name: '', email: '', message: '', website: '' });
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-[#3F3E45] rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary mb-6">{t('title')}</h2>
        
        {submitted ? (
          <div className="text-center">
            <p className="text-secondary font-semibold">{t('success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field: visually hidden from real users, bots often auto-fill it */}
            <div className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm text-primaryDark mb-2">{t('name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-transparent text-primary rounded-lg border border-[#3F3E45] focus:border-secondary focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm text-primaryDark mb-2">{t('email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-transparent text-primary rounded-lg border border-[#3F3E45] focus:border-secondary focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm text-primaryDark mb-2">{t('message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 bg-transparent text-primary rounded-lg border border-[#3F3E45] focus:border-secondary focus:outline-none"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blueRadial hover:opacity-90 text-primary font-semibold py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? t('sending') : t('send')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-[#3F3E45] text-primaryDark hover:text-secondary transition-colors font-semibold py-2 rounded-lg"
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
