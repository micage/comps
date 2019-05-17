import GetClassesOfLib1 from "./libs/lib1/lib";


let modules = {};
Object.assign(modules, GetClassesOfLib1());


// Object.entries(app.libs).forEach(element => {
//     console.log(element[0] + ": " + element[1]);
// });
/**
 * @typedef {Object} Host
 * @property {(modules: Object.<string, Function>) => void} register
 * @property {(name: string, params: Object) => {IEntity}} create
 */

/**
 * @type {Host}
 */
let host = {
    register(_modules) {
        Object.assign(modules, _modules);
    },
    create(moduleName, params) {
        let Class = modules[moduleName];
        let instance = new Class(params);
        return instance;
    }
};

export default host;
// module.exports = host;