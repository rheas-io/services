"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
class ServiceProvider {
    /**
     * Creates a new service provider
     *
     * @param name
     * @param container
     */
    constructor(name, container) {
        /**
         * Registered status of the provider.
         *
         * @var boolean
         */
        this._registered = false;
        /**
         * Boot status of the provider
         *
         * @var boolean
         */
        this._booted = false;
        this.name = name;
        this.container = container;
    }
    /**
     * Register the service within this function. Referencing other services
     * within this function should be done carefully. It could be possible that
     * referencing service is not registered yet. So proper validation is needed, if
     * referencing other services.
     *
     * And, referencing other service which inturn reference this service could produce
     * an infinite loop.
     */
    register() {
    }
    /**
     * Boots the service provider. All the other registered services will be available
     * inside this function.
     */
    boot() {
    }
    /**
     * Sets the registration status of this service provider.
     *
     * @param status
     */
    setRegistered(status) {
        this._registered = status;
    }
    /**
     * Sets the boot status of this service provider
     *
     * @param status
     */
    setBooted(status) {
        this._booted = status;
    }
    /**
     * Returns the registration status of this service provider.
     *
     * @return boolean
     */
    isRegistered() {
        return this._registered;
    }
    /**
     * Returns the boot status of this service provider.
     *
     * @return boolean
     */
    isBooted() {
        return this._booted;
    }
    /**
     * Returns the name of the service.
     *
     * @return string
     */
    serviceName() {
        return this.name;
    }
}
exports.ServiceProvider = ServiceProvider;
