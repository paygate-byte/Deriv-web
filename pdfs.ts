import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { pdfs } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const pdfRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.pdfs.findMany({
      orderBy: (pdfs, { desc }) => [desc(pdfs.createdAt)],
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.pdfs.findFirst({
        where: eq(pdfs.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        filePath: z.string().min(1),
        fileSize: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Only admin users can create PDFs
      if (!ctx.session.user.isAdmin) {
        throw new Error("Unauthorized: Only admin users can upload PDFs");
      }

      await ctx.db.insert(pdfs).values({
        title: input.title,
        description: input.description,
        filePath: input.filePath,
        fileSize: input.fileSize,
        uploadedById: ctx.session.user.id,
      });
    }),

  incrementDownload: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const pdf = await ctx.db.query.pdfs.findFirst({
        where: eq(pdfs.id, input.id),
      });

      if (!pdf) {
        throw new Error("PDF not found");
      }

      await ctx.db
        .update(pdfs)
        .set({ downloadCount: (pdf.downloadCount || 0) + 1 })
        .where(eq(pdfs.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Only admin users can delete PDFs
      if (!ctx.session.user.isAdmin) {
        throw new Error("Unauthorized: Only admin users can delete PDFs");
      }

      await ctx.db.delete(pdfs).where(eq(pdfs.id, input.id));
    }),
});
