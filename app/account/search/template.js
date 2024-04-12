'use client';

import { AccountNestedLayout } from '@/layouts';

export default function SearchLayout({ children }) {
  const layoutConfig = {
    useExpand: false,
    usePagination: false,
    withActions: false,
    pagination: null,
    onToggle: (v) => v,
    data: { label: null, title: 'Search' },
  };

  return <AccountNestedLayout config={layoutConfig}>{children}</AccountNestedLayout>;
}
