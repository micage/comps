/**
 * @typedef {Object} IEntity
 * @property {(s: string) => IEntity} getInterface;
 */

/**
 * root interface.
 * @interface
 */
const IEntity = function () {};
IEntity.prototype.getInterface = function () { return this; }

export default IEntity;