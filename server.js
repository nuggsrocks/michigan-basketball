/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var jsdom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsdom */ \"jsdom\");\n/* harmony import */ var jsdom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsdom__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _records__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./records */ \"./src/server/records.js\");\n/* harmony import */ var _stats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stats */ \"./src/server/stats.js\");\n/* harmony import */ var _schedule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./schedule */ \"./src/server/schedule.js\");\n/* harmony import */ var _roster__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./roster */ \"./src/server/roster.js\");\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\n\n\n\n\n\n\nvar PORT = process.env.PORT || 8080;\nvar HOST = process.env.HOST || 'localhost';\napp.use(cors__WEBPACK_IMPORTED_MODULE_1___default()());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a[\"static\"](__dirname + '/public'));\n\nfunction constructJsdomDocument(data) {\n  var dom = new jsdom__WEBPACK_IMPORTED_MODULE_3__[\"JSDOM\"](data);\n  return dom.window.document;\n}\n\napp.get('/fetch/standings', function (req, res) {\n  axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('https://www.espn.com/mens-college-basketball/standings/_/group/7', {\n    responseType: 'text'\n  }).then(function (response) {\n    var doc = constructJsdomDocument(response.data);\n    res.send(Object(_records__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(doc));\n  })[\"catch\"](function (e) {\n    return console.error(e);\n  });\n});\napp.get('/fetch/stats', function (req, res) {\n  axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('https://www.espn.com/mens-college-basketball/team/stats/_/id/130', {\n    responseType: 'text'\n  }).then(function (response) {\n    var doc = constructJsdomDocument(response.data);\n    res.send(Object(_stats__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(doc));\n  })[\"catch\"](function (e) {\n    return console.error(e);\n  });\n});\napp.get('/fetch/schedule', function (req, res) {\n  axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('https://www.espn.com/mens-college-basketball/team/schedule/_/id/130', {\n    responseType: 'text'\n  }).then(function (response) {\n    var doc = constructJsdomDocument(response.data);\n    res.send(Object(_schedule__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(doc));\n  })[\"catch\"](function (e) {\n    return console.error(e);\n  });\n});\napp.get('/fetch/roster', function (req, res) {\n  axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('https://www.espn.com/mens-college-basketball/team/roster/_/id/130', {\n    responseType: 'text'\n  }).then(function (response) {\n    var doc = constructJsdomDocument(response.data);\n    res.send(Object(_roster__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(doc));\n  });\n});\napp.get('/*', function (req, res) {\n  return res.sendFile(__dirname + '/public/index.html');\n});\napp.listen(PORT, HOST, function () {\n  return console.log('node server is running');\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/records.js":
/*!*******************************!*\
  !*** ./src/server/records.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction findRecords(doc) {\n  var tableRows = doc.querySelectorAll('div.standings__table table tbody tr');\n  var records = [];\n\n  for (var i = 0; i < tableRows.length; i++) {\n    var dataIndex = tableRows[i].attributes['data-idx'].value;\n\n    if (i < 14) {\n      records[dataIndex] = {\n        name: tableRows[i].querySelector('div.team-link span.hide-mobile').textContent\n      };\n    } else {\n      records[dataIndex].record = {\n        conference: tableRows[i].querySelectorAll('td')[0].textContent,\n        overall: tableRows[i].querySelectorAll('td')[3].textContent\n      };\n    }\n  }\n\n  return records;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (findRecords);\n\n//# sourceURL=webpack:///./src/server/records.js?");

/***/ }),

/***/ "./src/server/roster.js":
/*!******************************!*\
  !*** ./src/server/roster.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction findRoster(doc) {\n  var table = doc.querySelector('div.ResponsiveTable.Team.Roster table');\n  var rosterHeaders = [];\n  var tableHeaders = table.querySelectorAll('thead tr th');\n\n  for (var i = 0; i < tableHeaders.length; i++) {\n    if (tableHeaders[i].textContent !== '') {\n      rosterHeaders.push(tableHeaders[i].textContent);\n    }\n  }\n\n  var rosterRows = [];\n  var tableRows = table.querySelectorAll('tbody tr');\n\n  for (var _i = 1; _i < tableRows.length; _i++) {\n    rosterRows.push(tableRows[_i].querySelectorAll('td'));\n  }\n\n  var roster = [];\n\n  for (var _i2 = 0; _i2 < rosterRows.length; _i2++) {\n    var playerInfo = {};\n\n    for (var j = 1; j < rosterRows[_i2].length; j++) {\n      playerInfo[rosterHeaders[j - 1]] = rosterRows[_i2][j].textContent;\n    }\n\n    roster.push(playerInfo);\n  }\n\n  return roster;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (findRoster);\n\n//# sourceURL=webpack:///./src/server/roster.js?");

/***/ }),

/***/ "./src/server/schedule.js":
/*!********************************!*\
  !*** ./src/server/schedule.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction findSchedule(doc) {\n  var tableRows = _toConsumableArray(doc.querySelectorAll('div.page-container table tr'));\n\n  var gameRows = tableRows.filter(function (tr) {\n    return tr.textContent.indexOf('DATE') === -1 && tr.textContent.indexOf('Season') === -1;\n  }).map(function (row) {\n    return row.querySelectorAll('td');\n  });\n  var schedule = [];\n  gameRows.forEach(function (game) {\n    var opponent = game[1].textContent.replace(' *', '*').trimEnd();\n    var result = game[2].textContent[0].search(/(W|L)/) !== -1 ? \"\".concat(game[2].textContent[0], \" \").concat(game[2].textContent.slice(1).trimEnd()) : game[2].textContent;\n    schedule.push({\n      date: game[0].textContent,\n      opponent: opponent,\n      result: result\n    });\n  });\n  return schedule;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (findSchedule);\n\n//# sourceURL=webpack:///./src/server/schedule.js?");

/***/ }),

/***/ "./src/server/stats.js":
/*!*****************************!*\
  !*** ./src/server/stats.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction findStats(doc) {\n  var tableRows = doc.querySelectorAll('section.Card div.mt5 table tbody tr');\n  var tableData = [];\n  tableRows.forEach(function (element) {\n    return tableData.push(element.textContent);\n  });\n  var tableHeaders = doc.querySelectorAll('section.Card div.mt5 table thead tr th');\n  var statHeaders = [];\n\n  for (var i = 0; i < tableHeaders.length; i++) {\n    statHeaders.push(tableHeaders[i].textContent);\n  }\n\n  statHeaders = [statHeaders[1]].concat(_toConsumableArray(statHeaders.slice(statHeaders.lastIndexOf('Name') + 1)));\n  var stats = [];\n\n  for (var _i = 0; _i < tableData.length; _i++) {\n    var numOfPlayers = tableData.findIndex(function (text) {\n      return text === 'Total';\n    });\n\n    if (_i < numOfPlayers) {\n      var name = tableData[_i].split(' ').filter(function (data, index) {\n        return index < 2;\n      }).join(' ');\n\n      var position = tableData[_i].split(' ').filter(function (data) {\n        return data.length === 1;\n      })[0];\n\n      stats.push({\n        name: name,\n        position: position\n      });\n    } else if (_i < numOfPlayers * 2) {\n      (function () {\n        var playerStatColumns = [tableRows[_i + 1].querySelectorAll('td')[0]];\n        tableRows[_i + numOfPlayers * 2 + 3].querySelectorAll('td').forEach(function (column) {\n          return playerStatColumns.push(column);\n        });\n        var playerStats = {};\n\n        for (var j = 0; j < playerStatColumns.length; j++) {\n          playerStats[statHeaders[j]] = playerStatColumns[j].textContent;\n        }\n\n        stats[_i - numOfPlayers].data = playerStats;\n      })();\n    }\n  }\n\n  return stats;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (findStats);\n\n//# sourceURL=webpack:///./src/server/stats.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "jsdom":
/*!************************!*\
  !*** external "jsdom" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsdom\");\n\n//# sourceURL=webpack:///external_%22jsdom%22?");

/***/ })

/******/ });