/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { AuthorService } from "../author.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { Public } from "../../decorators/public.decorator";
import { AuthorCreateInput } from "./AuthorCreateInput";
import { AuthorWhereInput } from "./AuthorWhereInput";
import { AuthorWhereUniqueInput } from "./AuthorWhereUniqueInput";
import { AuthorFindManyArgs } from "./AuthorFindManyArgs";
import { AuthorUpdateInput } from "./AuthorUpdateInput";
import { Author } from "./Author";
import { Post } from "../../post/base/Post";
import { PostFindManyArgs } from "../../post/base/PostFindManyArgs";
import { PostWhereUniqueInput } from "../../post/base/PostWhereUniqueInput";
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class AuthorControllerBase {
  constructor(
    protected readonly service: AuthorService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Author",
    action: "create",
    possession: "any",
  })
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Author })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(@common.Body() data: AuthorCreateInput): Promise<Author> {
    return await this.service.create({
      data: data,
      select: {
        createdAt: true,
        firstName: true,
        id: true,
        lastName: true,
        profileImage: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Author",
    action: "read",
    possession: "any",
  })
  @common.Get()
  @swagger.ApiOkResponse({ type: [Author] })
  @swagger.ApiForbiddenResponse()
  @ApiNestedQuery(AuthorFindManyArgs)
  async findMany(@common.Req() request: Request): Promise<Author[]> {
    const args = plainToClass(AuthorFindManyArgs, request.query);
    return this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        firstName: true,
        id: true,
        lastName: true,
        profileImage: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Author",
    action: "read",
    possession: "own",
  })
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Author })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: AuthorWhereUniqueInput
  ): Promise<Author | null> {
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        firstName: true,
        id: true,
        lastName: true,
        profileImage: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Author",
    action: "update",
    possession: "any",
  })
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Author })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: AuthorWhereUniqueInput,
    @common.Body() data: AuthorUpdateInput
  ): Promise<Author | null> {
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          createdAt: true,
          firstName: true,
          id: true,
          lastName: true,
          profileImage: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @nestAccessControl.UseRoles({
    resource: "Author",
    action: "delete",
    possession: "any",
  })
  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Author })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: AuthorWhereUniqueInput
  ): Promise<Author | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          firstName: true,
          id: true,
          lastName: true,
          profileImage: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @Public()
  @common.Get("/:id/posts")
  @ApiNestedQuery(PostFindManyArgs)
  async findManyPosts(
    @common.Req() request: Request,
    @common.Param() params: AuthorWhereUniqueInput
  ): Promise<Post[]> {
    const query = plainToClass(PostFindManyArgs, request.query);
    const results = await this.service.findPosts(params.id, {
      ...query,
      select: {
        author: {
          select: {
            id: true,
          },
        },

        content: true,
        createdAt: true,
        draft: true,
        featuredImage: true,
        id: true,
        metaDescription: true,
        metaTitle: true,
        publishedAt: true,
        slug: true,
        title: true,
        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @nestAccessControl.UseRoles({
    resource: "Author",
    action: "update",
    possession: "any",
  })
  @common.Post("/:id/posts")
  async connectPosts(
    @common.Param() params: AuthorWhereUniqueInput,
    @common.Body() body: PostWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      posts: {
        connect: body,
      },
    };
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @nestAccessControl.UseRoles({
    resource: "Author",
    action: "update",
    possession: "any",
  })
  @common.Patch("/:id/posts")
  async updatePosts(
    @common.Param() params: AuthorWhereUniqueInput,
    @common.Body() body: PostWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      posts: {
        set: body,
      },
    };
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @nestAccessControl.UseRoles({
    resource: "Author",
    action: "update",
    possession: "any",
  })
  @common.Delete("/:id/posts")
  async disconnectPosts(
    @common.Param() params: AuthorWhereUniqueInput,
    @common.Body() body: PostWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      posts: {
        disconnect: body,
      },
    };
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
