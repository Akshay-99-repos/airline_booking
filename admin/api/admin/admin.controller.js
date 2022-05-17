const { addFlight, updateFlight, getFlightById, getFlights, deleteFlight, getUserByUserEmail, getUsers} = require("./admin.service");
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const {sign} = require("jsonwebtoken");

module.exports = {
    addFlight: (req, res) => {
        const body = req.body;
        addFlight(body, (err, results) => {
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

    getFlights: (req, res) => {
        getFlights((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results,
            });
        });
    },

    updateFlight: (req, res) => {
        const body = req.body;
        updateFlight(body, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Failed to Update Add Schedule !"
                })
            }
            return res.json({
                success: 1,
                message: "Flight Data Updated Successfully !",
            });
        });
    },

    deleteFlight: (req, res) => {
        const data = req.body;
        deleteFlight(data, (err, results) => {
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
                message: "Flight Deleted Successfully !",
            });
        });
    },

    getAllUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results,
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            const salt = genSaltSync(10);
            results.password = hashSync(results.password, salt);
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
                const jsontoken = sign({ result: results}, process.env.ENCRYPT_TOKEN, {expiresIn: "1h",});
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
    }
};