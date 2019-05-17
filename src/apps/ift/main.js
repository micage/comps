import Host from "../../host";
// const Host = require("../../host");
import { IAddress, IUser } from "../../libs/lib1/interface";

/** @type { IAddress } */
let address = Host.create("Address", { city: "Berlin", street: "Anklamer Strasse", house: 81});
let city = address.getCity();
console.log(city);



/** @type {IUser} */
let user;



const test = function(n) {
    let xx = x => x*x;
    return xx(n);
};

let res = test(4);

console.log(res);


// =================================================================
// Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();

    // dispose handler
    module.hot.dispose(function () {
        // revoke the side effect
        // root.remove();
    });
}
