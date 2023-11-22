const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({  
    
    title: {
        type: String,
        required: [true, "Event requires title"]
    },

    startTime: {
        type: Date,
        required: [true, "Event requires start time"],
        min: [new Date(), "Event start time cannot be in the past"]
    },

    endTime: {
        type: Date,
        required: [true, "Event requires end time"],

        //function to accept any date 5 minutes ahead of start time
        min: [
            function () {
              const date = new Date(this.start);
              const validDate = new Date(date.getTime() + 5 * 60000); // 5 minutes in milliseconds
              return validDate;
            },
            "Event end time must be at least 5 minutes ahead of event start time",
          ],
    },

    description: {
        type: String
    },

});

module.exports = mongoose.model("Events", eventsSchema);