const pool = require("../../config/database");
module.exports = {
    addFlight: (data, callBack) => {
    pool.query(
        `INSERT INTO flights(flightNo, airline, from_, to_, start, end, schedule, instru, busiSeats, nonbusiSeats, nonbusiCost, busiCost, rows_, meals, trip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.flightNo, 
            data.airline, 
            data.from, 
            data.to, 
            data.start, 
            data.end, 
            data.schedule,
            data.instru,
            data.busiSeats,
            data.nonbusiSeats,
            data.nonbusiCost,
            data.busiCost,
            data.rows,
            data.meals,
            data.trip
        ],
        (error, results, feilds) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
            }
        );
    },

    getFlights: (callBack) => {
        pool.query(
            `SELECT * from flights`,
            [],
            (error, results, feilds) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getFlightById: (id, callBack) => {
        pool.query(
            `SELECT * from flights where flightNo = ?`,
            [id],
            (error, results, feilds) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
            );
    },

    updateFlight: (data, callBack) => {
        pool.query(
            `UPDATE flights SET airline = ?, from_ = ?, to_ = ?, start = ?, end = ?, schedule = ?, instru = ?, busiSeats = ?, nonbusiSeats = ?, nonbusiCost = ?, busiCost = ?, rows_ = ?, meals = ?, trip = ? where flightNo = ?`,
            [                
            data.airline, 
            data.from, 
            data.to, 
            data.start, 
            data.end, 
            data.schedule,
            data.instru,
            data.busiSeats,
            data.nonbusiSeats,
            data.nonbusiCost,
            data.busiCost,
            data.rows,
            data.meals,
            data.trip,
            data.flightNo, 
            ],
            (error, results, feilds) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results.changedRows);
            }
        );
    },

    deleteFlight: (data, callBack) => {
        pool.query(
            `DELETE FROM flights WHERE flightNo = ?`,
            [data.flightNo],
            (error, results, feilds) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results.affectedRows);
            }
        );
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM admin_login WHERE email = ?`,
            [email],
            (error, results, feilds) => {
                if(error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getDetails: (pnr, callBack) => {
        pool.query(
            `SELECT * from booking_details where pnr = ?`,
            [pnr],
            (error, results, feilds) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
            );
    },

    getHistory: (email, callBack) => {
        pool.query(
            `SELECT * from booking_details where email = ?`,
            [email],
            (error, results, feilds) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
            );
    },

    getFlightsByParams: (data, callBack) => {
        console.log(data);
        pool.query(
            `SELECT * FROM flights where from_ = ? AND to_ = ? AND start = ?`,
            [data.from, data.to, data.start],
            (error, results, feilds) => {
                console.log(results);
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
            );
    },

    getUsers: (callBack) => {
        pool.query(
            `SELECT email, name, number FROM user_login`,
            [],
            (error, results, feilds) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};