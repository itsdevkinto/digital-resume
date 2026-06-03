import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const ROUTES = ["/", "/achievements", "/projects"];

async function prerender() {
  process.stdout.write("⚡ Building SSR bundle…\n");

  const ssrOut = resolve(ROOT, "dist/.ssr");

  await build({
    root: ROOT,
    build: {
      ssr: "src/entry-server.tsx",
      outDir: ssrOut,
      rollupOptions: {
        output: {
          format: "esm",
          entryFileNames: "entry-server.mjs",
        },
      },
      minify: false,
    },
  });

  process.stdout.write("⚡ Rendering routes…\n");

  const { render } = await import(resolve(ssrOut, "entry-server.mjs"));
  const template = readFileSync(resolve(ROOT, "dist/index.html"), "utf-8");

  for (const url of ROUTES) {
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${render(url)}</div>`,
    );

    const outPath =
      url === "/"
        ? resolve(ROOT, "dist/index.html")
        : resolve(ROOT, `dist${url}/index.html`);

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);

    process.stdout.write(`  ✓ ${url}\n`);
  }

  rmSync(ssrOut, { recursive: true, force: true });
  process.stdout.write("✅ Prerender complete\n");
}

prerender().catch((err) => {
  console.error("❌ Prerender failed:", err);
  process.exit(1);
});
