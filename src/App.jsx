import { useState, useEffect } from "react";

const SUPA_URL = "https://awrzzqpxgafvpvqxcvyx.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3cnp6cXB4Z2FmdnB2cXhjdnl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3OTg0MTcsImV4cCI6MjA5NzM3NDQxN30.C0Eeb5XObDY6uUnaaz_5GDm-t46JXrIbMVzabXUTXCY";

const supa = async (path, opts = {}) => {
  const res = await fetch(`${SUPA_URL}/rest/v1/${path}`, {
    headers: { "apikey": SUPA_KEY, "Authorization": `Bearer ${SUPA_KEY}`, "Content-Type": "application/json", "Prefer": opts.prefer || "return=representation", ...opts.headers },
    ...opts,
  });
  if (!res.ok && res.status !== 204) { const e = await res.json().catch(()=>({})); throw new Error(e.message||res.statusText); }
  if (res.status === 204) return null;
  return res.json();
};

const db = {
  get:    (t,q="")    => supa(`${t}?${q}`, {method:"GET"}),
  post:   (t,b)       => supa(t, {method:"POST", body:JSON.stringify(b)}),
  patch:  (t,q,b)     => supa(`${t}?${q}`, {method:"PATCH", body:JSON.stringify(b), prefer:"return=representation"}),
  delete: (t,q)       => supa(`${t}?${q}`, {method:"DELETE"}),
  upsert: (t,b)       => supa(t, {method:"POST", body:JSON.stringify(b), headers:{"Prefer":"resolution=merge-duplicates,return=representation"}}),
};

const P = {
  eau:"#B2CECA", eauL:"#D4E8E6", eauD:"#7BADA8",
  beige:"#F2EDE4", beigeD:"#E0D5C5",
  taupe:"#9E8E7E", taupeL:"#C4B5A8", taupeD:"#6B5D52",
  creme:"#FAF7F2", white:"#FFFFFF",
  text:"#3D3530", textL:"#7A6E66", border:"#D8CFC4", err:"#C0796A",
};

const btn  = (bg,col=P.text) => ({background:bg,border:"none",borderRadius:12,padding:"10px 20px",cursor:"pointer",fontWeight:700,color:col,fontSize:14,transition:"filter .15s",display:"inline-flex",alignItems:"center",gap:6});
const card = (bg=P.white)    => ({background:bg,borderRadius:20,padding:24,boxShadow:"0 2px 14px rgba(80,60,40,.08)",marginBottom:18});
const inp  = {border:`1.5px solid ${P.border}`,borderRadius:10,padding:"8px 12px",fontSize:14,width:"100%",boxSizing:"border-box",color:P.text,background:P.creme,outline:"none"};
const lbl  = {fontSize:13,fontWeight:600,color:P.textL,marginBottom:4,display:"block"};

const Lapin  = ({size=32,op=.18}) => <svg width={size} height={size} viewBox="0 0 40 40" style={{opacity:op}}><ellipse cx="20" cy="26" rx="10" ry="9" fill={P.taupe}/><ellipse cx="14" cy="13" rx="3.5" ry="7" fill={P.taupe}/><ellipse cx="26" cy="13" rx="3.5" ry="7" fill={P.taupe}/><ellipse cx="20" cy="22" rx="7" ry="6" fill={P.taupeL}/><circle cx="17" cy="21" r="1.2" fill={P.taupeD}/><circle cx="23" cy="21" r="1.2" fill={P.taupeD}/><ellipse cx="20" cy="24" rx="2" ry="1.2" fill={P.taupeD}/></svg>;
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

const JOURS_NOMS = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
const QRPh = ({value}) => <div style={{width:80,height:80,background:P.white,border:`2px solid ${P.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",fontSize:9,color:P.textL,textAlign:"center",padding:4}}><div style={{fontSize:26,color:P.taupe}}>▦</div><div style={{fontSize:8,wordBreak:"break-all"}}>{value}</div></div>;

// ── PIN Input ──────────────────────────────────────────────────────────────
function PinInput({value, onChange, label:l="Code PIN (4 chiffres)"}) {
  return (
    <div style={{marginBottom:10}}>
      <label style={lbl}>{l}</label>
      <input type="password" inputMode="numeric" maxLength={4} style={{...inp,textAlign:"center",letterSpacing:8,fontSize:22}} value={value} onChange={e=>onChange(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="••••"/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [view,setView]             = useState("login");
  const [loginStep,setLoginStep]   = useState("code"); // code | pin | newpin
  const [section,setSection]       = useState("fiches");
  const [pSection,setPSection]     = useState("calendrier");
  const [licenceCode,setLicenceCode] = useState("");
  const [licenceData,setLicenceData] = useState(null);
  const [children,setChildren]     = useState([]);
  const [presences,setPresences]   = useState({});
  const [notes,setNotes]           = useState({});
  const [conges,setConges]         = useState([]);
  const [notesCom,setNotesCom]     = useState([]);
  const [absences,setAbsences]     = useState({});
  const [loginCode,setLoginCode]   = useState("");
  const [loginPin,setLoginPin]     = useState("");
  const [loginPin2,setLoginPin2]   = useState("");
  const [loginErr,setLoginErr]     = useState("");
  const [curParent,setCurParent]   = useState(null);
  const [calMonth,setCalMonth]     = useState(new Date());
  const [loading,setLoading]       = useState(false);
  const [tempLic,setTempLic]       = useState(null);
  const [tempChild,setTempChild]   = useState(null);

  const jourFermeture = licenceData?.jour_fermeture ?? 3;

  const isJourOuvert = (dateStr) => {
    const d = new Date(dateStr).getDay();
    return d !== 0 && d !== 6 && d !== jourFermeture;
  };

  const loadData = async (lcode) => {
    setLoading(true);
    try {
      const enfs = await db.get("enfants",`licence_code=eq.${lcode}&order=nom.asc`);
      const ids = (enfs||[]).map(e=>e.id).join(",") || "0";
      const [pres,nts,cgs,nc,abs] = await Promise.all([
        db.get("presences",`licence_code=eq.${lcode}`),
        db.get("notes",`licence_code=eq.${lcode}`),
        db.get("conges",`licence_code=eq.${lcode}`),
        db.get("notes_communes",`licence_code=eq.${lcode}&order=date.desc`),
        db.get("absences",`enfant_id=in.(${ids})`),
      ]);
      setChildren(enfs||[]);
      const pm={};
      (pres||[]).forEach(p=>{if(!pm[p.date])pm[p.date]={};pm[p.date][p.enfant_id]={arrivee:p.arrivee?.slice(0,5)||"",depart:p.depart?.slice(0,5)||""};});
      setPresences(pm);
      const nm={};
      (nts||[]).forEach(n=>{if(!nm[n.date])nm[n.date]={};nm[n.date][n.enfant_id]={repas:n.repas||"",sieste:n.sieste||"",note:n.note||""};});
      setNotes(nm);
      setConges((cgs||[]).map(c=>c.date));
      setNotesCom(nc||[]);
      const am={};
      (abs||[]).forEach(a=>{if(!am[a.enfant_id])am[a.enfant_id]=[];am[a.enfant_id].push(a.date);});
      setAbsences(am);
    } catch(e){console.error(e);}
    setLoading(false);
  };

  // Step 1: check code
  const handleCodeSubmit = async () => {
    setLoading(true);
    setLoginErr("");
    const code = loginCode.trim().toUpperCase();
    try {
      // Try accueillante
      const lics = await db.get("licences",`code=eq.${code}&active=eq.true`);
      if (lics&&lics.length>0) {
        setTempLic(lics[0]);
        if (!lics[0].pin) { setLoginStep("newpin"); } // first time → set PIN
        else { setLoginStep("pin"); }
        setLoading(false); return;
      }
      // Try parent
      const enfs = await db.get("enfants",`code_parent=eq.${code}`);
      if (enfs&&enfs.length>0) {
        setTempChild(enfs[0]);
        if (!enfs[0].pin) { setLoginStep("newpin"); }
        else { setLoginStep("pin"); }
        setLoading(false); return;
      }
      setLoginErr("Code incorrect ou inactif.");
    } catch(e){setLoginErr("Erreur de connexion.");}
    setLoading(false);
  };

  // Step 2a: first login → set PIN
  const handleSetPin = async () => {
    if (loginPin.length!==4) {setLoginErr("Le PIN doit contenir 4 chiffres.");return;}
    if (loginPin!==loginPin2) {setLoginErr("Les PIN ne correspondent pas.");return;}
    setLoading(true);
    try {
      if (tempLic) {
        await db.patch("licences",`code=eq.${tempLic.code}`,{pin:loginPin});
        const lic={...tempLic,pin:loginPin};
        setLicenceData(lic);
        setLicenceCode(lic.code);
        await loadData(lic.code);
        setView("accueillante");
      } else if (tempChild) {
        await db.patch("enfants",`id=eq.${tempChild.id}`,{pin:loginPin});
        await loginAsParent({...tempChild,pin:loginPin});
      }
      setLoginStep("code");setLoginPin("");setLoginPin2("");setLoginErr("");
    }catch(e){setLoginErr("Erreur: "+e.message);}
    setLoading(false);
  };

  // Step 2b: verify PIN
  const handlePinSubmit = async () => {
    if (loginPin.length!==4){setLoginErr("PIN à 4 chiffres.");return;}
    setLoading(true);
    try {
      if (tempLic) {
        if (loginPin!==tempLic.pin){setLoginErr("PIN incorrect.");setLoading(false);return;}
        setLicenceData(tempLic);
        setLicenceCode(tempLic.code);
        await loadData(tempLic.code);
        setView("accueillante");
      } else if (tempChild) {
        if (loginPin!==tempChild.pin){setLoginErr("PIN incorrect.");setLoading(false);return;}
        await loginAsParent(tempChild);
      }
      setLoginStep("code");setLoginPin("");setLoginErr("");
    }catch(e){setLoginErr("Erreur: "+e.message);}
    setLoading(false);
  };

  const loginAsParent = async (child) => {
    const lcode=child.licence_code;
    const [pres,nts,cgs,nc,abs,lic] = await Promise.all([
      db.get("presences",`enfant_id=eq.${child.id}`),
      db.get("notes",`enfant_id=eq.${child.id}`),
      db.get("conges",`licence_code=eq.${lcode}`),
      db.get("notes_communes",`licence_code=eq.${lcode}&order=date.desc`),
      db.get("absences",`enfant_id=eq.${child.id}`),
      db.get("licences",`code=eq.${lcode}`),
    ]);
    if(lic&&lic[0]) setLicenceData(lic[0]);
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
  };

  const logout = () => {setView("login");setLoginCode("");setLoginPin("");setLoginPin2("");setLoginStep("code");setTempLic(null);setTempChild(null);setCurParent(null);setLicenceData(null);};

  if(view==="login") return <LoginScreen loginStep={loginStep} loginCode={loginCode} setLoginCode={setLoginCode} loginPin={loginPin} setLoginPin={setLoginPin} loginPin2={loginPin2} setLoginPin2={setLoginPin2} loginErr={loginErr} loading={loading} onCodeSubmit={handleCodeSubmit} onPinSubmit={handlePinSubmit} onSetPin={handleSetPin} tempLic={tempLic} tempChild={tempChild} onBack={()=>{setLoginStep("code");setLoginErr("");setLoginPin("");setLoginPin2(""); setTempLic(null);setTempChild(null);}}/>;
  if(view==="parent") return <ParentView child={curParent} notes={notes} conges={conges} notesCom={notesCom} absences={absences} setAbsences={setAbsences} pSection={pSection} setPSection={setPSection} calMonth={calMonth} setCalMonth={setCalMonth} isJourOuvert={isJourOuvert} onLogout={logout}/>;
  return <AccueillanteView section={section} setSection={setSection} children={children} setChildren={setChildren} presences={presences} setPresences={setPresences} notes={notes} setNotes={setNotes} conges={conges} setConges={setConges} notesCom={notesCom} setNotesCom={setNotesCom} absences={absences} calMonth={calMonth} setCalMonth={setCalMonth} licenceCode={licenceCode} licenceData={licenceData} setLicenceData={setLicenceData} loading={loading} isJourOuvert={isJourOuvert} onLogout={logout}/>;
}

// ── Login ──────────────────────────────────────────────────────────────────
function LoginScreen({loginStep,loginCode,setLoginCode,loginPin,setLoginPin,loginPin2,setLoginPin2,loginErr,loading,onCodeSubmit,onPinSubmit,onSetPin,tempLic,tempChild,onBack}){
  const who = tempLic ? `Accueillante · ${tempLic.code}` : tempChild ? `Parent de ${tempChild.prenom} ${tempChild.nom}` : "";
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${P.eauL} 0%,${P.beige} 60%,${P.beigeD} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Segoe UI',sans-serif",position:"relative"}}>
      <BgAnimaux/>
      <div style={{...card(P.white),width:340,textAlign:"center",padding:40,position:"relative",zIndex:1,border:`2px solid ${P.eauL}`}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><NidlyLogo size="large"/></div>
        <p style={{color:P.textL,fontSize:13,marginBottom:24,marginTop:4}}>Votre espace milieu d'accueil</p>

        {loginStep==="code" && <>
          <label style={lbl}>Code d'accès</label>
          <input style={{...inp,textAlign:"center",letterSpacing:2,fontSize:15,marginBottom:8}} placeholder="NID-XX0-2025 ou code enfant" value={loginCode} onChange={e=>setLoginCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&onCodeSubmit()}/>
          {loginErr&&<p style={{color:P.err,fontSize:13,margin:"4px 0 8px"}}>{loginErr}</p>}
          <button style={{...btn(P.eauD,P.white),width:"100%",justifyContent:"center",marginTop:8,fontSize:15,opacity:loading?.6:1}} onClick={onCodeSubmit} disabled={loading}>{loading?"Vérification...":"Continuer →"}</button>
        </>}

        {loginStep==="pin" && <>
          <div style={{background:P.eauL,borderRadius:10,padding:"8px 12px",fontSize:12,color:P.taupeD,marginBottom:16}}>{who}</div>
          <PinInput label="Votre PIN (4 chiffres)" value={loginPin} onChange={setLoginPin}/>
          {loginErr&&<p style={{color:P.err,fontSize:13,margin:"4px 0 8px"}}>{loginErr}</p>}
          <button style={{...btn(P.eauD,P.white),width:"100%",justifyContent:"center",marginTop:8,fontSize:15,opacity:loading?.6:1}} onClick={onPinSubmit} disabled={loading}>{loading?"Vérification...":"Connexion →"}</button>
          <button style={{...btn(P.beige),width:"100%",justifyContent:"center",marginTop:8,fontSize:13}} onClick={onBack}>← Retour</button>
        </>}

        {loginStep==="newpin" && <>
          <div style={{background:P.eauL,borderRadius:10,padding:"8px 12px",fontSize:12,color:P.taupeD,marginBottom:8}}>{who}</div>
          <div style={{background:P.beige,borderRadius:10,padding:"10px",fontSize:12,color:P.textL,marginBottom:16}}>
            🎉 Première connexion ! Choisissez votre PIN personnel.
          </div>
          <PinInput label="Choisir un PIN (4 chiffres)" value={loginPin} onChange={setLoginPin}/>
          <PinInput label="Confirmer le PIN" value={loginPin2} onChange={setLoginPin2}/>
          {loginErr&&<p style={{color:P.err,fontSize:13,margin:"4px 0 8px"}}>{loginErr}</p>}
          <button style={{...btn(P.eauD,P.white),width:"100%",justifyContent:"center",marginTop:8,fontSize:15,opacity:loading?.6:1}} onClick={onSetPin} disabled={loading}>{loading?"Enregistrement...":"Créer mon PIN →"}</button>
          <button style={{...btn(P.beige),width:"100%",justifyContent:"center",marginTop:8,fontSize:13}} onClick={onBack}>← Retour</button>
        </>}
      </div>
    </div>
  );
}

// ── Accueillante ───────────────────────────────────────────────────────────
function AccueillanteView({section,setSection,children,setChildren,presences,setPresences,notes,setNotes,conges,setConges,notesCom,setNotesCom,absences,calMonth,setCalMonth,licenceCode,licenceData,setLicenceData,loading,isJourOuvert,onLogout}){
  const nav=[
    {key:"fiches",icon:"📋",label:"Fiches"},
    {key:"presences",icon:"📅",label:"Présences"},
    {key:"facturation",icon:"💶",label:"Facturation"},
    {key:"export",icon:"📊",label:"Export"},
    {key:"calendrier",icon:"🗓️",label:"Calendrier"},
    {key:"notesjour",icon:"📝",label:"Notes"},
    {key:"notescom",icon:"📢",label:"Commun"},
    {key:"parametres",icon:"⚙️",label:"Paramètres"},
  ];
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${P.eauL} 0%,${P.creme} 100%)`,fontFamily:"'Segoe UI',sans-serif",position:"relative"}}>
      <BgAnimaux/>
      <div style={{background:P.white,boxShadow:"0 2px 8px rgba(80,60,40,.10)",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:2}}>
        <NidlyLogo size="small"/>
        <div style={{fontSize:11,color:P.textL,fontWeight:600}}>Accueillante · <code style={{background:P.beige,padding:"2px 6px",borderRadius:6}}>{licenceCode}</code></div>
        <button style={{...btn(P.beigeD),fontSize:13}} onClick={onLogout}>Déconnexion</button>
      </div>
      <div style={{display:"flex",gap:6,padding:"12px 24px",flexWrap:"wrap",position:"relative",zIndex:2}}>
        {nav.map(n=><button key={n.key} style={{...btn(section===n.key?P.eauD:P.white,section===n.key?P.white:P.text),border:`1.5px solid ${section===n.key?P.eauD:P.border}`,fontSize:13,padding:"8px 14px"}} onClick={()=>setSection(n.key)}>{n.icon} {n.label}</button>)}
      </div>
      {loading&&<div style={{textAlign:"center",padding:20,color:P.textL}}>⏳ Chargement...</div>}
      <div style={{padding:"0 24px 40px",position:"relative",zIndex:2}}>
        {section==="fiches"      && <FichesSection children={children} setChildren={setChildren} licenceCode={licenceCode}/>}
        {section==="presences"   && <PresencesSection children={children} presences={presences} setPresences={setPresences} calMonth={calMonth} setCalMonth={setCalMonth} licenceCode={licenceCode} isJourOuvert={isJourOuvert} conges={conges}/>}
        {section==="facturation" && <FacturationSection children={children}/>}
        {section==="export"      && <ExportSection children={children} presences={presences}/>}
        {section==="calendrier"  && <CalendrierSection conges={conges} setConges={setConges} calMonth={calMonth} setCalMonth={setCalMonth} absences={{}} isAccueillante licenceCode={licenceCode} isJourOuvert={isJourOuvert}/>}
        {section==="notesjour"   && <NotesDuJourSection children={children} notes={notes} setNotes={setNotes} isAccueillante licenceCode={licenceCode}/>}
        {section==="notescom"    && <NotesCommunesSection notesCom={notesCom} setNotesCom={setNotesCom} isAccueillante licenceCode={licenceCode}/>}
        {section==="parametres"  && <ParametresSection licenceData={licenceData} setLicenceData={setLicenceData} licenceCode={licenceCode}/>}
      </div>
    </div>
  );
}

// ── Paramètres ─────────────────────────────────────────────────────────────
function ParametresSection({licenceData,setLicenceData,licenceCode}){
  const [jour,setJour]   = useState(licenceData?.jour_fermeture??3);
  const [saved,setSaved] = useState(false);

  const save = async () => {
    await db.patch("licences",`code=eq.${licenceCode}`,{jour_fermeture:Number(jour)});
    setLicenceData(prev=>({...prev,jour_fermeture:Number(jour)}));
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  return(
    <div>
      <h2 style={{color:P.taupeD}}>⚙️ Paramètres</h2>
      <div style={{...card(P.white),maxWidth:400,border:`2px solid ${P.eauL}`}}>
        <h3 style={{margin:"0 0 16px",color:P.taupeD}}>Jour de fermeture hebdomadaire</h3>
        <p style={{fontSize:13,color:P.textL,marginBottom:16}}>Ce jour sera automatiquement grisé dans les présences et le calendrier.</p>
        <label style={lbl}>Jour fermé chaque semaine</label>
        <select style={{...inp,marginBottom:16}} value={jour} onChange={e=>setJour(e.target.value)}>
          <option value={1}>Lundi</option>
          <option value={2}>Mardi</option>
          <option value={3}>Mercredi</option>
          <option value={4}>Jeudi</option>
          <option value={5}>Vendredi</option>
          <option value={9}>Aucun jour fixe fermé</option>
        </select>
        <div style={{background:P.beige,borderRadius:10,padding:"10px 14px",fontSize:12,color:P.textL,marginBottom:16}}>
          ℹ️ Le samedi et dimanche sont toujours fermés.<br/>
          Les congés exceptionnels se gèrent dans le Calendrier.
        </div>
        <button style={{...btn(P.eauD,P.white),width:"100%",justifyContent:"center"}} onClick={save}>💾 Enregistrer</button>
        {saved&&<div style={{marginTop:8,background:P.eau,borderRadius:8,padding:"8px 12px",fontSize:13,textAlign:"center"}}>✅ Sauvegardé !</div>}
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
  const del=async(c)=>{if(!window.confirm(`Supprimer ${c.prenom} ${c.nom} ?`))return;await db.delete("enfants",`id=eq.${c.id}`);setChildren(prev=>prev.filter(x=>x.id!==c.id));};

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
          <div style={{fontSize:12,color:P.textL,marginTop:8}}>Les parents choisiront leur PIN à la première connexion.</div>
          <button style={{...btn(P.eauD,P.white),marginTop:12}} onClick={()=>setShowCode(null)}>✓ Compris</button>
        </div>
      )}

      {children.length===0&&<div style={{...card(P.beige),textAlign:"center",color:P.textL}}>Aucun enfant. Cliquez sur "+ Nouvel enfant".</div>}

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
        <div style={{position:"fixed",inset:0,background:"rgba(60,45,35,.45)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{...card(P.white),width:"100%",maxWidth:620,maxHeight:"90vh",overflowY:"auto"}}>
            <h3 style={{margin:"0 0 16px",color:P.taupeD}}>{selected?"Modifier":"Nouvelle fiche"} enfant</h3>
            <Bloc color={P.eauL} title="👶 Enfant">
              <G2><F label="Nom" value={form.nom} onChange={v=>sf("nom",v)}/><F label="Prénom" value={form.prenom} onChange={v=>sf("prenom",v)}/></G2>
              <F label="Adresse" value={form.adresse} onChange={v=>sf("adresse",v)}/>
              <F label="N° registre national" value={form.registre} onChange={v=>sf("registre",v)} placeholder="90.04.15-123.45"/>
              <F label="Allergies / Intolérances" value={form.allergies} onChange={v=>sf("allergies",v)}/>
              <G2><F label="Nb jours/semaine" type="number" value={form.nb_jours} onChange={v=>sf("nb_jours",v)}/><F label="Forfait mensuel (€)" type="number" value={form.forfait_mensuel} onChange={v=>sf("forfait_mensuel",v)}/></G2>
              <G2><F label="Date d'entrée" type="date" value={form.date_entree} onChange={v=>sf("date_entree",v)}/><F label="Date de sortie" type="date" value={form.date_sortie} onChange={v=>sf("date_sortie",v)}/></G2>
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
            {!selected&&<div style={{background:P.eauL,borderRadius:10,padding:"10px 14px",fontSize:12,color:P.taupeD,marginBottom:12}}>🔑 Code généré automatiquement. Les parents choisiront leur PIN à la 1ère connexion.</div>}
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
function PresencesSection({children,presences,setPresences,calMonth,setCalMonth,licenceCode,isJourOuvert,conges}){
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
        if(p&&(p.arrivee||p.depart)) await db.upsert("presences",{licence_code:licenceCode,enfant_id:child.id,date:selDate,arrivee:p.arrivee||null,depart:p.depart||null});
      }
      setPresences(prev=>({...prev,[selDate]:editP}));
      setSelDate(null);
    }catch(e){alert("Erreur: "+e.message);}
    setSaving(false);
  };

  return(
    <div>
      <h2 style={{color:P.taupeD}}>📅 Présences</h2>
      <MonthNav calMonth={calMonth} setCalMonth={setCalMonth}/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8,fontSize:11}}>
        <Tg color={P.eauD} bg={P.eau}>✓ Présences</Tg>
        <Tg color="#8B3A2E" bg="#F9E8E5">Fermé</Tg>
        <Tg color={P.textL} bg="#f0ece7">Week-end</Tg>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
        {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:700,color:P.textL,padding:4}}>{d}</div>)}
        {days.map((d,i)=>{
          if(!d)return <div key={i}/>;
          const key=d.toISOString().slice(0,10);
          const ouvert=isJourOuvert(key)&&!conges.includes(key);
          const weekend=new Date(key).getDay()===0||new Date(key).getDay()===6;
          const hasP=presences[key]&&Object.keys(presences[key]).length>0;
          return(
            <div key={key} onClick={()=>ouvert&&openDay(key)} style={{background:weekend?"#f0ece7":!ouvert?"#F9E8E5":hasP?P.eau:P.white,border:`1.5px solid ${hasP?P.eauD:!ouvert?"#C0796A":P.border}`,borderRadius:10,padding:"8px 4px",textAlign:"center",cursor:ouvert?"pointer":"default",minHeight:52}}>
              <div style={{fontSize:13,fontWeight:700,color:ouvert?P.text:"#c5bdb5"}}>{d.getDate()}</div>
              {hasP&&<div style={{fontSize:9,color:P.eauD}}>✓{Object.keys(presences[key]).length}</div>}
              {!ouvert&&!weekend&&<div style={{fontSize:8,color:"#C0796A"}}>Fermé</div>}
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
function FacturationSection({children}){
  const [selChild,setSelChild]=useState(null);
  const [sent,setSent]=useState(false);
  useEffect(()=>{if(children.length&&!selChild)setSelChild(children[0]);},[children]);

  // Facture anticipée : émise le 15 du mois courant pour le mois SUIVANT
  const now = new Date();
  const moisFacture = new Date(now.getFullYear(), now.getMonth()+1, 1);
  const moisLabel = moisFacture.toLocaleDateString("fr-BE",{month:"long",year:"numeric"});
  const moisStr = moisFacture.toISOString().slice(0,7);
  const dateEmission = new Date(now.getFullYear(), now.getMonth(), 15).toLocaleDateString("fr-BE");
  const dateEcheance = new Date(now.getFullYear(), now.getMonth()+1, 1).toLocaleDateString("fr-BE");

  const forfait = parseFloat(selChild?.forfait_mensuel||0).toFixed(2);
  const facNum = `FAC-${moisStr}-${selChild?.id||0}`;

  return(
    <div>
      <h2 style={{color:P.taupeD}}>💶 Facturation anticipée</h2>

      <div style={{...card(P.eauL),maxWidth:520,border:`1.5px solid ${P.eauD}`,marginBottom:20}}>
        <div style={{fontSize:13,color:P.taupeD}}>
          ℹ️ Les factures sont <strong>anticipées</strong> : émises le <strong>15 du mois</strong> pour le mois suivant, à payer avant le <strong>1er du mois concerné</strong>.
        </div>
      </div>

      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <div><label style={lbl}>Enfant</label>
          <select style={{...inp,width:"auto"}} value={selChild?.id||""} onChange={e=>setSelChild(children.find(c=>c.id===Number(e.target.value)))}>
            {children.map(c=><option key={c.id} value={c.id}>{c.prenom} {c.nom}</option>)}
          </select>
        </div>
      </div>

      {selChild&&(
        <div style={{...card(P.white),maxWidth:520,border:`2px solid ${P.eauL}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <NidlyLogo size="small"/>
            <QRPh value={facNum}/>
          </div>
          <hr style={{border:"none",borderTop:`2px dashed ${P.border}`,margin:"16px 0"}}/>

          <div style={{fontWeight:800,fontSize:18,marginBottom:4,color:P.taupeD}}>FACTURE {facNum}</div>

          {/* Destinataire */}
          <div style={{background:P.beige,borderRadius:10,padding:12,marginBottom:12,fontSize:13}}>
            <div style={{fontWeight:700,color:P.text,marginBottom:4}}>👶 {selChild.prenom} {selChild.nom}</div>
            <div style={{color:P.textL}}>👨 {selChild.pere_nom||"—"} · 📧 {selChild.pere_email||"—"}</div>
            <div style={{color:P.textL}}>👩 {selChild.mere_nom||"—"} · 📧 {selChild.mere_email||"—"}</div>
          </div>

          {/* Dates */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <div style={{background:P.creme,borderRadius:8,padding:"8px 12px",fontSize:12}}>
              <div style={{color:P.textL}}>Date d'émission</div>
              <div style={{fontWeight:700,color:P.text}}>{dateEmission}</div>
            </div>
            <div style={{background:P.creme,borderRadius:8,padding:"8px 12px",fontSize:12}}>
              <div style={{color:P.textL}}>Date d'échéance</div>
              <div style={{fontWeight:700,color:P.err}}>{dateEcheance}</div>
            </div>
          </div>

          {/* Forfait */}
          <div style={{background:P.eauL,borderRadius:12,padding:16,marginBottom:12,textAlign:"center"}}>
            <div style={{fontSize:13,color:P.taupeD,marginBottom:4,textTransform:"capitalize"}}>Forfait mensuel — {moisLabel}</div>
            <div style={{fontSize:32,fontWeight:900,color:P.taupeD}}>{forfait} €</div>
            <div style={{fontSize:11,color:P.textL,marginTop:4}}>Forfait tout inclus · Pas de supplément</div>
          </div>

          {/* Total */}
          <div style={{background:P.beige,borderRadius:10,padding:12,marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:18,fontWeight:900}}>
              <span>TOTAL À PAYER</span>
              <span style={{color:P.eauD}}>{forfait} €</span>
            </div>
            <div style={{fontSize:11,color:P.textL,marginTop:4}}>À virer avant le {dateEcheance}</div>
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
    const jours=Object.entries(presences).filter(([d])=>d.startsWith(annee)&&presences[d][child.id]).length;
    const mois=new Set(Object.entries(presences).filter(([d])=>d.startsWith(annee)&&presences[d][child.id]).map(([d])=>d.slice(0,7))).size;
    return {jours,mois,total:(mois*parseFloat(child.forfait_mensuel||0)).toFixed(2)};
  };
  const exportCSV=()=>{
    const rows=[["Prénom","Nom","Jours présence","Mois facturés","Forfait/mois (€)","Total annuel (€)"]];
    children.forEach(c=>{const s=getStats(c);rows.push([c.prenom,c.nom,s.jours,s.mois,c.forfait_mensuel||0,s.total]);});
    const csv=rows.map(r=>r.join(";")).join("\n");
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"}));
    a.download=`Nidly_Export_${annee}.csv`;a.click();
  };
  return(
    <div>
      <h2 style={{color:P.taupeD}}>📊 Export annuel</h2>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <div><label style={lbl}>Année</label><select style={{...inp,width:"auto"}} value={annee} onChange={e=>setAnnee(e.target.value)}>{["2024","2025","2026","2027"].map(y=><option key={y} value={y}>{y}</option>)}</select></div>
        <button style={{...btn(P.eauD,P.white),marginTop:20}} onClick={exportCSV}>⬇️ Exporter CSV</button>
      </div>
      <div style={{...card(P.white),border:`2px solid ${P.eauL}`}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{background:P.eauL}}>{["Enfant","Jours","Mois facturés","Forfait/mois","Total annuel"].map(h=><th key={h} style={{padding:"8px 12px",textAlign:"left",fontWeight:700,color:P.taupeD}}>{h}</th>)}</tr></thead>
          <tbody>
            {children.map((c,i)=>{const s=getStats(c);return(<tr key={c.id} style={{background:i%2?P.creme:P.white}}><td style={{padding:"8px 12px",fontWeight:700}}>{c.prenom} {c.nom}</td><td style={{padding:"8px 12px",textAlign:"center"}}>{s.jours}</td><td style={{padding:"8px 12px",textAlign:"center"}}>{s.mois}</td><td style={{padding:"8px 12px",textAlign:"right"}}>{parseFloat(c.forfait_mensuel||0).toFixed(2)} €</td><td style={{padding:"8px 12px",textAlign:"right",fontWeight:900,color:P.eauD}}>{s.total} €</td></tr>);})}
            {children.length>0&&<tr style={{background:P.beige,fontWeight:900}}><td style={{padding:"8px 12px"}}>TOTAL</td><td style={{padding:"8px 12px",textAlign:"center"}}>{children.reduce((a,c)=>a+getStats(c).jours,0)}</td><td/><td/><td style={{padding:"8px 12px",textAlign:"right",color:P.eauD}}>{children.reduce((a,c)=>a+parseFloat(getStats(c).total),0).toFixed(2)} €</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Calendrier ─────────────────────────────────────────────────────────────
function CalendrierSection({conges,setConges,calMonth,setCalMonth,absences,setAbsences,isAccueillante,childId,licenceCode,isJourOuvert}){
  const days=buildCalDays(calMonth);
  const toggleConge=async(key)=>{
    if(conges.includes(key)){await db.delete("conges",`licence_code=eq.${licenceCode}&date=eq.${key}`);setConges(prev=>prev.filter(d=>d!==key));}
    else{await db.post("conges",{licence_code:licenceCode,date:key});setConges(prev=>[...prev,key]);}
  };
  const toggleAbsence=async(key)=>{
    const cur=absences?.[childId]||[];
    if(cur.includes(key)){await db.delete("absences",`enfant_id=eq.${childId}&date=eq.${key}`);setAbsences(prev=>({...prev,[childId]:cur.filter(d=>d!==key)}));}
    else{await db.post("absences",{enfant_id:childId,date:key});setAbsences(prev=>({...prev,[childId]:[...cur,key]}));}
  };
  const childAbs=absences?.[childId]||[];
  return(
    <div>
      <h2 style={{color:P.taupeD}}>🗓️ Calendrier {isAccueillante?"— Congés & Fermetures":"— Planification"}</h2>
      <MonthNav calMonth={calMonth} setCalMonth={setCalMonth}/>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:12,marginBottom:8,fontSize:12}}>
        <Tg color="#8B3A2E" bg="#F9E8E5">🔴 Fermé / Congé</Tg>
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
          const ouvert=isJourOuvert(key);
          const weekend=new Date(key).getDay()===0||new Date(key).getDay()===6;
          return(
            <div key={key} onClick={()=>isAccueillante?(ouvert&&toggleConge(key)):(!isCong&&ouvert&&toggleAbsence(key))} style={{background:isCong?"#F9E8E5":isAbs?P.eauL:ouvert?P.white:"#f0ece7",border:`1.5px solid ${isCong?"#C0796A":isAbs?P.eauD:P.border}`,borderRadius:10,padding:"8px 4px",textAlign:"center",cursor:(isAccueillante&&ouvert)||(!isAccueillante&&ouvert)?"pointer":"default",minHeight:44}}>
              <div style={{fontSize:13,fontWeight:700,color:ouvert?P.text:"#c5bdb5"}}>{d.getDate()}</div>
              {isCong&&<div style={{fontSize:9,color:"#8B3A2E"}}>Fermé</div>}
              {isAbs&&<div style={{fontSize:9,color:P.eauD}}>Absent</div>}
              {!ouvert&&!weekend&&!isCong&&<div style={{fontSize:8,color:"#c5bdb5"}}>Fermé</div>}
            </div>
          );
        })}
      </div>
      {isAccueillante&&<p style={{fontSize:12,color:P.textL,marginTop:8}}>💡 Cliquez sur un jour ouvert pour marquer un congé exceptionnel.</p>}
      {!isAccueillante&&<p style={{fontSize:12,color:P.textL,marginTop:8}}>💡 Cliquez pour signaler une absence.</p>}
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
      for(const c of show){const n=editN[c.id];if(n)await db.upsert("notes",{licence_code:licenceCode,enfant_id:c.id,date:selDate,...n});}
      setNotes(prev=>({...prev,[selDate]:editN}));setEditing(false);
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
            {editing?(<><F label="🍽️ Repas" value={n.repas||""} onChange={v=>setEditN(e=>({...e,[c.id]:{...e[c.id],repas:v}}))}/><F label="😴 Sieste" value={n.sieste||""} onChange={v=>setEditN(e=>({...e,[c.id]:{...e[c.id],sieste:v}}))}/><div style={{marginTop:6}}><label style={lbl}>📓 Note</label><textarea rows={3} style={{...inp,resize:"vertical"}} value={n.note||""} onChange={e=>setEditN(p=>({...p,[c.id]:{...p[c.id],note:e.target.value}}))}/></div></>
            ):(<>{n.repas&&<p style={{margin:"4px 0",fontSize:14}}>🍽️ <strong>Repas :</strong> {n.repas}</p>}{n.sieste&&<p style={{margin:"4px 0",fontSize:14}}>😴 <strong>Sieste :</strong> {n.sieste}</p>}{n.note&&<p style={{margin:"8px 0 0",fontSize:14}}>📓 {n.note}</p>}{!n.repas&&!n.sieste&&!n.note&&<p style={{color:P.textL,fontSize:13}}>Aucune note.</p>}</>)}
          </div>
        );
      })}
      {editing&&<div style={{display:"flex",gap:10}}><button style={{...btn(P.eauD,P.white),flex:1,justifyContent:"center",opacity:saving?.6:1}} onClick={saveEdit} disabled={saving}>{saving?"...":"💾 Enregistrer"}</button><button style={{...btn(P.beigeD),flex:1,justifyContent:"center"}} onClick={()=>setEditing(false)}>Annuler</button></div>}
    </div>
  );
}

// ── Notes communes ─────────────────────────────────────────────────────────
function NotesCommunesSection({notesCom,setNotesCom,isAccueillante,licenceCode}){
  const [texte,setTexte]=useState("");
  const [saving,setSaving]=useState(false);
  const add=async()=>{
    if(!texte.trim())return;setSaving(true);
    try{const date=new Date().toISOString().slice(0,10);await db.post("notes_communes",{licence_code:licenceCode,date,texte});setNotesCom(prev=>[{date,texte},...prev]);setTexte("");}
    catch(e){alert("Erreur: "+e.message);}
    setSaving(false);
  };
  return(
    <div>
      <h2 style={{color:P.taupeD}}>📢 Notes communes</h2>
      {isAccueillante&&<div style={{...card(P.eauL),marginBottom:20}}><label style={lbl}>Nouvelle note pour tous les parents</label><textarea rows={3} style={{...inp,resize:"vertical",marginBottom:10}} value={texte} onChange={e=>setTexte(e.target.value)} placeholder="Information, rappel…"/><button style={{...btn(P.eauD,P.white),opacity:saving?.6:1}} onClick={add} disabled={saving}>{saving?"...":"📢 Publier"}</button></div>}
      {notesCom.length===0&&<div style={{...card(P.beige),textAlign:"center",color:P.textL}}>Aucune note commune.</div>}
      {notesCom.map((n,i)=><div key={i} style={{...card(P.white),border:`1.5px solid ${P.eauL}`}}><div style={{fontSize:11,color:P.textL,marginBottom:4}}>📅 {new Date(n.date).toLocaleDateString("fr-BE")}</div><p style={{margin:0,fontSize:14}}>{n.texte}</p></div>)}
    </div>
  );
}

// ── Parent View ────────────────────────────────────────────────────────────
function ParentView({child,notes,conges,notesCom,absences,setAbsences,pSection,setPSection,calMonth,setCalMonth,isJourOuvert,onLogout}){
  const nav=[{key:"calendrier",icon:"🗓️",label:"Calendrier"},{key:"notesjour",icon:"📝",label:"Notes"},{key:"notescom",icon:"📢",label:"Commun"},{key:"factures",icon:"💶",label:"Factures"}];
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
        {pSection==="calendrier"&&<CalendrierSection conges={conges} setConges={()=>{}} calMonth={calMonth} setCalMonth={setCalMonth} absences={absences} setAbsences={setAbsences} isAccueillante={false} childId={child.id} isJourOuvert={isJourOuvert}/>}
        {pSection==="notesjour" &&<NotesDuJourSection children={[child]} notes={notes} setNotes={()=>{}} isAccueillante={false} childFilter={child.id}/>}
        {pSection==="notescom"  &&<NotesCommunesSection notesCom={notesCom} setNotesCom={()=>{}} isAccueillante={false}/>}
        {pSection==="factures"  &&<ParentFactures child={child}/>}
      </div>
    </div>
  );
}

function ParentFactures({child}){
  return(
    <div>
      <h2 style={{color:P.taupeD}}>💶 Mes factures</h2>
      <div style={{...card(P.white),border:`1.5px solid ${P.border}`}}>
        <div style={{fontWeight:700,color:P.text,fontSize:15}}>{child.prenom} {child.nom}</div>
        <div style={{fontSize:16,fontWeight:900,color:P.eauD,marginTop:4}}>Forfait mensuel : {parseFloat(child.forfait_mensuel||0).toFixed(2)} €</div>
        <div style={{fontSize:12,color:P.textL,marginTop:8}}>Les factures vous sont envoyées par mail le 15 de chaque mois.</div>
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function F({label:l,value,onChange,type="text",placeholder=""}){return(<div style={{marginBottom:10}}><label style={lbl}>{l}</label><input type={type} style={inp} value={value||""} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/></div>);}
function G2({children}){return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{children}</div>;}
function Tg({color,bg,children}){return <span style={{background:bg,color,borderRadius:20,padding:"3px 10px",fontWeight:700,fontSize:12}}>{children}</span>;}
function Bloc({color,title,children}){return <div style={{background:color,borderRadius:12,padding:12,marginBottom:12}}><strong style={{fontSize:13,color:P.taupeD}}>{title}</strong><div style={{marginTop:8}}>{children}</div></div>;}
function MonthNav({calMonth,setCalMonth}){const l=calMonth.toLocaleDateString("fr-BE",{month:"long",year:"numeric"});return(<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}><button style={btn(P.eauL)} onClick={()=>setCalMonth(m=>new Date(m.getFullYear(),m.getMonth()-1,1))}>‹</button><span style={{fontWeight:700,fontSize:15,textTransform:"capitalize",minWidth:160,textAlign:"center",color:P.taupeD}}>{l}</span><button style={btn(P.eauL)} onClick={()=>setCalMonth(m=>new Date(m.getFullYear(),m.getMonth()+1,1))}>›</button></div>);}
function buildCalDays(month){const y=month.getFullYear(),m=month.getMonth();let dow=new Date(y,m,1).getDay();if(dow===0)dow=6;else dow--;const days=[];for(let i=0;i<dow;i++)days.push(null);for(let d=1;d<=new Date(y,m+1,0).getDate();d++)days.push(new Date(y,m,d));return days;}
