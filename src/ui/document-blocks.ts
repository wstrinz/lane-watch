export type DocumentBlock = {kind:'heading';level:number;text:string}|{kind:'paragraph'|'code';text:string}|{kind:'list';ordered:boolean;items:string[]}|{kind:'table';rows:string[][]};
const heading=/^(#{1,6})\s+(.+)$/;
const list=/^\s{0,3}(?:([-+*])|\d+[.)])\s+(.+)$/;
const tableRule=/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/;
const cells=(line:string)=>line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim());

/** A deliberately small reading view. Unsupported Markdown stays literal; HTML is never evaluated. */
export function documentBlocks(content:string):DocumentBlock[]{
 const lines=content.replace(/\r\n?/g,'\n').split('\n'),blocks:DocumentBlock[]=[];
 let i=0;
 while(i<lines.length){
  const line=lines[i];
  if(!line.trim()){i++;continue;}
  const h=line.match(heading);
  if(h){blocks.push({kind:'heading',level:h[1].length,text:h[2]});i++;continue;}
  const fence=line.match(/^\s{0,3}(`{3,}|~{3,})/);
  if(fence){
   const body:string[]=[];i++;
   while(i<lines.length&&!lines[i].trim().startsWith(fence[1]))body.push(lines[i++]);
   if(i<lines.length)i++;
   blocks.push({kind:'code',text:body.join('\n')});continue;
  }
  if(/^ {4}|^\t/.test(line)){
   const body:string[]=[];
   while(i<lines.length&&(/^( {4}|\t)/.test(lines[i])||!lines[i].trim()))body.push(lines[i++].replace(/^( {4}|\t)/,''));
   blocks.push({kind:'code',text:body.join('\n').trimEnd()});continue;
  }
  if(i+1<lines.length&&line.includes('|')&&tableRule.test(lines[i+1])){
   const rows=[cells(line)];i+=2;
   while(i<lines.length&&lines[i].includes('|')&&lines[i].trim())rows.push(cells(lines[i++]));
   blocks.push({kind:'table',rows});continue;
  }
  const bullet=line.match(list);
  if(bullet){
   const ordered=!bullet[1],items:string[]=[];
   while(i<lines.length){
    const item=lines[i].match(list);if(!item||!item[1]!==ordered)break;
    let text=item[2];i++;
    while(i<lines.length&&/^\s+\S/.test(lines[i])&&!list.test(lines[i]))text+=' '+lines[i++].trim();
    items.push(text);
   }
   blocks.push({kind:'list',ordered,items});continue;
  }
  const paragraph=[line];i++;
  while(i<lines.length&&lines[i].trim()&&!heading.test(lines[i])&&!list.test(lines[i])&&!/^\s*(`{3,}|~{3,})/.test(lines[i]))paragraph.push(lines[i++]);
  blocks.push({kind:'paragraph',text:paragraph.join(' ')});
 }
 return blocks;
}

export type DocumentInline={kind:'text'|'strong'|'code'|'reference';text:string;target?:string};
export function documentInline(text:string):DocumentInline[]{
 const tokens:DocumentInline[]=[],pattern=/`([^`\n]+)`|\*\*([^*]+)\*\*|\[([^\]\n]+)\]\(([^)\s]+)\)/g;
 let cursor=0;
 for(const match of text.matchAll(pattern)){
  if(match.index!>cursor)tokens.push({kind:'text',text:text.slice(cursor,match.index)});
  tokens.push(match[1]?{kind:'code',text:match[1]}:match[2]?{kind:'strong',text:match[2]}:{kind:'reference',text:match[3],target:match[4]});
  cursor=match.index!+match[0].length;
 }
 if(cursor<text.length)tokens.push({kind:'text',text:text.slice(cursor)});
 return tokens;
}
