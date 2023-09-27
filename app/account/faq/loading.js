import { Loader, Title } from '@/elements';

export default function Loading() {
  return (
    <section className="flex relative min-h-[90vh] flex-col px-5">
      <div className="flex justify-between items-center pt-5">
        <div className="flex flex-col">
          <Title level="1">FAQ</Title>
        </div>
      </div>
      <Loader className="h-8 w-8 absolute top-1/2" />
    </section>
  );
}
