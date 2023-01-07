document.onkeydown = kpressPage
function kpressPage(e){
    down = true
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode
    if (charCode == 37 && parseInt(sessionStorage.getItem("guide")) == 1) {prevPage()}
    else if (charCode == 39 && parseInt(sessionStorage.getItem("guide")) == 1) {nextPage()}
    else if (charCode == 38) {addInd()}
    else if (charCode == 40) {subInd()}}