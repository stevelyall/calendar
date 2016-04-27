/**
 * Constructs an Event object
 * @param title event title
 * @param type Appointment, Meeting or Task
 * @param start Date object for event start
 * @param end Date object for event ending
 * @returns a new Event that can be shown on the calendar
 */
function Event(title, type, start, end) {

  // set bootstrap class name for type
  function _getClassForEventType(type) {
    var result;
    if (type == 'Appointment') {
      result = 'info';
    }
    else if (type == 'Meeting') {
      result = 'warning';
    }
    else if (type == 'Task' ){
      result = 'success';
    }
    return result;
  }

  return {
    title : title,
    type : _getClassForEventType(type) || 'info',
    startsAt : start || new Date(),
    endsAt : end,
    editable: true,
    deletable: true,
    incrementsBadgeTotal: true
  }
}