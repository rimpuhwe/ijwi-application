import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllServices(_req: Request, res: Response) {
  const services = await prisma.service.findMany();
  res.json(services);
}

export async function getAllPortfolios(_req: Request, res: Response) {
  const portfolios = await prisma.portfolio.findMany();
  res.json(portfolios);
}
