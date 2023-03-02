import { Seo } from '@/modules';

const seo = {
  metaTitle: 'Some Page',
};
export default function Head() {
  return <Seo seo={seo} />;
}
