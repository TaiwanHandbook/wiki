function myFunction(){
    if(document.getElementById("height").value == "7" && document.getElementById("weight").value == "48"){
        document.getElementById("height").value = ""
        document.getElementById("weight").value = ""
        location.href = "countdown.html"
    }
    else{
        alert("Your BMI is " + String(Math.floor(Number(document.getElementById("weight").value) / (Number(document.getElementById("height").value)/100)**2)))
    }
}