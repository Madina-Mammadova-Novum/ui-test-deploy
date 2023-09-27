import { Label, Loader, Title } from '@/elements';

export default function Loading() {
  return (
    <section className="flex relative min-h-[90vh] flex-col px-5">
      <div className="flex justify-between items-center pt-5">
        <div className="flex flex-col">
          <Label className="text-xs-sm">Offer stage #2</Label>
          <Title level="1">Pre-fixture</Title>
        </div>
      </div>
      <Loader className="h-8 w-8 absolute top-1/2" />
    </section>
  );
}
