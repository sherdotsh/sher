// The single source of truth for sher's plans.
//
// Enforcement (the TIERS table below), and eventually the marketing page and
// the Polar Pro product, all derive from these plan definitions. In the ledge
// repo, packages/tender/examples/sher/pricing.ts mirrors this and runs
// `tender check` in CI to guard changes (no tier may out-limit a higher one,
// paid plans must map to a billing product, prices stay ordered).

import { plan, usd, entitlements } from "./tender.js";

const MB = 1024 * 1024;

export const free = plan({
  name: "Free",
  price: usd(0),
  limits: { maxUploads: 1, maxSizeBytes: 10 * MB, maxTTLHours: 6 },
  features: { canPassword: false },
});

export const starter = plan({
  name: "Starter",
  price: usd(0),
  limits: { maxUploads: 25, maxSizeBytes: 50 * MB, maxTTLHours: 24 },
  features: { canPassword: false },
});

export const pro = plan({
  name: "Pro",
  price: usd(8),
  interval: "month",
  limits: { maxUploads: 200, maxSizeBytes: 100 * MB, maxTTLHours: 168 },
  features: { canPassword: true },
  billing: { provider: "polar" }, // productId comes from env at runtime (POLAR_PRO_PRODUCT_ID)
});

// The runtime tier table the worker enforces. Keyed by the auth tiers the
// worker resolves (anon / auth / pro), derived from the plans above.
export const TIERS = {
  anon: entitlements(free),
  auth: entitlements(starter),
  pro: entitlements(pro),
};

export type TierName = keyof typeof TIERS;
