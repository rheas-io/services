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
     * Sets the default driver key/name.
     *
     * @var string
     */
    protected _defaultDriver: string = '';

    /**
     * Registers a driver instance to the given name. If force is false
     * and an instance already exists for the key, then it won't be replaced.
     *
     * Throws an exception if empty name is used.
     *
     * @param name
     * @param driver
     * @param force
     * @throws InvalidArgumentException
     */
    public registerDriver(name: string, driver: T, force: boolean = false): void {
        if (!name) {
            throw new InvalidArgumentException('Invalid driver name given');
        }

        if (force || !this._drivers[name]) {
            this._drivers[name] = driver;
        }
    }

    /**
     * Sets the default driver name, if a driver of that name is registered.
     * Otherwise an exception is thrown.
     *
     * Provide a second argument to forcefully register a driver on the given
     * name and set it as default driver.
     *
     * @param name
     * @param driver
     * @throws InvalidArgumentException
     */
    public setDefaultDriver(name: string, driver?: T): void {
        if (driver) {
            this.registerDriver(name, driver, true);
        }
        this.getDriver(name);

        this._defaultDriver = name;
    }

    /**
     * Returns the default driver if one is set or returns false.
     *
     * @returns
     */
    public defaultDriver(): false | T {
        try {
            return this.getDriver();
        } catch (err) {}

        return false;
    }

    /**
     * Returns the driver registered for the name if a name is given, or returns
     * the default driver.
     *
     * Throws an exception if a driver with the given name is not registered.
     *
     * @param name
     * @throws InvalidArgumentException
     */
    public getDriver(name?: string): T {
        const driverInstance = name ? this._drivers[name] : this._drivers[this._defaultDriver];

        if (!driverInstance) {
            throw new InvalidArgumentException(`Driver ${name} is not registered.`);
        }
        return driverInstance;
    }
}
