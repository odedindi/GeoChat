import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FieldError, Input, Label } from '@/components/ui/Input';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/store/auth';
import type { User } from '@/lib/types';

const schema = z
  .object({
    username: z
      .string()
      .min(2, 'Please choose a username')
      .regex(/^[\w.-]+$/, 'Only letters, numbers, dots, dashes, underscores'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'At least 8 characters'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ['confirm'],
    message: 'Passwords do not match',
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

export function Signup() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ username, email, password }: Form) => {
    try {
      const res = await api<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });
      setToken(res.token);
      setUser(toClientUser(res.user));
      toast.success('Account created');
      navigate('/home');
    } catch (err) {
      const message =
        err instanceof ApiError && err.status === 409
          ? 'Username or email is already taken'
          : err instanceof Error
            ? err.message
            : 'Sign up failed';
      toast.error(message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-1 text-sm text-fg-muted">Start chatting with people around you.</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" autoComplete="username" invalid={!!errors.username} {...register('username')} />
            <FieldError>{errors.username?.message}</FieldError>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" invalid={!!errors.email} {...register('email')} />
            <FieldError>{errors.email?.message}</FieldError>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="new-password" invalid={!!errors.password} {...register('password')} />
              <FieldError>{errors.password?.message}</FieldError>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm">Confirm</Label>
              <Input id="confirm" type="password" autoComplete="new-password" invalid={!!errors.confirm} {...register('confirm')} />
              <FieldError>{errors.confirm?.message}</FieldError>
            </div>
          </div>
          <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
            Create account
          </Button>
          <p className="text-center text-sm text-fg-muted">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-brand hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardBody>
    </Card>
  );
}
