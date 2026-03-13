/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { authApi } from '@/lib/api';
import { Loader2, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({
    type: '',
    text: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.first_name,
        lastName: user.last_name,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await authApi.updateMe({
        first_name: form.firstName,
        last_name: form.lastName,
      });
      setSuccess(true);
    } catch (err: any) {
      console.error('Failed to update profile', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordMessage({
        type: 'error',
        text: 'New passwords do not match.',
      });
      return;
    }
    if (passwordForm.new_password.length < 8) {
      setPasswordMessage({
        type: 'error',
        text: 'Password must be at least 8 characters.',
      });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await authApi.changePassword(passwordForm);
      setPasswordMessage({ type: 'success', text: res.data.message });
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    } catch (error: any) {
      setPasswordMessage({
        type: 'error',
        text: error.response?.data?.detail || 'Failed to change password.',
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (authLoading) {
    return <div className='text-gold-400 p-8'>Loading Settings...</div>;
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-display text-gold-100 mb-2'>Settings</h1>
        <p className='text-gold-100/60 font-light'>
          Manage your account details.
        </p>
      </div>

      <div className='max-w-2xl'>
        <form onSubmit={handleSubmit} className='glass-card p-8 space-y-6'>
          <h3 className='font-display text-xl text-gold-100 border-b border-gold-400/10 pb-4'>
            Profile Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='modal-label'>First Name</label>
              <input
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className='lux-input'
              />
            </div>
            <div className='space-y-2'>
              <label className='modal-label'>Last Name</label>
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className='lux-input'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <label className='modal-label'>Email Address</label>
            <input value={user?.email || ''} className='lux-input' disabled />
            <p className='text-xs text-gold-100/40'>
              Email address cannot be changed.
            </p>
          </div>
          <div className='flex items-center justify-between pt-6 border-t border-gold-400/10'>
            <button
              disabled={loading}
              className='btn-gold flex items-center gap-2'
            >
              {loading ? (
                <Loader2 className='animate-spin' />
              ) : (
                <Save size={16} />
              )}
              Save Changes
            </button>
            {success && (
              <p className='text-sm text-green-400'>
                Profile updated successfully!
              </p>
            )}
          </div>
        </form>

        <form
          onSubmit={handlePasswordChange}
          className='glass-card p-8 space-y-6 mt-8'
        >
          <h3 className='font-display text-xl text-gold-100 border-b border-gold-400/10 pb-4'>
            Change Password
          </h3>
          <div className='space-y-2'>
            <label className='modal-label'>Current Password</label>
            <input
              type='password'
              required
              value={passwordForm.current_password}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  current_password: e.target.value,
                })
              }
              className='lux-input'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='modal-label'>New Password</label>
              <input
                type='password'
                required
                value={passwordForm.new_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    new_password: e.target.value,
                  })
                }
                className='lux-input'
              />
            </div>
            <div className='space-y-2'>
              <label className='modal-label'>Confirm New Password</label>
              <input
                type='password'
                required
                value={passwordForm.confirm_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirm_password: e.target.value,
                  })
                }
                className='lux-input'
              />
            </div>
          </div>
          <div className='flex items-center justify-between pt-6 border-t border-gold-400/10'>
            <button
              disabled={passwordLoading}
              className='btn-gold flex items-center gap-2'
            >
              {passwordLoading ? (
                <Loader2 className='animate-spin' />
              ) : (
                <Save size={16} />
              )}
              Update Password
            </button>
            {passwordMessage.text && (
              <p
                className={`text-sm ${passwordMessage.type === 'error' ? 'text-red-400' : 'text-green-400'}`}
              >
                {passwordMessage.text}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
