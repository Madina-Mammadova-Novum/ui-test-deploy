import Divider from '@/elements/Divider';

export const NotificationLoader = ({ quantity = 1 }) => {
  return Array.from({ length: quantity }, (_, index) => (
    <div key={index} className="flex flex-col space-y-4 p-4">
      <Divider className="mb-4 w-full" />
      <div className="flex animate-pulse items-start space-x-4 rounded-md">
        <div className="h-4 w-4 rounded bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-2 w-full rounded bg-gray-200" />
          <div className="h-2 w-1/2 rounded bg-gray-200" />
        </div>
        <div className="items-end justify-end space-y-2">
          <div className="ml-auto h-2 w-4 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  ));
};
