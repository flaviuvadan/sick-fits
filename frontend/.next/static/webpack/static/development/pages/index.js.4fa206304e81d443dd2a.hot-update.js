webpackHotUpdate("static/development/pages/index.js",{

/***/ "./queries/queries.js":
/*!****************************!*\
  !*** ./queries/queries.js ***!
  \****************************/
/*! exports provided: ALL_ITEMS_QUERY, CREATE_ITEM_MUTATION, UPDATE_ITEM_MUTATION, ITEM_QUERY, DELETE_ITEM_MUTATION, PAGINATION_QUERY, SIGNUP_MUTATION, SIGNIN_MUTATION, CURRENT_USER_QUERY, SIGNOUT_MUTATION, RESET_PASSWORD_MUTATION, REQUEST_RESET_MUTATION, ALL_USERS_QUERY, UPDATE_PERMISSIONS_MUTATION, LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION, ADD_TO_CART_MUTATION, REMOVE_FROM_CART_MUTATION, SEARCH_ITEMS_QUERY */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_PASSWORD_MUTATION", function() { return RESET_PASSWORD_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_RESET_MUTATION", function() { return REQUEST_RESET_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_USERS_QUERY", function() { return ALL_USERS_QUERY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PERMISSIONS_MUTATION", function() { return UPDATE_PERMISSIONS_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCAL_STATE_QUERY", function() { return LOCAL_STATE_QUERY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOGGLE_CART_MUTATION", function() { return TOGGLE_CART_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_TO_CART_MUTATION", function() { return ADD_TO_CART_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_FROM_CART_MUTATION", function() { return REMOVE_FROM_CART_MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEARCH_ITEMS_QUERY", function() { return SEARCH_ITEMS_QUERY; });
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./config.js");
function _templateObject19() {
  var data = _taggedTemplateLiteral(["\n\tquery SEARCH_ITEMS_QUERY(\n\t\t\n\t)\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["\n    mutation REMOVE_FROM_CART_MUTATION(\n    $id: ID!\n    ) {\n        removeFromCart(\n            id: $id\n        ) {\n            id\n        }\n    }\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["\n    mutation ADD_TO_CART_MUTATION(\n    $id: ID!\n    ) {\n        addToCart(\n            id: $id\n        ) {\n            id\n            quantity\n        }\n    }\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["\n    mutation TOGGLE_CART_MUTATION {\n        toggleCart @client\n    }\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n    query LOCAL_STATE_QUERY {\n        cartOpen @client\n    }\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n    mutation UPDATE_PERMISSIONS_MUTATION(\n    $permissions: [Permission]\n    $userId: ID!\n    ) {\n        updatePermissions(\n            permissions: $permissions\n            userId: $userId\n        ) {\n            id\n            name\n            email\n            permissions\n        }\n    }\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n    query ALL_USERS_QUERY {\n        users {\n            id\n            name\n            email\n            permissions\n        }\n    }\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n    mutation REQUEST_RESET_MUTATION(\n    $email: String!\n    ) {\n        requestReset(\n            email: $email\n        ) {\n            message\n        }\n    }\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n    mutation RESET_PASSWORD_MUTATION(\n    $password: String!\n    $confirmPassword: String!\n    $resetToken: String!\n    ) {\n        resetPassword(\n            password: $password\n            confirmPassword: $confirmPassword\n            resetToken: $resetToken\n        ) {\n            id\n            email\n            name\n        }\n    }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n    mutation SIGNOUT_MUTATION {\n        signout {\n            message\n        }\n    }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n    query CURRENT_USER_QUERY {\n        currentUser {\n            id\n            email\n            name\n            permissions\n            cart {\n                id\n                quantity\n                item {\n                    id\n                    price\n                    image\n                    title\n                    description\n                }\n            }\n        }\n    }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n    mutation SIGNIN_MUTATION(\n    $email: String!\n    $password: String!\n    ) {\n        signin(\n            email: $email\n            password: $password\n        ) {\n            id\n            email\n            name\n        }\n    }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n    mutation SIGNUP_MUTATION(\n    $email: String!\n    $name: String!\n    $password: String!\n    ) {\n        signup(\n            email: $email\n            name: $name\n            password: $password\n        ) {\n            id\n            email\n            name\n        }\n    }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n    query PAGINATION_QUERY {\n        itemsConnection {\n            aggregate {\n                count\n            }\n        }\n    }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    mutation DELETE_ITEM_MUTATION(\n    $id: ID!\n    ) {\n        deleteItem(\n            id: $id\n        ) {\n            id\n        }\n    }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    query ITEM_QUERY(\n    $id: ID!\n    ) {\n        item(where: {\n            id: $id\n        }) {\n            id\n            title\n            description\n            price\n            largeImage\n        }\n    }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    mutation UPDATE_ITEM_MUTATION(\n    $id: ID!\n    $title: String\n    $description: String\n    $price: Int\n    ) {\n        updateItem(\n            id: $id\n            title: $title\n            description: $description\n            price: $price\n        ) {\n            id\n            title\n            description\n            price\n        }\n    }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    mutation CREATE_ITEM_MUTATION(\n    $title: String!\n    $description: String!\n    $price: Int!\n    $image: String\n    $largeImage: String\n    ) {\n        createItem(\n            title: $title\n            description: $description\n            price: $price\n            image: $image\n            largeImage: $largeImage\n        ) {\n            id\n        }\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    query ALL_ITEMS_QUERY(\n    $skip: Int = 0\n    $first: Int = ", "\n    ) {\n        items(\n            orderBy: createdAt_DESC\n            skip: $skip\n            first: $first\n        ) {\n            id\n            title\n            price\n            description\n            image\n            largeImage\n        }\n    }\n"]);

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
var RESET_PASSWORD_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject11());
var REQUEST_RESET_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject12());
var ALL_USERS_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject13());
var UPDATE_PERMISSIONS_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject14()); // @client tells Apollo to not go to the GraphQL client or the server but check the client state for cartOpen

var LOCAL_STATE_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject15());
var TOGGLE_CART_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject16());
var ADD_TO_CART_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject17());
var REMOVE_FROM_CART_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject18());
var SEARCH_ITEMS_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default()(_templateObject19());

/***/ })

})
//# sourceMappingURL=index.js.4fa206304e81d443dd2a.hot-update.js.map