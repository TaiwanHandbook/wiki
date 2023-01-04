var index = 0
function addInd(){
    index++
    if ((index == images.length && !map) || (index == images.length+1 && map)){
        index = 0
    }
    if (map){
        if (index == images.length){
            document.getElementById("map").style.display = "block"
            document.getElementById("FlexImage").style.display = "none"
        }
        else{
            document.getElementById("map").style.display = "none"
            document.getElementById("FlexImage").style.display = "flex"
            document.getElementById("caption").textContent = credits[index]
            document.getElementById("FlexImage").style.backgroundImage =  "url(images/" + images[index] +")"
            document.getElementById("FlexImage")
        }
    }
    else{
        document.getElementById("caption").textContent = credits[index]
        document.getElementById("FlexImage").style.backgroundImage = "url(images/" + images[index] +")"
    }
}
function subInd(){
    index--
    if (index == -1){
        index = images.length
        if (!map){
            index--
        }
    }
    if (map){
        if (index == images.length){
            document.getElementById("map").style.display = "block"
            document.getElementById("FlexImage").style.display = "none"
        }
        else{
            document.getElementById("map").style.display = "none"
            document.getElementById("FlexImage").style.display = "flex"
            document.getElementById("caption").textContent = credits[index]
            document.getElementById("FlexImage").style.backgroundImage = "url(images/" + images[index] +")"
        }
    }
    else{
        document.getElementById("caption").textContent = credits[index]
        document.getElementById("FlexImage").style.backgroundImage = "url(images/" + images[index] +")"
    }
}

function home(){
    window.location.href = "../index.html"
}
var myLazyLoad = new LazyLoad({
    elements_selector: "#FlexImage"
});