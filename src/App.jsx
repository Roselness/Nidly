import { useState, useEffect } from "react";

// ── Supabase ───────────────────────────────────────────────────────────────
const SUPA_URL = "https://awrzzqpxgafvpvqxcvyx.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3cnp6cXB4Z2FmdnB2cXhjdnl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3OTg0MTcsImV4cCI6MjA5NzM3NDQxN30.C0Eeb5XObDY6uUnaaz_5GDm-t46JXrIbMVzabXUTXCY";

const supa = async (path, opts = {}) => {
  const res = await fetch(`${SUPA_URL}/rest/v1/${path}`, {
    headers: {
      "apikey": SUPA_KEY,
      "Authorization": `Bearer ${SUPA_KEY}`,
      "Content-Type": "application/json",
      "Prefer": opts.prefer || "return=representation",
      ...opts.headers,
    },
    ...opts,
  });
  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
};

const db = {
  get: (table, query="") => supa(`${table}?${query}`, { method:"GET" }),
  post: (table, body) => supa(table, { method:"POST", body: JSON.stringify(body) }),
  patch: (table, query, body) => supa(`${table}?${query}`, { method:"PATCH", body: JSON.stringify(body), prefer:"return=representation" }),
  delete: (table, query) => supa(`${table}?${query}`, { method:"DELETE" }),
  upsert: (table, body) => supa(table, { method:"POST", body: JSON.stringify(body), headers:{ "Prefer":"resolution=merge-duplicates,return=representation" } }),
};

// ── Palette ────────────────────────────────────────────────────────────────
const P = {
  eau:"#B2CECA", eauL:"#D4E8E6", eauD:"#7BADA8",
  beige:"#F2EDE4", beigeD:"#E0D5C5",
  taupe:"#9E8E7E", taupeL:"#C4B5A8", taupeD:"#6B5D52",
  creme:"#FAF7F2", white:"#FFFFFF",
  text:"#3D3530", textL:"#7A6E66", border:"#D8CFC4", err:"#C0796A",
};

const btn = (bg,col=P.text) => ({ background:bg, border:"none", borderRadius:12, padding:"10px 20px", cursor:"pointer", fontWeight:700, color:col, fontSize:14, transition:"filter .15s", display:"inline-flex", alignItems:"center", gap:6 });
const card = (bg=P.white) => ({ background:bg, borderRadius:20, padding:24, boxShadow:"0 2px 14px rgba(80,60,40,.08)", marginBottom:18 });
const inp = { border:`1.5px solid ${P.border}`, borderRadius:10, padding:"8px 12px", fontSize:14, width:"100%", boxSizing:"border-box", color:P.text, background:P.creme, outline:"none" };
const lbl = { fontSize:13, fontWeight:600, color:P.textL, marginBottom:4, display:"block" };

// ── SVG Animaux ────────────────────────────────────────────────────────────
const Lapin = ({size=32,op=.18}) => <svg width={size} height={size} viewBox="0 0 40 40" style={{opacity:op}}><ellipse cx="20" cy="26" rx="10" ry="9" fill={P.taupe}/><ellipse cx="14" cy="13" rx="3.5" ry="7" fill={P.taupe}/><ellipse cx="26" cy="13" rx="3.5" ry="7" fill={P.taupe}/><ellipse cx="20" cy="22" rx="7" ry="6" fill={P.taupeL}/><circle cx="17" cy="21" r="1.2" fill={P.taupeD}/><circle cx="23" cy="21" r="1.2" fill={P.taupeD}/><ellipse cx="20" cy="24" rx="2" ry="1.2" fill={P.taupeD}/></svg>;
const Ourson = ({size=32,op=.18}) => <svg width={size} height={size} viewBox="0 0 40 40" style={{opacity:op}}><ellipse cx="20" cy="26" rx="11" ry="9" fill={P.taupe}/><circle cx="20" cy="18" r="8" fill={P.taupe}/><circle cx="12" cy="12" r="4.5" fill={P.taupe}/><circle cx="28" cy="12" r="4.5" fill={P.taupe}/><ellipse cx="20" cy="20" rx="5" ry="4" fill={P.taupeL}/><circle cx="17" cy="17" r="1.3" fill={P.taupeD}/><circle cx="23" cy="17" r="1.3" fill={P.taupeD}/></svg>;
const Canard = ({size=32,op=.18}) => <svg width={size} height={size} viewBox="0 0 40 40" style={{opacity:op}}><ellipse cx="20" cy="27" rx="12" ry="8" fill={P.taupe}/><circle cx="24" cy="16" r="7" fill={P.taupe}/><ellipse cx="32" cy="17" rx="4" ry="2.5" fill={P.taupeD}/><circle cx="26" cy="14" r="1.3" fill={P.taupeD}/></svg>;

const BgAnimaux = () => (
  <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
    <div style={{position:"absolute",top:40,left:20}}><Lapin size={64} op={.12}/></div>
    <div style={{position:"absolute",top:120,right:40}}><Ourson size={56} op={.10}/></div>
    <div style={{position:"absolute",bottom:80,left:60}}><Canard size={72} op={.11}/></div>
    <div style={{position:"absolute",bottom:40,right:80}}><Lapin size={48} op={.09}/></div>
  </div>
);

const NidlyLogo = ({size="large"}) => (
  <div style={{display:"flex",alignItems:"center",gap:size==="large"?12:8}}>
    <svg width={size==="large"?48:32} height={size==="large"?48:32} viewBox="0 0 48 48">
      <ellipse cx="24" cy="34" rx="18" ry="10" fill={P.eauD}/>
      <ellipse cx="24" cy="30" rx="14" ry="8" fill={P.eau}/>
      <circle cx="18" cy="22" r="5" fill={P.taupe}/>
      <circle cx="30" cy="22" r="5" fill={P.taupe}/>
      <circle cx="24" cy="20" r="6" fill={P.taupeL}/>
      <ellipse cx="24" cy="26" rx="9" ry="6" fill={P.eauL}/>
    </svg>
    <div>
      <div style={{fontWeight:900,fontSize:size==="large"?26:18,color:P.taupeD,letterSpacing:-.5}}>Nidly</div>
      {size==="large"&&<div style={{fontSize:12,color:P.textL,fontWeight:500}}>Milieu d'accueil</div>}
    </div>
  </div>
);

const genCode = (prenom,nom,existing) => {
  const base=(prenom.slice(0,3)+nom.slice(0,3)).toUpperCase().replace(/[^A-Z]/g,"");
  let code=base,i=1;
  while(existing.includes(code)){code=base+i;i++;}
  return code;
};

const JOURS_OUVERTS=[1,2,4,5];
const QRPh = ({value}) => <div style={{width:80,height:80,background:P.white,border:`2px solid ${P.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",fontSize:9,color:P.textL,textAlign:"center",padding:4}}><div style={{fontSize:26,color:P.taupe}}>▦</div><div style={{fontSize:8,wordBreak:"break-all"}}>{value}</div></div>;

// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [view,setView] = useState("login");
  const [section,setSection] = useState("fiches");
  const [pSection,setPSection] = useState("calendrier");
  const [licenceCode,setLicenceCode] = useState("");
  const [children,setChildren] = useState([]);
  const [presences,setPresences] = useState({});
  const [notes,setNotes] = useState({});
  const [conges,setConges] = useState([]);
  const [notesCom,setNotesCom] = useState([]);
  const [absences,setAbsences] = useState({});
  const [loginCode,setLoginCode] = useState("");
  const [loginErr,setLoginErr] = useState("");
  const [curParent,setCurParent] = useState(null);
  const [calMonth,setCalMonth] = useState(new Date());
  const [loading,setLoading] = useState(false);

  const loadData = async (lcode) => {
    setLoading(true);
    try {
      const [enfs, pres, nts, cgs, nc, abs] = await Promise.all([
        db.get("enfants", `licence_code=eq.${lcode}&order=nom.asc`),
        db.get("presences", `licence_code=eq.${lcode}`),
        db.get("notes", `licence_code=eq.${lcode}`),
        db.get("conges", `licence_code=eq.${lcode}`),
        db.get("notes_communes", `licence_code=eq.${lcode}&order=date.desc`),
        db.get("absences", `enfant_id=in.(${(await db.get("enfants",`licence_code=eq.${lcode}&select=id`)||[]).map(e=>e.id).join(",")||"0"})`),
      ]);
      setChildren(enfs||[]);
      // Build presences map
      const pm={};
      (pres||[]).forEach(p=>{
        if(!pm[p.date])pm[p.date]={};
        pm[p.date][p.enfant_id]={arrivee:p.arrivee?.slice(0,5)||"",depart:p.depart?.slice(0,5)||""};
      });
      setPresences(pm);
      // Build notes map
      const nm={};
      (nts||[]).forEach(n=>{
        if(!nm[n.date])nm[n.date]={};
        nm[n.date][n.enfant_id]={repas:n.repas||"",sieste:n.sieste||"",note:n.note||""};
      });
      setNotes(nm);
      setConges((cgs||[]).map(c=>c.date));
      setNotesCom(nc||[]);
      // Build absences map
      const am={};
      (abs||[]).forEach(a=>{
        if(!am[a.enfant_id])am[a.enfant_id]=[];
        am[a.enfant_id].push(a.date);
      });
      setAbsences(am);
    } catch(e){ console.error(e); }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const code = loginCode.trim().toUpperCase();
    try {
      // Check accueillante licence
      const lics = await db.get("licences", `code=eq.${code}&active=eq.true`);
      if (lics && lics.length > 0) {
        setLicenceCode(code);
        await loadData(code);
        setView("accueillante");
        setLoginErr("");
        setLoading(false);
        return;
      }
      // Check parent code
      const enfs = await db.get("enfants", `code_parent=eq.${code}`);
      if (enfs && enfs.length > 0) {
        const child = enfs[0];
        // load parent data
        const [pres,nts,cgs,nc,abs] = await Promise.all([
          db.get("presences", `enfant_id=eq.${child.id}`),
          db.get("notes", `enfant_id=eq.${child.id}`),
          db.get("conges", `licence_code=eq.${child.licence_code}`),
          db.get("notes_communes", `licence_code=eq.${child.licence_code}&order=date.desc`),
          db.get("absences", `enfant_id=eq.${child.id}`),
        ]);
        const pm={};
        (pres||[]).forEach(p=>{if(!pm[p.date])pm[p.date]={};pm[p.date][p.enfant_id]={arrivee:p.arrivee?.slice(0,5)||"",depart:p.depart?.slice(0,5)||""};});
        setPresences(pm);
        const nm={};
        (nts||[]).forEach(n=>{if(!nm[n.date])nm[n.date]={};nm[n.date][n.enfant_id]={repas:n.repas||"",sieste:n.sieste||"",note:n.note||""};});
        setNotes(nm);
        setConges((cgs||[]).map(c=>c.date));
        setNotesCom(nc||[]);
        setAbsences({[child.id]:(abs||[]).map(a=>a.date)});
        setCurParent(child);
        setChildren([child]);
        setView("parent");
        setLoginErr("");
        setLoading(false);
        return;
      }
      setLoginErr("Code incorrect ou inactif. Réessayez.");
    } catch(e){ setLoginErr("Erreur de connexion. Réessayez."); }
    setLoading(false);
  };

  if(view==="login") return <LoginScreen loginCode={loginCode} setLoginCode={setLoginCode} handleLogin={handleLogin} loginErr={loginErr} loading={loading}/>;
  if(view==="parent") return <ParentView child={curParent} notes={notes} conges={conges} notesCom={notesCom} absences={absences} setAbsences={setAbsences} pSection={pSection} setPSection={setPSection} calMonth={calMonth} setCalMonth={setCalMonth} onLogout={()=>{setView("login");setLoginCode("");setCurParent(null);}}/>;
  return <AccueillanteView section={section} setSection={setSection} children={children} setChildren={setChildren} presences={presences} setPresences={setPresences} notes={notes} setNotes={setNotes} conges={conges} setConges={setConges} notesCom={notesCom} setNotesCom={setNotesCom} absences={absences} calMonth={calMonth} setCalMonth={setCalMonth} licenceCode={licenceCode} loading={loading} onLogout={()=>{setView("login");setLoginCode("");}}/>;
}

// ── Login ──────────────────────────────────────────────────────────────────
function LoginScreen({loginCode,setLoginCode,handleLogin,loginErr,loading}){
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${P.eauL} 0%,${P.beige} 60%,${P.beigeD} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Segoe UI',sans-serif",position:"relative"}}>
      <BgAnimaux/>
      <div style={{...card(P.white),width:340,textAlign:"center",padding:40,position:"relative",zIndex:1,border:`2px solid ${P.eauL}`}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><NidlyLogo size="large"/></div>
        <p style={{color:P.textL,fontSize:13,marginBottom:28,marginTop:4}}>Votre espace milieu d'accueil</p>
        <label style={lbl}>Code d'accès</label>
        <input style={{...inp,textAlign:"center",letterSpacing:3,fontSize:16,marginBottom:8}} placeholder="CODE" value={loginCode} onChange={e=>setLoginCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
        {loginErr&&<p style={{color:P.err,fontSize:13,margin:"4px 0 8px"}}>{loginErr}</p>}
        <button style={{...btn(P.eauD,P.white),width:"100%",justifyContent:"center",marginTop:10,fontSize:15,opacity:loading?.6:1}} onClick={handleLogin} disabled={loading}>
          {loading?"Connexion...":"Connexion →"}
        </button>
      </div>
    </div>
  );
}

// ── Accueillante ───────────────────────────────────────────────────────────
function AccueillanteView({section,setSection,children,setChildren,presences,setPresences,notes,setNotes,conges,setConges,notesCom,setNotesCom,absences,calMonth,setCalMonth,licenceCode,loading,onLogout}){
  const nav=[
    {key:"fiches",icon:"📋",label:"Fiches enfants"},
    {key:"presences",icon:"📅",label:"Présences"},
    {key:"facturation",icon:"💶",label:"Facturation"},
    {key:"export",icon:"📊",label:"Export"},
    {key:"calendrier",icon:"🗓️",label:"Calendrier"},
    {key:"notesjour",icon:"📝",label:"Notes du jour"},
    {key:"notescom",icon:"📢",label:"Notes communes"},
  ];
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${P.eauL} 0%,${P.creme} 100%)`,fontFamily:"'Segoe UI',sans-serif",position:"relative"}}>
      <BgAnimaux/>
      <div style={{background:P.white,boxShadow:"0 2px 8px rgba(80,60,40,.10)",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:2}}>
        <NidlyLogo size="small"/>
        <div style={{fontSize:11,color:P.textL,fontWeight:600}}>Accueillante · <code style={{background:P.beige,padding:"2px 6px",borderRadius:6}}>{licenceCode}</code></div>
        <button style={{...btn(P.beigeD),fontSize:13}} onClick={onLogout}>Déconnexion</button>
      </div>
      <div style={{display:"flex",gap:8,padding:"16px 24px",flexWrap:"wrap",position:"relative",zIndex:2}}>
        {nav.map(n=>(
          <button key={n.key} style={{...btn(section===n.key?P.eauD:P.white,section===n.key?P.white:P.text),border:`1.5px solid ${section===n.key?P.eauD:P.border}`}} onClick={()=>setSection(n.key)}>
            {n.icon} {n.label}
          </button>
        ))}
      </div>
      {loading&&<div style={{textAlign:"center",padding:20,color:P.textL}}>⏳ Chargement...</div>}
      <div style={{padding:"0 24px 40px",position:"relative",zIndex:2}}>
        {section==="fiches" && <FichesSection children={children} setChildren={setChildren} licenceCode={licenceCode}/>}
        {section==="presences" && <PresencesSection children={children} presences={presences} setPresences={setPresences} calMonth={calMonth} setCalMonth={setCalMonth} licenceCode={licenceCode}/>}
        {section==="facturation" && <FacturationSection children={children} presences={presences}/>}
        {section==="export" && <ExportSection children={children} presences={presences}/>}
        {section==="calendrier" && <CalendrierSection conges={conges} setConges={setConges} calMonth={calMonth} setCalMonth={setCalMonth} absences={{}} isAccueillante licenceCode={licenceCode}/>}
        {section==="notesjour" && <NotesDuJourSection children={children} notes={notes} setNotes={setNotes} isAccueillante licenceCode={licenceCode}/>}
        {section==="notescom" && <NotesCommunesSection notesCom={notesCom} setNotesCom={setNotesCom} isAccueillante licenceCode={licenceCode}/>}
      </div>
    </div>
  );
}

// ── Fiches ─────────────────────────────────────────────────────────────────
function FichesSection({children,setChildren,licenceCode}){
  const [showForm,setShowForm]=useState(false);
  const [selected,setSelected]=useState(null);
  const [showCode,setShowCode]=useState(null);
  const [saving,setSaving]=useState(false);
  const ep={nom:"",adresse:"",registre:"",tel:"",email:""};
  const empty={nom:"",prenom:"",adresse:"",registre:"",allergies:"",nb_jours:"",date_entree:"",date_sortie:"",pere_nom:"",pere_adresse:"",pere_registre:"",pere_tel:"",pere_email:"",mere_nom:"",mere_adresse:"",mere_registre:"",mere_tel:"",mere_email:"",reprendre:"",forfait_mensuel:"",code_parent:""};
  const [form,setForm]=useState(empty);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));

  const save=async()=>{
    setSaving(true);
    try{
      const existing=children.map(c=>c.code_parent);
      const code=selected?form.code_parent:genCode(form.prenom,form.nom,existing);
      const body={...form,licence_code:licenceCode,nb_jours:Number(form.nb_jours),forfait_mensuel:parseFloat(form.forfait_mensuel)||0,reprendre:form.reprendre.split(",").map(s=>s.trim()).filter(Boolean),code_parent:code};
      if(selected){
        await db.patch("enfants",`id=eq.${selected.id}`,body);
        setChildren(prev=>prev.map(c=>c.id===selected.id?{...c,...body}:c));
      } else {
        const res=await db.post("enfants",body);
        if(res&&res[0]){setChildren(prev=>[...prev,res[0]]);setShowCode(code);}
      }
      setShowForm(false);setSelected(null);setForm(empty);
    }catch(e){alert("Erreur: "+e.message);}
    setSaving(false);
  };

  const edit=(c)=>{setSelected(c);setForm({...c,reprendre:(c.reprendre||[]).join(", ")});setShowForm(true);};

  const del=async(c)=>{
    if(!window.confirm(`Supprimer la fiche de ${c.prenom} ${c.nom} ?`))return;
    await db.delete("enfants",`id=eq.${c.id}`);
    setChildren(prev=>prev.filter(x=>x.id!==c.id));
  };

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{margin:0,color:P.taupeD}}>📋 Fiches des enfants</h2>
        <button style={{...btn(P.eauD,P.white)}} onClick={()=>{setForm(empty);setSelected(null);setShowForm(true);}}>+ Nouvel enfant</button>
      </div>

      {showCode&&(
        <div style={{...card(P.eau),border:`2px solid ${P.eauD}`,textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:16,fontWeight:900,color:P.taupeD,marginBottom:8}}>🎉 Enfant ajouté !</div>
          <div style={{fontSize:13,marginBottom:8}}>Code d'accès parents :</div>
          <div style={{fontSize:28,fontWeight:900,letterSpacing:4,color:P.taupeD,background:P.white,borderRadius:12,padding:"12px 24px",display:"inline-block"}}>{showCode}</div>
          <div style={{fontSize:12,color:P.textL,marginTop:8}}>Communiquez ce code aux parents.</div>
          <button style={{...btn(P.eauD,P.white),marginTop:12}} onClick={()=>setShowCode(null)}>✓ Compris</button>
        </div>
      )}

      {children.length===0&&<div style={{...card(P.beige),textAlign:"center",color:P.textL}}>Aucun enfant enregistré. Cliquez sur "+ Nouvel enfant" pour commencer.</div>}

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16,marginBottom:24}}>
        {children.map(c=>(
          <div key={c.id} style={{...card(P.white),border:`2px solid ${P.eauL}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:48,height:48,borderRadius:24,background:`linear-gradient(135deg,${P.eau},${P.eauD})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Ourson size={36} op={.9}/></div>
              <div>
                <div style={{fontWeight:800,fontSize:16,color:P.text}}>{c.prenom} {c.nom}</div>
                <div style={{fontSize:12,color:P.textL}}>{c.nb_jours}j/sem · <strong style={{color:P.eauD}}>{c.forfait_mensuel} €/mois</strong></div>
                <div style={{fontSize:11,color:P.taupeL}}>Code : <strong>{c.code_parent}</strong></div>
              </div>
            </div>
            {c.allergies&&c.allergies!=="Aucune"&&<div style={{background:"#F9E8E5",borderRadius:8,padding:"6px 10px",fontSize:12,color:"#8B3A2E",marginBottom:8}}>⚠️ {c.allergies}</div>}
            <div style={{fontSize:12,color:P.textL}}>👨 {c.pere_nom||"—"} · 👩 {c.mere_nom||"—"}</div>
            <div style={{fontSize:12,color:P.textL}}>📅 {c.date_entree} → {c.date_sortie}</div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button style={{...btn(P.eauL),fontSize:12,flex:1,justifyContent:"center"}} onClick={()=>edit(c)}>✏️ Modifier</button>
              <button style={{...btn("#F9E8E5"),fontSize:12,color:"#8B3A2E"}} onClick={()=>del(c)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {showForm&&(
        <div style={{position:"fixed",inset:0,background:"rgba(60,45,35,.45)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
          <div style={{...card(P.white),width:"100%",maxWidth:620,maxHeight:"90vh",overflowY:"auto"}}>
            <h3 style={{margin:"0 0 16px",color:P.taupeD}}>{selected?"Modifier":"Nouvelle fiche"} enfant</h3>

            <Bloc color={P.eauL} title="👶 Enfant">
              <G2><F label="Nom" value={form.nom} onChange={v=>sf("nom",v)}/><F label="Prénom" value={form.prenom} onChange={v=>sf("prenom",v)}/></G2>
              <F label="Adresse" value={form.adresse} onChange={v=>sf("adresse",v)}/>
              <F label="N° registre national" value={form.registre} onChange={v=>sf("registre",v)} placeholder="90.04.15-123.45"/>
              <F label="Allergies / Intolérances" value={form.allergies} onChange={v=>sf("allergies",v)}/>
              <G2>
                <F label="Nb jours/semaine" type="number" value={form.nb_jours} onChange={v=>sf("nb_jours",v)}/>
                <F label="Forfait mensuel (€)" type="number" value={form.forfait_mensuel} onChange={v=>sf("forfait_mensuel",v)}/>
              </G2>
              <G2>
                <F label="Date d'entrée" type="date" value={form.date_entree} onChange={v=>sf("date_entree",v)}/>
                <F label="Date de sortie" type="date" value={form.date_sortie} onChange={v=>sf("date_sortie",v)}/>
              </G2>
            </Bloc>

            <Bloc color={P.beige} title="👨 Père">
              <G2><F label="Nom complet" value={form.pere_nom} onChange={v=>sf("pere_nom",v)}/><F label="N° registre national" value={form.pere_registre} onChange={v=>sf("pere_registre",v)}/></G2>
              <F label="Adresse" value={form.pere_adresse} onChange={v=>sf("pere_adresse",v)}/>
              <G2><F label="Téléphone" value={form.pere_tel} onChange={v=>sf("pere_tel",v)}/><F label="Email" type="email" value={form.pere_email} onChange={v=>sf("pere_email",v)}/></G2>
            </Bloc>

            <Bloc color={P.beige} title="👩 Mère">
              <G2><F label="Nom complet" value={form.mere_nom} onChange={v=>sf("mere_nom",v)}/><F label="N° registre national" value={form.mere_registre} onChange={v=>sf("mere_registre",v)}/></G2>
              <F label="Adresse" value={form.mere_adresse} onChange={v=>sf("mere_adresse",v)}/>
              <G2><F label="Téléphone" value={form.mere_tel} onChange={v=>sf("mere_tel",v)}/><F label="Email" type="email" value={form.mere_email} onChange={v=>sf("mere_email",v)}/></G2>
            </Bloc>

            <F label="Personnes autorisées à reprendre (séparées par virgule)" value={form.reprendre} onChange={v=>sf("reprendre",v)}/>
            {!selected&&<div style={{background:P.eauL,borderRadius:10,padding:"10px 14px",fontSize:12,color:P.taupeD,marginBottom:12}}>🔑 Code d'accès généré automatiquement pour les parents.</div>}

            <div style={{display:"flex",gap:10,marginTop:8}}>
              <button style={{...btn(P.eauD,P.white),flex:1,justifyContent:"center",opacity:saving?.6:1}} onClick={save} disabled={saving}>{saving?"Enregistrement...":"💾 Enregistrer"}</button>
              <button style={{...btn(P.beigeD),flex:1,justifyContent:"center"}} onClick={()=>setShowForm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Présences ──────────────────────────────────────────────────────────────
function PresencesSection({children,presences,setPresences,calMonth,setCalMonth,licenceCode}){
  const [selDate,setSelDate]=useState(null);
  const [editP,setEditP]=useState({});
  const [saving,setSaving]=useState(false);
  const days=buildCalDays(calMonth);

  const openDay=d=>{setSelDate(d);setEditP(presences[d]?JSON.parse(JSON.stringify(presences[d])):{}); };

  const saveDay=async()=>{
    setSaving(true);
    try{
      for(const child of children){
        const p=editP[child.id];
        if(p&&(p.arrivee||p.depart)){
          await db.upsert("presences",{licence_code:licenceCode,enfant_id:child.id,date:selDate,arrivee:p.arrivee||null,depart:p.depart||null});
        }
      }
      setPresences(prev=>({...prev,[selDate]:editP}));
      setSelDate(null);
    }catch(e){alert("Erreur: "+e.message);}
    setSaving(false);
  };

  const isOpen=date=>JOURS_OUVERTS.includes(new Date(date).getDay());

  return(
    <div>
      <h2 style={{color:P.taupeD}}>📅 Présences</h2>
      <MonthNav calMonth={calMonth} setCalMonth={setCalMonth}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginTop:8}}>
        {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:700,color:P.textL,padding:4}}>{d}</div>)}
        {days.map((d,i)=>{
          if(!d)return <div key={i}/>;
          const key=d.toISOString().slice(0,10);
          const open=isOpen(key);
          const hasP=presences[key]&&Object.keys(presences[key]).length>0;
          return(
            <div key={key} onClick={()=>open&&openDay(key)} style={{background:!open?"#f0ece7":hasP?P.eau:P.white,border:`1.5px solid ${hasP?P.eauD:P.border}`,borderRadius:10,padding:"8px 4px",textAlign:"center",cursor:open?"pointer":"default",minHeight:52}}>
              <div style={{fontSize:13,fontWeight:700,color:open?P.text:"#c5bdb5"}}>{d.getDate()}</div>
              {hasP&&<div style={{fontSize:9,color:P.eauD}}>✓{Object.keys(presences[key]).length}</div>}
            </div>
          );
        })}
      </div>
      {selDate&&(
        <div style={{position:"fixed",inset:0,background:"rgba(60,45,35,.45)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{...card(P.white),width:"100%",maxWidth:480,maxHeight:"80vh",overflowY:"auto"}}>
            <h3 style={{margin:"0 0 16px",color:P.taupeD,textTransform:"capitalize"}}>{new Date(selDate).toLocaleDateString("fr-BE",{weekday:"long",day:"numeric",month:"long"})}</h3>
            {children.map(c=>(
              <div key={c.id} style={{...card(P.eauL),marginBottom:10}}>
                <div style={{fontWeight:700,marginBottom:8}}>👶 {c.prenom} {c.nom}</div>
                <G2>
                  <div><label style={lbl}>Arrivée</label><input type="time" style={inp} value={editP[c.id]?.arrivee||""} onChange={e=>setEditP(p=>({...p,[c.id]:{...p[c.id],arrivee:e.target.value}}))}/></div>
                  <div><label style={lbl}>Départ</label><input type="time" style={inp} value={editP[c.id]?.depart||""} onChange={e=>setEditP(p=>({...p,[c.id]:{...p[c.id],depart:e.target.value}}))}/></div>
                </G2>
              </div>
            ))}
            <div style={{display:"flex",gap:10}}>
              <button style={{...btn(P.eauD,P.white),flex:1,justifyContent:"center",opacity:saving?.6:1}} onClick={saveDay} disabled={saving}>{saving?"Enregistrement...":"💾 Enregistrer"}</button>
              <button style={{...btn(P.beigeD),flex:1,justifyContent:"center"}} onClick={()=>setSelDate(null)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Facturation ────────────────────────────────────────────────────────────
function FacturationSection({children,presences}){
  const [selChild,setSelChild]=useState(null);
  const [selMonth,setSelMonth]=useState(new Date().toISOString().slice(0,7));
  const [sent,setSent]=useState(false);

  useEffect(()=>{ if(children.length&&!selChild) setSelChild(children[0]); },[children]);

  const days=!selChild?[]:Object.entries(presences).filter(([d])=>d.startsWith(selMonth)&&presences[d][selChild.id]).map(([d])=>({date:d,...presences[d][selChild.id]}));
  const forfait=parseFloat(selChild?.forfait_mensuel||0).toFixed(2);
  const facNum=`FAC-${selMonth}-${selChild?.id||0}`;

  return(
    <div>
      <h2 style={{color:P.taupeD}}>💶 Facturation</h2>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <div><label style={lbl}>Enfant</label>
          <select style={{...inp,width:"auto"}} value={selChild?.id||""} onChange={e=>setSelChild(children.find(c=>c.id===Number(e.target.value)))}>
            {children.map(c=><option key={c.id} value={c.id}>{c.prenom} {c.nom}</option>)}
          </select>
        </div>
        <div><label style={lbl}>Mois</label><input type="month" style={{...inp,width:"auto"}} value={selMonth} onChange={e=>setSelMonth(e.target.value)}/></div>
      </div>
      {selChild&&(
        <div style={{...card(P.white),maxWidth:520,border:`2px solid ${P.eauL}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <NidlyLogo size="small"/>
            <QRPh value={facNum}/>
          </div>
          <hr style={{border:"none",borderTop:`2px dashed ${P.border}`,margin:"16px 0"}}/>
          <div style={{fontWeight:800,fontSize:18,marginBottom:4,color:P.taupeD}}>FACTURE {facNum}</div>
          <div style={{color:P.textL,fontSize:13,marginBottom:4}}>{selChild.prenom} {selChild.nom} · {selMonth.replace("-","/")}</div>
          <div style={{fontSize:12,color:P.textL,marginBottom:16}}>
            📧 Père : {selChild.pere_email||"—"} · Mère : {selChild.mere_email||"—"}
          </div>
          <div style={{background:P.beige,borderRadius:12,padding:14,marginBottom:12}}>
            <div style={{fontSize:13,color:P.textL,marginBottom:4}}>Forfait mensuel</div>
            <div style={{fontSize:24,fontWeight:900,color:P.taupeD}}>{forfait} €</div>
          </div>
          <div style={{fontSize:13,fontWeight:700,color:P.taupeD,marginBottom:8}}>Présences ({days.length} jour{days.length>1?"s":""})</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,marginBottom:12}}>
            <thead><tr style={{background:P.eauL}}>{["Date","Arrivée","Départ"].map(h=><th key={h} style={{padding:"6px 10px",textAlign:"left",fontWeight:700,color:P.taupeD}}>{h}</th>)}</tr></thead>
            <tbody>
              {days.length===0&&<tr><td colSpan={3} style={{padding:12,color:P.textL,textAlign:"center"}}>Aucune présence ce mois-ci</td></tr>}
              {days.map((d,i)=><tr key={d.date} style={{background:i%2?P.creme:P.white}}><td style={{padding:"5px 10px"}}>{new Date(d.date).toLocaleDateString("fr-BE")}</td><td style={{padding:"5px 10px"}}>{d.arrivee||"—"}</td><td style={{padding:"5px 10px"}}>{d.depart||"—"}</td></tr>)}
            </tbody>
          </table>
          <div style={{background:P.beige,borderRadius:10,padding:12,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:17,fontWeight:900}}><span>TOTAL</span><span style={{color:P.eauD}}>{forfait} €</span></div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button style={{...btn(P.eauD,P.white),flex:1,justifyContent:"center"}} onClick={()=>{setSent(true);setTimeout(()=>setSent(false),3000);}}>📧 Envoyer par mail</button>
            <button style={{...btn(P.beige),flex:1,justifyContent:"center"}}>🖨️ Imprimer</button>
          </div>
          {sent&&<div style={{marginTop:8,background:P.eau,borderRadius:8,padding:"8px 12px",fontSize:13,textAlign:"center"}}>✅ Facture envoyée !</div>}
          <div style={{marginTop:8,fontSize:11,color:P.textL,textAlign:"center"}}>ℹ️ Envoi automatique le 15 de chaque mois.</div>
        </div>
      )}
    </div>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────
function ExportSection({children,presences}){
  const [annee,setAnnee]=useState(new Date().getFullYear().toString());

  const getStats=(child)=>{
    const jours=Object.entries(presences).filter(([d])=>{
      return d.startsWith(annee)&&presences[d][child.id];
    }).length;
    const montant=(jours>0?parseFloat(child.forfait_mensuel||0):0);
    // Count months with presence
    const moisAvecPresence=new Set(Object.entries(presences).filter(([d])=>d.startsWith(annee)&&presences[d][child.id]).map(([d])=>d.slice(0,7))).size;
    const totalAnnuel=(moisAvecPresence*parseFloat(child.forfait_mensuel||0)).toFixed(2);
    return {jours, moisAvecPresence, totalAnnuel};
  };

  const exportCSV=()=>{
    const rows=[["Prénom","Nom","Jours présence","Mois facturés","Forfait mensuel (€)","Total annuel (€)"]];
    children.forEach(c=>{
      const s=getStats(c);
      rows.push([c.prenom,c.nom,s.jours,s.moisAvecPresence,c.forfait_mensuel||0,s.totalAnnuel]);
    });
    const csv=rows.map(r=>r.join(";")).join("\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`Nidly_Export_${annee}.csv`;a.click();
  };

  return(
    <div>
      <h2 style={{color:P.taupeD}}>📊 Export annuel</h2>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <div><label style={lbl}>Année</label>
          <select style={{...inp,width:"auto"}} value={annee} onChange={e=>setAnnee(e.target.value)}>
            {["2024","2025","2026","2027"].map(y=><option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <button style={{...btn(P.eauD,P.white),marginTop:20}} onClick={exportCSV}>⬇️ Exporter CSV</button>
      </div>

      {children.length===0&&<div style={{...card(P.beige),textAlign:"center",color:P.textL}}>Aucun enfant enregistré.</div>}

      <div style={{...card(P.white),border:`2px solid ${P.eauL}`}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead>
            <tr style={{background:P.eauL}}>
              {["Enfant","Jours de présence","Mois facturés","Forfait/mois","Total annuel"].map(h=>(
                <th key={h} style={{padding:"8px 12px",textAlign:"left",fontWeight:700,color:P.taupeD}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {children.map((c,i)=>{
              const s=getStats(c);
              return(
                <tr key={c.id} style={{background:i%2?P.creme:P.white}}>
                  <td style={{padding:"8px 12px",fontWeight:700}}>{c.prenom} {c.nom}</td>
                  <td style={{padding:"8px 12px",textAlign:"center"}}>{s.jours}</td>
                  <td style={{padding:"8px 12px",textAlign:"center"}}>{s.moisAvecPresence}</td>
                  <td style={{padding:"8px 12px",textAlign:"right"}}>{parseFloat(c.forfait_mensuel||0).toFixed(2)} €</td>
                  <td style={{padding:"8px 12px",textAlign:"right",fontWeight:900,color:P.eauD}}>{s.totalAnnuel} €</td>
                </tr>
              );
            })}
            {children.length>0&&(
              <tr style={{background:P.beige,fontWeight:900}}>
                <td style={{padding:"8px 12px"}}>TOTAL</td>
                <td style={{padding:"8px 12px",textAlign:"center"}}>{children.reduce((a,c)=>a+getStats(c).jours,0)}</td>
                <td/>
                <td/>
                <td style={{padding:"8px 12px",textAlign:"right",color:P.eauD}}>{children.reduce((a,c)=>a+parseFloat(getStats(c).totalAnnuel),0).toFixed(2)} €</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Calendrier ─────────────────────────────────────────────────────────────
function CalendrierSection({conges,setConges,calMonth,setCalMonth,absences,setAbsences,isAccueillante,childId,licenceCode}){
  const days=buildCalDays(calMonth);
  const toggleConge=async(key)=>{
    if(!isAccueillante)return;
    if(conges.includes(key)){
      await db.delete("conges",`licence_code=eq.${licenceCode}&date=eq.${key}`);
      setConges(prev=>prev.filter(d=>d!==key));
    } else {
      await db.post("conges",{licence_code:licenceCode,date:key});
      setConges(prev=>[...prev,key]);
    }
  };
  const toggleAbsence=async(key)=>{
    if(isAccueillante)return;
    const cur=absences[childId]||[];
    if(cur.includes(key)){
      await db.delete("absences",`enfant_id=eq.${childId}&date=eq.${key}`);
      setAbsences(prev=>({...prev,[childId]:cur.filter(d=>d!==key)}));
    } else {
      await db.post("absences",{enfant_id:childId,date:key});
      setAbsences(prev=>({...prev,[childId]:[...cur,key]}));
    }
  };
  const childAbs=absences?.[childId]||[];
  return(
    <div>
      <h2 style={{color:P.taupeD}}>🗓️ Calendrier {isAccueillante?"— Congés & Fermetures":"— Planification"}</h2>
      <MonthNav calMonth={calMonth} setCalMonth={setCalMonth}/>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:12,marginBottom:8,fontSize:12}}>
        <Tg color="#8B3A2E" bg="#F9E8E5">🔴 Fermé</Tg>
        {!isAccueillante&&<Tg color={P.eauD} bg={P.eauL}>🔵 Absent</Tg>}
        <Tg color={P.taupeD} bg={P.beige}>🟢 Ouvert</Tg>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
        {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:700,color:P.textL,padding:4}}>{d}</div>)}
        {days.map((d,i)=>{
          if(!d)return <div key={i}/>;
          const key=d.toISOString().slice(0,10);
          const isCong=conges.includes(key);
          const isAbs=childAbs.includes(key);
          const isOpen=JOURS_OUVERTS.includes(d.getDay());
          return(
            <div key={key} onClick={()=>isAccueillante?toggleConge(key):(isOpen&&toggleAbsence(key))} style={{background:isCong?"#F9E8E5":isAbs?P.eauL:isOpen?P.white:"#f0ece7",border:`1.5px solid ${isCong?"#C0796A":isAbs?P.eauD:P.border}`,borderRadius:10,padding:"8px 4px",textAlign:"center",cursor:(isAccueillante||isOpen)?"pointer":"default",minHeight:44}}>
              <div style={{fontSize:13,fontWeight:700,color:isOpen?P.text:"#c5bdb5"}}>{d.getDate()}</div>
              {isCong&&<div style={{fontSize:9,color:"#8B3A2E"}}>Fermé</div>}
              {isAbs&&<div style={{fontSize:9,color:P.eauD}}>Absent</div>}
            </div>
          );
        })}
      </div>
      <p style={{fontSize:12,color:P.textL,marginTop:8}}>💡 {isAccueillante?"Cliquez sur un jour pour marquer une fermeture.":"Cliquez sur un jour ouvert pour signaler une absence."}</p>
    </div>
  );
}

// ── Notes du jour ──────────────────────────────────────────────────────────
function NotesDuJourSection({children,notes,setNotes,isAccueillante,childFilter,licenceCode}){
  const [selDate,setSelDate]=useState(new Date().toISOString().slice(0,10));
  const [editN,setEditN]=useState({});
  const [editing,setEditing]=useState(false);
  const [saving,setSaving]=useState(false);
  const dayNotes=notes[selDate]||{};
  const show=childFilter?children.filter(c=>c.id===childFilter):children;

  const startEdit=()=>{setEditN(JSON.parse(JSON.stringify(dayNotes)));setEditing(true);};
  const saveEdit=async()=>{
    setSaving(true);
    try{
      for(const c of show){
        const n=editN[c.id];
        if(n) await db.upsert("notes",{licence_code:licenceCode,enfant_id:c.id,date:selDate,...n});
      }
      setNotes(prev=>({...prev,[selDate]:editN}));
      setEditing(false);
    }catch(e){alert("Erreur: "+e.message);}
    setSaving(false);
  };

  return(
    <div>
      <h2 style={{color:P.taupeD}}>📝 Notes du jour</h2>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <input type="date" style={{...inp,width:"auto"}} value={selDate} onChange={e=>setSelDate(e.target.value)}/>
        {isAccueillante&&!editing&&<button style={{...btn(P.eauD,P.white)}} onClick={startEdit}>✏️ Modifier</button>}
      </div>
      {show.map(c=>{
        const n=editing?(editN[c.id]||{}):(dayNotes[c.id]||{});
        return(
          <div key={c.id} style={{...card(P.beige),border:`1.5px solid ${P.beigeD}`}}>
            <div style={{fontWeight:800,fontSize:16,marginBottom:10,color:P.taupeD}}>👶 {c.prenom} {c.nom}</div>
            {editing?(
              <>
                <F label="🍽️ Repas" value={n.repas||""} onChange={v=>setEditN(e=>({...e,[c.id]:{...e[c.id],repas:v}}))}/>
                <F label="😴 Sieste" value={n.sieste||""} onChange={v=>setEditN(e=>({...e,[c.id]:{...e[c.id],sieste:v}}))}/>
                <div style={{marginTop:6}}><label style={lbl}>📓 Note</label><textarea rows={3} style={{...inp,resize:"vertical"}} value={n.note||""} onChange={e=>setEditN(p=>({...p,[c.id]:{...p[c.id],note:e.target.value}}))}/></div>
              </>
            ):(
              <>
                {n.repas&&<p style={{margin:"4px 0",fontSize:14}}>🍽️ <strong>Repas :</strong> {n.repas}</p>}
                {n.sieste&&<p style={{margin:"4px 0",fontSize:14}}>😴 <strong>Sieste :</strong> {n.sieste}</p>}
                {n.note&&<p style={{margin:"8px 0 0",fontSize:14}}>📓 {n.note}</p>}
                {!n.repas&&!n.sieste&&!n.note&&<p style={{color:P.textL,fontSize:13}}>Aucune note pour ce jour.</p>}
              </>
            )}
          </div>
        );
      })}
      {editing&&<div style={{display:"flex",gap:10}}>
        <button style={{...btn(P.eauD,P.white),flex:1,justifyContent:"center",opacity:saving?.6:1}} onClick={saveEdit} disabled={saving}>{saving?"Enregistrement...":"💾 Enregistrer"}</button>
        <button style={{...btn(P.beigeD),flex:1,justifyContent:"center"}} onClick={()=>setEditing(false)}>Annuler</button>
      </div>}
    </div>
  );
}

// ── Notes communes ─────────────────────────────────────────────────────────
function NotesCommunesSection({notesCom,setNotesCom,isAccueillante,licenceCode}){
  const [texte,setTexte]=useState("");
  const [saving,setSaving]=useState(false);
  const add=async()=>{
    if(!texte.trim())return;
    setSaving(true);
    try{
      const date=new Date().toISOString().slice(0,10);
      await db.post("notes_communes",{licence_code:licenceCode,date,texte});
      setNotesCom(prev=>[{date,texte},...prev]);
      setTexte("");
    }catch(e){alert("Erreur: "+e.message);}
    setSaving(false);
  };
  return(
    <div>
      <h2 style={{color:P.taupeD}}>📢 Notes communes</h2>
      {isAccueillante&&(
        <div style={{...card(P.eauL),marginBottom:20}}>
          <label style={lbl}>Nouvelle note pour tous les parents</label>
          <textarea rows={3} style={{...inp,resize:"vertical",marginBottom:10}} value={texte} onChange={e=>setTexte(e.target.value)} placeholder="Information, rappel, événement…"/>
          <button style={{...btn(P.eauD,P.white),opacity:saving?.6:1}} onClick={add} disabled={saving}>{saving?"Publication...":"📢 Publier"}</button>
        </div>
      )}
      {notesCom.length===0&&<div style={{...card(P.beige),textAlign:"center",color:P.textL}}>Aucune note commune pour le moment.</div>}
      {notesCom.map((n,i)=>(
        <div key={i} style={{...card(P.white),border:`1.5px solid ${P.eauL}`}}>
          <div style={{fontSize:11,color:P.textL,marginBottom:4}}>📅 {new Date(n.date).toLocaleDateString("fr-BE")}</div>
          <p style={{margin:0,fontSize:14}}>{n.texte}</p>
        </div>
      ))}
    </div>
  );
}

// ── Parent View ────────────────────────────────────────────────────────────
function ParentView({child,notes,conges,notesCom,absences,setAbsences,pSection,setPSection,calMonth,setCalMonth,onLogout}){
  const nav=[
    {key:"calendrier",icon:"🗓️",label:"Calendrier"},
    {key:"notesjour",icon:"📝",label:"Notes du jour"},
    {key:"notescom",icon:"📢",label:"Notes communes"},
    {key:"factures",icon:"💶",label:"Mes factures"},
  ];
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${P.beige} 0%,${P.creme} 100%)`,fontFamily:"'Segoe UI',sans-serif",position:"relative"}}>
      <BgAnimaux/>
      <div style={{background:P.white,boxShadow:"0 2px 8px rgba(80,60,40,.10)",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:2}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:40,height:40,borderRadius:20,background:`linear-gradient(135deg,${P.eau},${P.eauD})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Lapin size={32} op={.9}/></div>
          <div><div style={{fontWeight:800,fontSize:16,color:P.text}}>{child.prenom} {child.nom}</div><div style={{fontSize:11,color:P.textL}}>Espace parents · Nidly</div></div>
        </div>
        <button style={{...btn(P.beigeD),fontSize:13}} onClick={onLogout}>Déconnexion</button>
      </div>
      <div style={{display:"flex",gap:8,padding:"16px 24px",flexWrap:"wrap",position:"relative",zIndex:2}}>
        {nav.map(n=><button key={n.key} style={{...btn(pSection===n.key?P.eauD:P.white,pSection===n.key?P.white:P.text),border:`1.5px solid ${pSection===n.key?P.eauD:P.border}`}} onClick={()=>setPSection(n.key)}>{n.icon} {n.label}</button>)}
      </div>
      <div style={{padding:"0 24px 40px",position:"relative",zIndex:2}}>
        {pSection==="calendrier"&&<CalendrierSection conges={conges} setConges={()=>{}} calMonth={calMonth} setCalMonth={setCalMonth} absences={absences} setAbsences={setAbsences} isAccueillante={false} childId={child.id}/>}
        {pSection==="notesjour" &&<NotesDuJourSection children={[child]} notes={notes} setNotes={()=>{}} isAccueillante={false} childFilter={child.id}/>}
        {pSection==="notescom" &&<NotesCommunesSection notesCom={notesCom} setNotesCom={()=>{}} isAccueillante={false}/>}
        {pSection==="factures" &&<ParentFactures child={child}/>}
      </div>
    </div>
  );
}

function ParentFactures({child}){
  const [factures,setFactures]=useState([]);
  useEffect(()=>{
    // Simulated — in production fetch from DB
    setFactures([
      {mois:new Date().toISOString().slice(0,7),forfait:child.forfait_mensuel||0,payee:false},
    ]);
  },[child]);
  return(
    <div>
      <h2 style={{color:P.taupeD}}>💶 Mes factures</h2>
      {factures.length===0&&<div style={{...card(P.beige),textAlign:"center",color:P.textL}}>Aucune facture pour le moment.</div>}
      {factures.map((f,i)=>(
        <div key={i} style={{...card(P.white),border:`1.5px solid ${P.border}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontWeight:700,color:P.text,fontSize:15}}>{f.mois.replace("-","/")} — {child.prenom}</div>
              <div style={{fontSize:16,fontWeight:900,color:P.eauD,marginTop:4}}>Forfait : {parseFloat(f.forfait).toFixed(2)} €</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{background:f.payee?P.eau:"#F9E8E5",color:f.payee?P.taupeD:"#8B3A2E",borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:700}}>{f.payee?"✅ Payée":"⏳ En attente"}</span>
              <QRPh value={`FAC-${f.mois}-${child.id}`}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function F({label:l,value,onChange,type="text",placeholder=""}){
  return(<div style={{marginBottom:10}}><label style={lbl}>{l}</label><input type={type} style={inp} value={value||""} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/></div>);
}
function G2({children}){return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{children}</div>;}
function Tg({color,bg,children}){return <span style={{background:bg,color,borderRadius:20,padding:"3px 10px",fontWeight:700,fontSize:12}}>{children}</span>;}
function Bloc({color,title,children}){return <div style={{background:color,borderRadius:12,padding:12,marginBottom:12}}><strong style={{fontSize:13,color:P.taupeD}}>{title}</strong><div style={{marginTop:8}}>{children}</div></div>;}
function MonthNav({calMonth,setCalMonth}){
  const l=calMonth.toLocaleDateString("fr-BE",{month:"long",year:"numeric"});
  return(<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
    <button style={btn(P.eauL)} onClick={()=>setCalMonth(m=>new Date(m.getFullYear(),m.getMonth()-1,1))}>‹</button>
    <span style={{fontWeight:700,fontSize:15,textTransform:"capitalize",minWidth:160,textAlign:"center",color:P.taupeD}}>{l}</span>
    <button style={btn(P.eauL)} onClick={()=>setCalMonth(m=>new Date(m.getFullYear(),m.getMonth()+1,1))}>›</button>
  </div>);
}
function buildCalDays(month){
  const y=month.getFullYear(),m=month.getMonth();
  let dow=new Date(y,m,1).getDay();
  if(dow===0)dow=6;else dow--;
  const days=[];
  for(let i=0;i<dow;i++)days.push(null);
  for(let d=1;d<=new Date(y,m+1,0).getDate();d++)days.push(new Date(y,m,d));
  return days;
}

