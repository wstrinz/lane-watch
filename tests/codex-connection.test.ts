import {test,expect} from 'bun:test';
import {CodexAppServerClient} from '../src/codex';

test('concurrent connections await initialization even after the child exists',async()=>{
 const client:any=new CodexAppServerClient();
 let release!:()=>void, starts=0, secondReady=false;
 const handshake=new Promise<void>(r=>release=r);
 client.start=async()=>{starts++;client.process={};await handshake;};
 const first=client.connect();
 const second=client.connect().then(()=>{secondReady=true;});
 await Promise.resolve();
 expect(secondReady).toBe(false);expect(starts).toBe(1);
 release();await Promise.all([first,second]);
 expect(secondReady).toBe(true);
});

test('failed initialization rejects every waiting caller and permits a fresh handshake',async()=>{
 const client:any=new CodexAppServerClient();
 let reject!: (e:Error)=>void, starts=0;
 const handshake=new Promise<void>((_,r)=>reject=r);
 client.start=async()=>{starts++;client.process={};try{await handshake;}finally{client.process=null;}};
 const first=client.connect(),second=client.connect();
 const results=Promise.allSettled([first,second]);reject(Error('initialization failed'));
 expect((await results).map(r=>r.status)).toEqual(['rejected','rejected']);
 client.start=async()=>{starts++;client.process={};};await client.connect();
 expect(starts).toBe(2);
});

test('startup diagnostics are bounded and available before stderr closes',async()=>{
 const client:any=new CodexAppServerClient();
 let stream!:ReadableStreamDefaultController<Uint8Array>;
 const child={stderr:new ReadableStream<Uint8Array>({start(c){stream=c;}})};
 const reading=client.readStderr(child);
 stream.enqueue(new TextEncoder().encode('x'.repeat(2500)+'startup is waiting'));
 await Promise.resolve();await Promise.resolve();
 expect(client.stderrTails.get(child).length).toBe(2000);
 expect(client.stderrTails.get(child).endsWith('startup is waiting')).toBe(true);
 stream.close();await reading;
});
