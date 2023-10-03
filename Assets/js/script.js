const apiKey = 'iIm9cRrzUWIOEnRZYIrJy0Adv7GdRjad';
const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
var hotel;
var artistName = '';  // Replace with the artist you're interested in

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
      // Process and display the event data
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
    // Display up to numEventsToShow events
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

      // Updated code to get city
      const eventCity = document.createElement('p');
      eventCity.textContent = event._embedded?.venues[0]?.city?.name || 'City not specified';

      const eventDate = document.createElement('p');
      eventDate.textContent = `Date: ${event.dates.start.localDate}`;

      eventInfo.appendChild(eventTitle);
      eventInfo.appendChild(eventLocation);
      eventInfo.appendChild(eventCity);  // Append the city
      eventInfo.appendChild(eventDate);

      eventCard.appendChild(eventImage);
      eventCard.appendChild(eventInfo);

      eventsContainer.appendChild(eventCard);
    }
  } else {
    const noEventsMessage = document.createElement('div');
    noEventsMessage.textContent = 'No events found for the artist.';
    eventsContainer.appendChild(noEventsMessage);
  }
};
// to test code call

document.querySelector('#search-btn').addEventListener('click', function () {
    var userInput = document.querySelector('#search-input').value
    artistName = userInput;
    fetchEvents();
  });

  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5fed209256mshfd9f27707640df2p1856b4jsnbad75008378b',
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    }
  };

  const fetchEventCity = (eventId) => {
    const venueUrl = `https://app.ticketmaster.com/discovery/v2/venues/${venueId}.json?apikey=${apiKey}`;
  
    fetch(venueUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Extract city information from venue data
        const city = data?.city?.name || 'City not specified';
        console.log('City of the event:', city);
      })
      .catch(error => {
        console.error('Error fetching venue data:', error);
      });
  };
  
  
  const fetchHotelsNearEvent = () => {
    fetch(hotel, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (response.status === 204) {
          // No hotels found, display a message
          console.log('No hotels found near the event.');
          return null; // Return null to indicate no hotels found
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          console.log('Hotels near event:', data);
          // Process and display hotel data as needed
        }
      })
      .catch(error => {
        console.error('Error fetching hotel data:', error.message);
      });
  };
  
  // Call the function to fetch hotels near the event

  