'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import { supabase } from '@/utils/supabase';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        if (session.user.email === 'vellutleather@gmail.com') {
          router.replace('/admin');
        } else {
          router.replace('/dashboard');
        }
      }
    });

    // Listen for auth state changes (crucial for OAuth redirects)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        if (session.user.email === 'vellutleather@gmail.com') {
          router.replace('/admin');
        } else {
          router.replace('/dashboard');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (email === 'vellutleather@gmail.com') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) throw error;
        if (data.user && data.session === null) {
          setMessage('Registration successful! Please check your email to verify your account.');
        } else {
          setMessage('Registration successful! Redirecting...');
          setTimeout(() => {
            if (email === 'vellutleather@gmail.com') {
              router.push('/admin');
            } else {
              router.push('/dashboard');
            }
          }, 1500);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16 animate-fade-in bg-background">
      <div className="w-full max-w-md mb-4">
        <BackButton href="/" label="Back to Home" />
      </div>
      <div className="w-full max-w-md bg-surface-container-low p-8 md:p-12 border border-outline-variant/30 shadow-sm">
        <h1 className="font-display-lg text-3xl md:text-4xl text-primary mb-2 text-center" style={{ color: '#735c00' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="font-body-md text-on-surface-variant text-center mb-8">
          {isLogin ? 'Sign in to access your orders and preferences.' : 'Join us for an exclusive bespoke experience.'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-body-md rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-body-md rounded">
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block font-label-md text-on-surface mb-2 uppercase tracking-widest text-xs">Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-surface-white border border-outline-variant/50 px-4 py-3 outline-none focus:border-primary transition-colors font-body-md text-on-surface"
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}
          
          <div>
            <label className="block font-label-md text-on-surface mb-2 uppercase tracking-widest text-xs">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-white border border-outline-variant/50 px-4 py-3 outline-none focus:border-primary transition-colors font-body-md text-on-surface"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-label-md text-on-surface uppercase tracking-widest text-xs">Password</label>
              {isLogin && (
                <a href="#" className="font-label-sm text-primary hover:underline text-xs">Forgot Password?</a>
              )}
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-white border border-outline-variant/50 px-4 py-3 outline-none focus:border-primary transition-colors font-body-md text-on-surface"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white font-label-md uppercase tracking-widest py-4 hover:bg-on-surface transition-colors duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <div className="border-t border-outline-variant/30 flex-grow"></div>
          <span className="px-4 font-label-sm text-secondary uppercase tracking-widest text-xs">Or continue with</span>
          <div className="border-t border-outline-variant/30 flex-grow"></div>
        </div>

        <button 
          type="button"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setError(null);
            try {
              const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  redirectTo: `${window.location.origin}/dashboard`
                }
              });
              if (error) throw error;
            } catch (err: any) {
              setError(err.message || 'Failed to authenticate with Google.');
              setLoading(false);
            }
          }}
          className="w-full bg-surface-white border border-outline-variant/50 text-on-surface font-label-md uppercase tracking-widest py-4 hover:bg-surface-container-low transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>

        <div className="mt-8 text-center border-t border-outline-variant/20 pt-6">
          <p className="font-body-md text-on-surface-variant flex flex-col md:flex-row items-center justify-center gap-2">
            <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setMessage(null);
              }} 
              type="button"
              className="font-label-md text-primary hover:underline uppercase tracking-widest text-sm"
            >
              {isLogin ? 'Create one' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
