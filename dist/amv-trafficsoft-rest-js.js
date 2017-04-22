(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["amvTrafficsoftRestJs"] = factory();
	else
		root["amvTrafficsoftRestJs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (baseUrl, options) {};

	module.exports = exports['default']; //import axios from 'axios';
	//import _ from 'lodash';
	/**
	var _ = {};

	 * amvTrafficsoftRestJs
	 * Description
	 *
	 * @name amvTrafficsoftRestJs
	 * @function
	 * @param {Object} options An object containing the following fields:
	 *
	 * @return {Array} Result

	var xfcdClient = function(baseUrl, options) {
	  var xfcdRequestOptions = _.defaults({
	      baseURL: baseUrl + '/xfcd',
	  }, options)

	  var httpClient = axios.create(xfcdRequestOptions);
	  httpClient.defaults.timeout = 45000;

	  var getLastData = function(vehicleIdsArray, options) {
	    var url = '/last';
	    var requestBody = vehicleIdsArray || [];
	    return httpClient.post(url, requestBody, options);
	  };

	  return {
	    getLastData: getLastData
	  };
	};

	export default function (baseUrl, options) {
	  var contractId = options && options.contractId || -1;
	  var defaultRequestOptions = _.defaults({
	    baseURL: baseUrl + '/' + contractId,
	  }, options);

	  return {
	    xfcd: function(options) {
	      var requestOptions = _.defaults(options, defaultRequestOptions)
	      return xfcdClient(requestOptions);
	    }
	  };
	}
	 */

/***/ })
/******/ ])
});
;