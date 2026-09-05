<script lang="ts">
 import ResultDocument from './ResultDocument.svelte';
 import {structuredAdvice} from './campaign-play';
 export let text='';
 $: result=structuredAdvice(text);
</script>
{#if result}
 <small>SAVED PLANNING RESULT · CONTEXT</small>
 <ResultDocument content={result.summary}/>
 {#if result.perspectiveShift}<p>{result.perspectiveShift}</p>{/if}
 {#if Array.isArray(result.newDirections)&&result.newDirections.length}<ul>{#each result.newDirections as direction}<li>{direction.question}</li>{/each}</ul>{/if}
 <details><summary>Full structured result</summary><pre>{text}</pre></details>
{:else}<ResultDocument content={text}/>{/if}
<style>small{font:600 10px monospace;color:#a6c6ac;letter-spacing:.08em}p,li{font-size:14px;line-height:1.6}details{margin-top:16px;font-size:12px}summary{cursor:pointer;color:#adc3b1}pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:400px;overflow:auto}</style>
