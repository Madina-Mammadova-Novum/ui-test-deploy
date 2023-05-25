const FieldsetWrapper = ({ children }) => {
  let customWrapper
  return <div className={`bg-white rounded-base ${customWrapper ? '' : 'border-2 border-solid border-gray-darker'} p-5 w-full`}>{children}</div>;
};

export default FieldsetWrapper;
