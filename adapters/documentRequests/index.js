import { arrayAdapter, objectAdapter } from '@/adapters/common';

export const documentRequestsResponseAdapter = (data) => {
  if (!data) return arrayAdapter(data);

  // If data is an array, return it directly with array adapter
  if (Array.isArray(data)) {
    return arrayAdapter(data);
  }

  // If data is an object with a data property containing an array
  if (data.data && Array.isArray(data.data)) {
    return arrayAdapter(data.data);
  }

  // If data is a single object, wrap it in an array
  return arrayAdapter([objectAdapter(data)]);
};

export const createDocumentRequestAdapter = (data) => {
  return objectAdapter(data);
};

export const documentRequestsRequestAdapter = (formData) => {
  if (!formData) return objectAdapter(formData);

  // Transform selectedDocuments array to the expected API format
  const transformedData = {
    ...formData,
    requestedFiles: (formData.selectedDocuments || [])
      .filter(Boolean) // Remove null/undefined values
      .map((documentName) => ({
        name: documentName,
      })),
  };

  // Remove selectedDocuments from the payload since we've transformed it to requestedFiles
  delete transformedData.selectedDocuments;

  return objectAdapter(transformedData);
};
