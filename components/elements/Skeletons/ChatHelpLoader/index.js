export const ChatHelpLoader = () => {
  return Array.from({ length: 1 }, (_, index) => (
    <div key={index} className="flex items-center space-x-4 gap-y-4 h-10">
      <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse" />
      <div className="flex-1">
        <div className="h-3 w-1/3 bg-gray-300 rounded animate-pulse mt-2" />
        <div className="h-2 w-1/2 bg-gray-300 rounded animate-pulse mt-2" />
      </div>
    </div>
  ));
};
