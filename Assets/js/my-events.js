var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
console.log(savedEvents);

function displaySavedEvents() {
  for (var i=0; i < savedEvents.length; i++) {
    var event = savedEvents[i];
    
    const eventCardDiv = $('<div>');
    eventCardDiv.addClass('event-card')
    
    const eventInfoDiv = $('<div>');
    eventInfoDiv.addClass('event-info')

    const eventImg = $('<img>')
    eventImg.attr('src', event.eventImage)
    eventImg.attr('alt', event.eventImageAlt)
    eventImg.addClass('event-img event-border')

    const eventInfoSec = $('<section>')
    eventInfoSec.addClass('info')

    const eventNameH3 = $('<h3>')
    eventNameH3.addClass('name')
    eventNameH3.text(event.eventName)

    const eventDateP = $('<p>')
    eventDateP.text(event.eventDate)

    const eventLocationP = $('<p>')
    eventLocationP.text(event.eventLocation)

    const hotelInfoDiv = $('<div>')
    hotelInfoDiv.addClass('event-info')

    // const hotelImg = $('<img>')
    // hotelImg.attr('src', './Assets/images/photo-1517840901100-8179e982acb7.avif')
    // hotelImg.attr('alt', '')
    // hotelImg.addClass('event-img hotel-border')

    const hotelInfoSec = $('<section>')
    hotelInfoSec.addClass('hotel-info hotel-border')

    const hotelNameH3 = $('<h3>')
    hotelNameH3.addClass('name')
    hotelNameH3.text(event.hotelName)

    // const hotelDateP = $('<p>')
    // hotelDateP.text('Location')

    const hotelLocationP = $('<p>')
    hotelLocationP.text(event.hotelLocation)

    $('#my-events').append(eventCardDiv)
    eventCardDiv.append(eventInfoDiv)
    eventInfoDiv.append(eventImg, eventInfoSec)
    eventInfoSec.append(eventNameH3, eventDateP, eventLocationP)
    eventCardDiv.append(hotelInfoDiv)
    hotelInfoDiv.append(hotelInfoSec)
    hotelInfoSec.append(hotelNameH3, hotelLocationP)
  }
}

function test() {
  const eventCardDiv = $('<div>');
  eventCardDiv.addClass('event-card')
  
  const eventInfoDiv = $('<div>');
  eventInfoDiv.addClass('event-info')
  
  const eventImg = $('<img>')
  eventImg.attr('src', './Assets/images/hero-genre_Generic_PlaceHolder.avif')
  eventImg.attr('alt', '')
  eventImg.addClass('event-img event-border')
  
  const eventInfoSec = $('<section>')
  eventInfoSec.addClass('info')
  
  const eventNameH3 = $('<h3>')
  eventNameH3.addClass('name')
  eventNameH3.text('Event Name')
  
  const eventDateP = $('<p>')
  eventDateP.text('Location')
  
  const eventLocationP = $('<p>')
  eventLocationP.text('Date')

  const hotelInfoDiv = $('<div>')
  hotelInfoDiv.addClass('event-info')

  // const hotelImg = $('<img>')
  // hotelImg.attr('src', './Assets/images/photo-1517840901100-8179e982acb7.avif')
  // hotelImg.attr('alt', '')
  // hotelImg.addClass('event-img hotel-border')

  const hotelInfoSec = $('<section>')
  hotelInfoSec.addClass('hotel-info hotel-border')

  const hotelNameH3 = $('<h3>')
  hotelNameH3.addClass('name')
  hotelNameH3.text('Hotel')

  // const hotelDateP = $('<p>')
  // hotelDateP.text('Location')

  const hotelLocationP = $('<p>')
  hotelLocationP.text('Address')

  $('#my-events').append(eventCardDiv)
  eventCardDiv.append(eventInfoDiv)
  eventInfoDiv.append(eventImg, eventInfoSec)
  eventInfoSec.append(eventNameH3, eventDateP, eventLocationP)
  eventCardDiv.append(hotelInfoDiv)
  hotelInfoDiv.append(hotelInfoSec)
  hotelInfoSec.append(hotelNameH3, hotelLocationP)
}

function openHomePage() {
  window.location = 'index.html'
}

displaySavedEvents()
