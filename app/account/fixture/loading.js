import { Loader } from '@/elements';

export default function Loading() {
  return (
    <div className="relative h-[80vh]">
      <Loader className="h-8 w-8 absolute top-1/2" />
    </div>
  );
}
