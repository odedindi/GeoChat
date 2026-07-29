import React, { useEffect, useState } from 'react';

// oxlint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { children?: React.ReactNode } & Record<string, any>;

export function LazyMotion(props: Props) {
  const { children, ...rest } = props;
  // oxlint-disable-next-line @typescript-eslint/no-explicit-any
  const [Motion, setMotion] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import('framer-motion')
      .then((m) => {
        if (mounted) setMotion(() => m.motion);
      })
      .catch(() => {
        /* ignore */
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Motion) return <div {...rest}>{children}</div>;
  const MotionDiv = Motion.div;
  return <MotionDiv {...rest}>{children}</MotionDiv>;
}

export default LazyMotion;
