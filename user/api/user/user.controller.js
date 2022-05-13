const { getFlightById, getUserByEmail, getDetails, getHistory, getFlightsByParams, addUser, bookFlight, cancelBooking} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const {sign} = require("jsonwebtoken");

module.exports = {

    getFlightById: (req, res) => {
        const id = req.params.id;
        getFlightById(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found !"
                })
            };
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    getDetails: (req, res) => {
        const id = req.params.pnr;
        getDetails(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found !"
                })
            };
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    getHistory: (req, res) => {
        const id = req.params.email;
        getHistory(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found !"
                })
            };
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    getFlightsByParams: (req, res) => {
        const body = req.body;
        getFlightsByParams(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found !"
                })
            };
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    bookFlight: (req, res) => {
        const flightId = req.params.id;
        const body = req.body;
        bookFlight(flightId, body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DB Connection Error !",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if(err) {
                console.log(err);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Invalid Email or Password !!",
                });
            }
            const result = compareSync(body.password, results.password);
            if(result) {
                results.password = undefined;
                const jsontoken = sign({ result: results}, process.env.ENCRYPT_USER_TOKEN, {expiresIn: "1h",});
                return res.json({
                    success: 1,
                    message: "Login Successful !",
                    token: jsontoken,
                });                
                }
                else {
                    return res.json({
                        success: 0,
                        message: "Invalid Email or Password !",
                });
            }
        })
    },

    addUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        addUser(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DB Connection Error !",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },

    cancelBooking: (req, res) => {
        const pnr = req.params.pnr;
        cancelBooking(pnr, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found !",
                });
            }
            return res.json({
                success: 1,
                message: "Ticket Cancelled Successfully !",
            });
        });
    },
};