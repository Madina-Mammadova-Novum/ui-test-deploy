import { Loader } from '@/elements';

export default function Loading() {
  return (
    <section className="flex relative min-h-[90vh] flex-col px-5">
      <Loader className="h-8 w-8 absolute top-1/2" />
    </section>
  );
}
