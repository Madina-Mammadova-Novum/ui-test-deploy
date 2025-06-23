import { NewAuthWrapper, Signup } from '@/modules';

export default async function SignUp() {
  return (
    <NewAuthWrapper containerClass="flex flex-col w-full max-w-[1152px] px-4 md:px-8 xl:px-0">
      <Signup />
    </NewAuthWrapper>
  );
}
