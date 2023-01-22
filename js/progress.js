// currentPage: index of the last visited page on the path +1
// Pages: list of the names of the pages on the path
// guide: code
//     null: off
//     1: from branch to ? (undo/redo, default)
//     2: from path to branch (with links)
//     3: from path to path (with buttons)

function redir(newPage) {
    // open page with code 2
    if (sessionStorage.getItem("guide") != null){
        sessionStorage.setItem("guide", 2)}
    window.location.href = newPage +".html";
};

function prevPage () {
    if (sessionStorage.getItem("currentPage") != 1) {
        // if not first, move along to next with code 3
        sessionStorage.setItem("guide", 3)
        sessionStorage.setItem("currentPage", parseInt(sessionStorage.getItem("currentPage"))-1)
        window.location.href = sessionStorage.getItem("Pages").split(",")[parseInt(sessionStorage.getItem("currentPage"))-1] + ".html"
    }
    else {
        window.location.href = "../index.html"
    }
}

function nextPage () {
    if (sessionStorage.getItem("currentPage") != sessionStorage.getItem("Pages").split(",").length) {
        // if not last, move back to previous with code 3
        sessionStorage.setItem("guide", 3)
        sessionStorage.setItem("currentPage", parseInt(sessionStorage.getItem("currentPage"))+1)
        window.location.href = sessionStorage.getItem("Pages").split(",")[parseInt(sessionStorage.getItem("currentPage"))-1] + ".html"
    }
    else {
        window.location.href = "../end.html"
    }
}

function init(onPath){
    if (onPath){
        document.getElementById("infodiv").style.height = "85vh"
        document.getElementById("progressFlex").style.display = "flex"
        document.getElementById("homeLinkPath").style.display = "none"
    }
    else{
        document.getElementById("infodiv").style.height = "90vh"
        document.getElementById("progressFlex").style.display = "none"
        document.getElementById("homeLinkPath").style.display = "initial"
    }
}

// ------------------------------ //

