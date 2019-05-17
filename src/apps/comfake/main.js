/**
 * @description
 * COM interfaces consists of tables of function tabels. Each table represents
 * an interface. All classes that expose these interfaces are available by
 * the host. For that to be possible they have to be registered there.
 * interfacePtr = host.create("classtoken", "interfacetoken");
 * 
 * In Javascript implementation details are visible.
*/


const Interface1 = {
    foo() {},
    bar() {}
};

const Interface2 = {
    bak() {},
    baz() {}
};

const MyClass = function (params) {

};

Object.assign(MyClass.prototype, Interface1);
Object.assign(MyClass.prototype, Interface2);

console.log(MyClass.prototype);

/**
 *  HIjacking Javascript
 */

/**
 * Das ist eine komplexe Situation. (Von da aus ...)
 */
