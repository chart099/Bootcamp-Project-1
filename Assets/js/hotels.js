const apiKey = 'iIm9cRrzUWIOEnRZYIrJy0Adv7GdRjad';
const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
let artistName = '';  // Replace with the artist you're interested in
var city;
var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || [];
console.log(savedEvents[savedEvents.length-1].eventLocation);
console.log(savedEvents);
city = savedEvents[savedEvents.length-1].eventLocation




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
      console.log('API Response:', data);
      displayEvents(data._embedded?.events);
    })
    .catch(error => console.error('Error fetching data:', error));
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

      // Update hotel to be the city
      city = eventCity.textContent;
      fetchRapidAPIResponse();

      const eventDate = document.createElement('p');
      eventDate.textContent = `Date: ${event.dates.start.localDate}`;

      const saveEvent = document.createElement("button");
      // saveEvent.setAttribute("id", "favorites-star");
      saveEvent.innerHTML = '<img id="favorites-star" src="./Assets/images/black-star-emoji-512x488-tgxkocti.png"></img>';
      

      eventInfo.appendChild(eventTitle);
      eventInfo.appendChild(eventLocation);
      eventInfo.appendChild(eventCity);
      eventInfo.appendChild(eventDate);

      eventCard.appendChild(eventImage);
      eventCard.appendChild(eventInfo);

      eventCard.appendChild(saveEvent);

      eventsContainer.appendChild(eventCard);

    }
  } else {
    const noEventsMessage = document.createElement('div');
    noEventsMessage.textContent = 'No events found for the artist.';
    eventsContainer.appendChild(noEventsMessage);
  }
};

document.querySelector('#search-btn').addEventListener('click', function () {
  artistName = document.querySelector('#search-input').value;
  fetchEvents();
});

const hotelapiKey = '5fed209256mshfd9f27707640df2p1856b4jsnbad75008378b';

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
    
    // Log hotel addresses for elements with type 'HOTEL'
    for (var i = 0; i < data.sr.length; i++) {
      if (data.sr[i].type === 'HOTEL') {
        console.log('Hotel Address:', data.sr[i].hotelAddress);
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



fetchRapidAPIResponse()