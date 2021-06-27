
function getRoot(){
    const loc = window.location;
    var path = loc.pathname
    if path.endsWith(".html") {
        path = path.substr(0, path.lastIndexOf("/"));
    }
    return loc.protocol + loc.hostname + path + "/";
}