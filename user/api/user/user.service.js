const pool = require("../../config/database");
module.exports = {

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

    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM user_login WHERE email = ?`,
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
        pool.query(
            `SELECT * FROM flights where from_ = ? AND to_ = ? AND start = ?`,
            [data.from, data.to, data.start],
            (error, results, feilds) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
            );
    },

    addUser: (data, callback) => {
        pool.query(
            `INSERT INTO user_login(email, name, password, number) VALUES ( ?, ?, ?, ?)`,
            [
                data.email, 
                data.name, 
                data.password,
                data.number
            ],
            (error, results, feilds) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
                }
            );
        },

        bookFlight: (flightId, data, callback) => {
            pool.query(
                `INSERT INTO booking_details(email, cust_name, seat_count, pass_detail, seat_no, flightNo) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    data.email,
                    data.cust_name,
                    data.seat_count,
                    data.pass_detail,
                    data.seat_no,
                    flightId
                ],
                (error, results, feilds) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, results);
                    }
                );
            },

            cancelBooking: (pnr, callBack) => {
                pool.query(
                    `DELETE FROM booking_details WHERE pnr = ?`,
                    [pnr],
                    (error, results, feilds) => {
                        if(error) {
                            return callBack(error);
                        }
                        return callBack(null, results.affectedRows);
                    }
                );
            },
};