/* 
        
        [["value",["f","f"]],["value",["f","f"]]]


        [["value",["f","f","f","f"]]]
        
        */
export function merge_entries(
  a: [string, any][] /* Array<[any, Array<any>]> */
): [string, any][] {
  const m: { [s: string]: Set<any> } = {};

  a.forEach(([key, value]) => {
    if (!m[key]) {
      m[key] = new Set();
    }
    // m[key] && (m[key] = new Set());

    value.forEach((v: any) => {
      m[key].add(v);
    });
  });
  return Object.entries(m).map(([k, v]) => [k, [...v]]);
}
