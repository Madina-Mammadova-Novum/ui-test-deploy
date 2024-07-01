import { AuthWrapper, GettingStartedSection } from '@/modules';

export default async function GettingStarted() {
  return (
    <AuthWrapper title="" containerClass="w-full px-10 3md:px-0 pt-5 col-start-1 3md:col-start-2">
      <GettingStartedSection />
    </AuthWrapper>
  );
}
