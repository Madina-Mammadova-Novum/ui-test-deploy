// // import { useCallback } from 'react';
// // import { useDispatch } from 'react-redux';
//
// // import { signupSumbitAdapter } from '@/adapters/signupSubmitAdapter';
// import { Form, Step } from '@/elements';
// // import { signupSubmit } from '@/services/signup';
// // import { setCargoes, setRules } from '@/store/entities/signup/slice';
// // import { useSignupSelector } from '@/store/selectors';
// import { CompanyAddresses, CompanyDetails, PersonalDetails, TermsAndConditions } from '@/ui';
// // import { useHookForm } from '@/utils/hooks';
//
// const ChartererForm = () => {
//   // const dispatch = useDispatch();
//   // const [signup] = signupSubmit();
//
//   // const { watch, reset, handleSubmit } = useHookForm();
//
//   // const { rules, role, sameAddress } = useSignupSelector();
//   // const slots = watch('slots.count');
//
//   // const handleRules = useCallback(() => {
//   //   // dispatch(setRules(!rules));
//   // }, [dispatch, rules]);
//
//   // const handleSlots = useCallback(() => {
//   //   dispatch(setCargoes([slots]));
//   // }, [dispatch, slots]);
//
//   // const onSubmit = async (data) => {
//   //   const result = signupSumbitAdapter(role, data, sameAddress);
//   //   await signup({ role, ...result }).unwrap();
//   //   reset();
//   // };
//
//   return (
//     <Form
//       // onSubmit={handleSubmit(onSubmit)}
//       ctaProps={{ text: 'Create account', variant: 'primary', size: 'large' }}
//       // disabled={!rules}
//       className="flex flex-col pt-5"
//     >
//       <hr className="divide" />
//       <Step title="Step #2: Personal details" containerClass="flex flex-col py-5 gap-5">
//         <PersonalDetails />
//       </Step>
//       <hr className="divide" />
//       <Step title="Step #3: Choose who you are" containerClass="flex flex-col py-5 gap-5">
//         <CompanyDetails />
//       </Step>
//       <hr className="divide" />
//       <Step title="Step #4: Company Addresss" containerClass="flex flex-col py-5 gap-5">
//         <CompanyAddresses />
//       </Step>
//       <hr className="divide" />
//       <Step title="Step 5: Recent Chartering Experience" containerClass="flex flex-col py-5 gap-5">
//         {/* <TankerSlotsDetails */}
//         {/*  label="HOW MANY CARGOES HAVE YOU CHARTERED DURING THE LAST 6 MONTHS?" */}
//         {/*  placeholder="Carogoes" */}
//         {/*  onClick={handleSlots} */}
//         {/* /> */}
//       </Step>
//       {/* <TermsAndConditions checked={rules} onChange={handleRules} containerClass="pb-5" /> */}
//     </Form>
//   );
// };
//
// export default ChartererForm;
