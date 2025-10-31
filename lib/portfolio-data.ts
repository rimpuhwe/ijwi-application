export interface PortfolioWork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  clientName: string;
  // Optional trailer URL (mp4 or streaming link)
  trailerUrl?: string | null;
}

// In-memory storage for portfolio works (in production, use a database)
const portfolioWorks: PortfolioWork[] = []

export function getPortfolioWorks(): PortfolioWork[] {
  return portfolioWorks
}

export function getPortfolioWorkById(id: string): PortfolioWork | undefined {
  return portfolioWorks.find((work) => work.id === id)
}

export function createPortfolioWork(work: Omit<PortfolioWork, "id">): PortfolioWork {
  const newWork: PortfolioWork = {
    ...work,
    id: Date.now().toString(),
  }
  portfolioWorks.push(newWork)
  return newWork
}

export function updatePortfolioWork(id: string, updates: Partial<PortfolioWork>): PortfolioWork | null {
  const index = portfolioWorks.findIndex((work) => work.id === id)
  if (index === -1) return null

  portfolioWorks[index] = { ...portfolioWorks[index], ...updates }
  return portfolioWorks[index]
}

export function deletePortfolioWork(id: string): boolean {
  const index = portfolioWorks.findIndex((work) => work.id === id)
  if (index === -1) return false

  portfolioWorks.splice(index, 1)
  return true
}
