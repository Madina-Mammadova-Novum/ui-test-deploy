export const ChatLoader = () => {
  return Array.from({ length: 3 }, (_, index) => (
    <div key={index} className="flex items-center space-x-4 p-4">
      <div className="flex w-full flex-col">
        <div className="flex flex-col gap-y-1.5 self-start">
          <div className="h-2 w-16 animate-pulse rounded bg-gray-300" />
          <div className="h-4 w-28 animate-pulse rounded bg-gray-300" />
          <div className="h-2 w-10 animate-pulse rounded bg-gray-300" />
        </div>
        <div className="flex flex-col gap-y-1.5 self-end">
          <div className="ml-auto h-2 w-16 animate-pulse rounded bg-gray-300" />
          <div className="ml-auto h-4 w-28 animate-pulse rounded bg-gray-300" />
          <div className="ml-auto h-2 w-10 animate-pulse rounded bg-gray-300" />
        </div>
      </div>
    </div>
  ));
};
