import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { env } from "../../../env/client.mjs";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        user: true,
        likes: true,
      },
      orderBy: [
        {
          likes: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
      take: 10,
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

  setPost: protectedProcedure.input(z.object({ index: z.number(), id: z.string(), links: z.array(z.string()), caption: z.string().nullish() })).mutation(({ input, ctx }) => {
    return ctx.prisma.post.create({
      data: {
        index: input.index,
        user: { connect: { id: input.id } },
        caption: input.caption || "",
        imageURLs: input.links,
      },
    });
  }),

  deletePost: protectedProcedure.input(z.object({ userid: z.string(), postid: z.string(), index: z.number() })).mutation(async ({ input, ctx }) => {
    const supabase = createClient("https://" + env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY);
    const { data:list } = await supabase.storage.from("surgeapp").list(`Users/${input.userid}/Posts/${input.index}`);
    
    const filesToRemove = list?.map((x) => `Users/${input.userid}/Posts/${input.index}/${x.name}`);
    await supabase.storage.from("surgeapp").remove(filesToRemove || [""]);    
    
    return ctx.prisma.post.delete({
      where: { id: input.postid },
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
