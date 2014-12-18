/* The ProfileDAO must be constructed with a connected database object */
function ProfileDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ProfileDAO)) {
        console.log("Warning: ProfileDAO constructor called without 'new' operator");
        return new ProfileDAO(db);
    }

    var users = db.collection("users");


    this.updateUser = function(userId, firstName, lastName, ssn, dob, address, bankAcc, bankRouting, callback) {

        // Create user document
        var user = {};
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (address) {
            user.address = address;
        }
        if (bankAcc) {
            user.bankAcc = bankAcc;
        }
        if (bankRouting) {
            user.bankRouting = bankRouting;
        }
        if (ssn) {
            user.ssn = ssn;
        }
        if (dob) {
            user.dob = dob;
        }

        users.update({
            userId: userId
        }, {
            $set: user
        }, function(err, result) {

            if (!err) {
                console.log("Updated user profile");
                return callback(null, user);
            }

            return callback(err, null);
        });
    };

    this.getByUserId = function(userId, callback) {
        users.findOne({
            userId: userId
        }, function(err, user) {

            if (err) return callback(err, null);

            callback(null, user);
        });
    };
}

module.exports.ProfileDAO = ProfileDAO;
