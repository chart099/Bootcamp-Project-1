var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];

function displaySavedEvents() {
  for (var i=0; i < savedEvents.length; i++) {

    const eventCardDiv = $('<div>');
    eventCardDiv.addClass('event-card')
    
    const eventInfoDiv = $('<div>');
    eventInfoDiv.addClass('event-info')
    eventInfoDiv.text()

    const eventImg = $('<img>')
    eventImg.attr('src', '')
    eventImg.attr('alt', '')
    eventImg.addClass('event-img event-border')

    const eventInfoSec = $('<section>')
    eventInfoSec.addClass('info')
    eventInfoSec.text()

    const eventNameH3 = $('<h3>')
    eventNameH3.addClass('name')
    eventNameH3.text()

    const eventDateP = $('<p>')
    eventDateP.text()

    const eventLocationP = $('<p>')
    eventLocationP.text()

    const hotelInfoDiv = $('<div>')
    hotelInfoDiv.addClass('event-info')
    hotelInfoDiv.text()

    const hotelImg = $('<img>')
    hotelImg.attr('src', '')
    hotelImg.attr('alt', '')
    hotelImg.addClass('event-img hotel-border')

    const hotelInfoSec = $('<section>')
    hotelInfoSec.addClass('info hotel-border')
    hotelInfoSec.text()

    const hotelNameH3 = $('<h3>')
    hotelNameH3.addClass('name')
    hotelNameH3.text()

    const hotelDateP = $('<p>')
    hotelDateP.text()

    const hotelLocationP = $('<p>')
    hotelLocationP.text()

    $('#my-events').append(eventCardDiv)
    eventCardDiv.append(eventInfoDiv)
    eventInfoDiv.append(eventImg, eventInfoSec)
    eventInfoSec.append(eventNameH3, eventDateP, eventLocationP)
    eventCardDiv.append(hotelInfoDiv)
    hotelInfoDiv.append(hotelImg, hotelInfoSec)
    hotelInfoSec.append(hotelNameH3, hotelDateP, hotelLocationP)
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
  eventNameH3.text('a;slkfj')
  
  const eventDateP = $('<p>')
  eventDateP.text('a;slkfj')
  
  const eventLocationP = $('<p>')
  eventLocationP.text('a;slkfj')

  const hotelInfoDiv = $('<div>')
  hotelInfoDiv.addClass('event-info')

  const hotelImg = $('<img>')
  hotelImg.attr('src', './Assets/images/photo-1517840901100-8179e982acb7.avif')
  hotelImg.attr('alt', '')
  hotelImg.addClass('event-img hotel-border')

  const hotelInfoSec = $('<section>')
  hotelInfoSec.addClass('info hotel-border')

  const hotelNameH3 = $('<h3>')
  hotelNameH3.addClass('name')
  hotelNameH3.text('a;slkfj')

  const hotelDateP = $('<p>')
  hotelDateP.text('a;slkfj')

  const hotelLocationP = $('<p>')
  hotelLocationP.text('a;slkfj')

  $('#my-events').append(eventCardDiv)
  eventCardDiv.append(eventInfoDiv)
  eventInfoDiv.append(eventImg, eventInfoSec)
  eventInfoSec.append(eventNameH3, eventDateP, eventLocationP)
  eventCardDiv.append(hotelInfoDiv)
  hotelInfoDiv.append(hotelImg, hotelInfoSec)
  hotelInfoSec.append(hotelNameH3, hotelDateP, hotelLocationP)
}
