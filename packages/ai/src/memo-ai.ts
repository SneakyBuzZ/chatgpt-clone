import MemoryClient from "mem0ai";

const apiKey = process.env.MEMO_API_KEY!;
export const memo = new MemoryClient({ apiKey: apiKey });
export { Message } from "mem0ai";
