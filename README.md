# 📊 BTC Valuation Score

A **Bitcoin valuation framework** that combines multiple on-chain and behavioral indicators into a single score (0–100), designed to support **long-term investing decisions**, not trading or price prediction.

This project helps investors answer a simple question:

> **“Is Bitcoin cheap, fair, or expensive right now?”**

---

## 🧠 Concept

Bitcoin does not generate cash flow or profits, which makes traditional valuation models ineffective.

However, Bitcoin’s network is **fully transparent**, allowing us to analyze:
- On-chain valuation metrics  
- Long-term trend deviations  
- Market psychology  
- Scarcity dynamics  

This app consolidates those signals into a **checklist → weighted score**, promoting disciplined decision-making.

---

## 📌 Indicators Used

The score is built from four pillars:

### 1️⃣ MVRV Z-Score  
Measures how far market value deviates from realized value (economic fair value).

### 2️⃣ Mayer Multiple  
Compares price to its long-term moving average (trend context).

### 3️⃣ Stock-to-Flow (S2F)  
Scarcity-based macro valuation model.

### 4️⃣ Fear & Greed Index  
Represents market psychology and emotional extremes.

Each indicator contributes proportionally to the final score.

---

## 🎯 How to Use

1. Select the current state for each indicator  
2. *(Optional)* Adjust the indicator weights  
3. The app calculates:
   - **Final score (0–100)**
   - **Valuation band**
   - **Suggested action**

---

## 📈 Score Interpretation

| Score Range | Market State | Suggested Action |
|------------|-------------|------------------|
| **80–100** | Strong undervaluation | Aggressive accumulation |
| **60–79** | Fair / attractive | Normal DCA |
| **40–59** | Neutral | Conservative accumulation |
| **20–39** | Stretched | Caution |
| **0–19** | Euphoria | Consider partial trimming (5–15%) |

> ⚠️ This tool is **not financial advice** and **not a prediction model**.

---

## 🌍 Features

- ✅ 100% client-side (no backend, no database)
- ✅ Multi-language support (PT / EN / ES)
- ✅ Adjustable indicator weights
- ✅ Transparent calculation logic
- ✅ Open-source and educational

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**

---

## 🚀 Run Locally

```bash
npm install
npm run dev
