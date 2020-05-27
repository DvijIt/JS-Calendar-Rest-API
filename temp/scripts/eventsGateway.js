"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEvent = exports.updateEventData = exports.createEvent = exports.getEventsList = void 0;

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var baseUrl = 'https://5ec377e28ebdcc0016a5a8e4.mockapi.io/api/v1/events';

var getEventsList = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var responce, eventsList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(baseUrl);

          case 2:
            responce = _context.sent;
            _context.next = 5;
            return responce.json();

          case 5:
            eventsList = _context.sent;
            return _context.abrupt("return", eventsList);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getEventsList() {
    return _ref.apply(this, arguments);
  };
}();

exports.getEventsList = getEventsList;

var createEvent = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(eventData) {
    var createEventData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(baseUrl, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(eventData)
            });

          case 2:
            createEventData = _context2.sent;

            if (!createEventData.ok) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", createEventData.json());

          case 5:
            throw new Error('Loading data failed');

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createEvent(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createEvent = createEvent;

var updateEventData = function updateEventData(eventId, updatedEventData) {
  return fetch("".concat(baseUrl, "/").concat(eventId), {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(updatedEventData)
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Loading data for update failed');
    }
  }).catch(function (err) {
    alert(err);
  });
};

exports.updateEventData = updateEventData;

var deleteEvent = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(eventId) {
    var deleteEventData;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch("".concat(baseUrl, "/").concat(eventId), {
              method: 'DELETE'
            });

          case 2:
            deleteEventData = _context3.sent;

            if (!(deleteEventData.status === 200)) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return deleteEventData.json();

          case 6:
            return _context3.abrupt("return", _context3.sent);

          case 7:
            throw new Error('Failed to load data');

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteEvent(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteEvent = deleteEvent;