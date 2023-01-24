import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getUser: publicProcedure.input(z.object({ handle: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.user.findFirstOrThrow({
      where: {
        handle: input.handle
      }, 
      include: {
        posts: true,
        likes: true
      }
    });
  }),

  getUserById: protectedProcedure.input(z.object({ id: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.user.findFirstOrThrow({
      where: {
        id: input.id
      }, 
      include: {
        posts: true,
        likes: true
      }
    });
  }),
});
