export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

// In-memory storage for services (in production, use a database)
const services: Service[] = []

export function getServices(): Service[] {
  return services
}

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}

export function createService(service: Omit<Service, "id">): Service {
  const newService: Service = {
    ...service,
    id: Date.now().toString(),
  }
  services.push(newService)
  return newService
}

export function updateService(id: string, updates: Partial<Service>): Service | null {
  const index = services.findIndex((service) => service.id === id)
  if (index === -1) return null

  services[index] = { ...services[index], ...updates }
  return services[index]
}

export function deleteService(id: string): boolean {
  const index = services.findIndex((service) => service.id === id)
  if (index === -1) return false

  services.splice(index, 1)
  return true
}
