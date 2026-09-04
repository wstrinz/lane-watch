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
