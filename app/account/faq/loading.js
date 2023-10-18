import { Loader } from '@/elements';

export default function Loading() {
  return (
    <section className="relative h-full">
      <Loader className="h-8 w-8 absolute top-1/2" />
    </section>
  );
}
