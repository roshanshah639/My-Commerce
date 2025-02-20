import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreattion,
  syncUserDeletion,
  syncUserUpdation,
} from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreattion, syncUserUpdation, syncUserDeletion],
});
