import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  target: "node24",
  platform: "node",
  bundle: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",

  external: [
    "@prisma/client",
    "@prisma/adapter-pg",
    "better-auth",
  ],
});