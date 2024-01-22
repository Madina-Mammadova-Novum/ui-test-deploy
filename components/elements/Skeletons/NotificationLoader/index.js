import Divider from '@/elements/Divider';

export const NotificationLoader = ({ quantity = 1 }) => {
  return Array.from({ length: quantity }, (_, index) => (
    <div key={index} className="flex flex-col space-y-4 p-4">
      <Divider className="w-full mb-4" />
      <div className="flex items-start space-x-4 rounded-md animate-pulse">
        <div className="h-4 w-4 rounded bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-2 w-full bg-gray-200 rounded" />
          <div className="h-2 w-1/2 bg-gray-200 rounded" />
        </div>
        <div className="justify-end items-end space-y-2">
          <div className="h-2 ml-auto w-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  ));
};
