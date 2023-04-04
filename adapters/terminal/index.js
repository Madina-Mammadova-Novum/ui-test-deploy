export const terminalAdapter = ({ data }) => {
  if (data === null) return [];
  const {
    id,
    name,
    terminalCode,
    maxLOA,
    maxBeam,
    maxDraft,
    maxDWT,
    maxUKC,
    isActive,
    shipTypes,
    shipSizes,
    cargoTypes,
    // portId
  } = data;

  return {
    id,
    name,
    code: terminalCode,
    max: {
      loa: maxLOA,
      beam: maxBeam,
      draft: maxDraft,
      dwt: maxDWT,
      uks: maxUKC,
    },
    isActive,
    shipTypes,
    shipSizes,
    cargoTypes,
  };
};

export const terminalsAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((terminal) => {
    return terminalAdapter({ data: terminal });
  });
};
