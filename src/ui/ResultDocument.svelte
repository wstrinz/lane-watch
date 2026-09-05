<script lang="ts">
 import {documentBlocks} from './document-blocks';
 import DocumentInline from './DocumentInline.svelte';
 export let content:string;
 $: blocks=documentBlocks(content);
</script>
<article class="result-document">
 {#each blocks as block}
  {#if block.kind==='heading'}<svelte:element this={'h'+Math.min(6,block.level+2)}><DocumentInline text={block.text}/></svelte:element>
  {:else if block.kind==='code'}<pre>{block.text}</pre>
  {:else if block.kind==='paragraph'}<p><DocumentInline text={block.text}/></p>
  {:else if block.kind==='list'}<svelte:element this={block.ordered?'ol':'ul'}>{#each block.items as item}<li><DocumentInline text={item}/></li>{/each}</svelte:element>
  {:else if block.kind==='table'}<div class="table-scroll"><table><thead><tr>{#each block.rows[0] as cell}<th scope="col"><DocumentInline text={cell}/></th>{/each}</tr></thead><tbody>{#each block.rows.slice(1) as row}<tr>{#each row as cell}<td><DocumentInline text={cell}/></td>{/each}</tr>{/each}</tbody></table></div>{/if}
 {/each}
</article>
<style>
 .result-document{font-size:1rem;line-height:1.75;overflow-wrap:anywhere;color:#dce9e1}.result-document :global(h3){font-size:1.45rem;line-height:1.35;margin:.2rem 0 1.5rem}.result-document :global(h4){font-size:1.15rem;margin:2rem 0 .7rem;color:#e7f4ec}.result-document :global(h5),.result-document :global(h6){font-size:1rem;margin:1.5rem 0 .5rem}.result-document :global(ul),.result-document :global(ol){padding-left:1.6rem}.result-document :global(li){margin:.4rem 0}.result-document pre{white-space:pre-wrap;background:#0c1711;padding:1rem;border-radius:8px;font-size:.85rem;line-height:1.6;overflow-wrap:anywhere}.table-scroll{max-width:100%;overflow-x:auto}.result-document table{border-collapse:collapse;min-width:100%;font-size:.85rem}.result-document th,.result-document td{padding:.45rem .65rem;border-bottom:1px solid #385646;text-align:left}
</style>
