import { metaData } from '@/adapters/metaData';
import { AuthHeader } from '@/elements';
import { ROUTES } from '@/lib';
import { LoginForm, NewAuthWrapper } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      route: ROUTES.LOGIN,
      seo: {
        metaTitle: 'Login',
      },
    },
  });
}

export default function LoginPage() {
  return (
    <NewAuthWrapper containerClass="flex flex-col w-full px-4 md:px-8 3md:mx-auto 3md:max-w-[546px] xl:px-0 gap-8 3md:gap-12">
      <AuthHeader
        logoSrc="/images/dark-logo.png"
        titleText="Log In"
        accountText="Don't have an account yet?"
        linkText="Registration"
        linkHref={ROUTES.SIGNUP}
      />
      <LoginForm />
    </NewAuthWrapper>
  );
}
