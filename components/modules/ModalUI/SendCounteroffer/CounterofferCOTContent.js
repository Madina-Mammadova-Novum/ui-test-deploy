import { FormDropdown, Input } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const CounterofferCOTContent = () => {
  const { control } = useHookForm();

  return (
    <div className="pb-5">
      <h3>Commercial offer terms</h3>
      <FormDropdown
        label="cargo type"
        defaultValue="Crude Oil"
        control={control}
        id="cargo_type"
        disabled
        customStyles="max-w-[296px] mt-3"
      />
      {[1, 2].map(() => (
        <div className="flex items-center mt-3 gap-x-5">
          <FormDropdown
            label="product #1"
            defaultValue="Light Crude Oil"
            control={control}
            id="product_1"
            disabled
            customStyles="w-[296px]"
          />
          <Input label="Density" placeholder="mt/m³" customStyles="max-w-[138px]" />
          <Input label="min quantity" placeholder="tons" customStyles="max-w-[138px]" />
        </div>
      ))}
      <div className="flex gap-x-5 items-center mt-3">
        <FormDropdown label="Freight" control={control} id="cargo_type" customStyles="max-w-[138px]" />
        <Input label="Value" type="number" placeholder="WS" customStyles="max-w-[138px]" />
      </div>

      <Input label="Demurrage rate" placeholder="Daily payment" customStyles="max-w-[296px] mt-3" />

      <div className="flex gap-x-5">
        <Input
          label="lay time"
          helperText="The maximum laytime is 100 hours"
          placeholder="Daily payment"
          customStyles="w-full max-w-[296px] mt-3 "
        />
        <Input label="nor" placeholder="Daily payment" value="6+6" disabled customStyles="w-full max-w-[296px] mt-3" />
      </div>

      <FormDropdown
        label="undisputed demurrage payment terms"
        control={control}
        id="undisputed_demurrage"
        customStyles="mt-3"
      />

      <FormDropdown label="payemnt terms" control={control} id="payment_teerms" customStyles="mt-3" />
    </div>
  );
};

export default CounterofferCOTContent;
