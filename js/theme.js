function refreshTheme(){
    if ((sessionStorage.getItem("theme") == "light")) {
        document.getElementById('colMode').setAttribute('href', 'styleLight.css')
        document.getElementById('colModePage').setAttribute('href', '../styleLight.css')}
    else if ((sessionStorage.getItem("theme") == "dark")){
        document.getElementById('colMode').setAttribute('href', 'styleDark.css')
        document.getElementById('colModePage').setAttribute('href', '../styleDark.css')}
    else if ((sessionStorage.getItem("theme") == "beige")){
        document.getElementById('colMode').setAttribute('href', 'styleBeige.css')
        document.getElementById('colModePage').setAttribute('href', '../styleBeige.css')}
}
// (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)

function setNewTheme(newTheme){
    sessionStorage.setItem("theme", newTheme)
    refreshTheme()}

function guidePagesSetup(){
    const pages = "Treaty_of_Shimonoseki,Empire_of_Japan,Retrocession,2-28_Incident,Nationalist_retreat,White_Terror,Economic_Stabilisation_Board,Kaohsiung_EPZ,Ten_Major_Construction_Projects,Industrial_Technology_Research_Institute,UN_General_Assembly_Resolution_2758,Shanghai_Communique,Jimmy_Carter,Tangwai,Kaohsiung_Incident,Founding_of_the_DPP,Lifting_of_martial_law,Lee_Teng-hui,2000_presidential_election,Chen_Shui-bian,March_19_shooting,Ma_Ying-jeou,2016_general_election"
    sessionStorage.setItem("currentPage", 1)
    sessionStorage.setItem("Pages", pages)
    sessionStorage.setItem("guide", 3)
    window.location.href = "pages/" + pages.split(",")[0] + ".html"
}

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


refreshTheme();
window.onload = function onload() {
    

    if (window.location.pathname.split("/").pop().split(".")[0] == "index"){
        sessionStorage.setItem("guide", 0)
    }

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