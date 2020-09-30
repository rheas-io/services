import { EventEmitter } from 'events';
import { IServiceProvider } from '@rheas/contracts/services';
import { IContainer, InstanceHandler } from '@rheas/contracts/container';

export class ServiceProvider implements IServiceProvider {
    /**
     * Stores the container instance
     *
     * @var IContainer
     */
    protected container: IContainer;

    /**
     * Name by which the service is registered on the
     * config files.
     *
     * @var string
     */
    protected name: string;

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
    protected _event: EventEmitter;

    /**
     * Creates a new service provider
     *
     * @param name
     * @param container
     */
    constructor(name: string, container: IContainer) {
        this.name = name;
        this.container = container;

        this._event = new EventEmitter();
    }

    /**
     * Register the service within this function. Referencing other services
     * within this function should be done carefully. It could be possible that
     * referencing service is not registered yet. So proper validation is needed, if
     * referencing other services.
     *
     * And, referencing other service which inturn reference this service could produce
     * an infinite loop.
     *
     * Singleton services are registered using the service resolver. If additional
     * services has to be registered, or service is not singleton, override this method.
     */
    public register(): void {
        this.container.singleton(this.name, this.serviceResolver());
    }

    /**
     * Returns the service resolver for singleton services.
     *
     * @returns
     */
    public serviceResolver(): InstanceHandler {
        return (container) => {};
    }

    /**
     * Boots the service provider. All the other registered services will be available
     * inside this function.
     */
    public boot(): void {}

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

    /**
     * Returns the name of the service.
     *
     * @return string
     */
    public serviceName(): string {
        return this.name;
    }
}
