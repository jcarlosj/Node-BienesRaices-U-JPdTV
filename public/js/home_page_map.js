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

/***/ "./src/assets/js/home-page-map.js":
/*!****************************************!*\
  !*** ./src/assets/js/home-page-map.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n( function(){\n    const\n        lat = 4.7101416,\n        lng = -74.0720851,\n        zoom = 13;\n\n    const\n        mapa = L.map( 'home-map' ).setView([ lat, lng ], zoom ),       // ? Instancia del mapa en el ID #map en el FrontEnd con la informacion requerida\n        geocodeService = L.esri.Geocoding.geocodeService();   // ? Provider & Geocoding\n\n    // ! Creditos, sin ellos no funciona la libreria\n    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo( mapa );\n\n    // ! Definimos un grupo de markers\n    let markers = new L.FeatureGroup().addTo( mapa );\n\n    // ! Obtiene las propiedades a traves del API\n    const getAllRealestateAPI = async () => {\n        const url = '/api/realestate';\n\n        try {\n            const\n                response = await fetch( url ),\n                data = await response.json();\n\n            // console.log( data );\n            showPinRealestate( data.realestate )\n        } \n        catch( error ) {\n            console.error( error );\n        }\n    }\n\n    getAllRealestateAPI();\n\n    const showPinRealestate = ( data ) => {\n\n        console.log( data );\n\n        data.forEach( realestate => {\n\n            // ! Posiciona el Pin sobre el mapa\n            let marker = new L.marker([ realestate?.lat, realestate?.lng ], {       // ? Crea el pin sobre las coordenadas establecidas aqui\n                draggable: false,                        // ? Permite que el pin pueda moverse sobre el mapa\n                autoPan: true                            // ? Permite que se mueva el panel del mapa junto con el pin\n            })\n            .addTo( mapa )                            // ? Asignamos el mapa sobre el que se desplegará el pin\n            .bindPopup( `\n                <div class=\"flex justify-center items-center h-screen bg-blue-lightest\">\n                    <div id=\"app\" class=\"bg-white w-128 h-60 flex card text-grey-darkest\">\n                        <img style=\"width: 90px; object-fit: cover;\" class=\"w-1/2\" src=\"/uploads/${ realestate?.image }\" alt=\"Miniatura: ${ realestate.ad_title }\">\n                        <div class=\"w-full flex flex-col\">\n                            <div class=\"p-2 pb-0 flex-1\">\n                                <h3 class=\"font-bold mb-1 text-grey-darkest\">${ realestate?.ad_title }</h3>\n                                <div class=\"text-xs flex items-center mb-4\">\n                                    <i class=\"fas fa-map-marker-alt mr-1 text-grey-dark\"></i>\n                                    ${ realestate?.category?.name }\n                                </div>\n                                <span class=\"text-5xl text-grey-darkest\">${ realestate?.price?.range }<span class=\"text-lg\"></span></span>\n                                <div class=\"flex items-center mt-4\">\n                                    <div class=\"pr-2 text-xs\">\n                                        <a href=\"/real-estate/${ realestate?.id }\">ver más</a>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            ` );  // ? Popup al pin con un mensaje\n\n            markers.addLayer( marker );     // ? Permitira en el futuro aplicar filtros a los pines que se muestran en el mapa\n        });\n\n    }\n\n\n})();\n\n\n\n//# sourceURL=webpack://bienes-raices/./src/assets/js/home-page-map.js?");

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
/******/ 	__webpack_modules__["./src/assets/js/home-page-map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;