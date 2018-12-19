webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./queries/queries.js":
/*!****************************!*\
  !*** ./queries/queries.js ***!
  \****************************/
/*! exports provided: ALL_ITEMS_QUERY, CREATE_ITEM_MUTATION, UPDATE_ITEM_MUTATION, ITEM_QUERY, DELETE_ITEM_MUTATION, PAGINATION_QUERY, SIGNUP_MUTATION, SIGNIN_MUTATION, CURRENT_USER_QUERY, SIGNOUT_MUTATION, REQUEST_RESET_MUTATION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_ITEMS_QUERY", function() { return ALL_ITEMS_QUERY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_ITEM_MUTATION", function() { return CREATE_ITEM_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_ITEM_MUTATION", function() { return UPDATE_ITEM_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ITEM_QUERY", function() { return ITEM_QUERY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_ITEM_MUTATION", function() { return DELETE_ITEM_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGINATION_QUERY", function() { return PAGINATION_QUERY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNUP_MUTATION", function() { return SIGNUP_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNIN_MUTATION", function() { return SIGNIN_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURRENT_USER_QUERY", function() { return CURRENT_USER_QUERY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNOUT_MUTATION", function() { return SIGNOUT_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_RESET_MUTATION", function() { return REQUEST_RESET_MUTATION; });
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./config.js");
function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n\tmutation REQUEST_RESET_MUTATION {\n\t\t\n\t}\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n\tmutation SIGNOUT_MUTATION {\n\t\tsignout {\n\t\t\tmessage\n\t\t}\n\t}\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n\tquery CURRENT_USER_QUERY {\n\t\tcurrentUser {\n\t\t\tid\n            email\n            name\n            permissions\n\t\t}\n\t}\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n    mutation SIGNIN_MUTATION(\n\t\t$email: String!\n\t\t$password: String!\n    ) {\n        signin(\n            email: $email\n            password: $password\n        ) {\n            id\n            email\n            name\n        }\n    }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n    mutation SIGNUP_MUTATION(\n        $email: String!\n        $name: String!\n        $password: String!\n    ) {\n        signup(\n        \temail: $email\n        \tname: $name\n            password: $password\n        ) {\n            id\n            email\n            name\n        }\n    }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n    query PAGINATION_QUERY {\n    \titemsConnection {\n    \t\taggregate {\n    \t\t\tcount\n    \t\t}\n    \t}\n    }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    mutation DELETE_ITEM_MUTATION(\n        $id: ID!\n    ) {\n        deleteItem(\n            id: $id\n        ) {\n            id\n        }\n    }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    query ITEM_QUERY(\n        $id: ID!\n    ) {\n        item(where: {\n            id: $id\n        }) {\n            id\n            title\n            description\n            price\n            largeImage\n        }\n    }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    mutation UPDATE_ITEM_MUTATION(\n        $id: ID!\n        $title: String\n        $description: String\n        $price: Int\n    ) {\n        updateItem(\n            id: $id\n            title: $title\n            description: $description\n            price: $price\n        ) {\n            id\n            title\n            description\n            price\n        }\n    }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    mutation CREATE_ITEM_MUTATION(\n        $title: String!\n        $description: String!\n        $price: Int!\n        $image: String\n        $largeImage: String\n    ) {\n        createItem(\n            title: $title\n            description: $description\n            price: $price\n            image: $image\n            largeImage: $largeImage\n        ) {\n            id\n        }\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    query ALL_ITEMS_QUERY(\n\t\t$skip: Int = 0\n\t\t$first: Int = ", "\n\t) {\n        items(\n\t\t\torderBy: createdAt_DESC\n\t\t\tskip: $skip\n\t\t\tfirst: $first \n\t\t) {\n            id\n            title\n            price\n            description\n            image\n            largeImage\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var ALL_ITEMS_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject(), _config__WEBPACK_IMPORTED_MODULE_1__["perPage"]);
var CREATE_ITEM_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject2());
var UPDATE_ITEM_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject3());
var ITEM_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject4());
var DELETE_ITEM_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject5());
var PAGINATION_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject6());
var SIGNUP_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject7());
var SIGNIN_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject8());
var CURRENT_USER_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject9());
var SIGNOUT_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject10());
var REQUEST_RESET_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject11());

/***/ })

})
//# sourceMappingURL=_app.js.9201b0139eb7751a13ab.hot-update.js.map