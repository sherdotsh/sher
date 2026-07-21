// Inlined subset of the `tender` SDK (pricing-as-code): the money + plan model
// and the entitlements extractor. No node built-ins, safe to bundle for
// Cloudflare Workers. Once `tender` is published this whole file goes away and
// pricing-model.ts imports from "tender" instead.
//
// The full SDK (guards, `tender check`, examples/sher) lives in the ledge repo
// under packages/tender.

export interface Money {
  readonly currency: "USD";
  readonly nano: number; // integer nanodollars, so sub-cent rates stay exact
}

const SCALE = 1_000_000_000;

export const usd = (dollarsAmount: number): Money => ({
  currency: "USD",
  nano: Math.round(dollarsAmount * SCALE),
});

export const dollars = (m: Money): number => m.nano / SCALE;

export type Interval = "month" | "year" | "once";

export interface Billing {
  provider: "polar";
  productId?: string;
}

export interface PlanDef<
  L extends Record<string, number>,
  F extends Record<string, boolean>,
> {
  name: string;
  price: Money;
  interval?: Interval;
  limits: L;
  features: F;
  billing?: Billing;
}

export type Plan<
  L extends Record<string, number>,
  F extends Record<string, boolean>,
> = PlanDef<L, F> & { readonly kind: "plan" };

export const plan = <
  L extends Record<string, number>,
  F extends Record<string, boolean>,
>(
  def: PlanDef<L, F>,
): Plan<L, F> => ({ ...def, kind: "plan" });

// Collapse a plan to the flat entitlement record the runtime enforces
// (limits + features merged). Keeps the concrete key types, so callers get
// `tier.maxUploads: number` and `tier.canPassword: boolean`.
export const entitlements = <
  L extends Record<string, number>,
  F extends Record<string, boolean>,
>(
  p: Plan<L, F>,
): L & F => ({ ...p.limits, ...p.features });
