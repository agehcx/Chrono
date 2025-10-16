import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class ProblemsService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    const problems = await this.prisma.problem.findMany({
      where: {isActive: true},
      orderBy: {difficulty: 'asc'}
    });

    return problems.map((problem) => ({
      id: problem.id,
      slug: problem.slug,
      title: problem.title,
      difficulty: problem.difficulty,
      tags: problem.tags,
      averageSolveTimeMs: problem.averageSolveTimeMs
    }));
  }

  async getBySlug(slug: string) {
    const problem = await this.prisma.problem.findUnique({where: {slug}});
    if (!problem) {
      throw new NotFoundException('Problem not found');
    }

    return problem;
  }
}
