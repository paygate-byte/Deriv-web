import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { adminCredentials, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcrypt";

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if this is the special admin login
      if (input.username === "Prince") {
        // Get the admin credentials
        const admin = await ctx.db.query.adminCredentials.findFirst({
          where: eq(adminCredentials.username, input.username),
        });

        // If admin doesn't exist, create it with the specified password
        if (!admin) {
          // Only create the admin account if the password matches the required one
          if (input.password === "Prince@001") {
            // Create admin credentials
            await ctx.db.insert(adminCredentials).values({
              username: "Prince",
              // Hash the password before storing
              password: await hash("Prince@001", 10),
            });
            return { success: true, message: "Admin account created successfully" };
          } else {
            // Return generic error message to prevent username enumeration
            return { success: false, message: "Invalid credentials" };
          }
        }

        // Verify the password
        const validPassword = await compare(input.password, admin.password);
        if (!validPassword) {
          return { success: false, message: "Invalid credentials" };
        }

        // In a real application, you would set up a session for the admin user
        return { success: true, message: "Admin login successful" };
      }

      // Return generic error message
      return { success: false, message: "Invalid credentials" };
    }),

  setUserAsAdmin: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the current user is an admin
      const currentUser = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.session.user.id),
      });

      if (!currentUser?.isAdmin) {
        throw new Error("Unauthorized: Only admin users can perform this action");
      }

      // Update the specified user to be an admin
      await ctx.db
        .update(users)
        .set({ isAdmin: true })
        .where(eq(users.id, input.userId));

      return { success: true };
    }),
});
