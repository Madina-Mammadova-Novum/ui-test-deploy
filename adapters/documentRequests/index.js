import { arrayAdapter, objectAdapter } from '@/adapters/common';

export const documentRequestsResponseAdapter = (data) => {
  if (!data) return arrayAdapter(data);

  let processedData;

  // If data is an array, use it directly
  if (Array.isArray(data)) {
    processedData = data;
  }
  // If data is an object with a data property containing an array
  else if (data.data && Array.isArray(data.data)) {
    processedData = data.data;
  }
  // If data is a single object, wrap it in an array
  else {
    processedData = [objectAdapter(data)];
  }

  // Sort by deadline from newest to oldest (most recent deadline first)
  const sortedData = processedData.sort((a, b) => {
    const dateA = new Date(a.deadline || 0);
    const dateB = new Date(b.deadline || 0);
    return dateB - dateA; // Descending order (newest first)
  });

  return arrayAdapter(sortedData);
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
