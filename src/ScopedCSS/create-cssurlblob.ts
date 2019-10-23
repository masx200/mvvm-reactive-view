export { createcssBlob };
function createcssBlob(source: string): string {
  const cachedBlob = sourcecssblobCache.get(source);
  if (cachedBlob) {
    return cachedBlob;
  } else {
    const bloburl = URL.createObjectURL(
      new Blob([source], { type: "text/css" })
    );
    sourcecssblobCache.set(source, bloburl);
    return bloburl;
  }
}
const sourcecssblobCache = new Map<string, string>();
