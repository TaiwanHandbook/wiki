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

window.onload = function onload() {
    if (sessionStorage.getItem("guide") == null){
        document.getElementById("infodiv").style.height = "90vh"
        document.getElementById("progressFlex").style.display = "none"
        document.getElementById("homeLinkPath").style.display = "none"
    }
    else {
        //if enters with code 1
        if (parseInt(sessionStorage.getItem("guide")) == 1){
            if (sessionStorage.getItem("Pages").split(",").includes(window.location.pathname.split("/").pop().split(".")[0])){
                init(true)
                sessionStorage.setItem("currentPage", sessionStorage.getItem("Pages").split(",").indexOf(window.location.pathname.split("/").pop().split(".")[0])+1)
            }
            else{
                init(false)
            }
        
        }
        // if enters with code 2
        else if (parseInt(sessionStorage.getItem("guide")) == 2){
            // NOT ON PATH
            if (sessionStorage.getItem("currentPage") == sessionStorage.getItem("Pages").split(",").indexOf(window.location.pathname.split("/").pop().split(".")[0])+1){
               init(true)}
            else {
                init(false)}
        }
        // if enters with code 3
        else if (parseInt(sessionStorage.getItem("guide")) == 3){
            // ON PATH
            init(true)
            // codes and path history is taken care of at the button functions
        sessionStorage.setItem("guide", 1)}

        // set progress indicator
        document.getElementById("progress").style.width = String(parseInt(sessionStorage.getItem("currentPage")) / sessionStorage.getItem("Pages").split(",").length * 100) + "%"
        document.getElementById("progressSpan").textContent = String(sessionStorage.getItem("currentPage")) + " / " + String(sessionStorage.getItem("Pages").split(",").length)
    }



    // --------------- //

    // resize
    document.getElementById("infodiv").style.height = window.innerHeight - document.getElementById("progressFlex").offsetHeight - document.getElementById("homeFlex").offsetHeight
    addEventListener("resize", (event) => {
        document.getElementById("infodiv").style.height = window.innerHeight - document.getElementById("progressFlex").offsetHeight - document.getElementById("homeFlex").offsetHeight
    });
}