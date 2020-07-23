"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeferredServiceProvider = void 0;
const serviceProvider_1 = require("./serviceProvider");
class DeferredServiceProvider extends serviceProvider_1.ServiceProvider {
    /**
     * The service will be created only if requested by this name.
     *
     * @returns string
     */
    provide() {
        return this.name;
    }
}
exports.DeferredServiceProvider = DeferredServiceProvider;
