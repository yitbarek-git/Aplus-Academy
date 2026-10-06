import React, { useState, useRef } from 'react';
import {
  Upload,
  CheckCircle,
  Copy,
  Check,
  AlertCircle,
  X,
  CreditCard,
  ShieldCheck,
  Clock,
  Send,
  Loader2,
  BookOpen,
} from 'lucide-react';
import { AppConfig } from '../types';
import { Language, translations } from '../translations';

interface RegistrationFormProps {
  lang: Language;
  config: AppConfig | null;
  selectedCourse: string;
  onSelectCourse: (course: string) => void;
  onOpenStatusCheckWithPhone: (phone: string) => void;
}

export const COURSE_OPTIONS = [
  'All Courses (Complete Academy Access)',
  'Communicative English Language Skills I & II',
  'Logic and Critical Thinking',
  'Geography of Ethiopia and the Horn',
  'History of Ethiopia and the Horn',
  'Moral and Civic Education',
  'Introduction to Emerging Technologies',
  'General Psychology and Life Skills',
  'Physical Fitness',
  'Economics',
  'Entrepreneurship',
  'Inclusiveness',
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  lang,
  config,
  selectedCourse,
  onSelectCourse,
  onOpenStatusCheckWithPhone,
}) => {
  const t = translations[lang].register;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [university, setUniversity] = useState('');
  const [departmentYear, setDepartmentYear] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const [transactionRef, setTransactionRef] = useState('');

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Submission status
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    registrationId: string;
    phone: string;
    selectedCourse: string;
    message: string;
  } | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileChange = (file: File | null) => {
    setErrorMsg(null);
    if (!file) {
      setSelectedFile(null);
      setFilePreview(null);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg(
        lang === 'am'
          ? 'እባክዎ ትክክለኛ ምስል (JPG, PNG ወይም WEBP) ይጫኑ።'
          : 'Please upload a valid image (JPG, PNG, or WEBP only).'
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg(
        lang === 'am'
          ? 'የደረሰኝ ምስል መጠን ከ 5 ሜጋባይት ማነስ አለበት።'
          : 'Screenshot file size must be less than 5 MB.'
      );
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMsg(
        lang === 'am'
          ? 'እባክዎ ሙሉ ስምዎን በትክክል ያስገቡ (ቢያንስ 3 ፊደላት)።'
          : 'Please enter your full name (at least 3 characters).'
      );
      return;
    }

    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg(
        lang === 'am'
          ? 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ (ምሳሌ፡ 0912345678)።'
          : 'Please enter a valid phone number (e.g. 0912345678).'
      );
      return;
    }

    if (!telegramUsername.trim()) {
      setErrorMsg(
        lang === 'am'
          ? 'እባክዎ የቴሌግራም ዩዘርኔምዎን ያስገቡ።'
          : 'Please provide your Telegram username so we can verify your account.'
      );
      return;
    }

    if (!transactionRef.trim() || transactionRef.trim().length < 3) {
      setErrorMsg(
        lang === 'am'
          ? 'እባክዎ የክፍያ ማረጋገጫ ቁጥር (Transaction ID) ያስገቡ።'
          : 'Please enter the transaction reference / ID from your payment receipt.'
      );
      return;
    }

    if (!selectedFile) {
      setErrorMsg(
        lang === 'am'
          ? 'እባክዎ የከፈሉበትን ደረሰኝ ስክሪንሽት አያይዘው ይላኩ።'
          : 'Please attach a screenshot showing your completed payment receipt.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('full_name', fullName.trim());
      formData.append('phone', phone.trim());
      formData.append('telegram_username', telegramUsername.trim());
      formData.append('university', university.trim());
      formData.append('department_year', departmentYear.trim());
      formData.append('selected_course', selectedCourse);
      formData.append('payment_method', paymentMethod);
      formData.append('transaction_reference', transactionRef.trim());
      formData.append('proof', selectedFile);

      const res = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration. Please try again.');
      }

      setSubmissionSuccess({
        registrationId: data.registrationId,
        phone: phone.trim(),
        selectedCourse,
        message:
          lang === 'am'
            ? 'ምዝገባዎ በተሳካ ሁኔታ ተልኳል! የከፈሉበት ደረሰኝ በእጅ ተረጋግጦ የፕራይቬት ቴሌግራም ግሩፑ መግቢያ ይሰጥዎታል።'
            : data.message,
      });

      // Clear fields
      setFullName('');
      setPhone('');
      setTelegramUsername('');
      setUniversity('');
      setDepartmentYear('');
      setTransactionRef('');
      setSelectedFile(null);
      setFilePreview(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred. Please verify your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const fee = config?.membershipFeeETB || '400';
  const methods = config?.paymentMethods || [
    {
      id: 'telebirr',
      name: 'Telebirr (ቴሌብር)',
      accountName: 'Aplus Academy / Yitbarek',
      accountNumber: '09XXXXXXXX (Set in .env)',
      badge: lang === 'am' ? 'በስልክ ፈጣኑ መንገድ' : 'Fastest via Mobile',
      steps: [
        lang === 'am' ? 'የ400 ብር ክፍያውን ወደ ቴሌብር ቁጥሩ ይላኩ' : 'Send the 400 ETB fee to the Telebirr phone number',
        lang === 'am' ? 'የደረሰኝ መልዕክቱን ስክሪንሽት ያንሱ' : 'Screenshot the confirmation SMS / receipt',
      ],
    },
    {
      id: 'cbe',
      name: 'Commercial Bank of Ethiopia (CBE)',
      accountName: 'Yitbarek Kifleyohans',
      accountNumber: '1000XXXXXXXXX (Set in .env)',
      badge: lang === 'am' ? 'ንግድ ባንክ / CBEBirr' : 'CBE Mobile / CBEBirr',
      steps: [
        lang === 'am' ? 'ወደተጠቀሰው የንግድ ባንክ ሂሳብ ቁጥር ያስተላልፉ' : 'Transfer to the CBE account number',
        lang === 'am' ? 'የደረሰኙን ስክሪንሽት ያስቀምጡ' : 'Save the transfer receipt screenshot',
      ],
    },
    {
      id: 'boa',
      name: 'Bank of Abyssinia (BOA)',
      accountName: 'Yitbarek Kifleyohans',
      accountNumber: 'XXXXXXXXX (Set in .env)',
      badge: lang === 'am' ? 'አቢሲኒያ ባንክ' : 'BOA Mobile Banking',
      steps: [
        lang === 'am' ? 'በአቢሲኒያ ሞባይል ባንኪንግ ያስተላልፉ' : 'Transfer to the BOA account number',
        lang === 'am' ? 'የማረጋገጫ ምስሉን ያስቀምጡ' : 'Save the transfer confirmation screenshot',
      ],
    },
  ];

  return (
    <section id="register" className="py-24 bg-[#0a0d14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16e016]/10 border border-[#16e016]/20 text-[#16e016] text-xs font-bold uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Poppins']">
            {t.title} <span className="text-[#16e016]">{t.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            {lang === 'am' ? (
              <>
                የአንድ ጊዜ ክፍያ <strong className="text-white">{fee} ብር</strong> ከፍለው ከታች አስፈላጊውን መረጃ በማስገባት ደረሰኝዎን ይላኩ።
              </>
            ) : (
              <>
                Make the one-time payment of <strong className="text-white">{fee} ETB</strong>, then submit your details and screenshot proof below.
              </>
            )}
          </p>
        </div>

        {/* Step 1: Payment Accounts Grid */}
        <div className="mb-14">
          <h3 className="text-lg font-bold text-white mb-6 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <span className="w-6 h-6 rounded-full bg-[#16e016] text-black text-xs font-black flex items-center justify-center">
              1
            </span>
            <span>
              {lang === 'am' ? `1. የአንድ ጊዜ ክፍያ ${fee} ብር ይክፈሉ` : `1. Make the One-Time Payment (${fee} ETB)`}
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {methods.map((method) => (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  paymentMethod === method.id
                    ? 'bg-[#151c2c] border-[#16e016] shadow-xl shadow-[#16e016]/10 ring-1 ring-[#16e016]'
                    : 'bg-[#111522] border-[#222a3d] hover:border-[#313c55]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-white text-base">{method.name}</span>
                    {method.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#16e016]/20 text-[#16e016]">
                        {method.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        {lang === 'am' ? 'የሂሳብ ስም:' : 'Account Name:'}
                      </span>
                      <span className="text-slate-200 font-semibold">{method.accountName}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">
                        {lang === 'am' ? 'የሂሳብ / ስልክ ቁጥር:' : 'Account / Phone:'}
                      </span>
                      <div className="flex items-center justify-between bg-[#0b0e16] p-2.5 rounded-xl border border-[#1e2536] mt-1">
                        <span className="text-white font-mono font-bold text-xs select-all">
                          {method.accountNumber}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(method.accountNumber, method.id);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-[#16e016] transition-colors cursor-pointer"
                          title="Copy account number"
                        >
                          {copiedId === method.id ? (
                            <Check className="w-3.5 h-3.5 text-[#16e016]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1d2434] text-[11px] text-slate-400">
                  {method.steps?.[0] || 'Transfer fee and take screenshot of receipt'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Form or Success Card */}
        <div className="max-w-2xl mx-auto">
          {submissionSuccess ? (
            /* Success confirmation card */
            <div className="bg-[#121826] border-2 border-[#16e016] rounded-3xl p-8 sm:p-10 shadow-2xl text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#16e016]/20 border border-[#16e016] text-[#16e016] mx-auto flex items-center justify-center mb-6">
                <CheckCircle className="w-9 h-9" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-[#16e016] text-xs font-bold uppercase tracking-wider mb-2">
                {t.successBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-['Poppins']">
                {t.successTitle}
              </h3>

              <div className="bg-[#0b0e16] border border-[#232c40] rounded-2xl p-5 my-6 max-w-lg mx-auto text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">{t.regIdLabel}</span>
                  <span className="font-mono font-bold text-[#16e016]">{submissionSuccess.registrationId}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">{t.regPhoneLabel}</span>
                  <span className="font-mono text-white">{submissionSuccess.phone}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">{lang === 'am' ? 'የተመረጠው ኮርስ:' : 'Selected Course:'}</span>
                  <span className="font-medium text-emerald-300 truncate max-w-[200px]">
                    {submissionSuccess.selectedCourse}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold text-[11px]">
                    {t.statusPending}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
                {submissionSuccess.message}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenStatusCheckWithPhone(submissionSuccess.phone)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-[#16e016] hover:bg-[#12be12] text-black shadow-lg shadow-[#16e016]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>{t.checkStatusBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmissionSuccess(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-sm bg-[#161d2d] hover:bg-[#20293d] text-slate-300 border border-[#29354d] transition-all cursor-pointer"
                >
                  {t.submitAnotherBtn}
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <div className="bg-[#121623] border border-[#22293c] rounded-3xl p-7 sm:p-10 shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-6 rounded-full bg-[#16e016] text-black text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'am' ? 'የምዝገባ እና የክፍያ መረጃዎን ያስገቡ' : 'Submit Your Registration & Payment Proof'}
                </h3>
              </div>

              {/* Course Selection Indicator banner */}
              <div className="mb-6 p-4 rounded-2xl bg-[#0b0e16] border border-[#232c40] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <BookOpen className="w-5 h-5 text-[#16e016] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[11px] text-slate-400 block">
                      {lang === 'am' ? 'የተመረጠው ኮርስ / አባልነት፡' : 'Selected Course / Admission:'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white truncate block">
                      {selectedCourse}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-[#16e016]/20 text-[#16e016] px-2 py-0.5 rounded-md font-semibold shrink-0">
                  {lang === 'am' ? 'ሙሉ አባልነት ያካትታል' : 'All Courses Included'}
                </span>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Course Selector Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    {lang === 'am' ? 'ኮርስ / የአባልነት አይነት' : 'Selected Course / Package'}{' '}
                    <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => onSelectCourse(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0e16] border border-[#232b3d] text-white text-xs sm:text-sm focus:outline-none focus:border-[#16e016] focus:ring-1 focus:ring-[#16e016] transition-colors cursor-pointer"
                  >
                    {COURSE_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    {t.nameLabel} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0e16] border border-[#232b3d] text-white text-sm focus:outline-none focus:border-[#16e016] focus:ring-1 focus:ring-[#16e016] transition-colors"
                  />
                </div>

                {/* 3. Phone & Telegram in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.phoneLabel} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0e16] border border-[#232b3d] text-white text-sm focus:outline-none focus:border-[#16e016] focus:ring-1 focus:ring-[#16e016] transition-colors"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {t.phoneHelp}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.telegramLabel} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={telegramUsername}
                      onChange={(e) => setTelegramUsername(e.target.value)}
                      placeholder={t.telegramPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0e16] border border-[#232b3d] text-white text-sm focus:outline-none focus:border-[#16e016] focus:ring-1 focus:ring-[#16e016] transition-colors"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {t.telegramHelp}
                    </span>
                  </div>
                </div>

                {/* 4. Payment Method & Transaction Reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.paymentMethodLabel} <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0e16] border border-[#232b3d] text-white text-sm focus:outline-none focus:border-[#16e016] focus:ring-1 focus:ring-[#16e016] transition-colors cursor-pointer"
                    >
                      <option value="telebirr">Telebirr (ቴሌብር)</option>
                      <option value="cbe">CBE (የኢትዮጵያ ንግድ ባንክ)</option>
                      <option value="boa">BOA (አቢሲኒያ ባንክ)</option>
                      <option value="other">{lang === 'am' ? 'ሌላ የባንክ መንገድ' : 'Other Mobile Transfer'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {t.transactionLabel} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      placeholder={t.transactionPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0e16] border border-[#232b3d] text-white text-sm focus:outline-none focus:border-[#16e016] focus:ring-1 focus:ring-[#16e016] transition-colors font-mono"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {t.transactionHelp}
                    </span>
                  </div>
                </div>

                {/* 6. Payment Proof Upload (Required, secure) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    {t.proofLabel} <span className="text-red-400">*</span>
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      selectedFile
                        ? 'bg-[#15201b] border-[#16e016]'
                        : 'bg-[#0b0e16] border-[#252f44] hover:border-[#16e016]/60 hover:bg-[#0f131f]'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />

                    {selectedFile && filePreview ? (
                      <div className="flex flex-col items-center">
                        <div className="relative mb-3 group">
                          <img
                            src={filePreview}
                            alt="Payment Proof Preview"
                            className="w-32 h-32 object-cover rounded-xl border border-[#16e016] shadow-md"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileChange(null);
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 shadow cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-[#16e016]">
                          ✓ {t.proofAttached} {selectedFile.name}
                        </span>
                        <span className="text-[11px] text-slate-400 mt-0.5">
                          {(selectedFile.size / 1024).toFixed(0)} KB • {t.proofChange}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-[#172033] text-[#16e016] flex items-center justify-center mb-3">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-white mb-1">
                          {t.proofUploadText}
                        </span>
                        <span className="text-xs text-slate-400">
                          {t.proofUploadHint}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Privacy/Security Note */}
                <div className="p-3.5 rounded-xl bg-[#0b0e16] border border-[#1e2536] flex items-start gap-2.5 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t.privacyNote}</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-bold text-base bg-[#16e016] hover:bg-[#12be12] text-black shadow-lg shadow-[#16e016]/25 hover:shadow-xl hover:shadow-[#16e016]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.submittingBtn}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t.submitBtn}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
