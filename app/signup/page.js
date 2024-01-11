import { AuthWrapper, Signup } from '@/modules';

export default async function SignUp() {
  return (
    <AuthWrapper title="Registration" containerClass="w-full px-10 3md:px-0 pt-5 col-start-1 3md:col-start-2">
      <Signup />
    </AuthWrapper>
  );
}
