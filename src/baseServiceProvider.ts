import { EventEmitter } from 'events';
import { IServiceProvider } from '@rheas/contracts/services';

export abstract class BaseServiceProvider implements IServiceProvider {
    /**
     * Registered status of the provider.
     *
     * @var boolean
     */
    protected _registered: boolean = false;

    /**
     * Boot status of the provider
     *
     * @var boolean
     */
    protected _booted: boolean = false;

    /**
     * Service events emitter.
     *
     * @var EventEmitter
     */
    protected _event: EventEmitter = new EventEmitter();

    /**
     * Registers the service provider to the container. Avoid adding cyclic
     * dependency when registering services or else they won't be registered
     * and loop forever.
     *
     * A `registered` event will be emitted after registering the service.
     */
    public abstract register(): void;

    /**
     * Boot function is executed after the service is registered. So any effect
     * carried out using the `registered` callback will be available in the
     * boot function.
     *
     * A `booted` event will be emitted after service boot.
     */
    public abstract boot(): void;

    /**
     * Sets the registration status of this service provider to true.
     */
    public setRegistered(): void {
        if (this.isRegistered()) {
            return;
        }
        this._registered = true;

        this._event.emit('registered');
    }

    /**
     * Sets the boot status of this service provider to true.
     */
    public setBooted(): void {
        if (this.isBooted()) {
            return;
        }
        this._booted = true;

        this._event.emit('booted');
    }

    /**
     * Returns the registration status of this service provider.
     *
     * @return boolean
     */
    public isRegistered(): boolean {
        return this._registered;
    }

    /**
     * Returns the boot status of this service provider.
     *
     * @return boolean
     */
    public isBooted(): boolean {
        return this._booted;
    }
}
