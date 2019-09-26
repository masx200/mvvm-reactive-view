/* 
        
        [["value",["f","f"]],["value",["f","f"]]]


        [["value",["f","f","f","f"]]]
        
        */
export function merge_entries(a: Array<[any, Array<any>]>) {
  const m: { [s: string]: Set<any> } = {};

  a.forEach(([key, value]) => {
    if (!m[key]) {
      m[key] = new Set();
    }
    // m[key] && (m[key] = new Set());

    value.forEach(v => {
      m[key].add(v);
    });
  });
  return Object.entries(m).map(([k, v]) => [k, Array.from(v)]);
}
