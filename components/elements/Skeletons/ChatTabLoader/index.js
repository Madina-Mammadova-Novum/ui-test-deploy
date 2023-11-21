export const ChatTabLoader = () => {
  return Array.from({ length: 1 }, (_, index) => (
    <div key={index} className="flex items-center space-x-4 p-1 w-[247px]">
      <div className="h-7 w-full bg-gray-300 rounded animate-pulse" />
    </div>
  ));
};
