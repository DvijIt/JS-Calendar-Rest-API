"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

var _storage = require("./storage.js");

var _renderEvents = require("./renderEvents.js");

var _eventsGateway = require("./eventsGateway.js");

var _touchEvent = require("./touchEvent.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var btnRemoveEvent = document.querySelector(".btn-delete-event");
btnRemoveEvent.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _eventsGateway.deleteEvent)(_touchEvent.getEventId).then(function () {
            return (0, _eventsGateway.getEventsList)();
          }).then(function (newTasksList) {
            (0, _renderEvents.renderEvents)(newTasksList);

            _storage.modal.close();
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));