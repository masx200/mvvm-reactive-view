export { createcssBlob };
function createcssBlob(source: string) {
  return URL.createObjectURL(new Blob([source], { type: "text/css" }));
}
