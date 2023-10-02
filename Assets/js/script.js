const apiKey = 'iIm9cRrzUWIOEnRZYIrJy0Adv7GdRjad';
const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

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
  const eventDisplay = document.getElementById('event-display');
  eventDisplay.innerHTML = '';  // Clear previous events
 var i=0;
  if (events) {
    events.forEach(event => {
        if (i<5){
            const eventCard = document.createElement('div');
            eventCard.classList.add('card');

            const eventName = document.createElement('div');
            eventName.classList.add('card-header');
            eventName.textContent = event.name;

            const eventDate = document.createElement('div');
            eventDate.classList.add('card-content');
            eventDate.textContent = `Date: ${event.dates.start.localDate}`;

            eventCard.appendChild(eventName);
            eventCard.appendChild(eventDate);

            eventDisplay.appendChild(eventCard);
            i++;
        }
    });
  } else {
    eventDisplay.textContent = 'No events found for the artist.';
  }
};
// to test code call

document.querySelector('#search-btn').addEventListener('click', function () {
    var userInput = document.querySelector('#search-input').value
    artistName = userInput;
    fetchEvents();
  });