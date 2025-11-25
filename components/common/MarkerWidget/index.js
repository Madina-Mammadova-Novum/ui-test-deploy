'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import markerSDK from '@marker.io/browser';

import { getAuthSelector } from '@/store/selectors';

const MarkerWidget = () => {
  const { session } = useSelector(getAuthSelector);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const lastAuthState = useRef(null);

  useEffect(() => {
    const maintenanceMode =
      process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' && process.env.NODE_ENV === 'production';

    // Skip widget loading in maintenance mode
    if (maintenanceMode) {
      return;
    }

    const updateMarkerReporter = async () => {
      try {
        const isAuthenticated = !!session?.accessToken;
        const authStateChanged = lastAuthState.current !== isAuthenticated;
        lastAuthState.current = isAuthenticated;

        // Default values for anonymous users
        let reporterEmail = 'info@ship.link';
        let reporterName = 'Website Visitor';

        // If user is authenticated, get data from session
        if (isAuthenticated && session?.user) {
          const { name, email } = session.user;

          // Use session data if valid (not undefined)
          if (email && email !== 'undefined') {
            reporterEmail = email;
          }
          if (name && name !== 'undefined') {
            reporterName = name;
          }
        }

        // Get project ID from environment variable
        const markerProjectId = process.env.NEXT_PUBLIC_MARKER_PROJECT_ID;

        console.log({ markerProjectId });
        // Skip if project ID is not configured
        if (!markerProjectId) {
          console.warn('Marker.io project ID not configured. Set NEXT_PUBLIC_MARKER_PROJECT_ID in your environment.');
          return;
        }

        // If widget not loaded yet, load it with user identification
        if (!widgetLoaded) {
          await markerSDK.loadWidget({
            project: markerProjectId,
            reporter: {
              email: reporterEmail,
              fullName: reporterName,
            },
          });
          setWidgetLoaded(true);
        } else if (authStateChanged) {
          // Widget already loaded, update reporter info when auth state changes (login/logout)
          if (window.Marker) {
            window.Marker.setReporter({
              email: reporterEmail,
              fullName: reporterName,
            });
          }
        }
      } catch (error) {
        // Silently fail to avoid breaking the app if Marker.io fails to load
        console.error('Failed to load/update Marker.io widget:', error);
      }
    };

    updateMarkerReporter();
  }, [session?.accessToken, session?.user?.name, session?.user?.email, widgetLoaded]);

  // This component doesn't render anything visible
  return null;
};

export default MarkerWidget;
