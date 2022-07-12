/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/map.js":
/*!******************************!*\
  !*** ./src/assets/js/map.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n( function() {\n    const\n        lat = document.querySelector( '#lat ').value || 4.7101416,\n        lng = document.querySelector( '#lng ').value || -74.0720851,\n        zoom = 15;\n\n    const\n        mapa = L.map( 'map' ).setView([ lat, lng ], zoom ),       // ? Instancia del mapa en el ID #map en el FrontEnd con la informacion requerida\n        geocodeService = L.esri.Geocoding.geocodeService();   // ? Provider & Geocoding\n\n    // ! Creditos, sin ellos no funciona la libreria\n    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo( mapa );\n\n    // ! Posiciona el Pin sobre el mapa\n    let marker = L.marker([ lat, lng ], {       // ? Crea el pin sobre las coordenadas establecidas aqui\n            draggable: true,                        // ? Permite que el pin pueda moverse sobre el mapa\n            autoPan: true                           // ? Permite que se mueva el panel del mapa junto con el pin\n        }).addTo( mapa )                            // ? Asignamos el mapa sobre el que se desplegará el pin\n        .bindPopup( \"Ubicación de tu propiedad\" );  // ? Popup al pin con un mensaje\n\n    // ! Detectamos el movimiento del Pin sobre el mapa\n    marker.on( 'moveend', function( event ){\n        marker = event.target;                                  // ? Obtenemos el marker al finalizar el movimiento\n\n        const coords = marker.getLatLng();                      // ? Obtenemos las coordenadas del marker\n        console.log( coords );\n\n        mapa.panTo( new L.LatLng( coords.lat, coords.lng ) );     // ? Centra el mapa a las nuevas coordenadas\n\n        // ! Obtenemos informacion detallada de las coordenadas (como puede ser el nombre de la calle)\n        geocodeService.reverse().latlng( coords, zoom ).run( function( err, result ){\n            if( err ) {\n                console.log( err );\n                return;\n            }\n\n            marker.bindPopup( `Ubicación: \\n ${ result.address.LongLabel }` );  // ? Popup al pin con un mensaje\n            console.log( result );\n\n            document.querySelector( '.street-name' ).textContent = result?.address?.Address ?? '';\n            document.querySelector( '#street-name' ).value = result?.address?.Address ?? '';\n            document.querySelector( '#lat' ).value = result?.latlng?.lat ?? '';\n            document.querySelector( '#lng' ).value = result?.latlng?.lng ?? '';\n        });\n    });\n\n})();\n\n//# sourceURL=webpack://bienes-raices/./src/assets/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;