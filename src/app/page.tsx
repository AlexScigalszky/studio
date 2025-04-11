import React, { Suspense } from 'react';
import HomeClient from './home-client';

export default function Home() {    
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <HomeClient />
        </Suspense>
    </div>
  );
}
