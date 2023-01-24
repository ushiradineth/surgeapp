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
});
