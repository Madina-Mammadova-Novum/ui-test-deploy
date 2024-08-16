export const ChatHelpLoader = () => {
  return Array.from({ length: 1 }, (_, index) => (
    <div key={index} className="flex h-10 items-center gap-y-4 space-x-4">
      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300" />
      <div className="flex-1">
        <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-gray-300" />
        <div className="mt-2 h-2 w-1/2 animate-pulse rounded bg-gray-300" />
      </div>
    </div>
  ));
};
