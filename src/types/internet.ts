type ControllerFactory<Service> = (service: Service) => Controller<Service>;

type Module<RepositoryType extends Repository, ServiceType> = {
	factory: ServiceFactory<RepositoryType, ServiceType>;
	controller: ControllerFactory<ServiceType>;
	docs: unknown;
};

abstract class Controller<Service> {
	constructor(private service: Service) {}

	abstract run(request: Request): Response | Promise<Response>;
}

type ServiceFactory<Repository, Service> = (repository: Repository) => Service;

abstract class Service<
	Repository,
	MethodArgs extends DTO,
	MethodReturns = void,
> {
	constructor(private repository: Repository) {}

	abstract run(args: MethodArgs): Promise<MethodReturns> | MethodReturns;
}

type DTO = null;
// DTO também precisa ter um docs

abstract class Repository {
	protected errors: Record<string, ApplicationError>;
}

type ErrorProps = {
	message: string;
	name?: string;
	status?: number;
};

abstract class ApplicationError extends Error {
	status: number;

	constructor(properties: ErrorProps) {
		super(properties.message);

		this.status = properties.status || 500;
		this.name = properties.name || properties.message;
	}
}
