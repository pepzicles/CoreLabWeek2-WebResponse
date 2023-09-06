let cookiesAccepted = false;
let popupTimeout;
let customizeCookies = false;

document.querySelector(".popup2").style.display = "none";

//function to open the popup
function openPopup() {
    if (!cookiesAccepted) {
        document.querySelector(".popup2").style.display = "none";
        document.querySelector(".popup").style.display = "block";
        //start the blur overlay
        document.querySelector(".overlay").style.display = "block";
    }
}


//First popup opens after 1 second of loading the page
window.addEventListener("load",
    function () {
        popupTimeout= setTimeout(openPopup, 1000); //miniseconds)
    });


//First pop up goes away after clicking Accept Cookies
document.querySelector("#accept").addEventListener("click",
    function (event) {
        event.preventDefault(); // prevent the default from happening (ie. prevent the page from reloading over and over and for the pop-up to show up again)
        cookiesAccepted = true;
        document.querySelector(".popup").style.display = "none";
        //Remove overlay after pressing button
        document.querySelector(".overlay").style.display = "none";
        clearTimeout(popupTimeout);
    }
);


//First popup goes away and second popup shows up after clicking customize cookies
document.querySelector("#customize").addEventListener("click",
    function (event) {
        event.preventDefault(); // prevent the default from happening (ie. prevent the page from reloading over and over and for the pop-up to show up again)
        document.querySelector(".popup").style.display = "none";
        document.querySelector(".popup2").style.display = "flex";
        clearTimeout(popupTimeout);
    }
);

//Second pop up goes away after clicking Accept all cookies
document.querySelector("#accept2").addEventListener("click",
    function (event) {
        event.preventDefault(); // prevent the default from happening (ie. prevent the page from reloading over and over and for the pop-up to show up again)
        cookiesAccepted = true;
        document.querySelector(".popup2").style.display = "none";
        document.querySelector(".popup").style.display = "none";
          //Remove overlay after pressing button
        document.querySelector(".overlay").style.display = "none";
        clearTimeout(popupTimeout);
    }
);



///////// MOUSE TRACKING ///////////

//TRACKING MOUSE COORDS
window.addEventListener('mousemove', function (e) {
    document.getElementById('x-valueID').innerHTML = e.x;
    document.getElementById('y-valueID').innerHTML = e.y;
})



//TRACKING NO. OF CLICKS
let count = 0;
let mouseClicks = document.getElementById("mouseClicks");

function countClicks() {
    count = count + 1;
    mouseClicks.innerHTML = count;
}




//TRACKING TIME SPENT
let timerInterval //to update the HTML page at every interval
let startTime = Date.now(); //Store start time
let timeSpentHTML = document.getElementById("timeSpentID");

function timeTrack() {
    const currentTime = Date.now();
    const timeSpent = Math.floor((currentTime - startTime) / 1000); //convert to seconds
    timeSpentHTML.innerHTML = timeSpent;
    // console.log(`Time spent: ${timeSpent} seconds`)
}

//start tracking when page loads
window.addEventListener("load", () => {
    startTime = Date.now() //reset start time every time page loads
    timerInterval = setInterval(timeTrack, 1000) //update every 1 second
});

//clear interval when user leaves the page
window.addEventListener('unload', () => {
    clearInterval(timerInterval);
})






//TRACKING DIRECTION OF MOUSE
const xdirectionHTML = document.getElementById("xdirectionID")
const ydirectionHTML = document.getElementById("ydirectionID")
let prevX = 0;
let prevY = 0;

//tracks mousemovement, gets coordinates via e
document.addEventListener('mousemove', (e) => {
    const currentX = e.clientX;
    const currentY = e.clientY;

    let xdirection = 'None';
    let ydirection = 'None';

    if (currentX > prevX) {
        xdirection = "Right";
    }
    else if (currentX < prevX) {
        xdirection = "Left";
    }
    if (currentY > prevY) {
        ydirection = "Down";
    }
    else if (currentY < prevY) {
        ydirection = "Up";
    }

    prevX = currentX;
    prevY = currentY;

    xdirectionHTML.innerHTML = xdirection;
    ydirectionHTML.innerHTML = ydirection;
})







//TRACKING SCROLL DISTANCE FROM TOP
const scrolledHTML = document.getElementById("scrolledID");

let totalScrollDistance;

window.addEventListener('scroll', (e) => {
    totalScrollDistance = Math.floor(window.scrollY * 0.2646); //convert from pixels to mm + round up
    //console.log(`Scroll distance: ${totalScrollDistance}`)
    scrolledHTML.innerHTML = totalScrollDistance;
})






//TRACKING SCROLL SPEED
const scrollingSpeedHTML = document.getElementById("scrollingSpeedID");
//We have already calculated timespent in var timespent
let lastScrollTop = 0;

window.addEventListener('scroll', (e) => {
    //scrollTop = no. of pixels scrolled vertically (aka distance)
    const scrollTop = document.documentElement.scrollTop * 0.2646 //convert to mm
    //console.log(scrollTop);
    //get the speed = distance(mm)/time(s)
    const scrolledDist = scrollTop - lastScrollTop;
    lastScrollTop = scrollTop;
    //console.log(scrolledDist)

    //get time spent
    const currentTime = Date.now();
    const timeSpent = (currentTime - startTime) / 1000; //convert to seconds
    const scrollSpeed = (scrolledDist / timeSpent).toFixed(3)
    
    //console.log(scrollSpeed)
    scrollingSpeedHTML.innerHTML = scrollSpeed;
})




// SWITCHES ON POP UP
//DOMContentLoaded to make sure that the JS code is executed after the HTML elements are available - in this case, the checkboxes
//because there are multiple checkboxes, you would need to put them in an array
const checkboxes = Array.from(document.getElementsByClassName("checkboxID"));

function areAllCheckboxesChecked() {
    return checkboxes.every(checkbox => checkbox.checked);
}

//if one of the buttons is unchecked -> Redirect to messy page
function redirectToMessyPage() {
    window.location.href = 'messysite.html';
}


function hidePopups() {
    document.querySelector(".popup2").style.display = "none";
    document.querySelector(".popup").style.display = "none";
    //Remove overlay after pressing button
    document.querySelector(".overlay").style.display = "none";
    //clearTimeout(popupTimeout);
    console.log("hidepopups enabled")
}

function updateCheckboxState(checkbox) {
    //ALL CHECKBOXES CHECKED
    const allCheckboxesChecked = areAllCheckboxesChecked();
    if (allCheckboxesChecked) {
        console.log("All switches turned on");
        //only hide popups once "save preferences" button pressed
        document.querySelector("#savePreferences").addEventListener("click", hidePopups);
        
    } else {
        console.log("At least one checkbox is switched off.");
        //go to error page if all switches are turned on
        document.querySelector("#savePreferences").addEventListener("click", redirectToMessyPage);
    }
}

//constantly check for changes 
//have to go into array and iterate through each element
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        updateCheckboxState(checkbox);
    });
});

// Call it initially to hide popups if all checkboxes are checked on page load
updateCheckboxState();
