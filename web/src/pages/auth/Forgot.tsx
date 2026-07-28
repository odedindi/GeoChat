import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FieldError, Input, Label } from '@/components/ui/Input';

const schema = z.object({ email: z.string().email('Enter a valid email') });
type Form = z.infer<typeof schema>;

export function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (_values: Form) => {
    toast.success('If that email exists, you’ll receive a reset link shortly.');
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
        <p className="mt-1 text-sm text-fg-muted">
          Enter your email and we’ll send you a reset link.
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" invalid={!!errors.email} {...register('email')} />
            <FieldError>{errors.email?.message}</FieldError>
          </div>
          <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
            Send reset link
          </Button>
          <p className="text-center text-sm text-fg-muted">
            <Link to="/auth/login" className="font-medium text-brand hover:underline">
              Back to sign in
            </Link>
          </p>
        </form>
      </CardBody>
    </Card>
  );
}
