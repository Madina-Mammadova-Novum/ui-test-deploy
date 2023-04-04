import { metaData } from '@/adapters/metaData';
import { AuthWrapper, Signup } from '@/modules';

export async function generateMetadata() {
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
    <AuthWrapper title="Registration">
      <Signup />
    </AuthWrapper>
  );
}
