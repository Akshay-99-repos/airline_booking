const {checkToken} = require('../../auth/token_validation');
const {addFlight, updateFlight, getFlightById, getFlights, deleteFlight, login, getAllUsers} = require('./admin.controller');
const router = require("express").Router();

router.post("/admin/login", login);
router.post("/airline/register", checkToken, addFlight);
router.patch("/airline/inventory/add", checkToken, updateFlight);
router.get("/", checkToken, getFlights);
router.get("/allUsers", checkToken, getAllUsers);
router.get("/:id", checkToken, getFlightById);
router.delete("/airline/block", checkToken, deleteFlight);

module.exports = router;