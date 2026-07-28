import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Label } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { usePosition } from '@/hooks/usePosition';
import { useAuth } from '@/store/auth';

export function Home() {
  const navigate = useNavigate();
  const { pos, error, loading } = usePosition();
  const { user, bootstrapLocalUser, patchUser } = useAuth();

  const [username, setUsername] = useState(user?.username || '');
  const [distance, setDistance] = useState(user?.geo.preferedDistance ?? 40);

  // Keep distance in sync once user exists in store
  useEffect(() => {
    if (user) patchUser({ geo: { ...user.geo, preferedDistance: distance } });
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [distance]);

  const canContinue = Boolean(username.trim()) && !!pos;

  const onContinue = () => {
    if (!pos) return;
    bootstrapLocalUser(username.trim(), { lat: pos.lat, lng: pos.lng });
    navigate('/chat');
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-stretch px-4 pb-24 pt-10 md:pb-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Hey there 👋</h1>
          <p className="mt-2 text-fg-muted">Choose a name and set how far you want to chat.</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-base font-medium">Your profile</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="username">Display name</Label>
              <Input
                id="username"
                placeholder="e.g. alex"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                maxLength={24}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="distance" hint={<span className="tabular-nums">{distance} km</span>}>
                Conversation radius
              </Label>
              <Slider
                ariaLabel="Conversation radius in kilometers"
                value={distance}
                min={1}
                max={500}
                step={1}
                onChange={setDistance}
              />
              <p className="text-xs text-fg-subtle">
                You’ll only see and be seen by people inside this radius.
              </p>
            </div>

            <LocationStatus pos={pos} error={error} loading={loading} />
          </CardBody>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button onClick={onContinue} disabled={!canContinue} size="lg" className="min-w-40">
            Enter chat
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function LocationStatus({
  pos,
  error,
  loading,
}: {
  pos: { lat: number; lng: number } | null;
  error: string | null;
  loading: boolean;
}) {
  if (error) {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
        <AlertCircle className="mt-0.5 size-4 shrink-0" />
        <div>
          <div className="font-medium">Location required</div>
          <div className="text-danger/80">{error}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-bg p-3 text-sm">
      <MapPin className="size-4 text-brand" />
      {loading ? (
        <span className="text-fg-muted">Locating you…</span>
      ) : pos ? (
        <span className="text-fg-muted">
          You’re at{' '}
          <span className="font-mono text-fg">
            {pos.lat.toFixed(3)}, {pos.lng.toFixed(3)}
          </span>
        </span>
      ) : (
        <span className="text-fg-muted">Waiting for location…</span>
      )}
    </div>
  );
}
