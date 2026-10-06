import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { MembershipOffer } from './components/MembershipOffer';
import { Courses } from './components/Courses';
import { Resources } from './components/Resources';
import { AboutSection } from './components/AboutSection';
import { RegistrationForm } from './components/RegistrationForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StatusChecker } from './components/StatusChecker';
import { AdminModal } from './components/AdminModal';
import { TermsModal } from './components/TermsModal';
import { AppConfig } from './types';
import { Language } from './translations';

export default function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [selectedCourse, setSelectedCourse] = useState('All Courses (Complete Academy Access)');
  const [statusCheckOpen, setStatusCheckOpen] = useState(false);
  const [statusPhoneQuery, setStatusPhoneQuery] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // Language state (defaults to 'am' - Amharic, with instant English switch)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('aplus-lang');
    return saved === 'en' ? 'en' : 'am';
  });

  const toggleLanguage = () => {
    const nextLang: Language = lang === 'am' ? 'en' : 'am';
    setLang(nextLang);
    localStorage.setItem('aplus-lang', nextLang);
  };

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error('Failed to load app config:', err));
  }, []);

  const handleOpenStatusCheckWithPhone = (phone: string) => {
    setStatusPhoneQuery(phone);
    setStatusCheckOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090b10] text-[#f1f5f9] selection:bg-[#16e016] selection:text-black">
      {/* Navigation Bar with Language Switcher */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenStatusCheck={() => {
          setStatusPhoneQuery('');
          setStatusCheckOpen(true);
        }}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero lang={lang} config={config} />
        <HowItWorks lang={lang} />
        <MembershipOffer lang={lang} config={config} />
        <Courses lang={lang} onSelectCourse={(course) => setSelectedCourse(course)} />
        <Resources lang={lang} />
        <AboutSection lang={lang} />
        <RegistrationForm
          lang={lang}
          config={config}
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
          onOpenStatusCheckWithPhone={handleOpenStatusCheckWithPhone}
        />
        <ContactSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenStatusCheck={() => {
          setStatusPhoneQuery('');
          setStatusCheckOpen(true);
        }}
        onOpenTerms={() => setTermsOpen(true)}
      />

      {/* Status Checker Modal */}
      <StatusChecker
        lang={lang}
        isOpen={statusCheckOpen}
        onClose={() => setStatusCheckOpen(false)}
        initialQuery={statusPhoneQuery}
      />

      {/* Admin Owner Review Panel Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      {/* Terms & Privacy Policy Modal */}
      <TermsModal
        lang={lang}
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      />
    </div>
  );
}
