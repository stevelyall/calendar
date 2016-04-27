# Calendar Web App

## Description
Basic calendar that allows for adding, editing or removing events to month and day views. Events have three types, Appointment, Meeting and Task, and are coloured accordingly. 

The month view can be paged through the next and previous months, and a button returns to the current date. Clicking the "New Event" button opens a modal to add a new event, where the event name, type, start time and (optionally) end time can be selected.

When the month view is displayed and a day is clicked, a slider opens with the list of events for that day. Each event has a button to edit or delete it. 

When a date in the month view is clicked, the view for the day is displayed. For each day, the weather forecast for Vancouver from the Yahoo Weather API.

The calendar works in the latest versions of Chrome and Firefox, and does not contain table elements. It provides highlighting to indicate the current day, and correct hover actions where necessary.

## Implementation

By sourcing the appropriate libraries and utilizing components, the application aims to quickly provide a straightforward solution with a good user experience with less code, staying as clean and mantainable as possible while being open to extension.

The calendar is built with AngularJS and Bootstrap and also includes the following:

- AngularUI Bootstrap - Provides Angular directives for Bootstrap components (https://angular-ui.github.io/bootstrap/)
- Angular Bootstrap Calendar -  Angular adaptation of the Bootstrap calendar widget (https://github.com/mattlewis92/angular-bootstrap-calendar)
- Moment.js - Handles dates nicely
- jQuery - required for Bootstrap's Javascript


## Installation

From the project directory, with NPM and Bower installed, run:

`bower install`

