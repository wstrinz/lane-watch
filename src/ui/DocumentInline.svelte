<script lang="ts">
 import {documentInline} from './document-blocks';
 export let text:string;
</script>
{#each documentInline(text) as part}{#if part.kind==='strong'}<strong>{part.text}</strong>{:else if part.kind==='code'}<code>{part.text}</code>{:else if part.kind==='reference'}{part.text} <small class="source-reference">({part.target})</small>{:else}{part.text}{/if}{/each}
<style>code{font-size:.9em;background:#20352a;border-radius:3px;padding:.1em .2em}.source-reference{color:#9eb5a7;overflow-wrap:anywhere}</style>
