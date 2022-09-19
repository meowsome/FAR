const ical = require('node-ical');
require('dotenv').config();

module.exports = function() {
    return ical.async.fromURL(process.env.GCAL_URL).then(function(events) {
        var dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};
        var timeOptions = {hour: 'numeric', minute: '2-digit'};

        return Object.keys(events).map(key => events[key]).filter(event => event['type'] == "VEVENT" && event['end'] >= new Date()).map(event => ({
            title: event.summary,
            location: event.location,
            description: event.description,
            startDate: event.start.toLocaleDateString("en-US", dateOptions).replace(",", ""),
            startTime: event.start.toLocaleTimeString("en-US", timeOptions),
            endTime: event.end.toLocaleTimeString("en-US", timeOptions)
        }));
    });
}