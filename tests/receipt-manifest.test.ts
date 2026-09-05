import {expect,test} from "bun:test";
import {mkdtemp,writeFile,mkdir,rm} from "node:fs/promises";
import {tmpdir} from "node:os";import {join} from "node:path";
import {validateReceiptArtifacts} from "../src/observation-sync-service";
test("validates task-relative hash manifests and refuses tampering, traversal and naked allowlists",async()=>{
 const root=await mkdtemp(join(tmpdir(),"receipt-map-"));const prefix="artifacts/pilot";
 try {await mkdir(join(root,prefix),{recursive:true});await writeFile(join(root,prefix,"proof.txt"),"exact");
 const sha=new Bun.CryptoHasher("sha256").update("exact").digest("hex");
 await writeFile(join(root,prefix,"hashes.json"),JSON.stringify({files:{"proof.txt":{sha256:sha}}}));
 const receipt={artifact_paths:[prefix+"/**"],artifact_hashes_file:"hashes.json"};
 await validateReceiptArtifacts(root,prefix+"/evidence-receipt.json",receipt);
 await writeFile(join(root,prefix,"proof.txt"),"tampered");
 await expect(validateReceiptArtifacts(root,prefix+"/evidence-receipt.json",receipt)).rejects.toThrow("hash mismatch");
 await expect(validateReceiptArtifacts(root,prefix+"/evidence-receipt.json",{artifact_paths:[prefix+"/**"]})).rejects.toThrow("artifact_hashes_file");
 await expect(validateReceiptArtifacts(root,prefix+"/evidence-receipt.json",{...receipt,artifact_hashes_file:"../../outside.json"})).rejects.toThrow("bounded");
 await writeFile(join(root,prefix,"hashes.json"),JSON.stringify({files:{"../outside":{sha256:sha}}}));
 await expect(validateReceiptArtifacts(root,prefix+"/evidence-receipt.json",receipt)).rejects.toThrow("unsafe");
 } finally {await rm(root,{recursive:true,force:true});}
});
