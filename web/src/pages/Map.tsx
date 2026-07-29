import { useEffect, useMemo, useState } from 'react';
import {
  CircleMarker,
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import LazyMotion from '@/components/ui/LazyMotion';
import { format } from 'date-fns';
import { useAuth } from '@/store/auth';
import { useSocket } from '@/hooks/useSocket';
import { usePosition } from '@/hooks/usePosition';
import { userToDTO, type Message } from '@/lib/types';

// Hide default marker icon assets warning
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], map.getZoom(), { duration: 0.6 });
  }, [lat, lng, map]);
  return null;
}

function zoomForDistance(km: number) {
  if (km <= 5) return 12;
  if (km <= 20) return 11;
  if (km <= 70) return 9;
  if (km <= 120) return 8;
  return 7;
}

export function MapPage() {
  const { user } = useAuth();
  const { socket, connected } = useSocket();
  const { pos } = usePosition();
  const [messages, setMessages] = useState<Message[]>([]);

  // Simple client-side clustering: group messages by rounded lat/lng to avoid
  // pulling a heavy clustering dependency. This is fast and dependency-free.
  const clusters = useMemo(() => {
    const m = new Map();
    const precision = 2; // ~0.01 deg ~ ~1km at equator; tweak as needed
    for (const msg of messages) {
      if (!msg.geolocation_lat || !msg.geolocation_lng) continue;
      const key = `${Number(msg.geolocation_lat).toFixed(precision)}|${Number(
        msg.geolocation_lng,
      ).toFixed(precision)}`;
      const entry = m.get(key) || { msgs: [], latSum: 0, lngSum: 0 };
      entry.msgs.push(msg);
      entry.latSum += Number(msg.geolocation_lat);
      entry.lngSum += Number(msg.geolocation_lng);
      m.set(key, entry);
    }
    const out = [];
    for (const [, v] of m.entries()) {
      const count = v.msgs.length;
      const lat = v.latSum / count;
      const lng = v.lngSum / count;
      out.push({ count, lat, lng, messages: v.msgs });
    }
    return out;
  }, [messages]);

  // Load Leaflet CSS only when map page mounts to reduce initial bundle/style cost
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById('leaflet-css')) return;
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.crossOrigin = '';
    document.head.appendChild(link);
    return () => {
      // keep stylesheet for subsequent navigations; do not remove immediately
    };
  }, []);

  useEffect(() => {
    if (!user || !pos) return;
    const join = () =>
      socket.emit('join', {
        user: userToDTO({
          ...user,
          geo: { ...user.geo, coord: { lat: pos.lat, lng: pos.lng } },
          socketID: socket.id || '',
          room: 'public',
        }),
      });
    if (connected) {
      join();
      socket.emit('getMessages');
    }
    socket.on('connect', join);
    const onProximity = (msgs: Message[]) =>
      setMessages(msgs.filter((m) => m.geolocation_lat && m.geolocation_lng));
    socket.on('messagesInProximity', onProximity);
    return () => {
      socket.off('connect', join);
      socket.off('messagesInProximity', onProximity);
    };
  }, [socket, connected, user, pos]);

  const center: [number, number] = useMemo(() => {
    if (pos) return [pos.lat, pos.lng];
    if (user?.geo.coord) return [user.geo.coord.lat, user.geo.coord.lng];
    return [47.3769, 8.5417]; // Zurich fallback
  }, [pos, user]);

  const zoom = zoomForDistance(user?.geo.preferedDistance ?? 40);
  const radiusMeters = (user?.geo.preferedDistance ?? 40) * 1000;

  return (
    <div className="relative h-full pb-16 md:pb-0">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom zoomControl className="size-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyTo lat={center[0]} lng={center[1]} />
        <Circle
          center={center}
          radius={radiusMeters}
          pathOptions={{
            color: 'rgb(59 130 246)',
            fillColor: 'rgb(59 130 246)',
            fillOpacity: 0.06,
            weight: 1,
          }}
        />
        <CircleMarker
          center={center}
          radius={8}
          pathOptions={{ color: '#fff', weight: 2, fillColor: 'rgb(59 130 246)', fillOpacity: 1 }}
        />
        {clusters.map((c, idx) =>
          c.count === 1 ? (
            <Marker key={`m-${idx}`} position={[c.lat, c.lng]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{c.messages[0].fromuser}</div>
                  <div className="mt-1">{c.messages[0].content}</div>
                  <div className="mt-1 text-xs text-fg-subtle">
                    {format(
                      new Date(
                        Number(c.messages[0].createdat) || Date.parse(c.messages[0].createdat),
                      ),
                      'PPp',
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : (
            <Marker key={`cluster-${idx}`} position={[c.lat, c.lng]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{c.count} messages</div>
                  <div className="mt-1 text-xs text-fg-subtle">
                    {c.messages.slice(0, 5).map((msg: Message) => (
                      <div key={msg.messageID} className="mt-1">
                        <div className="font-medium">{msg.fromuser}</div>
                        <div>{msg.content}</div>
                      </div>
                    ))}
                    {c.count > 5 && <div className="mt-1 text-xs">and {c.count - 5} more...</div>}
                  </div>
                </div>
              </Popup>
            </Marker>
          ),
        )}
      </MapContainer>

      <LazyMotion
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-none absolute inset-x-0 top-3 z-[400] flex justify-center"
      >
        <div className="pointer-events-auto rounded-full border border-border bg-bg-elevated/95 px-4 py-1.5 text-xs text-fg-muted shadow-soft backdrop-blur">
          {messages.length} messages within {user?.geo.preferedDistance ?? 0} km
        </div>
      </LazyMotion>
    </div>
  );
}
