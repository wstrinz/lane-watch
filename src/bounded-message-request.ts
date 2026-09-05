/** Freeze the exact JSON sent to the supported Messages endpoint. Unknown
 * generation families are refused as a whole rather than silently stripped. */
export function freezeBoundedMessage(body:Record<string,unknown>,stream:boolean):{serialized:string;value:any} {
 const serialized=JSON.stringify(body);
 if(Buffer.byteLength(serialized)>1024*1024)throw Error('Messages request exceeds bounded transport size');
 const value=JSON.parse(serialized);
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid Messages request');
 const allowed=new Set(['model','messages','max_tokens','stream','system','temperature','stop_sequences',
  'tools','tool_choice','thinking','output_config','metadata','cache_control','service_tier','speed','context_management']);
 const streamMatches=stream?value.stream===true:value.stream===false||value.stream===undefined;
 if(!streamMatches||!Number.isSafeInteger(value.max_tokens)||value.max_tokens<=0)
  throw Error(stream?'Unsupported bounded streaming request':'Only bounded non-streaming Messages requests are supported');
 if(typeof value.model!=='string'||!value.model||!Array.isArray(value.messages)||!value.messages.length
   ||Object.keys(value).some(key=>!allowed.has(key)))throw Error('Unsupported bounded Messages request');
 if(value.tools!==undefined&&(!Array.isArray(value.tools)||value.tools.some((tool:any)=>
  !tool||typeof tool.name!=='string'||!tool.input_schema||tool.type!==undefined&&tool.type!=='custom')))
  throw Error('Unverified server tool accounting');
 if(value.context_management!==undefined&&(!value.context_management||Object.keys(value.context_management).some(key=>key!=='edits')
  ||!Array.isArray(value.context_management.edits)||value.context_management.edits.some((edit:any)=>
    !['clear_thinking_20251015','clear_tool_uses_20250919'].includes(edit?.type))))throw Error('Unverified context-management generation accounting');
 return {serialized,value};
}
