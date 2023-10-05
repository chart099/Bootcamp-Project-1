var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
console.log(savedEvents);

// function to search through events saved in local storage and display events to the page
function displaySavedEvents() {
  for (var i=0; i < savedEvents.length; i++) {
    var event = savedEvents[i];
    // creating each event and adding corrasponding classes and text values
    const eventCardDiv = $('<div>');
    eventCardDiv.addClass('event-card')
    
    const eventInfoDiv = $('<div>');
    eventInfoDiv.addClass('event-info')

    const eventImg = $('<img>')
    eventImg.attr('src', event.eventImage)
    eventImg.attr('alt', event.eventImageAlt)
    eventImg.addClass('event-img event-border')

    const eventInfoSec = $('<section>')
    eventInfoSec.addClass('info event-border')

    const eventNameH3 = $('<h3>')
    eventNameH3.addClass('name')
    eventNameH3.text(event.eventName)

    const eventDateP = $('<p>')
    eventDateP.text(event.eventDate)

    const eventLocationP = $('<p>')
    eventLocationP.text(event.eventLocation)

    const hotelInfoDiv = $('<div>')
    hotelInfoDiv.addClass('event-info')

    const hotelInfoSec = $('<section>')
    hotelInfoSec.addClass('hotel-info hotel-border')

    const hotelNameH3 = $('<h3>')
    hotelNameH3.addClass('name')
    hotelNameH3.text(event.hotelName)

    const hotelLocationP = $('<p>')
    hotelLocationP.text(event.hotelLocation)
    // appending all elements to the page
    $('#my-events').append(eventCardDiv)
    eventCardDiv.append(eventInfoDiv)
    eventInfoDiv.append(eventImg, eventInfoSec)
    eventInfoSec.append(eventNameH3, eventDateP, eventLocationP)
    eventCardDiv.append(hotelInfoDiv)
    hotelInfoDiv.append(hotelInfoSec)
    hotelInfoSec.append(hotelNameH3, hotelLocationP)
  }
}
// function to take user to the homepage
function openHomePage() {
  window.location = 'index.html'
}
// running this function when the page loads
displaySavedEvents()
