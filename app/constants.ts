import { Pillar, PointOption, Weights } from "./types";

export const DEFAULT_WEIGHTS = {
    mvrv: 40,
    mayer: 25,
    s2f: 20,
    fearGreed: 15,
} as const satisfies Weights;

export const OPTION_POINTS = {
    mvrv: [
        { id: "lt0", points: 40 },
        { id: "0_1", points: 35 },
        { id: "1_2", points: 25 },
        { id: "2_3", points: 15 },
        { id: "3_5", points: 5 },
        { id: "gt5", points: 0 },
    ],
    mayer: [
        { id: "lt0_8", points: 25 },
        { id: "0_8_1_3", points: 20 },
        { id: "1_3_2_0", points: 10 },
        { id: "2_0_2_4", points: 5 },
        { id: "gt2_4", points: 0 },
    ],
    s2f: [
        { id: "far_below", points: 20 },
        { id: "below", points: 15 },
        { id: "near", points: 10 },
        { id: "above", points: 5 },
        { id: "far_above", points: 0 },
    ],
    fearGreed: [
        { id: "lt20", points: 15 },
        { id: "20_40", points: 10 },
        { id: "40_60", points: 7 },
        { id: "60_75", points: 3 },
        { id: "gt75", points: 0 },
    ],
} as const satisfies Record<Pillar, readonly PointOption[]>;

export type OptionIdMap = {
    [K in Pillar]: (typeof OPTION_POINTS)[K][number]["id"];
};

export type Inputs = {
    [K in Pillar]: OptionIdMap[K];
};
