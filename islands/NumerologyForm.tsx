import { useState } from "preact/hooks";
import {
  generateNumerologyProfile,
  numbersDescription,
  type NumerologyProfile,
} from "../utils/numerology.ts";
import { generateNumerologyPDF } from "../utils/pdf_export.ts";

export default function NumerologyForm() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [targetYear, setTargetYear] = useState(new Date().getFullYear());
  const [profile, setProfile] = useState<NumerologyProfile | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "planes" | "details" | "letters"
  >("overview");
  const [isExporting, setIsExporting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = (e?: Event) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!dob) {
      setErrorMessage("Please select your date of birth.");
      return;
    }
    setErrorMessage("");
    const generated = generateNumerologyProfile(name.trim(), dob, targetYear);
    setProfile(generated);

    // Smooth scroll to report
    setTimeout(() => {
      document.getElementById("report-view")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const handleLoadSample = (sampleName: string, sampleDob: string) => {
    setName(sampleName);
    setDob(sampleDob);
    setErrorMessage("");
    const generated = generateNumerologyProfile(
      sampleName,
      sampleDob,
      targetYear,
    );
    setProfile(generated);
  };

  const handleDownloadPDF = () => {
    if (!profile) return;
    setIsExporting(true);
    try {
      generateNumerologyPDF(profile);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Failed to create PDF. Please try browser print instead.");
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    globalThis.print();
  };

  return (
    <div class="w-full max-w-5xl mx-auto space-y-8">
      {/* Input Form Card */}
      <div class="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-100 transition-all">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-indigo-50">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-800">
              Generate Your Pythagorean Report
            </h2>
            <p class="text-xs sm:text-sm text-gray-500">
              Calculate core vibrational frequencies, 3×3 plane matrix & karmic
              lessons
            </p>
          </div>
        </div>

        {errorMessage && (
          <div class="mb-5 p-3.5 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-sm rounded-r-lg flex items-center gap-2">
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Full Name */}
            <div class="md:col-span-6 space-y-1.5">
              <label class="block text-sm font-semibold text-gray-700">
                Full Birth Name
              </label>
              <input
                type="text"
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
                placeholder="e.g. Johnathan Edward Doe"
                class="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              />
              <span class="text-xs text-gray-500">
                As spelled on official birth certificate
              </span>
            </div>

            {/* Date of Birth */}
            <div class="md:col-span-4 space-y-1.5">
              <label class="block text-sm font-semibold text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onInput={(e) => setDob((e.target as HTMLInputElement).value)}
                class="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              />
              <span class="text-xs text-gray-500">Year / Month / Day</span>
            </div>

            {/* Personal Year Target */}
            <div class="md:col-span-2 space-y-1.5">
              <label class="block text-sm font-semibold text-gray-700">
                Forecast Year
              </label>
              <input
                type="number"
                min="1900"
                max="2100"
                value={targetYear}
                onInput={(e) =>
                  setTargetYear(
                    parseInt((e.target as HTMLInputElement).value, 10) ||
                      new Date().getFullYear(),
                  )}
                class="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              />
              <span class="text-xs text-gray-500">For personal cycle</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <span class="font-medium">Quick Profiles:</span>
              <button
                type="button"
                onClick={() =>
                  handleLoadSample("Albert Einstein", "1879-03-14")}
                class="px-2.5 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md font-medium transition-colors"
              >
                Einstein (14/03/1879)
              </button>
              <button
                type="button"
                onClick={() =>
                  handleLoadSample("Leonardo Da Vinci", "1452-04-15")}
                class="px-2.5 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-md font-medium transition-colors"
              >
                Da Vinci (15/04/1452)
              </button>
            </div>

            <button
              type="submit"
              class="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <span>Calculate Report</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Report Section */}
      {profile && (
        <div id="report-view" class="space-y-8 animate-fadeIn">
          {/* Header Banner & Controls */}
          <div class="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
            <div class="absolute -right-16 -bottom-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div class="absolute -left-16 -top-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <span class="inline-block px-3 py-1 bg-indigo-500/30 border border-indigo-400/30 rounded-full text-xs font-semibold tracking-wider text-indigo-200 uppercase mb-2">
                  Pythagorean Analysis
                </span>
                <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {profile.name}
                </h2>
                <div class="flex flex-wrap items-center gap-4 mt-2 text-indigo-200 text-sm">
                  <span>
                    DOB: <strong>{profile.birthDate.rawInput}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Personal Year Cycle: <strong>{profile.targetYear}</strong>
                  </span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-3 no-print">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={isExporting}
                  class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-medium rounded-xl shadow-md transition-all flex items-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>
                    {isExporting ? "Generating PDF..." : "Download PDF"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  class="px-4 py-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm cursor-pointer"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Quick Indicators inside banner */}
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
              <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                <span class="text-xs text-indigo-300 block">Life Path</span>
                <span class="text-2xl font-bold text-white flex items-center gap-1.5">
                  {profile.lifePath.formatted}
                  {profile.lifePath.isMaster && (
                    <span class="text-[10px] px-1.5 py-0.5 bg-amber-400 text-amber-950 font-bold rounded">
                      Master
                    </span>
                  )}
                </span>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                <span class="text-xs text-indigo-300 block">
                  Destiny (Name)
                </span>
                <span class="text-2xl font-bold text-white flex items-center gap-1.5">
                  {profile.destiny.formatted}
                  {profile.destiny.isMaster && (
                    <span class="text-[10px] px-1.5 py-0.5 bg-amber-400 text-amber-950 font-bold rounded">
                      Master
                    </span>
                  )}
                </span>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                <span class="text-xs text-indigo-300 block">Soul Desire</span>
                <span class="text-2xl font-bold text-white">
                  {profile.soulDesire.formatted}
                </span>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                <span class="text-xs text-indigo-300 block">Personal Year</span>
                <span class="text-2xl font-bold text-emerald-400">
                  {profile.personalYear.formatted}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-2 no-print">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              class={`px-4 py-2 font-medium text-sm rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
              }`}
            >
              Core Numbers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("planes")}
              class={`px-4 py-2 font-medium text-sm rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "planes"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
              }`}
            >
              3×3 Matrix & Planes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              class={`px-4 py-2 font-medium text-sm rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "details"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
              }`}
            >
              Full Interpretations
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("letters")}
              class={`px-4 py-2 font-medium text-sm rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "letters"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
              }`}
            >
              Letter Breakdown
            </button>
          </div>

          {/* TAB 1: Core Numbers Overview */}
          {(activeTab === "overview" || activeTab === "details") && (
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Life Path */}
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between h-full">
                  <div>
                    <div class="flex items-start justify-between mb-3">
                      <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">
                        Life Purpose
                      </span>
                      <span class="text-3xl font-black text-indigo-600">
                        {profile.lifePath.formatted}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-1">
                      Life Path Number
                    </h3>
                    <p class="text-xs text-gray-500 mb-3">
                      What you are naturally gifted at and your central
                      trajectory.
                    </p>
                    <div class="text-xs leading-relaxed text-gray-700 bg-gray-50/90 p-3.5 rounded-xl border border-gray-100/80">
                      {numbersDescription[String(profile.lifePath.value)]
                        ?.["Good Description"]}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("details");
                      document.getElementById("full-interpretations")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    class="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 transition-colors cursor-pointer self-start"
                  >
                    <span>View full interpretation</span>
                    <svg
                      class="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* 2. Personality Number */}
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div>
                    <div class="flex items-start justify-between mb-3">
                      <span class="text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-md">
                        Character
                      </span>
                      <span class="text-3xl font-black text-purple-600">
                        {profile.personality.formatted}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-1">
                      Personality Number
                    </h3>
                    <p class="text-xs text-gray-500 mb-3">
                      Derived from your birth day; who you are as an individual.
                    </p>
                    <div class="text-xs leading-relaxed text-gray-700 bg-gray-50/90 p-3.5 rounded-xl border border-gray-100/80">
                      {numbersDescription[String(profile.personality.value)]
                        ?.["Good Description"]}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("details");
                      document.getElementById("full-interpretations")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    class="mt-4 text-xs font-semibold text-purple-600 hover:text-purple-800 inline-flex items-center gap-1 transition-colors cursor-pointer self-start"
                  >
                    <span>View full interpretation</span>
                    <svg
                      class="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* 3. Destiny / Expression */}
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div>
                    <div class="flex items-start justify-between mb-3">
                      <span class="text-xs font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 px-2.5 py-1 rounded-md">
                        Destiny / Expression
                      </span>
                      <span class="text-3xl font-black text-cyan-600">
                        {profile.destiny.formatted}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-1">
                      Destiny Number
                    </h3>
                    <p class="text-xs text-gray-500 mb-3">
                      What you are destined to learn and master in this
                      lifetime.
                    </p>
                    <div class="text-xs leading-relaxed text-gray-700 bg-gray-50/90 p-3.5 rounded-xl border border-gray-100/80">
                      {numbersDescription[String(profile.destiny.value)]
                        ?.["Good Description"]}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("details");
                      document.getElementById("full-interpretations")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    class="mt-4 text-xs font-semibold text-cyan-600 hover:text-cyan-800 inline-flex items-center gap-1 transition-colors cursor-pointer self-start"
                  >
                    <span>View full interpretation</span>
                    <svg
                      class="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* 4. Soul Desire */}
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div>
                    <div class="flex items-start justify-between mb-3">
                      <span class="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded-md">
                        Soul Desire (Vowels)
                      </span>
                      <span class="text-3xl font-black text-rose-600">
                        {profile.soulDesire.formatted}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-1">
                      Soul Desire Number
                    </h3>
                    <p class="text-xs text-gray-500 mb-3">
                      Your inner self and heart's deepest spiritual longings.
                    </p>
                    <div class="text-xs leading-relaxed text-gray-700 bg-gray-50/90 p-3.5 rounded-xl border border-gray-100/80">
                      {numbersDescription[String(profile.soulDesire.value)]
                        ?.["Soul Desire"]}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("details");
                      document.getElementById("full-interpretations")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    class="mt-4 text-xs font-semibold text-rose-600 hover:text-rose-800 inline-flex items-center gap-1 transition-colors cursor-pointer self-start"
                  >
                    <span>View full interpretation</span>
                    <svg
                      class="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* 5. Outer Personality */}
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div>
                    <div class="flex items-start justify-between mb-3">
                      <span class="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md">
                        Outer (Consonants)
                      </span>
                      <span class="text-3xl font-black text-amber-600">
                        {profile.outerPersonality.formatted}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-1">
                      Outer Personality
                    </h3>
                    <p class="text-xs text-gray-500 mb-3">
                      How you wish to be perceived and seen by the world.
                    </p>
                    <div class="text-xs leading-relaxed text-gray-700 bg-gray-50/90 p-3.5 rounded-xl border border-gray-100/80">
                      {numbersDescription[
                        String(profile.outerPersonality.value)
                      ]
                        ?.["Good Description"]}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("details");
                      document.getElementById("full-interpretations")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    class="mt-4 text-xs font-semibold text-amber-600 hover:text-amber-800 inline-flex items-center gap-1 transition-colors cursor-pointer self-start"
                  >
                    <span>View full interpretation</span>
                    <svg
                      class="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* 6. Personal Year */}
                <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div>
                    <div class="flex items-start justify-between mb-3">
                      <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
                        Cycle ({profile.targetYear})
                      </span>
                      <span class="text-3xl font-black text-emerald-600">
                        {profile.personalYear.formatted}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-1">
                      Personal Year {profile.personalYear.formatted}
                    </h3>
                    <p class="text-xs text-gray-500 mb-3">
                      Vibrational theme and focal lessons for{" "}
                      {profile.targetYear}.
                    </p>
                    <div class="text-xs leading-relaxed text-gray-700 bg-gray-50/90 p-3.5 rounded-xl border border-gray-100/80">
                      {numbersDescription[String(profile.personalYear.value)]
                        ?.["Lessons"]}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("details");
                      document.getElementById("full-interpretations")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    class="mt-4 text-xs font-semibold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1 transition-colors cursor-pointer self-start"
                  >
                    <span>View full interpretation</span>
                    <svg
                      class="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 3x3 Matrix & Planes of Expression */}
          {(activeTab === "planes" || activeTab === "overview") && (
            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-8">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <h3 class="text-xl font-bold text-gray-900">
                    Pythagorean 3×3 Grid
                  </h3>
                  <p class="text-sm text-gray-500">
                    Distribution of digits across the Mind, Soul, and Physical
                    Planes
                  </p>
                </div>
                {profile.oldSoul && (
                  <div class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-bold">
                    <span>
                      ✨ Old Soul (Reincarnated {profile.incarnationCount}{" "}
                      times)
                    </span>
                  </div>
                )}
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* 3x3 Matrix */}
                <div class="lg:col-span-6 flex flex-col items-center">
                  <div class="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-4 sm:p-6 rounded-3xl border border-indigo-100/80 shadow-inner w-full max-w-sm">
                    {/* Column Headers */}
                    <div class="grid grid-cols-3 gap-3 mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      <span>Col 1</span>
                      <span>Col 2</span>
                      <span>Col 3</span>
                    </div>

                    {/* Matrix Rows */}
                    <div class="grid grid-cols-3 gap-3">
                      {/* Row 1: Mind Plane (3, 6, 9) */}
                      <div class="aspect-square bg-white rounded-2xl border-2 border-indigo-200 flex flex-col items-center justify-center p-2 shadow-sm hover:border-indigo-400 transition-colors relative">
                        <span class="text-[10px] font-bold text-indigo-400 absolute top-1.5 left-2">
                          3
                        </span>
                        <span class="text-base sm:text-lg font-black text-indigo-900 tracking-wider">
                          {profile.grid.digits[3] || (
                            <span class="text-gray-300 font-normal">—</span>
                          )}
                        </span>
                        {profile.grid.counts[3] > 0 && (
                          <span class="text-[9px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full absolute bottom-1.5 right-1.5">
                            ×{profile.grid.counts[3]}
                          </span>
                        )}
                      </div>

                      <div class="aspect-square bg-white rounded-2xl border-2 border-indigo-200 flex flex-col items-center justify-center p-2 shadow-sm hover:border-indigo-400 transition-colors relative">
                        <span class="text-[10px] font-bold text-indigo-400 absolute top-1.5 left-2">
                          6
                        </span>
                        <span class="text-base sm:text-lg font-black text-indigo-900 tracking-wider">
                          {profile.grid.digits[6] || (
                            <span class="text-gray-300 font-normal">—</span>
                          )}
                        </span>
                        {profile.grid.counts[6] > 0 && (
                          <span class="text-[9px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full absolute bottom-1.5 right-1.5">
                            ×{profile.grid.counts[6]}
                          </span>
                        )}
                      </div>

                      <div class="aspect-square bg-white rounded-2xl border-2 border-indigo-200 flex flex-col items-center justify-center p-2 shadow-sm hover:border-indigo-400 transition-colors relative">
                        <span class="text-[10px] font-bold text-indigo-400 absolute top-1.5 left-2">
                          9
                        </span>
                        <span class="text-base sm:text-lg font-black text-indigo-900 tracking-wider">
                          {profile.grid.digits[9] || (
                            <span class="text-gray-300 font-normal">—</span>
                          )}
                        </span>
                        {profile.grid.counts[9] > 0 && (
                          <span class="text-[9px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full absolute bottom-1.5 right-1.5">
                            ×{profile.grid.counts[9]}
                          </span>
                        )}
                      </div>

                      {/* Row 2: Soul Plane (2, 5, 8) */}
                      <div class="aspect-square bg-white rounded-2xl border-2 border-purple-200 flex flex-col items-center justify-center p-2 shadow-sm hover:border-purple-400 transition-colors relative">
                        <span class="text-[10px] font-bold text-purple-400 absolute top-1.5 left-2">
                          2
                        </span>
                        <span class="text-base sm:text-lg font-black text-purple-900 tracking-wider">
                          {profile.grid.digits[2] || (
                            <span class="text-gray-300 font-normal">—</span>
                          )}
                        </span>
                        {profile.grid.counts[2] > 0 && (
                          <span class="text-[9px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded-full absolute bottom-1.5 right-1.5">
                            ×{profile.grid.counts[2]}
                          </span>
                        )}
                      </div>

                      <div class="aspect-square bg-white rounded-2xl border-2 border-purple-200 flex flex-col items-center justify-center p-2 shadow-sm hover:border-purple-400 transition-colors relative">
                        <span class="text-[10px] font-bold text-purple-400 absolute top-1.5 left-2">
                          5
                        </span>
                        <span class="text-base sm:text-lg font-black text-purple-900 tracking-wider">
                          {profile.grid.digits[5] || (
                            <span class="text-gray-300 font-normal">—</span>
                          )}
                        </span>
                        {profile.grid.counts[5] > 0 && (
                          <span class="text-[9px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded-full absolute bottom-1.5 right-1.5">
                            ×{profile.grid.counts[5]}
                          </span>
                        )}
                      </div>

                      <div class="aspect-square bg-white rounded-2xl border-2 border-purple-200 flex flex-col items-center justify-center p-2 shadow-sm hover:border-purple-400 transition-colors relative">
                        <span class="text-[10px] font-bold text-purple-400 absolute top-1.5 left-2">
                          8
                        </span>
                        <span class="text-base sm:text-lg font-black text-purple-900 tracking-wider">
                          {profile.grid.digits[8] || (
                            <span class="text-gray-300 font-normal">—</span>
                          )}
                        </span>
                        {profile.grid.counts[8] > 0 && (
                          <span class="text-[9px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded-full absolute bottom-1.5 right-1.5">
                            ×{profile.grid.counts[8]}
                          </span>
                        )}
                      </div>

                      {/* Row 3: Physical Plane (1, 4, 7) */}
                      <div class="aspect-square bg-white rounded-2xl border-2 border-emerald-200 flex flex-col items-center justify-center p-2 shadow-sm hover:border-emerald-400 transition-colors relative">
                        <span class="text-[10px] font-bold text-emerald-400 absolute top-1.5 left-2">
                          1
                        </span>
                        <span class="text-base sm:text-lg font-black text-emerald-900 tracking-wider">
                          {profile.grid.digits[1] || (
                            <span class="text-gray-300 font-normal">—</span>
                          )}
                        </span>
                        {profile.grid.counts[1] > 0 && (
                          <span class="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full absolute bottom-1.5 right-1.5">
                            ×{profile.grid.counts[1]}
                          </span>
                        )}
                      </div>

                      <div class="aspect-square bg-white rounded-2xl border-2 border-emerald-200 flex flex-col items-center justify-center p-2 shadow-sm hover:border-emerald-400 transition-colors relative">
                        <span class="text-[10px] font-bold text-emerald-400 absolute top-1.5 left-2">
                          4
                        </span>
                        <span class="text-base sm:text-lg font-black text-emerald-900 tracking-wider">
                          {profile.grid.digits[4] || (
                            <span class="text-gray-300 font-normal">—</span>
                          )}
                        </span>
                        {profile.grid.counts[4] > 0 && (
                          <span class="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full absolute bottom-1.5 right-1.5">
                            ×{profile.grid.counts[4]}
                          </span>
                        )}
                      </div>

                      <div class="aspect-square bg-white rounded-2xl border-2 border-emerald-200 flex flex-col items-center justify-center p-2 shadow-sm hover:border-emerald-400 transition-colors relative">
                        <span class="text-[10px] font-bold text-emerald-400 absolute top-1.5 left-2">
                          7
                        </span>
                        <span class="text-base sm:text-lg font-black text-emerald-900 tracking-wider">
                          {profile.grid.digits[7] || (
                            <span class="text-gray-300 font-normal">—</span>
                          )}
                        </span>
                        {profile.grid.counts[7] > 0 && (
                          <span class="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full absolute bottom-1.5 right-1.5">
                            ×{profile.grid.counts[7]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Planes Breakdown & Energy Ratios */}
                <div class="lg:col-span-6 space-y-5">
                  <div class="space-y-4">
                    {/* Mind Plane */}
                    <div class="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-bold text-sm text-indigo-900">
                          Mind Plane (3, 6, 9)
                        </span>
                        <span class="text-xs font-semibold text-indigo-700">
                          {profile.planes.mind.count}{" "}
                          items ({profile.planes.mind.percentage}%)
                        </span>
                      </div>
                      <p class="text-xs text-indigo-700/80 mb-2">
                        {profile.planes.mind.description}
                      </p>
                      <div class="w-full bg-indigo-100 h-2 rounded-full overflow-hidden">
                        <div
                          class="bg-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${profile.planes.mind.percentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Soul Plane */}
                    <div class="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-bold text-sm text-purple-900">
                          Soul Plane (2, 5, 8)
                        </span>
                        <span class="text-xs font-semibold text-purple-700">
                          {profile.planes.soul.count}{" "}
                          items ({profile.planes.soul.percentage}%)
                        </span>
                      </div>
                      <p class="text-xs text-purple-700/80 mb-2">
                        {profile.planes.soul.description}
                      </p>
                      <div class="w-full bg-purple-100 h-2 rounded-full overflow-hidden">
                        <div
                          class="bg-purple-600 h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${profile.planes.soul.percentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Physical Plane */}
                    <div class="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-bold text-sm text-emerald-900">
                          Physical Plane (1, 4, 7)
                        </span>
                        <span class="text-xs font-semibold text-emerald-700">
                          {profile.planes.physical.count}{" "}
                          items ({profile.planes.physical.percentage}%)
                        </span>
                      </div>
                      <p class="text-xs text-emerald-700/80 mb-2">
                        {profile.planes.physical.description}
                      </p>
                      <div class="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                        <div
                          class="bg-emerald-600 h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${profile.planes.physical.percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Energy Balance Ratio */}
                  <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <div class="flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
                      <span>Masculine (1s: {profile.masculineCount})</span>
                      <span>
                        {profile.energyBalance === "masculine" &&
                          "Dominant: Masculine"}
                        {profile.energyBalance === "feminine" &&
                          "Dominant: Feminine"}
                        {profile.energyBalance === "balanced" &&
                          "Equally Balanced"}
                      </span>
                      <span>Feminine (2s: {profile.feminineCount})</span>
                    </div>
                    <div class="w-full bg-amber-200 h-2.5 rounded-full overflow-hidden flex">
                      <div
                        class="bg-indigo-600 h-full transition-all"
                        style={{
                          width: `${
                            (profile.masculineCount + profile.feminineCount) > 0
                              ? (profile.masculineCount /
                                (profile.masculineCount +
                                  profile.feminineCount)) * 100
                              : 50
                          }%`,
                        }}
                      />
                      <div
                        class="bg-rose-500 h-full transition-all"
                        style={{
                          width: `${
                            (profile.masculineCount + profile.feminineCount) > 0
                              ? (profile.feminineCount /
                                (profile.masculineCount +
                                  profile.feminineCount)) * 100
                              : 50
                          }%`,
                        }}
                      />
                    </div>
                    <p class="text-[11px] text-amber-800 mt-2">
                      {profile.energyBalance === "masculine" &&
                        "You express higher direct initiative, independence, and outward drive."}
                      {profile.energyBalance === "feminine" &&
                        "You possess heightened sensitivity, diplomacy, receptivity, and cooperation."}
                      {profile.energyBalance === "balanced" &&
                        "You maintain an even synthesis between action and receptive intuition."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Full Interpretations & Karmic Lessons */}
          {activeTab === "details" && (
            <div class="space-y-6">
              {/* Detailed Core Sections */}
              <div
                id="full-interpretations"
                class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6"
              >
                <h3 class="text-xl font-bold text-gray-900 pb-4 border-b border-gray-100">
                  Comprehensive Number Meanings
                </h3>

                {/* Life Path Detailed */}
                <div class="p-5 bg-indigo-50/40 rounded-2xl border border-indigo-100 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      {profile.lifePath.formatted}
                    </span>
                    <h4 class="font-bold text-gray-900">
                      Life Path Number: Life Purpose & Mission
                    </h4>
                  </div>
                  <div class="text-sm text-gray-700 space-y-2">
                    <p>
                      <strong>Positive Traits:</strong>{" "}
                      {numbersDescription[String(profile.lifePath.value)]
                        ?.["Good Description"]}
                    </p>
                    <p>
                      <strong>Challenges & Pitfalls:</strong>{" "}
                      {numbersDescription[String(profile.lifePath.value)]
                        ?.["Not So good Description"]}
                    </p>
                    <p>
                      <strong>Life Lessons:</strong>{" "}
                      {numbersDescription[String(profile.lifePath.value)]
                        ?.["Lessons"]}
                    </p>
                    <p class="p-3 bg-white rounded-xl border border-indigo-100">
                      <strong>Soul Calling:</strong>{" "}
                      {numbersDescription[String(profile.lifePath.value)]
                        ?.["Soul Desire"]}
                    </p>
                  </div>
                </div>

                {/* Destiny Detailed */}
                <div class="p-5 bg-purple-50/40 rounded-2xl border border-purple-100 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {profile.destiny.formatted}
                    </span>
                    <h4 class="font-bold text-gray-900">
                      Destiny Number: Expression & Capabilities
                    </h4>
                  </div>
                  <div class="text-sm text-gray-700 space-y-2">
                    <p>
                      <strong>Talents & Gifts:</strong>{" "}
                      {numbersDescription[String(profile.destiny.value)]
                        ?.["Good Description"]}
                    </p>
                    <p>
                      <strong>Lessons Destined to Master:</strong>{" "}
                      {numbersDescription[String(profile.destiny.value)]
                        ?.["Lessons"]}
                    </p>
                  </div>
                </div>

                {/* Soul Desire Detailed */}
                <div class="p-5 bg-rose-50/40 rounded-2xl border border-rose-100 space-y-3">
                  <div class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                      {profile.soulDesire.formatted}
                    </span>
                    <h4 class="font-bold text-gray-900">
                      Soul Desire Number: Deepest Inner Heart Wish
                    </h4>
                  </div>
                  <div class="text-sm text-gray-700">
                    <p>
                      {numbersDescription[String(profile.soulDesire.value)]
                        ?.["Soul Desire"]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Present Chart Numbers Intensities */}
              <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
                <h3 class="text-xl font-bold text-gray-900 pb-3 border-b border-gray-100">
                  Number Intensities in Your Chart
                </h3>
                <p class="text-sm text-gray-500">
                  The count of each number in your matrix shapes the intensity
                  and manifestation of that vibration:
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.presentNumbers.map((item) => (
                    <div
                      key={item.digit}
                      class="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-1.5"
                    >
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-indigo-700 text-sm">
                          Digit {item.digit}
                        </span>
                        <span class="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md font-semibold">
                          Appears {item.count} time{item.count > 1 ? "s" : ""}
                        </span>
                      </div>
                      <p class="text-xs text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Numbers (Karmic Lessons) */}
              {profile.missingNumbers.length > 0 && (
                <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
                  <div class="flex items-center gap-2 text-amber-700">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <h3 class="text-xl font-bold text-gray-900">
                      Karmic Lessons (Missing Numbers)
                    </h3>
                  </div>
                  <p class="text-sm text-gray-500">
                    These vibrations are absent from your grid and represent
                    spiritual growth areas to consciously cultivate:
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.missingNumbers.map((item) => (
                      <div
                        key={item.digit}
                        class="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-1.5"
                      >
                        <span class="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                          Missing Number {item.digit}
                        </span>
                        <p class="text-xs text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Letter Breakdown Table */}
          {activeTab === "letters" && (
            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
              <div>
                <h3 class="text-xl font-bold text-gray-900">
                  Name Letter Calculation Table
                </h3>
                <p class="text-sm text-gray-500">
                  Pythagorean mapping (A=1...I=9, J=1...R=9, S=1...Z=8)
                </p>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr class="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                      <th class="p-3 rounded-l-xl">Letter</th>
                      <th class="p-3">Character Type</th>
                      <th class="p-3 rounded-r-xl">Pythagorean Value</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    {profile.letterBreakdown.map((item, idx) => (
                      <tr
                        key={idx}
                        class="hover:bg-gray-50/60 transition-colors"
                      >
                        <td class="p-3 font-bold text-gray-800">
                          {item.letter}
                        </td>
                        <td class="p-3">
                          <span
                            class={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.type === "vowel"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td class="p-3 font-bold text-indigo-600">
                          {item.position}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div class="p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                  <span class="text-xs text-rose-600 block">
                    Vowels Sum (Soul Desire)
                  </span>
                  <span class="text-lg font-bold text-rose-800">
                    {profile.soulDesire.rawSum} → {profile.soulDesire.formatted}
                  </span>
                </div>
                <div class="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <span class="text-xs text-indigo-600 block">
                    Consonants Sum (Outer)
                  </span>
                  <span class="text-lg font-bold text-indigo-800">
                    {profile.outerPersonality.rawSum} →{" "}
                    {profile.outerPersonality.formatted}
                  </span>
                </div>
                <div class="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                  <span class="text-xs text-purple-600 block">
                    Total Letters Sum (Destiny)
                  </span>
                  <span class="text-lg font-bold text-purple-800">
                    {profile.destiny.rawSum} → {profile.destiny.formatted}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
