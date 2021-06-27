
function getRoot(){
    const loc = window.location;
    console.log(loc.protocol)
    console.log(loc.hostname)
    console.log(loc.pathname)

    if (loc.hostname == "localhost"){return ""}

    var path = loc.pathname
    console.log(path)
    if (path.endsWith(".html")) {
        path = path.substr(0, path.lastIndexOf("/"));
    }
    console.log(path)

    return loc.protocol + "//" + loc.hostname +"/" + path + "/";
}