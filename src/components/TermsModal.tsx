import React from 'react';
import { X, Shield } from 'lucide-react';
import { Language } from '../translations';

interface TermsModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ lang, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#111522] border border-[#232b3d] rounded-3xl p-6 sm:p-8 shadow-2xl text-left flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1f273b] mb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#16e016]/10 text-[#16e016] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Poppins']">
                {lang === 'am' ? 'ውሎች እና የግላዊነት ፖሊሲ' : 'Terms & Privacy Policy'}
              </h3>
              <p className="text-xs text-slate-400">Aplus Academy • 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#171d2c] hover:bg-[#20293d] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-300 pr-2">
          <div className="p-4 rounded-2xl bg-[#0c0f18] border border-[#1f273b]">
            <h4 className="font-bold text-white text-sm mb-1 text-[#16e016]">
              {lang === 'am' ? '1. የአንድ ጊዜ ክፍያ ሞዴል (400 ብር)' : '1. One-Time Membership Model (400 ETB)'}
            </h4>
            <p className="leading-relaxed text-slate-300">
              {lang === 'am'
                ? 'ኤ ፕላስ አካዳሚ እንደ የጋራ መማሪያ ማህበረሰብ የሚሰራ ሲሆን ክፍያው የ400 ብር የአንድ ጊዜ ክፍያ ብቻ ነው። ወርሃዊ ምዝገባ ወይም ለእያንዳንዱ ኮርስ ለየብቻ ክፍያ የለም።'
                : 'Aplus Academy operates as an online learning community. Payment is a single, one-time fee of 400 ETB for full access to our private Telegram learning group. We do not sell courses separately or charge monthly subscription fees.'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-1">
              {lang === 'am' ? '2. የቴሌግራም ግሩፕ መዳረሻ' : '2. Telegram Community Access'}
            </h4>
            <p className="leading-relaxed text-slate-400">
              {lang === 'am'
                ? 'የከፈሉበት ደረሰኝ በእጅ ተረጋግጦ የፕራይቬት ቴሌግራም ግሩፕ መግቢያ ሊንክ ይሰጥዎታል። በግሩፑ ውስጥ የቪዲዮ ትምህርቶች፣ የፈተና ጥያቄዎች ከመፍትሔዎቻቸው ጋር እና አጋዥ ማስታወሻዎች ይገኛሉ።'
                : 'Upon manual verification of your payment screenshot and transaction reference by our team, you receive invitation access to the private Aplus Academy Telegram group.'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-1">
              {lang === 'am' ? '3. የመረጃ ጥበቃ' : '3. Privacy & Screenshot Protection'}
            </h4>
            <p className="leading-relaxed text-slate-400">
              {lang === 'am'
                ? 'የሚልኩልን ስም፣ ስልክ ቁጥር እና የክፍያ ደረሰኝ ምስል ሚስጥራዊነቱ በተጠበቀ ማከማቻ ውስጥ የሚቀመጥ ሲሆን ለአባልነት ማረጋገጫ ብቻ ያገለግላል።'
                : 'We collect your full name, phone number, Telegram username, and payment receipt screenshot strictly for verifying your admission. Your payment screenshots are stored in private server storage and are never exposed publicly.'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-1">
              {lang === 'am' ? '4. ግንኙነት እና ድጋፍ' : '4. Support & Inquiries'}
            </h4>
            <p className="leading-relaxed text-slate-400">
              {lang === 'am' ? (
                <>
                  ለማንኛውም ጥያቄ በቴሌግራም{' '}
                  <a href="https://t.me/Yitbarek_2" target="_blank" rel="noopener noreferrer" className="text-[#16e016] underline">
                    @Yitbarek_2
                  </a>{' '}
                  ወይም በኢሜይል{' '}
                  <a href="mailto:ykifleyohans@gmail.com" className="text-[#16e016] underline">
                    ykifleyohans@gmail.com
                  </a>{' '}
                  ያግኙን።
                </>
              ) : (
                <>
                  For any questions regarding your registration, contact us via Telegram at{' '}
                  <a href="https://t.me/Yitbarek_2" target="_blank" rel="noopener noreferrer" className="text-[#16e016] underline">
                    @Yitbarek_2
                  </a>{' '}
                  or email{' '}
                  <a href="mailto:ykifleyohans@gmail.com" className="text-[#16e016] underline">
                    ykifleyohans@gmail.com
                  </a>.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1f273b] mt-4 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#16e016] text-black font-bold text-xs hover:bg-[#12be12] transition-colors cursor-pointer"
          >
            {lang === 'am' ? 'ተረድቻለሁ' : 'I Understand & Agree'}
          </button>
        </div>
      </div>
    </div>
  );
};
