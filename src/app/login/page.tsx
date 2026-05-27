'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard')
    router.refresh()
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    setError('Check your email to confirm your account.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0f2f7' }}>
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="rounded-lg mb-6 p-7 text-white" style={{ background: '#1a2744' }}>
          <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#8fa3cc', fontFamily: 'IBM Plex Mono' }}>
            JHIC / Makerlab
          </div>
          <h1 className="text-xl font-bold tracking-wide uppercase">Document System</h1>
          <p className="text-sm mt-1" style={{ color: '#8fa3cc' }}>Jassen Harris Industries Corporation</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5">Sign In</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="field-input"
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="field-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="text-xs px-3 py-2 rounded" style={{
                  background: error.includes('Check') ? '#edf7f1' : '#fde8e8',
                  color: error.includes('Check') ? '#2a7a4b' : '#c8392b',
                  border: `1px solid ${error.includes('Check') ? '#b2dfc4' : '#f5c6c2'}`
                }}>
                  {error}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 text-sm font-semibold text-white rounded transition-colors"
                  style={{ background: loading ? '#7a9bd4' : '#2e5490' }}
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={handleSignUp}
                  disabled={loading}
                  className="flex-1 py-2 px-4 text-sm font-semibold rounded border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5" style={{ fontFamily: 'IBM Plex Mono' }}>
          Technical Department · Internal Use Only
        </p>
      </div>
    </div>
  )
}
