import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Services CRUD
export async function getAllServices(_req: Request, res: Response) {
  const services = await prisma.service.findMany();
  res.json(services);
}

export async function createService(req: Request, res: Response) {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Title and description required' });
  const service = await prisma.service.create({ data: { title, description } });
  res.status(201).json(service);
}

export async function updateService(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  const service = await prisma.service.update({ where: { id }, data: { title, description } });
  res.json(service);
}

export async function deleteService(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.service.delete({ where: { id } });
  res.status(204).end();
}

// Portfolios CRUD
export async function getAllPortfolios(_req: Request, res: Response) {
  const portfolios = await prisma.portfolio.findMany();
  res.json(portfolios);
}

export async function createPortfolio(req: Request, res: Response) {
  const { title, description, imageUrl } = req.body;
  if (!title || !description || !imageUrl) return res.status(400).json({ error: 'All fields required' });
  const portfolio = await prisma.portfolio.create({ data: { title, description, imageUrl } });
  res.status(201).json(portfolio);
}

export async function updatePortfolio(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { title, description, imageUrl } = req.body;
  const portfolio = await prisma.portfolio.update({ where: { id }, data: { title, description, imageUrl } });
  res.json(portfolio);
}

export async function deletePortfolio(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.portfolio.delete({ where: { id } });
  res.status(204).end();
}
