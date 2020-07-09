import { KeyValue } from "@rheas/contracts";
import { IDriverManager } from "@rheas/contracts/services";
import { InvalidArgumentException } from "@rheas/errors/invalidArgument";

export class DriverManager<T> implements IDriverManager<T>{

    /**
     * Stores the manager driver instances.
     * 
     * @var object
     */
    protected _drivers: KeyValue<T> = {};

    /**
     * Registers a driver instance to the given name. If force is false
     * and an instance already exists for the key, then it won't be replaced.
     * 
     * @param name 
     * @param driver 
     * @param force 
     */
    public registerDriver(name: string, driver: T, force: boolean = false): void {
        if (force || !this._drivers[name]) {
            this._drivers[name] = driver;
        }
    }

    /**
     * Returns the driver instance for the name.
     * 
     * @param name 
     */
    public getDriver(name: string): T {
        const driverInstance = this._drivers[name];

        if (!driverInstance) {
            throw new InvalidArgumentException(`Driver ${name} is not registered.`);
        }
        return driverInstance;
    }
}