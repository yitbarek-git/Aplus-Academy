import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Key,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Shield,
  LogOut,
  ExternalLink,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { RegistrationSubmission } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('aplus_admin_token'));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Submissions state
  const [submissions, setSubmissions] = useState<RegistrationSubmission[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [search, setSearch] = useState('');

  // Proof image preview modal
  const [previewSubmission, setPreviewSubmission] = useState<RegistrationSubmission | null>(null);
  const [previewImageBlobUrl, setPreviewImageBlobUrl] = useState<string | null>(null);
  const [loadingProof, setLoadingProof] = useState(false);

  // Rejection reason prompt
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && token) {
      fetchSubmissions();
    }
  }, [isOpen, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid admin credentials');
      }

      setToken(data.token);
      localStorage.setItem('aplus_admin_token', data.token);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        // ignore
      }
    }
    setToken(null);
    localStorage.removeItem('aplus_admin_token');
    setSubmissions([]);
  };

  const fetchSubmissions = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const res = await fetch('/api/admin/submissions', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      setSubmissions(data.submissions || []);
      setStats(data.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
    } catch (err) {
      console.error('Failed to load submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected', reason?: string) => {
    if (!token) return;
    setActionError(null);

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, rejection_reason: reason }),
      });

      if (!res.ok) throw new Error('Status update failed');

      // Refresh list
      fetchSubmissions();
      setRejectingId(null);
      setRejectionReason('');
    } catch (err: any) {
      setActionError(err.message || 'Could not update status');
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!token) return;
    setActionError(null);

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Delete failed');
      setConfirmDeleteId(null);
      fetchSubmissions();
    } catch (err: any) {
      setActionError(err.message || 'Delete failed');
    }
  };

  const viewProof = async (sub: RegistrationSubmission) => {
    if (!token) return;
    setPreviewSubmission(sub);
    setLoadingProof(true);
    setActionError(null);

    if (previewImageBlobUrl) {
      URL.revokeObjectURL(previewImageBlobUrl);
      setPreviewImageBlobUrl(null);
    }

    try {
      const res = await fetch(`/api/admin/proof/${sub.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Could not load proof screenshot');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPreviewImageBlobUrl(url);
    } catch (err: any) {
      setActionError(err.message || 'Error fetching proof image');
    } finally {
      setLoadingProof(false);
    }
  };

  const closeProofModal = () => {
    if (previewImageBlobUrl) {
      URL.revokeObjectURL(previewImageBlobUrl);
      setPreviewImageBlobUrl(null);
    }
    setPreviewSubmission(null);
  };

  if (!isOpen) return null;

  const filtered = submissions.filter((sub) => {
    const matchesFilter = filter === 'all' ? true : sub.status === filter;
    const s = search.toLowerCase().trim();
    const matchesSearch =
      !s ||
      sub.full_name.toLowerCase().includes(s) ||
      sub.phone.toLowerCase().includes(s) ||
      sub.transaction_reference.toLowerCase().includes(s) ||
      sub.telegram_username.toLowerCase().includes(s) ||
      sub.id.toLowerCase().includes(s);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#101420] border border-[#232c42] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Top Header */}
        <div className="p-5 sm:px-8 border-b border-[#1f273b] flex items-center justify-between bg-[#131828]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16e016]/10 border border-[#16e016]/30 text-[#16e016] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Aplus Academy Owner Review Panel
              </h2>
              <p className="text-xs text-slate-400">
                Verify student payment proofs and approve access
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-[#1a2133] hover:bg-[#232c44] text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Log out from admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#1a2133] hover:bg-[#232c44] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!token ? (
          /* Login Screen */
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-[#131726] border border-[#232c40] rounded-3xl p-8 text-center shadow-xl">
              <div className="w-14 h-14 rounded-full bg-[#16e016]/10 text-[#16e016] flex items-center justify-center mx-auto mb-5 border border-[#16e016]/20">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Admin Authentication</h3>
              <p className="text-xs text-slate-400 mb-6">
                Please enter the administrator password configured in your environment to access student verification records.
              </p>

              {loginError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs mb-4">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative text-left">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password (e.g. aplus_admin_2026)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#090b10] border border-[#242c40] text-white text-sm focus:outline-none focus:border-[#16e016]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#16e016] hover:bg-[#12be12] text-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Unlock Admin Review</span>}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Submissions Management View */
          <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6">
            {/* Stats Overview */}
            {actionError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
                <span>{actionError}</span>
                <button
                  type="button"
                  onClick={() => setActionError(null)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div
                onClick={() => setFilter('all')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  filter === 'all' ? 'bg-[#182136] border-[#16e016]' : 'bg-[#121623] border-[#222a3d]'
                }`}
              >
                <span className="text-[11px] text-slate-400 font-medium block">All Registrations</span>
                <span className="text-xl font-extrabold text-white">{stats.total}</span>
              </div>

              <div
                onClick={() => setFilter('pending')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  filter === 'pending' ? 'bg-[#1e1b15] border-amber-500' : 'bg-[#121623] border-[#222a3d]'
                }`}
              >
                <span className="text-[11px] text-amber-400 font-medium block">🟡 Pending Review</span>
                <span className="text-xl font-extrabold text-amber-300">{stats.pending}</span>
              </div>

              <div
                onClick={() => setFilter('approved')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  filter === 'approved' ? 'bg-[#122218] border-emerald-500' : 'bg-[#121623] border-[#222a3d]'
                }`}
              >
                <span className="text-[11px] text-emerald-400 font-medium block">🟢 Approved Members</span>
                <span className="text-xl font-extrabold text-emerald-300">{stats.approved}</span>
              </div>

              <div
                onClick={() => setFilter('rejected')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  filter === 'rejected' ? 'bg-[#221616] border-red-500' : 'bg-[#121623] border-[#222a3d]'
                }`}
              >
                <span className="text-[11px] text-red-400 font-medium block">🔴 Rejected Proofs</span>
                <span className="text-xl font-extrabold text-red-300">{stats.rejected}</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name, phone, ref..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#090b10] border border-[#222a3d] text-white text-xs focus:outline-none focus:border-[#16e016]"
                />
              </div>

              <button
                onClick={fetchSubmissions}
                disabled={loading}
                className="px-3.5 py-2 rounded-xl bg-[#161c2b] text-slate-300 hover:text-white border border-[#263148] text-xs font-semibold flex items-center gap-1.5 cursor-pointer self-end sm:self-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh List</span>
              </button>
            </div>

            {/* Submissions Table / Cards */}
            <div className="flex-1 overflow-y-auto rounded-2xl border border-[#20273a] bg-[#0c0f18]">
              {loading && submissions.length === 0 ? (
                <div className="py-20 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#16e016]" />
                  <span>Loading submissions...</span>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-20 text-center text-slate-400 text-xs">
                  No submissions found for the selected filter.
                </div>
              ) : (
                <div className="divide-y divide-[#1b2234]">
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 hover:bg-[#121625] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      {/* Left: Info */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-white text-sm">{item.full_name}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              item.status === 'approved'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : item.status === 'rejected'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">#{item.id}</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300 pt-1">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Phone:</span>
                            <span className="font-mono">{item.phone}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Telegram:</span>
                            <span className="text-[#16e016] font-semibold">{item.telegram_username}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Payment Method:</span>
                            <span className="capitalize">{item.payment_method}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Transaction ID:</span>
                            <span className="font-mono text-amber-300 font-semibold truncate block">
                              {item.transaction_reference}
                            </span>
                          </div>
                        </div>

                        {(item.university || item.department_year || item.message) && (
                          <div className="text-[11px] text-slate-400 pt-1 flex flex-wrap gap-3">
                            {item.university && <span>🏛 {item.university}</span>}
                            {item.department_year && <span>📚 {item.department_year}</span>}
                            {item.message && <span className="italic">"{item.message}"</span>}
                          </div>
                        )}

                        {item.rejection_reason && (
                          <div className="text-[11px] text-red-400 bg-red-950/30 p-2 rounded-lg border border-red-900/40">
                            <strong>Rejection Note:</strong> {item.rejection_reason}
                          </div>
                        )}

                        <span className="text-[10px] text-slate-500 block">
                          Submitted: {new Date(item.created_at).toLocaleString()}
                        </span>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {/* View Proof Button */}
                        <button
                          type="button"
                          onClick={() => viewProof(item)}
                          className="px-3 py-2 rounded-xl bg-[#192235] hover:bg-[#232e47] text-slate-200 border border-[#2b3956] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-sky-400" />
                          <span>View Proof</span>
                        </button>

                        {/* Approve Button */}
                        {item.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => updateStatus(item.id, 'approved')}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-emerald-600/30"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        {/* Reject Button */}
                        {item.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => {
                              setRejectingId(item.id);
                              setRejectionReason('');
                            }}
                            className="px-3 py-2 rounded-xl bg-red-900/30 hover:bg-red-900/60 text-red-300 border border-red-800/50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5 text-red-400" />
                            <span>Reject</span>
                          </button>
                        )}

                        {/* Delete Button with inline confirmation */}
                        {confirmDeleteId === item.id ? (
                          <div className="flex items-center gap-1.5 bg-red-950/70 p-1 rounded-xl border border-red-700/60">
                            <span className="text-[10px] text-red-300 font-medium px-1">Delete?</span>
                            <button
                              type="button"
                              onClick={() => deleteSubmission(item.id)}
                              className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold cursor-pointer"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2 py-1 rounded-lg bg-[#181e2d] hover:bg-[#222a3d] text-slate-300 text-[10px] cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(item.id)}
                            className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-[#1f2436] transition-colors cursor-pointer"
                            title="Delete submission"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reject Reason Dialog */}
      {rejectingId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-md bg-[#131726] border border-[#252f44] rounded-2xl p-6 text-left shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2">Reject Submission</h4>
            <p className="text-xs text-slate-400 mb-4">
              Provide a clear reason for the student (e.g. "Transaction reference did not match receipt screenshot", "Blurry image", "Unverified transaction").
            </p>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-3 rounded-xl bg-[#090b10] border border-[#242c40] text-white text-xs focus:outline-none focus:border-red-500 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => updateStatus(rejectingId, 'rejected', rejectionReason)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proof Image View Modal */}
      {previewSubmission && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90">
          <div className="relative max-w-2xl w-full bg-[#111522] border border-[#232b3d] rounded-3xl p-6 text-left shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-[#1f273b] mb-4">
              <div>
                <h4 className="font-bold text-white text-base">
                  Payment Proof: {previewSubmission.full_name}
                </h4>
                <p className="text-xs text-slate-400">
                  Transaction Ref:{' '}
                  <span className="font-mono text-amber-300 font-semibold">
                    {previewSubmission.transaction_reference}
                  </span>{' '}
                  • {previewSubmission.payment_method}
                </p>
              </div>
              <button
                onClick={closeProofModal}
                className="p-2 rounded-xl bg-[#171d2c] text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center bg-black/50 rounded-2xl p-2 border border-[#1b2234]">
              {loadingProof ? (
                <div className="py-20 text-center text-slate-400 flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#16e016]" />
                  <span>Loading proof screenshot securely...</span>
                </div>
              ) : previewImageBlobUrl ? (
                <img
                  src={previewImageBlobUrl}
                  alt="Proof screenshot"
                  className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-lg"
                />
              ) : (
                <span className="text-xs text-slate-400">Screenshot unavailable</span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#1f273b]">
              <span className="text-xs text-slate-400">
                Original file: {previewSubmission.payment_proof_original_name} (
                {(previewSubmission.payment_proof_size / 1024).toFixed(0)} KB)
              </span>
              <div className="flex gap-2">
                {previewSubmission.status !== 'approved' && (
                  <button
                    onClick={() => {
                      updateStatus(previewSubmission.id, 'approved');
                      closeProofModal();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#16e016] text-black font-bold text-xs hover:bg-[#12be12]"
                  >
                    Approve Payment
                  </button>
                )}
                <button
                  onClick={closeProofModal}
                  className="px-4 py-2 rounded-xl bg-[#192030] text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
