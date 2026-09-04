import { expect, test } from "bun:test";
import { requireExperimentValidity } from "../src/research-validity";
const lane = { requestId: "assay", action: "KEEP", strategy: { workKind: "experiment" } };
for (const detail of ["RSEVC is always 392 on legal inputs", "LDW is at most 4 so GO is guaranteed", "Unique matching premise contradicts linearity"]) {
  test(detail, () => {
    expect(() => requireExperimentValidity([lane], [{ check: "experiment-validity:assay", status: "BLOCK", detail }])).toThrow("Experiment validity");
  });
}
test("missing review cannot pass; a dropped assay needs no launch clearance", () => {
  expect(() => requireExperimentValidity([lane], [])).toThrow();
  requireExperimentValidity([{ ...lane, action: "DROP" }], []);
  requireExperimentValidity([lane], [{ check: "experiment-validity:assay", status: "PASS", detail: "Control presentations have distinct verified residual sizes; the comparison changes the choice of representation." }]);
});

test("a held invalid experiment cannot block an independently valid launch or gain launch authority", () => {
  const held = { ...lane, contract: { status: "AFTER_DEPENDENCY", baseRef: "" } };
  const blocked = { check: "experiment-validity:assay", status: "BLOCK", detail: "Frozen controls missing; remain held for another review." };
  requireExperimentValidity([held, { ...lane, requestId: "pilot", contract: { status: "READY", baseRef: "a".repeat(40) } }], [blocked, { check: "experiment-validity:pilot", status: "PASS", detail: "Exact success and bounded failure have different decision consequences." }]);
  expect(() => requireExperimentValidity([held], [])).toThrow();
  expect(() => requireExperimentValidity([{ ...held, contract: { status: "READY", baseRef: "a".repeat(40) } }], [blocked])).toThrow();
  expect(() => requireExperimentValidity([{ ...held, contract: { status: "AFTER_DEPENDENCY", baseRef: "a".repeat(40) } }], [blocked])).toThrow();
});
