
const {
    IAddress,
    IUser
} = require("./interface");

import IEntity from "../../IEntity";

/**
 * @constructor
 * @implements {IAddress}
 * @param {Object} params
 * @param {string} params.street
 * @param {number} params.house
 * @param {string} params.city
 */
const Address = function (params) {
    params = params || { city: "Unknown", street: "Unknown", house: 0 };
    this._street = params.street;
    this._city = params.city;
    this._house = params.house;
};

Object.assign(IAddress.prototype, IEntity.prototype);
Address.prototype = Object.create(IAddress.prototype);
Address.prototype.getStreet = function () { return this._street; }
Address.prototype.getHouse = function () { return this._house; }
Address.prototype.getCity = function () { return this._city; }


/**
 * @constructor
 * @implements {IUser}
 * @param {Object} params
 * @param {string} params.name
 */
const User = function (params) {
    this._name = params.name;
};

User.prototype = Object.create(IUser.prototype);
User.prototype.getName = function () { return this._name; }

const GetClasses = function () {
    return {
        Address, User
    };
};

console.log("lib1 registered.");
export default GetClasses;