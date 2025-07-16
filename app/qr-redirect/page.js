'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { DynamicLoader } from '@/elements';

const IOS_URL = 'https://apps.apple.com/app/id1146507477';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.mobillium.papara';

function getMobilePlatform() {
  if (typeof window === 'undefined') return null;
  const ua = window.navigator.userAgent || window.navigator.vendor || window.opera;
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
  return null;
}

export default function QrRedirectPage() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant');

  useEffect(() => {
    if (!variant) return;
    if (variant === 'download') {
      const platform = getMobilePlatform();
      if (platform === 'ios') {
        window.location.replace(IOS_URL);
      } else if (platform === 'android') {
        window.location.replace(ANDROID_URL);
      } else {
        // fallback: show both links
        // Could also redirect to a landing page or show a message
      }
    }
    // Future: handle other variants here
  }, [variant]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <DynamicLoader />
      {/* Optionally, show fallback links if not redirected */}
      {variant === 'download' && (
        <div className="mt-4 text-center text-xs text-gray-500">
          <div>If you are not redirected, choose your platform:</div>
          <div className="mt-2 flex justify-center gap-4">
            <a href={IOS_URL} className="text-blue underline" target="_blank" rel="noopener noreferrer">
              iOS App Store
            </a>
            <a href={ANDROID_URL} className="text-blue underline" target="_blank" rel="noopener noreferrer">
              Google Play
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
