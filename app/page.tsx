"use client";

import { useMemo, useState } from "react";
import DonationBox from "./components/donation-box";
import SelectLanguage from "./components/select-language";
import { I18N } from "./language";
import { Band, Language, Option, Pillar, Weights } from "./types";
import { DEFAULT_WEIGHTS, Inputs, OPTION_POINTS } from "./constants";
import Select from "./components/select";
import WeightInput from "./components/weight-input";


function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatPct(n: number) {
  return `${Math.round(n)}%`;
}

function scoreToBand(score: number, lang: Language): Band {
  const tt = I18N[lang];
  if (score >= 80) return { band: tt.bands.undervaluedStrong, action: tt.actions.aggressive };
  if (score >= 60) return { band: tt.bands.fair, action: tt.actions.normal };
  if (score >= 40) return { band: tt.bands.neutral, action: tt.actions.minimal };
  if (score >= 20) return { band: tt.bands.stretched, action: tt.actions.caution };
  return { band: tt.bands.euphoria, action: tt.actions.reduce };
}

function getOptionById<const L extends readonly { id: string }[]>(
  list: L,
  id: L[number]["id"]
): L[number] {
  return (list.find((o) => o.id === id) ?? list[0]) as L[number];
}

export default function App() {
  const [lang, setLang] = useState<Language>("pt");
  const [weights, setWeights] = useState<Weights>({ ...DEFAULT_WEIGHTS });
  const [inputs, setInputs] = useState<Inputs>({
    mvrv: "0_1",
    mayer: "0_8_1_3",
    s2f: "near",
    fearGreed: "40_60",
  });
  const t = I18N[lang];

  const normalizedWeights = useMemo(() => {
    const sum = weights.mvrv + weights.mayer + weights.s2f + weights.fearGreed;
    const safeSum = sum > 0 ? sum : 100;

    return {
      mvrv: (weights.mvrv / safeSum) * 100,
      mayer: (weights.mayer / safeSum) * 100,
      s2f: (weights.s2f / safeSum) * 100,
      fearGreed: (weights.fearGreed / safeSum) * 100,
      sum: safeSum,
    } as const;
  }, [weights]);

  const result = useMemo(() => {
    const mvrvOpt = getOptionById(OPTION_POINTS.mvrv, inputs.mvrv);
    const mayerOpt = getOptionById(OPTION_POINTS.mayer, inputs.mayer);
    const s2fOpt = getOptionById(OPTION_POINTS.s2f, inputs.s2f);
    const fgOpt = getOptionById(OPTION_POINTS.fearGreed, inputs.fearGreed);

    const caps: Record<Pillar, number> = { mvrv: 40, mayer: 25, s2f: 20, fearGreed: 15 };

    const frac: Record<Pillar, number> = {
      mvrv: mvrvOpt.points / caps.mvrv,
      mayer: mayerOpt.points / caps.mayer,
      s2f: s2fOpt.points / caps.s2f,
      fearGreed: fgOpt.points / caps.fearGreed,
    };

    const total =
      frac.mvrv * normalizedWeights.mvrv +
      frac.mayer * normalizedWeights.mayer +
      frac.s2f * normalizedWeights.s2f +
      frac.fearGreed * normalizedWeights.fearGreed;

    const score = clamp(total, 0, 100);
    const band = scoreToBand(score, lang);

    return {
      score,
      band,
      breakdown: {
        mvrv: {
          ...mvrvOpt,
          label: t.options.mvrv[mvrvOpt.id],
          contribution: frac.mvrv * normalizedWeights.mvrv,
        },
        mayer: {
          ...mayerOpt,
          label: t.options.mayer[mayerOpt.id],
          contribution: frac.mayer * normalizedWeights.mayer,
        },
        s2f: {
          ...s2fOpt,
          label: t.options.s2f[s2fOpt.id],
          contribution: frac.s2f * normalizedWeights.s2f,
        },
        fearGreed: {
          ...fgOpt,
          label: t.options.fearGreed[fgOpt.id],
          contribution: frac.fearGreed * normalizedWeights.fearGreed,
        },
      },
    } as const;
  }, [inputs, normalizedWeights, lang]);

  const meterWidth = `${Math.round(result.score)}%`;

  const mvrvOptions = useMemo(
    () =>
      OPTION_POINTS.mvrv.map((o) => ({
        id: o.id,
        label: t.options.mvrv[o.id],
      })),
    [t]
  );

  const mayerOptions = useMemo(
    () =>
      OPTION_POINTS.mayer.map((o) => ({
        id: o.id,
        label: t.options.mayer[o.id],
      })),
    [t]
  );

  const s2fOptions = useMemo(
    () =>
      OPTION_POINTS.s2f.map((o) => ({
        id: o.id,
        label: t.options.s2f[o.id],
      })),
    [t]
  );

  const fearGreedOptions = useMemo(
    () =>
      OPTION_POINTS.fearGreed.map((o) => ({
        id: o.id,
        label: t.options.fearGreed[o.id],
      })),
    [t]
  );

  const weightFields: Pillar[] = ["mvrv", "mayer", "s2f", "fearGreed"];

  return (
    <div>
      <SelectLanguage lang={lang} setLang={setLang} />
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: 18,
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
        className="text-gray-800"
      >
        <h1 style={{ margin: "8px 0 4px" }} className="text-gray-300 text-2xl">
          {t.title}
        </h1>
        <p className="text-gray-300 mb-2">
          {t.subtitle}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              padding: 16,
              border: "1px solid #eee",
              borderRadius: 16,
              background: "#fff",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Checklist</h2>

            <Select
              label={t.pillars.mvrv}
              value={inputs.mvrv}
              onChange={(v) => setInputs((s) => ({ ...s, mvrv: v }))}
              options={mvrvOptions}
            />

            <Select
              label={t.pillars.mayer}
              value={inputs.mayer}
              onChange={(v) => setInputs((s) => ({ ...s, mayer: v }))}
              options={mayerOptions}
            />

            <Select
              label={t.pillars.s2f}
              value={inputs.s2f}
              onChange={(v) => setInputs((s) => ({ ...s, s2f: v }))}
              options={s2fOptions}
            />

            <Select
              label={t.pillars.fearGreed}
              value={inputs.fearGreed}
              onChange={(v) => setInputs((s) => ({ ...s, fearGreed: v }))}
              options={fearGreedOptions}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button
                onClick={() => {
                  setInputs({ mvrv: "0_1", mayer: "0_8_1_3", s2f: "near", fearGreed: "40_60" });
                  setWeights({ ...DEFAULT_WEIGHTS });
                }}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  background: "#fafafa",
                  cursor: "pointer",
                }}
              >
                {t.reset}
              </button>
            </div>

            <details style={{ marginTop: 14 }}>
              <summary style={{ cursor: "pointer", fontWeight: 700 }}>{t.adjustWeights}</summary>
              <p style={{ color: "#555", marginBottom: 10 }}>
                {t.adjustWeightsHint}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {weightFields.map((k) => (
                  <WeightInput
                    key={k}
                    keyName={k}
                    label={t.weights[k]}
                    value={weights[k]}
                    onChange={(val) => setWeights((w) => ({ ...w, [k]: val }))}
                  />
                ))}
              </div>


              <div style={{ marginTop: 8, color: "#444" }}>
                <strong>{t.normalizedWeights}</strong>{" "}
                {`MVRV ${formatPct(normalizedWeights.mvrv)} · Mayer ${formatPct(normalizedWeights.mayer)} · S2F ${formatPct(
                  normalizedWeights.s2f
                )} · F&G ${formatPct(normalizedWeights.fearGreed)}`}
              </div>
            </details>
          </div>

          {/* RIGHT */}
          <div
            style={{
              padding: 16,
              border: "1px solid #eee",
              borderRadius: 16,
              background: "#fff",
            }}
          >
            <h2 style={{ marginTop: 0 }}>{t.result}</h2>

            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <div style={{ fontSize: 44, fontWeight: 800 }}>{Math.round(result.score)}</div>
              <div style={{ color: "#444" }}>/ 100</div>
            </div>

            <div style={{ marginTop: 6, fontWeight: 800 }}>{result.band.band}</div>
            <div style={{ marginTop: 6, color: "#444" }}>
              <strong>{t.suggestedAction}</strong> {result.band.action}
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Termômetro</div>
              <div
                style={{
                  height: 14,
                  borderRadius: 999,
                  background: "#eee",
                  overflow: "hidden",
                  border: "1px solid #e2e2e2",
                }}
              >
                <div style={{ height: "100%", width: meterWidth, background: "#111" }} />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <h3 style={{ marginBottom: 10 }}>{t.breakdown}</h3>

              <ul style={{ marginTop: 0, color: "#333", lineHeight: 1.6 }}>
                <li>
                  <strong>MVRV:</strong> {result.breakdown.mvrv.label} →{" "}
                  {result.breakdown.mvrv.contribution.toFixed(1)} pts
                </li>
                <li>
                  <strong>Mayer:</strong> {result.breakdown.mayer.label} →{" "}
                  {result.breakdown.mayer.contribution.toFixed(1)} pts
                </li>
                <li>
                  <strong>S2F:</strong> {result.breakdown.s2f.label} →{" "}
                  {result.breakdown.s2f.contribution.toFixed(1)} pts
                </li>
                <li>
                  <strong>Fear & Greed:</strong> {result.breakdown.fearGreed.label} →{" "}
                  {result.breakdown.fearGreed.contribution.toFixed(1)} pts
                </li>
              </ul>
            </div>

            <div style={{ marginTop: 14, padding: 12, background: "#fafafa", borderRadius: 12, border: "1px solid #eee" }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{t.quickRules}</div>
              <div style={{ color: "#444", fontSize: 14, lineHeight: 1.5 }}>
                • 80–100: {t.actions.aggressive}
                <br />
                • 60–79: {t.actions.normal}
                <br />
                • 40–59: {t.actions.minimal}
                <br />
                • 20–39: {t.actions.caution}
                <br />
                • 0–19: {t.actions.reduce}
              </div>
            </div>
          </div>
        </div>


      </div>

      <DonationBox lang={lang} />

      <footer style={{ marginTop: 16, fontSize: 12 }} className="text-gray-300 text-center">
        {t.footer}
      </footer>
    </div>
  );
}
