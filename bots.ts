import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { bots } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const botRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.bots.findMany({
      orderBy: (bots, { desc }) => [desc(bots.createdAt)],
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.bots.findFirst({
        where: eq(bots.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        filePath: z.string().min(1),
        fileSize: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Only admin users can create bots
      if (!ctx.session.user.isAdmin) {
        throw new Error("Unauthorized: Only admin users can upload bots");
      }

      await ctx.db.insert(bots).values({
        name: input.name,
        description: input.description,
        filePath: input.filePath,
        fileSize: input.fileSize,
        uploadedById: ctx.session.user.id,
      });
    }),

  incrementDownload: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const bot = await ctx.db.query.bots.findFirst({
        where: eq(bots.id, input.id),
      });

      if (!bot) {
        throw new Error("Bot not found");
      }

      await ctx.db
        .update(bots)
        .set({ downloadCount: (bot.downloadCount || 0) + 1 })
        .where(eq(bots.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Only admin users can delete bots
      if (!ctx.session.user.isAdmin) {
        throw new Error("Unauthorized: Only admin users can delete bots");
      }

      await ctx.db.delete(bots).where(eq(bots.id, input.id));
    }),
});
