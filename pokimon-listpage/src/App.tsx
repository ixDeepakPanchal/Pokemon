
import React, { Suspense } from 'react';

// Use React.lazy to load the remote component dynamically
const HostNavbar = React.lazy(() => import('hostApp/Navbar'));

function App() {
  return (
    <div>
      <div className='h-16 bg-fuchsia-400'>sdfgh</div>
      {/* Use Suspense to handle the loading state */}
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <HostNavbar />
      </Suspense>
    </div>
  );
}

export default App;
