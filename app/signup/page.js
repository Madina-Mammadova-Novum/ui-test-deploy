import { metaData } from '@/adapters/metaData';
import { AuthWrapper, Signup } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Sign Up',
      },
    },
  });
}

export default function SignUp() {
  return (
    <AuthWrapper title="Registration" containerClass="w-full px-10 3md:px-0 pt-5 col-start-1 3md:col-start-2">
      <Signup />
    </AuthWrapper>
  );
}
