'use client';

import { useEffect, useState } from 'react';

export default function InAppChecker({ children }) {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    // Access URL parameters directly on the client side
    const urlParams = new URLSearchParams(window.location.search);
    const inApp = urlParams.get('inApp') === 'true';

    // Show component if inApp is not true
    setShowComponent(!inApp);
  }, []);

  // Don't render anything until client-side check is complete
  if (showComponent === false) {
    return null;
  }

  // Render the children if we should show it
  return children;
}
