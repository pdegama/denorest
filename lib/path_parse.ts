export default (path:string): RegExp => {

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
            //str += `(?<${param}>[a-zA-Z0-9 !@#\$%\\^\&*/\)\(+=._;:]+)`;
            str += `(?<${param}>[a-zA-Z0-9_ %@]+)`;
            i = j - 1;
        } else {
            str += c;
        }
    }
    str += "/?$";
    return new RegExp(str);
}