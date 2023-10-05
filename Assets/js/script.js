const apiKey = 'iIm9cRrzUWIOEnRZYIrJy0Adv7GdRjad';
const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
let artistName = '';  // Replace with the artist you're interested in
var city;
var eventInterested;
var tempEvents = [];
var tempHotels = [];
var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
var myEventsSearchInput = JSON.parse(localStorage.getItem("myEventsSearchInput")) || '';

const fetchEvents = () => {
  const url = `${apiUrl}?keyword=${artistName}&apikey=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayEvents(data._embedded?.events);
    })
    .catch(error => console.error('Error fetching data:', error));
};

const openTicketmasterEventPage = (eventUrl) => {
  if (eventUrl) {
    window.open(eventUrl, '_blank');
  } else {
    console.error('Event URL is not available.');
  }
};

const displayEvents = (events) => {
  const eventsContainer = document.getElementById('events');
  eventsContainer.innerHTML = '';  // Clear previous events

  const numEventsToShow = 5;  // Number of events to display

  if (events && events.length > 0) {
    for (let i = 0; i < Math.min(numEventsToShow, events.length); i++) {
      const event = events[i];

      const eventCard = document.createElement('div');
      eventCard.classList.add('my-card', 'width-6');

      const eventImage = document.createElement('img');
      eventImage.classList.add('event-img');
      eventImage.src = event.images && event.images.length > 0 ? event.images[0].url : './Assets/images/hero-genre_Generic_PlaceHolder.avif';
      eventImage.alt = '';

      const eventInfo = document.createElement('section');
      eventInfo.classList.add('event-info');

      const eventTitle = document.createElement('h3');
      eventTitle.textContent = event.name;

      const eventLocation = document.createElement('p');
      eventLocation.textContent = event._embedded?.venues[0]?.name || 'Location not specified';

      const eventCity = document.createElement('p');
      eventCity.textContent = event._embedded?.venues[0]?.city?.name || 'City not specified';

      const seeHotels = document.createElement("button");
      seeHotels.setAttribute("class", "see-hotels")
      seeHotels.textContent = "See Hotels";
      eventInfo.appendChild(seeHotels);

      const buyTickets = document.createElement("button");
      buyTickets.setAttribute("class", "buy-tickets");
      buyTickets.textContent = "Buy Tickets";
      buyTickets.addEventListener("click", () => openTicketmasterEventPage(event.url));
      eventInfo.appendChild(buyTickets);
      buyTickets.setAttribute('href', event.url)
      buyTickets.setAttribute('target', '_blank')

      // Update hotel to be the city
      // city = eventCity.textContent;
      // fetchRapidAPIResponse();

      const eventDate = document.createElement('p');
      eventDate.textContent = `Date: ${event.dates.start.localDate}`;

      const saveEvent = document.createElement("button");
      saveEvent.setAttribute("class", "favorites-star");
      saveEvent.setAttribute("id", eventTitle + i);
      saveEvent.innerHTML = '<img src="./Assets/images/black-star-emoji-512x488-tgxkocti.png"></img>';
      saveEvent.classList.add('save-icon')      

      eventInfo.appendChild(eventTitle);
      eventInfo.appendChild(eventLocation);
      eventInfo.appendChild(eventCity);
      eventInfo.appendChild(eventDate);

      eventCard.appendChild(eventImage);
      eventCard.appendChild(eventInfo);
      eventCard.appendChild(saveEvent);

      eventsContainer.appendChild(eventCard);


      // local storage

      var eventToSave =
        {
          id: i,
          eventName: event._embedded?.venues[0]?.name,
          eventDate: event.dates.start.localDate,
          eventLocation: event._embedded?.venues[0]?.city?.name,
          eventImage: event.images[0].url,
          eventTicketUrl: event.url,
          hotelName: '',
          hotelLocation: '',
        }
        tempEvents.push(eventToSave)

    }
  } else {
    const noEventsMessage = document.createElement('div');
    noEventsMessage.textContent = 'No events found for the artist.';
    eventsContainer.appendChild(noEventsMessage);
  }

 $('.favorites-star').on('click', function(event) {
    event.stopPropagation();
    // $(this).innerHTML = '<img src="./Assets/images/white-medium-star-emoji-2048x1960-v2wse4p9.png"></img>';

    savedEvents.push(tempEvents[$(this).attr('id').slice(-1)])
    localStorage.setItem("savedEvents", (JSON.stringify(savedEvents)));
    displayMyEvents()
    $(this).css('background-color', 'rgba(255, 255, 0, 0.75)')
  })

    displayMyEvents()

  // EVENT BUTTONS HERE
  $('.see-hotels').on("click", function() {
    
    city = tempEvents[$(this).parent().parent().children().eq(2).attr('id').slice(-1)].eventLocation;
    eventInterested = tempEvents[$(this).parent().parent().children().eq(2).attr('id').slice(-1)];
    console.log(tempEvents + this + tempEvents[$(this).parent().parent().children().eq(2).attr('id').slice(-1)]);
    eventsContainer.innerHTML = '';  // Clear previous events
    fetchRapidAPIResponse()
    eventsContainer.innerHTML = '<img src="Assets/images/loading-gif.gif" class="loading"></img>'


  })

  $(".buy-tickets").on("click", function (event) {
    event.stopPropagation()
    var url = tempEvents[$(this).parent().parent().children().eq(2).attr('id').slice(-1)].eventTicketUrl
    window.open( url, '_blank')
  })


};

document.querySelector('#search-btn').addEventListener('click', function (event) {
  tempHotels = [];
  tempEvents = [];
  eventInterested = '';
  event.stopPropagation();
  artistName = document.querySelector('#search-input').value;
  $('#events').text('');
  fetchEvents();
});

function openMyEvents() {
  window.location = 'my-events.html'
}

const hotelapiKey = 'd56cd525d3msh64494ca272228bdp1271a1jsn6bdf6bfcb40c';

const fetchRapidAPIResponse = async () => {
  const url = `https://hotels4.p.rapidapi.com/locations/v3/search?q=${city}&locale=en_US&langid=1033&siteid=300000003`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': hotelapiKey,
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    }
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    document.getElementById('events').innerHTML = '';
    $('#container-title').text('Hotels');
    var index = 0;
        // Log hotel addresses for elements with type 'HOTEL'
    for (var i = 0; i < data.sr.length; i++) {
      if (data.sr[i].type === 'HOTEL') {
        // eventsContainer.innerHTML = '';
        
        var hotel = data.sr[i];

        var hotelToSave =
        {
          id: index,  
          hotelName: hotel.regionNames.primaryDisplayName,          
          hotelLocation: hotel.hotelAddress.street + ' ' + hotel.hotelAddress.city + ', ' + hotel.hotelAddress.province,
        }
        tempHotels.push(hotelToSave)

        const hotelCardDiv = $('<div>');
        hotelCardDiv.addClass('hotel-card width-6');

        const saveHotelBtn = $('<button>');
        saveHotelBtn.addClass('save-hotel-btn');
        saveHotelBtn.attr('id', index)
        saveHotelBtn.text('Save to event')

        const hotelNameH3 = $('<h3>');
        hotelNameH3.text(hotel.regionNames.primaryDisplayName);

        const hotelLocationP = $('<p>')
        hotelLocationP.text(hotel.hotelAddress.street + ' ' + hotel.hotelAddress.city + ', ' + hotel.hotelAddress.province)

        $('#events').append(hotelCardDiv)
        hotelCardDiv.append(saveHotelBtn, hotelNameH3, hotelLocationP) 
        index++;

      } else {
        // eventsContainer.innerHTML = 'No hotels found';
      }
    }
    $('.save-hotel-btn').on("click", function(event) {
    event.stopPropagation();
      eventInterested.hotelName = tempHotels[$(this).attr('id')].hotelName;
      eventInterested.hotelLocation = tempHotels[$(this).attr('id')].hotelLocation;

      savedEvents.push(eventInterested)
      localStorage.setItem("savedEvents", (JSON.stringify(savedEvents)));

      window.location = 'my-events.html';
      tempHotels = [];
      tempEvents = [];
      eventInterested = '';
    })

  } catch (error) {
    console.error('Error fetching data:', error);
  }

};

function displayMyEvents() {
  if (savedEvents.length > 0) {
      $('#my-events').text('');
      for (let i = 0; i < savedEvents.length; i++) {
      var event = savedEvents[i]
      
      const myEventCard = $("<div>");
      myEventCard.addClass('card has-text-white');
      // myEventCard.attr('id', event.eventName + event.id);
      // myEventCard.css('background-image', 'url' + (event.eventImage))

      const backgroundImg = $('<img>')
      backgroundImg.attr('src', event.eventImage)
      backgroundImg.attr('alt', '')
      backgroundImg.addClass('event-img')

      const myEventCardDiv = $('<div>');
      myEventCardDiv.addClass('card-content');

      const mediaDiv = $('<div>');
      mediaDiv.addClass('media');

      // const mediaLeft = $('<div>');
      // mediaDiv.addClass('media-left');

      // const myEventsFigure = $('<figure>');
      // myEventsFigure.addClass('image is-48x48');

      // const myEventsImg = $('<img>');
      // myEventsImg.attr('src', event.eventImage);
      // myEventsImg.attr('alt', "");

      const myEventsMediaContent = $('<div>');
      myEventsMediaContent.addClass('media-content');

      const myEventsCardName = $('<p>');
      myEventsCardName.addClass('title is-4 has-text-white');
      myEventsCardName.text(event.eventName);

      const myEventsLocation = $('<p>');
      myEventsLocation.addClass('subtitle is-6 has-text-white');
      myEventsLocation.text(event.eventLocation)

      // const myEventsContent = $('<div>');
      // myEventsContent.addClass('content');

      const myEventTime = $('<time>');
      myEventTime.text(event.eventDate);

      $('#my-events').append(myEventCard);
      myEventCard.append(backgroundImg, myEventCardDiv);
      myEventCardDiv.append(mediaDiv);
      mediaDiv.append(myEventsMediaContent);
      myEventsMediaContent.append(myEventsCardName, myEventsLocation, myEventTime);
      // mediaDiv.append(myEventsContent);
      // myEventsContent.append(myEventTime);

    }
    $('.card').on('click', function(event) {
    event.stopPropagation();
    window.location = 'my-events.html'
    })
  }
}

function searchMyEventsInput() {
  console.log(myEventsSearchInput);
  if (myEventsSearchInput !== '') {
    tempHotels = [];
    tempEvents = [];
    eventInterested = '';
    artistName = myEventsSearchInput;
    $('#events').text('');
    fetchEvents();
    myEventsSearchInput = '';
    localStorage.setItem("myEventsSearchInput", (JSON.stringify(myEventsSearchInput)));
  }
}

searchMyEventsInput()
displayMyEvents();


