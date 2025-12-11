const makeSlugFrom = (
  signature: string,
  from?: string,
  isRandom?: boolean
) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  if (!from) return `truckflow-${signature}-${randomString}-${timestamp}`;
  const normalizedFrom = from
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (!isRandom) return `truckflow-${signature}-${normalizedFrom}-${timestamp}`;
  return `truckflow-${signature}-${normalizedFrom}-${randomString}-${timestamp}`;
};
export default makeSlugFrom;
