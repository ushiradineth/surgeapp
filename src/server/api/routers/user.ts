import { z } from "zod";
import * as trpc from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { hash, verify } from "argon2";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getUser: publicProcedure.input(z.object({ handle: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.user.findFirstOrThrow({
      where: {
        handle: input.handle,
      },
      include: {
        posts: true,
        likes: true,
      },
    });
  }),

  isUserValid: publicProcedure.input(z.object({ email: z.string().email(), password: z.string() })).query(async ({ input, ctx }) => {
    const user: any = await ctx.prisma.user.findFirstOrThrow({
      where: {
        email: input.email,
      },
    });

    !user && null;

    const valid = await verify(user.password || "", input.password);

    if (valid) {
      return user;
    } else {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "Credentials do not match",
      });
    }
  }),

  createUser: publicProcedure.input(z.object({ email: z.string().email(), password: z.string(), name: z.string() })).mutation(async ({ input, ctx }) => {
    const { name, email, password } = input;

    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = await hash(password);

    return ctx.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  }),

  getUserById: protectedProcedure.input(z.object({ id: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.user.findFirstOrThrow({
      where: {
        id: input.id,
      },
      include: {
        posts: true,
        likes: true,
      },
    });
  }),
});
