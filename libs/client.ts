import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "ushnv9pqtg",
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
});
