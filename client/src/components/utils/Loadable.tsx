import React, { ComponentType, PropsWithChildren, Suspense } from 'react';

const Loadable = <P extends Record<string, unknown>>(Component: ComponentType<P>): React.FC<P> => (props: PropsWithChildren<P>) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;