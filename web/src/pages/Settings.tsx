import { useState } from 'react';
import { Moon, Sun, Monitor, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Label } from '@/components/ui/Input';
import { Slider } from '@/components/ui/Slider';
import { Switch } from '@/components/ui/Switch';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/store/auth';
import { useTheme } from '@/store/theme';
import { avatarUrl } from '@/lib/geo';
import { cn } from '@/lib/cn';

export function Settings() {
  const navigate = useNavigate();
  const { user, patchUser, logout } = useAuth();
  const { mode, setMode } = useTheme();

  const [username, setUsername] = useState(user?.username || '');
  const [distance, setDistance] = useState(user?.geo.preferedDistance ?? 40);
  const [beyond, setBeyond] = useState(user?.beSeenBeyondRange ?? false);
  const [avatar, setAvatar] = useState(user?.avatar || '');

  if (!user) return null;

  const dirty =
    username !== user.username ||
    distance !== user.geo.preferedDistance ||
    beyond !== user.beSeenBeyondRange ||
    avatar !== user.avatar;

  const save = () => {
    patchUser({
      username: username.trim() || user.username,
      avatar: avatar || user.avatar,
      beSeenBeyondRange: beyond,
      geo: { ...user.geo, preferedDistance: distance },
    });
    toast.success('Settings saved');
  };

  const onLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-8 md:pb-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Settings</h1>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-base font-medium">Profile</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar src={avatar} alt={username} size={64} />
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setAvatar(avatarUrl(crypto.randomUUID()))}
              >
                Randomize avatar
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="username">Display name</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="distance" hint={<span className="tabular-nums">{distance} km</span>}>
              Conversation radius
            </Label>
            <Slider
              ariaLabel="Distance"
              value={distance}
              min={1}
              max={500}
              step={1}
              onChange={setDistance}
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-medium">Be visible beyond your radius</div>
              <p className="text-xs text-fg-subtle">
                Other people farther than {distance} km can still see your messages.
              </p>
            </div>
            <Switch checked={beyond} onChange={setBeyond} ariaLabel="Be visible beyond radius" />
          </div>
        </CardBody>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-base font-medium">Appearance</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ['light', Sun, 'Light'],
                ['dark', Moon, 'Dark'],
                ['system', Monitor, 'System'],
              ] as const
            ).map(([key, Icon, label]) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-lg border p-3 text-sm transition-colors',
                  mode === key
                    ? 'border-brand bg-brand/5 text-brand'
                    : 'border-border text-fg-muted hover:bg-bg',
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={onLogout}>
          <LogOut className="size-4" />
          Reset profile
        </Button>
        <Button onClick={save} disabled={!dirty}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
