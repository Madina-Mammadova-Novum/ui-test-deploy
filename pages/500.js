import { NotFound } from '@/modules';

export const metadata = {
  title: 'Internal Server Error',
};

export default function Custom500() {
  return <NotFound code="500" message="Server Error" />;
}
