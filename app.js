const $=s=>document.querySelector(s);
const ref=$("#reference"), sub=$("#submitted"), results=$("#results");
function words(t){return t.toLowerCase().replace(/[^\p{L}\p{N}\s']/gu," ").split(/\s+/).filter(Boolean)}
function updateCounts(){ $("#refCount").textContent=words(ref.value).length+" words"; $("#subCount").textContent=words(sub.value).length+" words"; }
ref.addEventListener("input",updateCounts); sub.addEventListener("input",updateCounts);

function analyze(a,b){
  const A=words(a), B=words(b), set=new Set(A), matched=B.filter(x=>set.has(x));
  const unique=new Set(matched).size;
  const phraseSet=new Set(), phraseStarts=new Set();
  for(let i=0;i<B.length-1;i++){
    if(set.has(B[i])&&set.has(B[i+1])){
      let phrase=[B[i],B[i+1]], j=i+2;
      while(j<B.length && set.has(B[j])){phrase.push(B[j]);j++}
      if(phrase.length>=2){let p=phrase.join(" "); phraseSet.add(p); phraseStarts.add(i)}
    }
  }
  const pct=B.length?Math.round((matched.length/B.length)*100):0;
  return {A,B,matched,unique,phrases:[...phraseSet],pct};
}
function escape(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function highlight(t, matchSet){return escape(t).split(/(\s+)/).map(x=>matchSet.has(x.toLowerCase())?`<span class="match">${x}</span>`:x).join("")}
$("#checkBtn").onclick=()=>{
  if(!ref.value.trim()||!sub.value.trim()){alert("Enter both reference and submitted text.");return}
  const r=analyze(ref.value,sub.value), set=new Set(r.matched);
  $("#plag").textContent=r.pct+"%"; $("#orig").textContent=(100-r.pct)+"%"; $("#matches").textContent=r.unique; $("#phrases").textContent=r.phrases.length;
  $("#refOut").innerHTML=highlight(ref.value,set); $("#subOut").innerHTML=highlight(sub.value,set);
  results.classList.remove("hidden"); $("#status").textContent="Analysis complete";
  window.lastReport={...r,at:new Date().toLocaleString()};
};
$("#sampleBtn").onclick=()=>{ref.value="The quick brown fox jumps over the lazy dog. Machine learning uses algorithms to learn patterns from data.";sub.value="The quick brown fox jumps over the lazy dog. Machine learning algorithms learn useful patterns from data.";updateCounts();};
$("#fileInput").onchange=e=>{const f=e.target.files[0];if(f){const rd=new FileReader();rd.onload=()=>{sub.value=rd.result;updateCounts()};rd.readAsText(f)}};
$("#saveBtn").onclick=()=>{
  if(!window.lastReport)return;
  const h=JSON.parse(localStorage.getItem("vt-history")||"[]");
  h.unshift({date:window.lastReport.at,plag:window.lastReport.pct,words:window.lastReport.B.length,phrases:window.lastReport.phrases.length});
  localStorage.setItem("vt-history",JSON.stringify(h.slice(0,20))); renderHistory(); alert("Report saved to local history.");
};
function renderHistory(){
 const h=JSON.parse(localStorage.getItem("vt-history")||"[]"), box=$("#historyList");
 box.innerHTML=h.length?h.map(x=>`<div class="historyrow"><div><b>${x.plag}% plagiarism</b><br><small>${x.date} • ${x.words} submitted words • ${x.phrases} phrases</small></div><span class="pill">${100-x.plag}% original</span></div>`).join(""):`<div class="panel" style="padding:25px;color:var(--muted)">No saved reports yet. Run an analysis and choose “Save report”.</div>`;
}
$("#clearHistory").onclick=()=>{localStorage.removeItem("vt-history");renderHistory()};
$("#themeBtn").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("vt-theme",document.body.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("vt-theme")==="light")document.body.classList.add("light");
renderHistory();updateCounts();
