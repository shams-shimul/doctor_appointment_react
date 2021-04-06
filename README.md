# Doctor Appointment Process-flow in React
 A simple reactJS app that demonstrates the flow of doctor appointment booking process.
 
 ## FEATURE HIGHLIGHTS
 - Utilizies axios to fetch data from REST API
 - Generates dynamic calendar with *clickable day* and *disabled day* on the basis of a specific doctor's appointment availability schedule
 - On clicking on a *clickable day*, a modal pops up showing all available time slots within the specified time range for that particular day; time slots are generated on the basis of appointment duration info within the time range received from the API
 - Form validation for submitting appointment request
 - On successful form submission i.e. appointment booking, that day & time-slot-specific info is stored in session storage to show that the particular time-slot on that day for that doctor is already booked and is not available to book anymore
 - Simple, clean, pleasant, and full responsive UI design

## Live
Watch the app live in action here: http://getadoc.procoder.xyz/
