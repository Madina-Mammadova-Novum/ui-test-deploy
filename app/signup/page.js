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
    <AuthWrapper title="Registration" containerClass="w-3/4 3md:w-full pt-5 col-start-1 3md:col-start-2">
      <Signup />
    </AuthWrapper>
  );
}
