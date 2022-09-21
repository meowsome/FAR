const ical = require('node-ical');
require('dotenv').config();

module.exports = function(type) {
    return ical.async.fromURL(process.env.GCAL_URL).then(function(events) {
        var dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};
        var timeOptions = {hour: 'numeric', minute: '2-digit'};

        var events = Object.keys(events).map(key => events[key]).filter(event => event['type'] == "VEVENT");
        var filteredEvents = events.filter(event => type == 'new' ? event['end'] >= new Date() : event['end'] < new Date());

        if (type == 'old') filteredEvents = filteredEvents.reverse();

        return filteredEvents.map(event => ({
            title: event.summary,
            location: event.location,
            description: event.description,
            startDate: event.start.toLocaleDateString("en-US", dateOptions).replace(",", ""),
            startTime: event.start.toLocaleTimeString("en-US", timeOptions),
            endTime: event.end.toLocaleTimeString("en-US", timeOptions)
        }));
    });
}