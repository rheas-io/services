import { KeyValue } from '@rheas/contracts';
import { IDriverManager } from '@rheas/contracts/services';
import { InvalidArgumentException } from '@rheas/errors/invalidArgument';

export class DriverManager<T> implements IDriverManager<T> {
    /**
     * Stores the manager driver instances.
     *
     * @var object
     */
    protected _drivers: KeyValue<T> = {};

    /**
     * Sets the active driver key/name.
     *
     * @var string
     */
    protected _activeDriver: string = '';

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
     * Sets the active driver name, if a driver of that name is registered.
     * Otherwise an exception is thrown.
     *
     * Provide a second argument to forcefully register a driver on the given
     * name and set it as active driver.
     *
     * @param name
     * @param driver
     */
    public setActiveDriver(name: string, driver?: T): void {
        if (driver) {
            this.registerDriver(name, driver, true);
        }
        this.getDriver(name);

        this._activeDriver = name;
    }

    /**
     * Returns the driver instance for the name or returns the active driver,
     * if no name is specified.
     *
     * @param name
     */
    public getDriver(name?: string): T {
        const driverInstance =
            name != null ? this._drivers[name] : this._drivers[this._activeDriver];

        if (!driverInstance) {
            throw new InvalidArgumentException(`Driver ${name} is not registered.`);
        }
        return driverInstance;
    }
}
