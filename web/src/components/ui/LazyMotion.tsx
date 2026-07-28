import React, { useEffect, useState } from 'react';

type Props = { children?: React.ReactNode } & { [key: string]: any };

export function LazyMotion(props: Props) {
  const { children, ...rest } = props;
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
