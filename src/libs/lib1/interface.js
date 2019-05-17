/**
 * An address.
 * @interface
 */
const IAddress = function () {};
IAddress.prototype.getStreet = function () { debugger; }
IAddress.prototype.getHouse = function () { debugger; }
IAddress.prototype.getCity = function () { debugger; }


/**
 * A user.
 * @interface
 * @param {Object} params
 * @param {string} params.name
 */
const IUser = function (params) {};
IUser.prototype.getName = function () { debugger; }


module.exports = {
    IAddress: IAddress,
    IUser: IUser
};