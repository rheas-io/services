import { BaseServiceProvider } from './baseServiceProvider';
import { IContainer, InstanceHandler } from '@rheas/contracts/container';

export class ServiceProvider extends BaseServiceProvider {
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
     * Creates a new service provider
     *
     * @param name
     * @param container
     */
    constructor(name: string, container: IContainer) {
        super();

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
     * Returns the name of the service.
     *
     * @return string
     */
    public serviceName(): string {
        return this.name;
    }
}
