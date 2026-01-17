export type Language = "pt" | "en" | "es";

export type Pillar = "mvrv" | "mayer" | "s2f" | "fearGreed";

export type Weights = Record<Pillar, number>;

export type Band = {
    band: string;
    action: string;
};

export type Option<Id extends string = string> = {
    id: Id;
    label: string;
    points: number;
};

export type PointOption<Id extends string = string> = {
    id: Id;
    points: number;
};

export type WeightInputProps = {
    keyName: Pillar;
    label: string;
    value: number;
    onChange: (newValue: number) => void;
};

export type LabeledOption<Id extends string = string> = {
    id: Id;
    label: string;
};

export type SelectProps<Id extends string> = {
    label: string;
    value: Id;
    onChange: (v: Id) => void;
    options: readonly LabeledOption<Id>[];
};
