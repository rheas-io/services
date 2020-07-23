"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverManager = void 0;
const invalidArgument_1 = require("@rheas/errors/invalidArgument");
class DriverManager {
    constructor() {
        /**
         * Stores the manager driver instances.
         *
         * @var object
         */
        this._drivers = {};
    }
    /**
     * Registers a driver instance to the given name. If force is false
     * and an instance already exists for the key, then it won't be replaced.
     *
     * @param name
     * @param driver
     * @param force
     */
    registerDriver(name, driver, force = false) {
        if (force || !this._drivers[name]) {
            this._drivers[name] = driver;
        }
    }
    /**
     * Returns the driver instance for the name.
     *
     * @param name
     */
    getDriver(name) {
        const driverInstance = this._drivers[name];
        if (!driverInstance) {
            throw new invalidArgument_1.InvalidArgumentException(`Driver ${name} is not registered.`);
        }
        return driverInstance;
    }
}
exports.DriverManager = DriverManager;
