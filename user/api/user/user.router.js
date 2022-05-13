const {checkUserToken} = require('../../auth/user_token_validation');
const {getFlightById, login, getDetails, getHistory, getFlightsByParams, addUser, bookFlight, cancelBooking} = require('./user.controller');
const router = require("express").Router();

router.post("/user/register", addUser);
router.post("/user/login", login);
router.get("/search", checkUserToken, getFlightsByParams);
router.get("/:id", checkUserToken, getFlightById);

router.post("/booking/:id", checkUserToken, bookFlight);
router.get("/ticket/:pnr", checkUserToken, getDetails);
router.get("/booking/history/:email", checkUserToken, getHistory);
router.delete("/booking/cancel/:pnr", checkUserToken, cancelBooking);

module.exports = router;