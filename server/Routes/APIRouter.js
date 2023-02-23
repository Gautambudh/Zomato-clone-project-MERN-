const express = require('express');
const Router = express.Router();
const Location = require('../Controller/LocationController');
const Restaurant = require('../Controller/RestaurantListController');
const Mealtype = require('../Controller/MealtypeController');
const MenuItems = require('../Controller/MenuListsController');
const Order = require('../Controller/OrdersController');
const PaymentController = require("../controller/PaymentController");
// 1st API which is welcome api
Router.get('/api', Location.Welcome);

Router.get('/api/get-Location-list', Location.getLoctaion);

// Router.get('/api/get-Restaurant-list', Restaurant.getRestaurant)

// Router.get('/api/get-Restaurant-list/:cityName', Restaurant.getRestaurantListbyLocid)

Router.get('/api/get-Restaurant-list-loc-id/:loc_id', Restaurant.getRestaurantListbyLocid);

Router.get('/api/get-Restaurant-details-by-id/:id', Restaurant.getRestaurantDetailsbyID);

Router.get('/api/get-Mealtype-list', Mealtype.getMealtypeList);

Router.get('/api/get-MenuItems-by-RestID/:rest_id', MenuItems.getMenuItemsbyRestID);

// orders api to save order
Router.post('/api/save-orders', Order.SaveNewOrder);

Router.post('/api/filter', Restaurant.filter);

Router.post('/api/gen-order', Restaurant.filter);

//payment
Router.post("/api/gen-order-id", PaymentController.genOrderId);
Router.post("/api/verify-payment", PaymentController.verifyPayment); // react

module.exports = Router;