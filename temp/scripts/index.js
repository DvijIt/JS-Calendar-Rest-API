"use strict";

var _renderCalendar = require("./renderCalendar.js");

require("./saveEvent.js");

require("./touchEvent.js");

require("./deleteEvent.js");

document.addEventListener('DOMContentLoaded', _renderCalendar.renderCalendar);