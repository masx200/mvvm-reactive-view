import directives from "./directives";
export default function extenddirectives(options: {
  [s: string]: Function;
}): void {
  Object.entries(options).forEach(([key, value]) => {
    if (typeof value !== "function") {
      throw TypeError("invalid directive");
    } else {
      directives[key] = value;
    }
  });
}
