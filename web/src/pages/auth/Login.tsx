import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FieldError, Input, Label } from '@/components/ui/Input';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/store/auth';
import type { User } from '@/lib/types';

const schema = z.object({
  identifier: z.string().min(2, 'Enter your username or email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
type Form = z.infer<typeof schema>;

type AuthResponse = {
  token: string;
  user: {
    userID: string;
    username: string;
    avatar: string;
    socketID: string;
    room: string;
    preferedDistance: number;
    geolocation_lat: number;
    geolocation_lng: number;
    beSeenBeyondRange: boolean;
  };
};

function toClientUser(u: AuthResponse['user']): User {
  return {
    userID: u.userID,
    username: u.username,
    avatar: u.avatar,
    socketID: u.socketID,
    room: u.room,
    beSeenBeyondRange: u.beSeenBeyondRange,
    geo: {
      coord: { lat: u.geolocation_lat, lng: u.geolocation_lng },
      preferedDistance: u.preferedDistance,
    },
  };
}

export function Login() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Form) => {
    try {
      const res = await api<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      setToken(res.token);
      setUser(toClientUser(res.user));
      toast.success(`Welcome back, ${res.user.username}`);
      navigate('/home');
    } catch (err) {
      const message =
        err instanceof ApiError && err.status === 401
          ? 'Invalid credentials'
          : err instanceof Error
            ? err.message
            : 'Login failed';
      toast.error(message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-fg-muted">Sign in to keep chatting nearby.</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="identifier">Username or email</Label>
            <Input
              id="identifier"
              autoComplete="username"
              invalid={!!errors.identifier}
              {...register('identifier')}
            />
            <FieldError>{errors.identifier?.message}</FieldError>
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              hint={
                <Link to="/auth/forgot" className="text-brand hover:underline">
                  Forgot?
                </Link>
              }
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                invalid={!!errors.password}
                className="pr-11"
                {...register('password')}
              />
              <button
                type="button"
                aria-label={showPw ? 'Hide password' : 'Show password'}
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-fg-muted hover:bg-bg hover:text-fg"
              >
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <FieldError>{errors.password?.message}</FieldError>
          </div>
          <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
            Sign in
          </Button>
          <p className="text-center text-sm text-fg-muted">
            Don&apos;t have an account?{' '}
            <Link to="/auth/signup" className="font-medium text-brand hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </CardBody>
    </Card>
  );
}
