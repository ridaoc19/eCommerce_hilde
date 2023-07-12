import React from 'react';

function Success({ name }: { name: string | undefined }) {
  return (
    <div>
      {`Bienvenido ${name}`}
    </div>
  );
}

export default Success;