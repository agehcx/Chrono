import {Controller, Get, Param} from '@nestjs/common';
import {ProblemsService} from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  list() {
    return this.problemsService.list();
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.problemsService.getBySlug(slug);
  }
}
