import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Send,
  Loader2,
  X,
  MessageCircle,
} from 'lucide-react';
import { StatusResult } from '../types';
import { Language, translations } from '../translations';

interface StatusCheckerProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const StatusChecker: React.FC<StatusCheckerProps> = ({
  lang,
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const t = translations[lang].status;
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || query.trim().length < 3) {
      setError(
        lang === 'am'
          ? 'እባክዎ ስልክ ቁጥር ወይም የምዝገባ መለያ (ID) ያስገቡ።'
          : 'Please enter a phone number or registration ID (at least 3 characters).'
      );
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/status/${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || (lang === 'am' ? 'ምንም የተመዘገበ መረጃ አልተገኘም።' : 'No matching registration found.')
        );
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to check status. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const copyInvite = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#111522] border border-[#232b3d] rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-[#171d2c] hover:bg-[#20293d] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#16e016]/10 text-[#16e016] flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Poppins']">
            {t.title}
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          {t.subtitle}
        </p>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="flex-1 px-4 py-3 rounded-xl bg-[#090b10] border border-[#21293c] text-white text-sm focus:outline-none focus:border-[#16e016] transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl font-bold text-sm bg-[#16e016] hover:bg-[#12be12] text-black transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t.searchBtn}</span>}
          </button>
        </form>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-2.5 mb-4">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-4 pt-4 border-t border-[#1d2434] space-y-4">
            {/* Approved state */}
            {result.status === 'approved' && (
              <div className="p-5 rounded-2xl bg-[#15231c] border border-[#16e016]/60 text-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-[#16e016]" />
                  <span className="font-extrabold text-white text-base">{t.approvedTitle}</span>
                </div>
                <p className="text-xs text-emerald-300 mb-4 leading-relaxed">
                  {lang === 'am' ? (
                    <>
                      እንኳን ደስ አለዎት <strong className="text-white">{result.full_name}</strong>! ክፍያዎ ተረጋግጧል። አሁን የኤ ፕላስ አካዳሚ ፕራይቬት ቴሌግራም መማሪያ ማህበረሰብን መቀላቀል ይችላሉ።
                    </>
                  ) : (
                    <>
                      Congratulations <strong className="text-white">{result.full_name}</strong>! Your payment has been confirmed. You now have access to the private Aplus Academy Telegram community.
                    </>
                  )}
                </p>

                {result.telegramInviteLink && (
                  <div className="p-4 rounded-xl bg-[#0c1410] border border-[#1d3526] space-y-3">
                    <span className="text-[11px] font-bold text-[#16e016] uppercase tracking-wider block">
                      {t.telegramLinkTitle}
                    </span>
                    <div className="flex items-center justify-between gap-2 bg-black/40 p-2.5 rounded-lg border border-[#1d3526]">
                      <span className="text-xs font-mono text-white truncate">
                        {result.telegramInviteLink}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyInvite(result.telegramInviteLink!)}
                        className="px-2.5 py-1 rounded bg-[#16e016]/20 text-[#16e016] hover:bg-[#16e016] hover:text-black transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? t.copiedBtn : t.copyBtn}</span>
                      </button>
                    </div>

                    <a
                      href={result.telegramInviteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-[#16e016] text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#12be12] transition-colors shadow-lg shadow-[#16e016]/20 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.joinBtn}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Pending state */}
            {result.status === 'pending' && (
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-white text-base">{t.pendingTitle}</span>
                </div>
                <p className="text-xs text-amber-300 leading-relaxed mb-3">
                  {lang === 'am' ? (
                    <>
                      ሰላም <strong className="text-white">{result.full_name}</strong>፣ ምዝገባዎ ደርሶናል። የከፈሉበት ደረሰኝ በእጅ እየተረጋገጠ ነው። እባክዎ ትንሽ ቆይተው እንደገና ይፈትሹ።
                    </>
                  ) : (
                    <>
                      Hello <strong className="text-white">{result.full_name}</strong>, your registration was received. The owner verifies transactions manually. Please check back shortly.
                    </>
                  )}
                </p>
                <div className="text-[11px] text-slate-400 bg-[#090b10] p-3 rounded-xl border border-[#1f2638]">
                  {t.pendingContact}
                </div>
              </div>
            )}

            {/* Rejected state */}
            {result.status === 'rejected' && (
              <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="font-bold text-white text-base">{t.rejectedTitle}</span>
                </div>
                <p className="text-xs text-red-300 leading-relaxed mb-3">
                  {t.rejectedDesc}
                </p>
                {result.rejection_reason && (
                  <div className="p-3 rounded-xl bg-black/40 border border-red-500/20 text-xs text-red-300 mb-3 font-mono">
                    <strong>{t.rejectedReason}</strong> {result.rejection_reason}
                  </div>
                )}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://t.me/Yitbarek_2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-[#1d2233] hover:bg-[#252c42] text-white text-xs font-semibold text-center border border-[#313a52] flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                    <span>{t.contactSupport}</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-[#16e016] text-black text-xs font-bold hover:bg-[#12be12]"
                  >
                    {t.resubmit}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
