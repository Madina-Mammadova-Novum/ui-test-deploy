import { portOptionsAdapter } from '@/adapters';
import { countryOptionsAdapter } from '@/adapters/countryOption';
import { metaData } from '@/adapters/metaData';
import { AuthWrapper, Signup } from '@/modules';
import { getCountries, getPorts } from '@/services';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Sign Up',
      },
    },
  });
}

const getData = async () => {
  'use server';

  const [countries, ports] = await Promise.all([getCountries(), getPorts()]);

  return {
    countries: countryOptionsAdapter({ data: countries.data }),
    ports: portOptionsAdapter({ data: ports.data }),
  };
};

export default async function SignUp() {
  const data = await getData();

  return (
    <AuthWrapper title="Registration" containerClass="w-full px-10 3md:px-0 pt-5 col-start-1 3md:col-start-2">
      <Signup {...data} />
    </AuthWrapper>
  );
}
