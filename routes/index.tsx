import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import NumerologyForm from "../islands/NumerologyForm.tsx";

export default define.page(function Home() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-slate-50 text-gray-900 selection:bg-indigo-500 selection:text-white pb-20">
      <Head>
        <title>Pythagorean Numerology Report Generator</title>
        <meta
          name="description"
          content="Generate comprehensive Pythagorean Numerology profiles: Life Path, Destiny, Soul Desire, 3×3 Grid Planes of Expression, and Karmic Lessons."
        />
      </Head>

      {/* Hero Header */}
      <header class="pt-12 pb-8 px-4 text-center max-w-4xl mx-auto space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-semibold tracking-wide uppercase shadow-sm">
          <span>✨ Ancient Pythagorean System</span>
          <span>•</span>
          <span>Deno Fresh 2.x</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-950">
          Numerology Report Generator
        </h1>

        <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Unveil your core vibrational blueprints: calculate your Life Path,
          Destiny, Soul Urge, 3×3 Planes of Expression, and karmic life lessons.
        </p>
      </header>

      {/* Main Island Container */}
      <main class="px-4 sm:px-6 lg:px-8">
        <NumerologyForm />
      </main>

      {/* Footer */}
      <footer class="mt-20 pt-8 border-t border-indigo-100 text-center text-xs text-gray-400 no-print">
        <p>
          Pythagorean Numerology Engine • Offline & Client-Side Capable • Built
          with Deno Fresh, Preact & Tailwind CSS
        </p>
      </footer>
    </div>
  );
});
