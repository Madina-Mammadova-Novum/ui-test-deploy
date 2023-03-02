import { Seo } from '@/modules';

const seo = {
  metaTitle: 'negotiating',
};
export default function Head() {
  return <Seo seo={seo} />;
}
