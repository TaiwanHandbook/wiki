window.onload = function onload() {
    document.getElementById("infodiv").style.height = "90vh"
    document.getElementById("progressFlex").style.display = "none"
    //document.getElementById("homeFlex1").style.width = "60%"
    document.getElementById("homeLinkPath").style.display = "none"
    if (parseInt(sessionStorage.getItem("guide")) == 1){
        
        if (sessionStorage.getItem("Pages").split(",").includes(window.location.pathname.split("/").pop().split(".")[0])){
            sessionStorage.setItem("currentPage", sessionStorage.getItem("Pages").split(",").indexOf(window.location.pathname.split("/").pop().split(".")[0])+1)

            document.getElementById("infodiv").style.height = "85vh"
            document.getElementById("progressFlex").style.display = "flex"

            //document.getElementById("homeFlex1").style.width = "60%"
            document.getElementById("homeLinkPath").style.display = "none"

            sessionStorage.setItem("guide", 1)
        }
        else {
            //document.getElementById("homeFlex1").style.width = "66%"
            document.getElementById("homeLinkPath").style.display = "initial"

            document.getElementById("infodiv").style.height = "90vh"
            document.getElementById("progressFlex").style.display = "none"
        }
    }
    else if (parseInt(sessionStorage.getItem("guide")) == 2){
        //document.getElementById("homeFlex1").style.width = "66%"
        document.getElementById("homeLinkPath").style.display = "initial"

        document.getElementById("infodiv").style.height = "90vh"
        document.getElementById("progressFlex").style.display = "none"
    }
    else if (parseInt(sessionStorage.getItem("guide")) == 3){
        document.getElementById("infodiv").style.height = "85vh"
        document.getElementById("progressFlex").style.display = "flex"

        //document.getElementById("homeFlex1").style.width = "60%"
        document.getElementById("homeLinkPath").style.display = "none"
        sessionStorage.setItem("guide", 1)
    }
    sessionStorage.setItem("pageHistory", window.location.pathname)

    document.getElementById("progress").style.width = String(parseInt(sessionStorage.getItem("currentPage")) / sessionStorage.getItem("Pages").split(",").length * 100) + "%"
    document.getElementById("progressSpan").textContent = String(sessionStorage.getItem("currentPage")) + " / " + String(sessionStorage.getItem("Pages").split(",").length)
    
    document.getElementById("infodiv").style.height = window.innerHeight - document.getElementById("progressFlex").offsetHeight - document.getElementById("homeFlex").offsetHeight
    addEventListener("resize", (event) => {
        document.getElementById("infodiv").style.height = window.innerHeight - document.getElementById("progressFlex").offsetHeight - document.getElementById("homeFlex").offsetHeight
    });
}


function linkClick() {
    sessionStorage.setItem("guide", 2)
}

function prevPage () {
    if (sessionStorage.getItem("currentPage") != 1) {
        sessionStorage.setItem("currentPage", parseInt(sessionStorage.getItem("currentPage"))-1)
        window.location.href = sessionStorage.getItem("Pages").split(",")[parseInt(sessionStorage.getItem("currentPage"))-1] + ".html"
        sessionStorage.setItem("guide", 3)
    }
    else {
        window.location.href = "../index.html"
    }
}

function nextPage () {
    if (sessionStorage.getItem("currentPage") != sessionStorage.getItem("Pages").split(",").length) {
        sessionStorage.setItem("currentPage", parseInt(sessionStorage.getItem("currentPage"))+1)
        window.location.href = sessionStorage.getItem("Pages").split(",")[parseInt(sessionStorage.getItem("currentPage"))-1] + ".html"
        sessionStorage.setItem("guide", 3)
    }
    else {
        window.location.href = "../end.html"
    }
}