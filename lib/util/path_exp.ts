// Copyright 2022 Parthka. All rights reserved. MIT license.

/** Route path to RegExp Function. */
export default (path: string, moreExp?: boolean): RegExp => {
  let str = path.charAt(0) !== "/" ? "^/" : "^";

  for (let i = 0; i < path.length; i++) {
    const c = path.charAt(i);
    if (c === ":") {
      let j, param = "";
      for (j = i + 1; j < path.length; j++) {
        if (/\w/.test(path.charAt(j))) {
          param += path.charAt(j);
        } else {
          break;
        }
      }

      str += !moreExp
        // if !more exp
        ? `(?<${param}>[a-zA-Z0-9_ %@]+)`
        : // if more exp
          `(?<${param}>[a-zA-Z0-9 !@#\$%\\^\&*\)\(+=._;:]+)`;
      i = j - 1;
    } else {
      str += c;
    }
  }
  str += "/?$";
  return new RegExp(str);
};
