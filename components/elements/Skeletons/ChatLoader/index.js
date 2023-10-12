export const ChatLoader = () => {
  return Array.from({ length: 3 }, (_, index) => (
    <div key={index} className="flex items-center space-x-4 p-4">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-y-1.5 self-start">
          <div className="h-2 bg-gray-300 rounded animate-pulse w-16" />
          <div className="h-4 bg-gray-300 rounded animate-pulse w-28" />
          <div className="h-2 bg-gray-300 rounded animate-pulse w-10" />
        </div>
        <div className="flex flex-col gap-y-1.5 self-end">
          <div className="h-2 bg-gray-300 rounded animate-pulse w-16 ml-auto" />
          <div className="h-4 bg-gray-300 rounded animate-pulse w-28 ml-auto" />
          <div className="h-2 bg-gray-300 rounded animate-pulse w-10 ml-auto" />
        </div>
      </div>
    </div>
  ));
};
