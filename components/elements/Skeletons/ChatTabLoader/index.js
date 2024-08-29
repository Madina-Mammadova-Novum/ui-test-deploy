export const ChatTabLoader = () => {
  return Array.from({ length: 1 }, (_, index) => (
    <div key={index} className="flex w-[247px] items-center space-x-4 p-1">
      <div className="h-7 w-full animate-pulse rounded bg-gray-300" />
    </div>
  ));
};
