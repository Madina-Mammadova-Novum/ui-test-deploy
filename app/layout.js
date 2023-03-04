// import LayoutManager from '@/common/LayoutManager';

export const metadata = {
  title: {
    default: 'Shiplink',
    template: '%s | Shiplink',
  },
};
export default function RootLayout(props) {
  const { children } = props;
  return children;
  // return <LayoutManager>{children}</LayoutManager>;
}
