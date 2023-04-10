import { navigationAdapter } from '@/adapters/navigation';
import { getData } from '@/utils/dataFetching';

export const getNavigation = async (navigation, locale) => {
  const { data } = await getData(`navigation/${navigation}?locale=${locale}`);
  return navigationAdapter({ data });
};
