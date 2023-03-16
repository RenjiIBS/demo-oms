var trackingCountry = "";
var trackingRegionName = "";
var trackingCity = "";
var trackingLong = "";
var trackingLat = "";
var trackingTimeZone = "";
var timezoneCity = "";
var trackingContinent = "";


var INITIAL_WAIT = 3000;
var INTERVAL_WAIT = 10000;
var ONE_SECOND = 1000;
var SERVER_URL= "http://10.246.28.167:8080/api/v1/activitytracking";// "http://localhost:8080/api/v1/activitytracking";

var events = [
    "mouseup",
    "keydown",
    "scroll",
    "mousemove"
];
var startTime = Date.now();
var endTime = startTime + INITIAL_WAIT;
var totalTime = 0;
var clickCount = 0;
var buttonClicks = {
    total: 0,
};
var buttonClickCount = 0;
var linkClickCount = 0;
var keypressCount = 0;
var scrollCount = 0;
var mouseMovementCount = 0;
var linkClickCount = 0;
var trackingUrl = "";
const isHidden = el => (window.getComputedStyle(el).getPropertyValue('visibility') === 'hidden')
const noOptionsOpen = classN => [...document.querySelectorAll(`.${classN}`)].some(isHidden)
var favStr = '<svg width="25" height="25" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">';

if (Intl) {

    trackingTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var tzArr = trackingTimeZone.split("/");
    trackingContinent = tzArr[0];
    timezoneCity = tzArr[tzArr.length - 1];
    //console.log("Time Zone:", trackingTimeZone);
    //console.log("Region:", trackingContinent);
    //console.log("City:", timezoneCity);

}


function ipLookUp() {
    fetch('http://ip-api.com/json')
        .then(response => response.json()
        ).then(
            (data) => {

                trackingCountry = data.country;
                trackingRegionName = data.regionName;
                trackingLong = data.lon;
                trackingLat = data.lat;
                trackingCity = data.city;

            }

        );
}

async function postTrackingData(data) {

    data.trackingCountry = trackingCountry;
    data.trackingRegionName = trackingRegionName;
    data.trackingCity = trackingCity;
    data.trackingLong = trackingLong;
    data.trackingLat = trackingLat;

    data.trackingTimeZone = trackingTimeZone;
    data.timezoneCity = timezoneCity;
    data.trackingContinent = trackingContinent;

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : "";

  const d = new Date();
  let text = d.toLocaleString();

  let requestData =  {

    userName: userToken,
    dateTime: text,
    timezoneCity: timezoneCity,
    customerAttributes: JSON.stringify(data)

  }

  // Default options are marked with *
  const response = await fetch(SERVER_URL, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      
      },
      body: JSON.stringify(requestData), // body data type must match "Content-Type" header
    });

   // console.log("Data saved1",response.json());

}

function getAddress(latitude, longitude) {

    fetch('https://maps.googleapis.com/maps/api/geocode/json?' +
        'latlng=' + latitude + ',' + longitude + '&key=' +
        "AIzaSyBJ_XlxltqRMHEaqUxKak6LkIb0jt4qRWM")
        .then((response) => response.json).then(
            (data) => {
             //   console.log('Request failed.  Returned status of',   data)
            }

        )
}

if ("geolocation" in navigator) {
   
  /*  navigator.geolocation.getCurrentPosition(
        function success(position) {
             getAddress(position.coords.latitude,
                position.coords.longitude)
        },
        function error(error_message) {
          ipLookUp()
        });
    */
} else {
    // geolocation is not supported
    // get your location some other way
    //console.log('geolocation is not enabled on this browser')
   // ipLookUp()
}
ipLookUp();
document.addEventListener("DOMContentLoaded", function () {
    trackingUrl = window.location.pathname;

    events.forEach(function (e) {
        document.addEventListener(e, function () {

            endTime = Date.now() + INTERVAL_WAIT;
            if (e === "mouseup") {
                clickCount++;
                let element = event.target.nodeName;
               // console.log("Node name",element)
                let elementName = event.target.getAttribute("name");
                // console.log("Name",elementName )
                if (elementName && elementName.toLowerCase().toString().indexOf('favouritesicon') >= 0) {
                   let data = {
                        "Event": "Add Item to favourties",
                        "ProductId": event.target.parentNode.getAttribute("aria-label"),
                        "Path": window.location.pathname
                    };
                    postTrackingData(data);
                    //console.log("Fav", data)

                }
                if (element.toString().indexOf("A") >= 0 && event.target.parentNode && event.target.parentNode.id === 'basic-example') {


                    let data = {
                        "Event": "Add Ping flight",
                        "FlightData": event.target.innerHTML,
                        "Path": window.location.pathname


                    }
                    postTrackingData(data);
                   // console.log("Ping Flight", data)

                }

                if (event.target.id.indexOf("filtermenu") >= 0) {



                    let data = {
                        "Event": "Filter service menu click",
                        "ProductId": event.target.getAttribute("aria-label"),
                        "Path": window.location.pathname


                    }
                    postTrackingData(data);
                  //  console.log("Filiter Menu", data)

                }




                if (event.target.nodeName === 'BUTTON') {

                    let selectedItem = [];
                    if (event.target.className === 'pay-now') {
                        var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
                        for (var checkbox of markedCheckbox)
                            selectedItem.push(checkbox.getAttribute('aria-label'))

                          let data = {

                            "Event": "Order-Pay button click",
                            "ProductId": selectedItem.toString(),
                            "Path": window.location.pathname
                        }
                        //console.log("Order", data)
                        postTrackingData(data)
                    }



                    if (event.target.id.indexOf("addtocart") >= 0 && event.target.className.indexOf('formsubmit-button') >= 0) {
                        const div = document.querySelectorAll('.formfield-errors');
                        if (div.length == 0) {

                            let data = {
                                "Event": "Add Item to cart",
                                "ProductId": event.target.getAttribute('aria-label'),
                                "Path": window.location.pathname
                           }
                            postTrackingData(data)
                        }


                    }
                    if (!buttonClicks[event.target.innerText]) {
                        buttonClicks[event.target.innerText] = 0;
                    }
                    buttonClicks[event.target.innerText] += 1;
                    buttonClicks.total += 1;

                }

            }
            else if (e === "keydown") {
                keypressCount++;

            }
            else if (e === "scroll") {

            }
            else if (e === "mousemove") {
                //console.log("mousemove", event.target.nodeName);

            }
        });
    });
});


function formatTime(ms) {
    return Math.floor(ms / 1000);
}