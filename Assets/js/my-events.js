var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
console.log(savedEvents);

document.querySelector('#search-btn').addEventListener('click', function (event) {
  event.stopPropagation();
  var searchInput = document.querySelector('#search-input').value;
  localStorage.setItem("myEventsSearchInput", (JSON.stringify(searchInput)));
  window.location = 'index.html';
});

document.getElementById('search-input').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.stopPropagation();
    var searchInput = document.querySelector('#search-input').value;
    localStorage.setItem("myEventsSearchInput", (JSON.stringify(searchInput)));
    window.location = 'index.html';
  }
})

// function to search through events saved in local storage and display events to the page
function displaySavedEvents() {
  for (var i=0; i < savedEvents.length; i++) {
    var event = savedEvents[i];
    // creating each event and adding corrasponding classes and text values
    const eventCardDiv = $('<div>');
    eventCardDiv.addClass('event-card')
    eventCardDiv.attr('id', i)

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
    
    const ticketsBtn = $('<button>')
    ticketsBtn.addClass('tickets-button')
    ticketsBtn.text('Get Tickets')

    if (event.hotelName === '') {
      console.log('no name');
      const findHotelBtn = $('<button>')
      findHotelBtn.addClass('hotel-button')
      findHotelBtn.text('Find hotel')
      
      // appending all elements to the page
      $('#my-events').append(eventCardDiv)
      eventCardDiv.append(eventInfoDiv)
      eventInfoDiv.append(eventImg, eventInfoSec)
      eventInfoSec.append(eventNameH3, eventDateP, eventLocationP)
      eventCardDiv.append(hotelInfoDiv)
      hotelInfoDiv.append(hotelInfoSec)
      hotelInfoSec.append(findHotelBtn, ticketsBtn)

    } else {
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
      hotelInfoSec.append(hotelNameH3, hotelLocationP, ticketsBtn)
    }
  }
  $('.hotel-button').on('click', function (event) {
    event.stopPropagation()
    var eventToAddHotel = $(this).parent().parent().parent().attr('id');
    localStorage.setItem("eventToAddHotel", (JSON.stringify(eventToAddHotel)));
    window.location = 'index.html';
  })

  $('.tickets-button').on('click', function (event) {
    event.stopPropagation()
    var url = savedEvents[$(this).parent().parent().parent().attr('id')].eventUrl;
    window.open( url, '_blank')
  })

}
// function to take user to the homepage
function openHomePage() {
  window.location = 'index.html'
}

// running this function when the page loads
displaySavedEvents()
