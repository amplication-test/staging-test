import { Injectable } from "@nestjs/common";
import { Prisma, Author } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { AuthorServiceBase } from "./base/author.service.base";

@Injectable()
export class AuthorService extends AuthorServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
