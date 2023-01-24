import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  setPost: protectedProcedure.input(z.object({ id: z.string(), links: z.array(z.string()), caption: z.string().nullish() })).mutation(({ input, ctx }) => {
    input.links.forEach((e) => console.log(e));

    return ctx.prisma.post.create({
      data: {
        user: { connect: { id: input.id } },
        caption: input.caption || "",
        imageURLs: input.links,
      },
    });
  }),

  getPost: publicProcedure.input(z.object({ id: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.post.findFirst({
      where: {
        id: input.id,
      },
      include: {
        user: true,
        likes: true,
      },
    });
  }),

  deletePost: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.post.delete({
      where: { id: input.id },
    });
  }),

  likePost: protectedProcedure.input(z.object({ postid: z.string(), postOwnerid: z.string(), userid: z.string() })).mutation(async ({ input, ctx }) => {
    const q1 = await ctx.prisma.post.update({
      where: { id: input.postid },
      data: { likes: { connect: { id: input.userid } } },
    });

    const q2 = await ctx.prisma.user.update({
      where: { id: input.userid },
      data: { likes: { connect: { id: input.postid } } },
    });

    return { q1, q2 };
  }),

  unlikePost: protectedProcedure.input(z.object({ postid: z.string(), userid: z.string() })).mutation(async ({ input, ctx }) => {
    const q1 = await ctx.prisma.post.update({
      where: { id: input.postid },
      data: { likes: { disconnect: { id: input.userid } } },
    });
    const q2 = await ctx.prisma.user.update({
      where: { id: input.userid },
      data: { likes: { disconnect: { id: input.postid } } },
    });

    return { q1, q2 };
  }),
});
