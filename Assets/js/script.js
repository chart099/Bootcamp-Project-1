const apiKey = 'iIm9cRrzUWIOEnRZYIrJy0Adv7GdRjad';
const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

const artistName = 'Drake';  // Replace with the artist you're interested in

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
      console.log('Event data:', data);
    })
    .catch(error => console.error('Error fetching data:', error));
};

// Call the function to fetch events
fetchEvents();
