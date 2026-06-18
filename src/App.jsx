import { useState } from "react";

// ── palette ────────────────────────────────────────────────────────────────
const P = {
  eau:     "#B2CECA",   // vert d'eau principal
  eauL:    "#D4E8E6",   // vert d'eau clair
  eauD:    "#7BADA8",   // vert d'eau foncé
  beige:   "#F2EDE4",   // beige chaud
  beigeD:  "#E0D5C5",   // beige foncé
  taupe:   "#9E8E7E",   // taupe animaux
  taupeL:  "#C4B5A8",   // taupe clair
  taupeD:  "#6B5D52",   // taupe foncé
  sage:    "#C8D5B9",   // vert sauge accent
  sageD:   "#A8BA94",   // vert sauge foncé
  creme:   "#FAF7F2",   // crème fond
  white:   "#FFFFFF",
  text:    "#3D3530",   // brun très foncé
  textL:   "#7A6E66",   // brun moyen
  border:  "#D8CFC4",
  err:     "#C0796A",
};

const btn = (bg) => ({
  background: bg, border: "none", borderRadius: 12, padding: "10px 20px",
  cursor: "pointer", fontWeight: 700, color: P.text, fontSize: 14,
  transition: "filter .15s", display: "inline-flex", alignItems: "center", gap: 6,
});

const card = (bg = P.white) => ({
  background: bg, borderRadius: 20, padding: 24,
  boxShadow: "0 2px 14px rgba(80,60,40,.08)", marginBottom: 18,
});

const inp = {
  border: `1.5px solid ${P.border}`, borderRadius: 10, padding: "8px 12px",
  fontSize: 14, width: "100%", boxSizing: "border-box", color: P.text,
  background: P.creme, outline: "none",
};

const lbl = { fontSize: 13, fontWeight: 600, color: P.textL, marginBottom: 4, display: "block" };

// ── Petits animaux SVG en formes taupe ────────────────────────────────────
const Lapin = ({ size = 32, op = 0.18 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity: op }}>
    <ellipse cx="20" cy="26" rx="10" ry="9" fill={P.taupe} />
    <ellipse cx="14" cy="13" rx="3.5" ry="7" fill={P.taupe} />
    <ellipse cx="26" cy="13" rx="3.5" ry="7" fill={P.taupe} />
    <ellipse cx="20" cy="22" rx="7" ry="6" fill={P.taupeL} />
    <circle cx="17" cy="21" r="1.2" fill={P.taupeD} />
    <circle cx="23" cy="21" r="1.2" fill={P.taupeD} />
    <ellipse cx="20" cy="24" rx="2" ry="1.2" fill={P.taupeD} />
  </svg>
);

const Ourson = ({ size = 32, op = 0.18 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity: op }}>
    <ellipse cx="20" cy="26" rx="11" ry="9" fill={P.taupe} />
    <circle cx="20" cy="18" r="8" fill={P.taupe} />
    <circle cx="12" cy="12" r="4.5" fill={P.taupe} />
    <circle cx="28" cy="12" r="4.5" fill={P.taupe} />
    <ellipse cx="20" cy="20" rx="5" ry="4" fill={P.taupeL} />
    <circle cx="17" cy="17" r="1.3" fill={P.taupeD} />
    <circle cx="23" cy="17" r="1.3" fill={P.taupeD} />
    <ellipse cx="20" cy="20" rx="1.5" ry="1" fill={P.taupeD} />
  </svg>
);

const Canard = ({ size = 32, op = 0.18 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity: op }}>
    <ellipse cx="20" cy="27" rx="12" ry="8" fill={P.taupe} />
    <circle cx="24" cy="16" r="7" fill={P.taupe} />
    <ellipse cx="32" cy="17" rx="4" ry="2.5" fill={P.taupeD} />
    <circle cx="26" cy="14" r="1.3" fill={P.taupeD} />
    <path d="M8 28 Q4 24 8 22 Q12 20 14 24" fill={P.taupeL} />
  </svg>
);

// ── Décoration de fond ─────────────────────────────────────────────────────
const BgAnimaux = () => (
  <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
    <div style={{ position:"absolute", top:40,  left:20  }}><Lapin  size={64} op={0.12} /></div>
    <div style={{ position:"absolute", top:120, right:40 }}><Ourson size={56} op={0.10} /></div>
    <div style={{ position:"absolute", bottom:80, left:60 }}><Canard size={72} op={0.11} /></div>
    <div style={{ position:"absolute", bottom:40, right:80 }}><Lapin  size={48} op={0.09} /></div>
    <div style={{ position:"absolute", top:"45%", left:"45%" }}><Ourson size={40} op={0.07} /></div>
  </div>
);

// ── Logo Nidly ─────────────────────────────────────────────────────────────
const NidlyLogo = ({ size = "large" }) => (
  <div style={{ display:"flex", alignItems:"center", gap: size==="large"?12:8 }}>
    <svg width={size==="large"?48:32} height={size==="large"?48:32} viewBox="0 0 48 48">
      <ellipse cx="24" cy="34" rx="18" ry="10" fill={P.eauD} />
      <ellipse cx="24" cy="30" rx="14" ry="8" fill={P.eau} />
      <circle cx="18" cy="22" r="5" fill={P.taupe} />
      <circle cx="30" cy="22" r="5" fill={P.taupe} />
      <circle cx="24" cy="20" r="6" fill={P.taupeL} />
      <ellipse cx="24" cy="26" rx="9" ry="6" fill={P.eauL} />
    </svg>
    <div>
      <div style={{ fontWeight:900, fontSize: size==="large"?26:18, color:P.taupeD, letterSpacing:-0.5 }}>Nidly</div>
      {size==="large" && <div style={{ fontSize:12, color:P.textL, fontWeight:500 }}>Milieu d'accueil</div>}
    </div>
  </div>
);

// ── demo data ──────────────────────────────────────────────────────────────
const INIT_CHILDREN = [
  { id:1, nom:"Dupont", prenom:"Emma", adresse:"Rue des Lilas 12, 1000 Bruxelles", registre:"90.04.15-123.45", allergies:"Arachides, lait de vache", nbJours:4, dateEntree:"2024-09-01", dateSortie:"2026-06-30", parents:[{nom:"Dupont Marie", adresse:"idem", registre:"68.03.22-456.78"}], reprendre:["Dupont Marie","Dupont Paul (père)"], code:"EMMA01" },
  { id:2, nom:"Martin", prenom:"Lucas", adresse:"Avenue des Roses 5, 1050 Ixelles", registre:"91.11.03-234.56", allergies:"Aucune", nbJours:5, dateEntree:"2025-01-06", dateSortie:"2027-06-30", parents:[{nom:"Martin Sophie", adresse:"idem", registre:"72.07.14-567.89"}], reprendre:["Martin Sophie","Martin Jean (père)","Dubois Claire (grand-mère)"], code:"LUCA02" },
];
const INIT_PRESENCES = {
  "2025-06-02":{ 1:{arrivee:"07:30",depart:"17:00"}, 2:{arrivee:"08:00",depart:"17:30"} },
  "2025-06-03":{ 1:{arrivee:"07:45",depart:"16:30"} },
  "2025-06-05":{ 2:{arrivee:"08:15",depart:"17:00"} },
};
const INIT_NOTES = {
  "2025-06-02":{ 1:{repas:"Purée carottes + poulet, très bon appétit",sieste:"12h30–14h15",note:"Super journée ! Emma a adoré les bulles de savon 🫧"}, 2:{repas:"A goûté le fromage pour la 1ère fois !",sieste:"13h00–14h30",note:"Lucas a fait ses premiers pas tout seul 🎉"} },
};
const INIT_CONGES = ["2025-07-21","2025-08-01","2025-08-02","2025-12-25","2026-01-01"];
const INIT_NOTES_COMMUNES = [
  {date:"2025-06-02", texte:"Sortie au parc prévue vendredi ! Prévoir tenue confortable 🌳"},
  {date:"2025-06-01", texte:"Réunion de parents le 20 juin à 19h. Merci de confirmer votre présence."},
];
const JOURS_OUVERTS = [1,2,4,5];

// ── QR placeholder ─────────────────────────────────────────────────────────
const QRPh = ({value}) => (
  <div style={{width:80,height:80,background:P.white,border:`2px solid ${P.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",fontSize:9,color:P.textL,textAlign:"center",padding:4}}>
    <div style={{fontSize:26,color:P.taupe}}>▦</div>
    <div style={{fontSize:8,wordBreak:"break-all"}}>{value}</div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [view,setView]             = useState("login");
  const [section,setSection]       = useState("fiches");
  const [pSection,setPSection]     = useState("calendrier");
  const [children,setChildren]     = useState(INIT_CHILDREN);
  const [presences,setPresences]   = useState(INIT_PRESENCES);
  const [notes,setNotes]           = useState(INIT_NOTES);
  const [conges,setConges]         = useState(INIT_CONGES);
  const [notesCom,setNotesCom]     = useState(INIT_NOTES_COMMUNES);
  const [absences,setAbsences]     = useState({});
  const [loginCode,setLoginCode]   = useState("");
  const [loginErr,setLoginErr]     = useState("");
  const [curParent,setCurParent]   = useState(null);
  const [calMonth,setCalMonth]     = useState(new Date(2025,5,1));

  const handleLogin = () => {
    if (loginCode==="ACCUEIL2025"){setView("accueillante");setLoginErr("");return;}
    const child=children.find(c=>c.code===loginCode.toUpperCase());
    if(child){setCurParent(child);setView("parent");setLoginErr("");return;}
    setLoginErr("Code incorrect. Réessayez.");
  };

  if(view==="login") return <LoginScreen loginCode={loginCode} setLoginCode={setLoginCode} handleLogin={handleLogin} loginErr={loginErr}/>;
  if(view==="parent") return <ParentView child={curParent} notes={notes} conges={conges} notesCom={notesCom} absences={absences} setAbsences={setAbsences} pSection={pSection} setPSection={setPSection} calMonth={calMonth} setCalMonth={setCalMonth} onLogout={()=>{setView("login");setLoginCode("");setCurParent(null);}}/>;
  return <AccueillanteView section={section} setSection={setSection} children={children} setChildren={setChildren} presences={presences} setPresences={setPresences} notes={notes} setNotes={setNotes} conges={conges} setConges={setConges} notesCom={notesCom} setNotesCom={setNotesCom} absences={absences} calMonth={calMonth} setCalMonth={setCalMonth} onLogout={()=>{setView("login");setLoginCode("");}}/>;
}

// ═══════════════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════════════
function LoginScreen({loginCode,setLoginCode,handleLogin,loginErr}){
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${P.eauL} 0%,${P.beige} 60%,${P.beigeD} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Segoe UI',sans-serif",position:"relative"}}>
      <BgAnimaux/>
      <div style={{...card(P.white),width:340,textAlign:"center",padding:40,position:"relative",zIndex:1,border:`2px solid ${P.eauL}`}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><NidlyLogo size="large"/></div>
        <p style={{color:P.textL,fontSize:13,marginBottom:28,marginTop:4}}>Votre espace milieu d'accueil</p>
        <label style={lbl}>Code d'accès</label>
        <input style={{...inp,textAlign:"center",letterSpacing:3,fontSize:16,marginBottom:8}} placeholder="XXXX00" value={loginCode} onChange={e=>setLoginCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
        {loginErr&&<p style={{color:P.err,fontSize:13,margin:"4px 0 8px"}}>{loginErr}</p>}
        <button style={{...btn(P.eauD),width:"100%",justifyContent:"center",marginTop:10,fontSize:15,color:P.white}} onClick={handleLogin}>Connexion →</button>
        <div style={{marginTop:28,padding:"14px 16px",background:P.beige,borderRadius:12,textAlign:"left",fontSize:12,color:P.textL}}>
          <strong>Démo :</strong><br/>
          🔑 Accueillante : <code>ACCUEIL2025</code><br/>
          👶 Parent Emma : <code>EMMA01</code><br/>
          👶 Parent Lucas : <code>LUCA02</code>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ACCUEILLANTE
// ═══════════════════════════════════════════════════════════════════════════
function AccueillanteView({section,setSection,children,setChildren,presences,setPresences,notes,setNotes,conges,setConges,notesCom,setNotesCom,absences,calMonth,setCalMonth,onLogout}){
  const nav=[
    {key:"fiches",icon:"📋",label:"Fiches enfants"},
    {key:"presences",icon:"📅",label:"Présences"},
    {key:"facturation",icon:"💶",label:"Facturation"},
    {key:"calendrier",icon:"🗓️",label:"Calendrier"},
    {key:"notesjour",icon:"📝",label:"Notes du jour"},
    {key:"notescom",icon:"📢",label:"Notes communes"},
  ];
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${P.eauL} 0%,${P.creme} 100%)`,fontFamily:"'Segoe UI',sans-serif",position:"relative"}}>
      <BgAnimaux/>
      <div style={{background:P.white,boxShadow:"0 2px 8px rgba(80,60,40,.10)",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:2}}>
        <NidlyLogo size="small"/>
        <div style={{fontSize:12,color:P.textL,fontWeight:600}}>Espace accueillante</div>
        <button style={{...btn(P.beigeD),fontSize:13}} onClick={onLogout}>Déconnexion</button>
      </div>
      <div style={{display:"flex",gap:8,padding:"16px 24px",flexWrap:"wrap",position:"relative",zIndex:2}}>
        {nav.map(n=>(
          <button key={n.key} style={{...btn(section===n.key?P.eauD:P.white),color:section===n.key?P.white:P.text,border:`1.5px solid ${section===n.key?P.eauD:P.border}`,boxShadow:section===n.key?"0 2px 8px rgba(0,0,0,.12)":"none"}} onClick={()=>setSection(n.key)}>
            {n.icon} {n.label}
          </button>
        ))}
      </div>
      <div style={{padding:"0 24px 40px",position:"relative",zIndex:2}}>
        {section==="fiches"      && <FichesSection children={children} setChildren={setChildren}/>}
        {section==="presences"   && <PresencesSection children={children} presences={presences} setPresences={setPresences} calMonth={calMonth} setCalMonth={setCalMonth}/>}
        {section==="facturation" && <FacturationSection children={children} presences={presences}/>}
        {section==="calendrier"  && <CalendrierSection conges={conges} setConges={setConges} calMonth={calMonth} setCalMonth={setCalMonth} absences={{}} isAccueillante/>}
        {section==="notesjour"   && <NotesDuJourSection children={children} notes={notes} setNotes={setNotes} isAccueillante/>}
        {section==="notescom"    && <NotesCommunesSection notesCom={notesCom} setNotesCom={setNotesCom} isAccueillante/>}
      </div>
    </div>
  );
}

// ── Fiches ─────────────────────────────────────────────────────────────────
function FichesSection({children,setChildren}){
  const [selected,setSelected]=useState(null);
  const [showForm,setShowForm]=useState(false);
  const empty={nom:"",prenom:"",adresse:"",registre:"",allergies:"",nbJours:"",dateEntree:"",dateSortie:"",parents:[{nom:"",adresse:"",registre:""}],reprendre:"",code:""};
  const [form,setForm]=useState(empty);

  const save=()=>{
    const child={...form,id:selected?.id||Date.now(),nbJours:Number(form.nbJours),reprendre:form.reprendre.split(",").map(s=>s.trim()).filter(Boolean)};
    if(selected) setChildren(prev=>prev.map(c=>c.id===selected.id?child:c));
    else setChildren(prev=>[...prev,child]);
    setShowForm(false);setSelected(null);setForm(empty);
  };
  const edit=(c)=>{setSelected(c);setForm({...c,reprendre:(c.reprendre||[]).join(", ")});setShowForm(true);};

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{margin:0,color:P.taupeD}}>📋 Fiches des enfants</h2>
        <button style={{...btn(P.eauD),color:P.white}} onClick={()=>{setForm(empty);setSelected(null);setShowForm(true);}}>+ Nouvel enfant</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:24}}>
        {children.map(c=>(
          <div key={c.id} style={{...card(P.white),cursor:"pointer",border:`2px solid ${P.eauL}`}} onClick={()=>edit(c)}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:48,height:48,borderRadius:24,background:`linear-gradient(135deg,${P.eau},${P.eauD})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ourson size={36} op={0.9}/>
              </div>
              <div>
                <div style={{fontWeight:800,fontSize:16,color:P.text}}>{c.prenom} {c.nom}</div>
                <div style={{fontSize:12,color:P.textL}}>{c.nbJours}j/semaine · Code : <strong>{c.code}</strong></div>
              </div>
            </div>
            {c.allergies&&c.allergies!=="Aucune"&&(
              <div style={{marginTop:10,background:"#F9E8E5",borderRadius:8,padding:"6px 10px",fontSize:12,color:"#8B3A2E"}}>⚠️ {c.allergies}</div>
            )}
            <div style={{marginTop:8,fontSize:12,color:P.textL}}>📅 {c.dateEntree} → {c.dateSortie}</div>
          </div>
        ))}
      </div>
      {showForm&&(
        <div style={{position:"fixed",inset:0,background:"rgba(60,45,35,.40)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{...card(P.white),width:"100%",maxWidth:560,maxHeight:"85vh",overflowY:"auto"}}>
            <h3 style={{margin:"0 0 16px",color:P.taupeD}}>{selected?"Modifier":"Nouvelle fiche"} enfant</h3>
            <G2><F label="Nom" value={form.nom} onChange={v=>setForm(f=>({...f,nom:v}))}/><F label="Prénom" value={form.prenom} onChange={v=>setForm(f=>({...f,prenom:v}))}/></G2>
            <F label="Adresse" value={form.adresse} onChange={v=>setForm(f=>({...f,adresse:v}))}/>
            <G2><F label="N° registre national" value={form.registre} onChange={v=>setForm(f=>({...f,registre:v}))} placeholder="90.04.15-123.45"/><F label="Code d'accès parent" value={form.code} onChange={v=>setForm(f=>({...f,code:v.toUpperCase()}))}/></G2>
            <F label="Allergies / Intolérances" value={form.allergies} onChange={v=>setForm(f=>({...f,allergies:v}))}/>
            <G2><F label="Nb jours/semaine" type="number" value={form.nbJours} onChange={v=>setForm(f=>({...f,nbJours:v}))}/><span/></G2>
            <G2><F label="Date d'entrée" type="date" value={form.dateEntree} onChange={v=>setForm(f=>({...f,dateEntree:v}))}/><F label="Date de sortie" type="date" value={form.dateSortie} onChange={v=>setForm(f=>({...f,dateSortie:v}))}/></G2>
            <div style={{background:P.beige,borderRadius:12,padding:12,margin:"8px 0"}}>
              <strong style={{fontSize:13,color:P.taupeD}}>👨‍👩‍👧 Parent / Tuteur</strong>
              <F label="Nom complet" value={form.parents[0]?.nom||""} onChange={v=>setForm(f=>({...f,parents:[{...f.parents[0],nom:v}]}))}/>
              <F label="Adresse" value={form.parents[0]?.adresse||""} onChange={v=>setForm(f=>({...f,parents:[{...f.parents[0],adresse:v}]}))}/>
              <F label="N° registre national" value={form.parents[0]?.registre||""} onChange={v=>setForm(f=>({...f,parents:[{...f.parents[0],registre:v}]}))}/>
            </div>
            <F label="Personnes autorisées à reprendre (séparées par virgule)" value={form.reprendre} onChange={v=>setForm(f=>({...f,reprendre:v}))}/>
            <div style={{display:"flex",gap:10,marginTop:16}}>
              <button style={{...btn(P.eauD),flex:1,justifyContent:"center",color:P.white}} onClick={save}>💾 Enregistrer</button>
              <button style={{...btn(P.beigeD),flex:1,justifyContent:"center"}} onClick={()=>setShowForm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Présences ──────────────────────────────────────────────────────────────
function PresencesSection({children,presences,setPresences,calMonth,setCalMonth}){
  const [selDate,setSelDate]=useState(null);
  const [editP,setEditP]=useState({});
  const days=buildCalDays(calMonth);
  const fmt=d=>d.toLocaleDateString("fr-BE",{weekday:"long",day:"numeric",month:"long"});
  const openDay=d=>{setSelDate(d);setEditP(presences[d]?JSON.parse(JSON.stringify(presences[d])):{}); };
  const saveDay=()=>{setPresences(p=>({...p,[selDate]:editP}));setSelDate(null);};
  const isOpen=date=>JOURS_OUVERTS.includes(new Date(date).getDay());

  return(
    <div>
      <h2 style={{color:P.taupeD}}>📅 Présences</h2>
      <MonthNav calMonth={calMonth} setCalMonth={setCalMonth}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginTop:8}}>
        {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:700,color:P.textL,padding:4}}>{d}</div>)}
        {days.map((d,i)=>{
          if(!d) return <div key={i}/>;
          const key=d.toISOString().slice(0,10);
          const open=isOpen(key);
          const hasP=presences[key]&&Object.keys(presences[key]).length>0;
          return(
            <div key={key} onClick={()=>open&&openDay(key)} style={{background:!open?"#f0ece7":hasP?P.eau:P.white,border:`1.5px solid ${hasP?P.eauD:P.border}`,borderRadius:10,padding:"8px 4px",textAlign:"center",cursor:open?"pointer":"default",minHeight:52}}>
              <div style={{fontSize:13,fontWeight:700,color:open?P.text:"#c5bdb5"}}>{d.getDate()}</div>
              {hasP&&<div style={{fontSize:9,color:P.eauD}}>✓ {Object.keys(presences[key]).length}</div>}
            </div>
          );
        })}
      </div>
      {selDate&&(
        <div style={{position:"fixed",inset:0,background:"rgba(60,45,35,.40)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{...card(P.white),width:"100%",maxWidth:480,maxHeight:"80vh",overflowY:"auto"}}>
            <h3 style={{margin:"0 0 16px",textTransform:"capitalize",color:P.taupeD}}>{fmt(new Date(selDate))}</h3>
            {children.map(c=>(
              <div key={c.id} style={{...card(P.eauL),marginBottom:10}}>
                <div style={{fontWeight:700,marginBottom:8,color:P.text}}>👶 {c.prenom} {c.nom}</div>
                <G2>
                  <div><label style={lbl}>Arrivée</label><input type="time" style={inp} value={editP[c.id]?.arrivee||""} onChange={e=>setEditP(p=>({...p,[c.id]:{...p[c.id],arrivee:e.target.value}}))}/></div>
                  <div><label style={lbl}>Départ</label><input type="time" style={inp} value={editP[c.id]?.depart||""} onChange={e=>setEditP(p=>({...p,[c.id]:{...p[c.id],depart:e.target.value}}))}/></div>
                </G2>
              </div>
            ))}
            <div style={{display:"flex",gap:10,marginTop:8}}>
              <button style={{...btn(P.eauD),flex:1,justifyContent:"center",color:P.white}} onClick={saveDay}>💾 Enregistrer</button>
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
  const [selChild,setSelChild]=useState(children[0]);
  const [selMonth,setSelMonth]=useState("2025-06");
  const [tarif,setTarif]=useState("8.50");
  const [sent,setSent]=useState(false);

  const getDays=()=>!selChild?[]:Object.entries(presences).filter(([d])=>d.startsWith(selMonth)&&presences[d][selChild.id]).map(([d])=>({date:d,...presences[d][selChild.id]}));
  const days=getDays();
  const total=(parseFloat(tarif)*days.length).toFixed(2);
  const facNum=`FAC-${selMonth}-${selChild?.id||0}`;

  return(
    <div>
      <h2 style={{color:P.taupeD}}>💶 Facturation</h2>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <div><label style={lbl}>Enfant</label>
          <select style={{...inp,width:"auto"}} value={selChild?.id} onChange={e=>setSelChild(children.find(c=>c.id===Number(e.target.value)))}>
            {children.map(c=><option key={c.id} value={c.id}>{c.prenom} {c.nom}</option>)}
          </select>
        </div>
        <div><label style={lbl}>Mois</label><input type="month" style={{...inp,width:"auto"}} value={selMonth} onChange={e=>setSelMonth(e.target.value)}/></div>
        <div><label style={lbl}>Tarif journalier (€)</label><input type="number" step="0.01" style={{...inp,width:100}} value={tarif} onChange={e=>setTarif(e.target.value)}/></div>
      </div>
      <div style={{...card(P.white),maxWidth:520,border:`2px solid ${P.eauL}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <NidlyLogo size="small"/>
          <QRPh value={facNum}/>
        </div>
        <hr style={{border:"none",borderTop:`2px dashed ${P.border}`,margin:"16px 0"}}/>
        <div style={{fontWeight:800,fontSize:18,marginBottom:4,color:P.taupeD}}>FACTURE {facNum}</div>
        <div style={{color:P.textL,fontSize:13,marginBottom:16}}>{selChild?.prenom} {selChild?.nom} · {selMonth.replace("-","/")}</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{background:P.eauL}}>{["Date","Arrivée","Départ"].map(h=><th key={h} style={{padding:"6px 10px",textAlign:"left",fontWeight:700,color:P.taupeD}}>{h}</th>)}</tr></thead>
          <tbody>
            {days.length===0&&<tr><td colSpan={3} style={{padding:12,color:P.textL,textAlign:"center"}}>Aucune présence ce mois-ci</td></tr>}
            {days.map((d,i)=>(
              <tr key={d.date} style={{background:i%2?P.creme:P.white}}>
                <td style={{padding:"5px 10px"}}>{new Date(d.date).toLocaleDateString("fr-BE")}</td>
                <td style={{padding:"5px 10px"}}>{d.arrivee||"—"}</td>
                <td style={{padding:"5px 10px"}}>{d.depart||"—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop:16,background:P.beige,borderRadius:10,padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span>Nombre de jours</span><strong>{days.length}</strong></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span>Tarif/jour</span><strong>{tarif} €</strong></div>
          <hr style={{border:"none",borderTop:`1px solid ${P.border}`,margin:"8px 0"}}/>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:17,fontWeight:900}}><span>TOTAL</span><span style={{color:P.eauD}}>{total} €</span></div>
        </div>
        <div style={{marginTop:16,display:"flex",gap:10}}>
          <button style={{...btn(P.eauD),flex:1,justifyContent:"center",color:P.white}} onClick={()=>{setSent(true);setTimeout(()=>setSent(false),3000);}}>📧 Envoyer par mail</button>
          <button style={{...btn(P.beige),flex:1,justifyContent:"center"}}>🖨️ Imprimer</button>
        </div>
        {sent&&<div style={{marginTop:8,background:P.eau,borderRadius:8,padding:"8px 12px",fontSize:13,textAlign:"center"}}>✅ Facture envoyée par mail !</div>}
        <div style={{marginTop:8,fontSize:11,color:P.textL,textAlign:"center"}}>ℹ️ Envoi automatique le 15 de chaque mois.</div>
      </div>
    </div>
  );
}

// ── Calendrier ─────────────────────────────────────────────────────────────
function CalendrierSection({conges,setConges,calMonth,setCalMonth,absences,setAbsences,isAccueillante,childId}){
  const days=buildCalDays(calMonth);
  const toggleConge=key=>{if(!isAccueillante)return;setConges(prev=>prev.includes(key)?prev.filter(d=>d!==key):[...prev,key]);};
  const toggleAbsence=key=>{if(isAccueillante)return;setAbsences(prev=>{const cur={...prev};if(!cur[childId])cur[childId]=[];if(cur[childId].includes(key))cur[childId]=cur[childId].filter(d=>d!==key);else cur[childId]=[...cur[childId],key];return cur;});};
  const childAbs=absences?.[childId]||[];

  return(
    <div>
      <h2 style={{color:P.taupeD}}>🗓️ Calendrier {isAccueillante?"— Congés & Fermetures":"— Planification"}</h2>
      <MonthNav calMonth={calMonth} setCalMonth={setCalMonth}/>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:12,marginBottom:8,fontSize:12}}>
        <Tg color="#8B3A2E" bg="#F9E8E5">🔴 Fermé / Congé</Tg>
        {!isAccueillante&&<Tg color={P.eauD} bg={P.eauL}>🔵 Absence enfant</Tg>}
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
      {isAccueillante&&<p style={{fontSize:12,color:P.textL,marginTop:8}}>💡 Cliquez sur un jour pour le marquer fermé.</p>}
      {!isAccueillante&&<p style={{fontSize:12,color:P.textL,marginTop:8}}>💡 Cliquez sur un jour ouvert pour signaler une absence.</p>}
    </div>
  );
}

// ── Notes du jour ──────────────────────────────────────────────────────────
function NotesDuJourSection({children,notes,setNotes,isAccueillante,childFilter}){
  const [selDate,setSelDate]=useState(new Date().toISOString().slice(0,10));
  const [editN,setEditN]=useState({});
  const [editing,setEditing]=useState(false);
  const dayNotes=notes[selDate]||{};
  const startEdit=()=>{setEditN(JSON.parse(JSON.stringify(dayNotes)));setEditing(true);};
  const saveEdit=()=>{setNotes(prev=>({...prev,[selDate]:editN}));setEditing(false);};
  const show=childFilter?children.filter(c=>c.id===childFilter):children;

  return(
    <div>
      <h2 style={{color:P.taupeD}}>📝 Notes du jour</h2>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <input type="date" style={{...inp,width:"auto"}} value={selDate} onChange={e=>setSelDate(e.target.value)}/>
        {isAccueillante&&!editing&&<button style={{...btn(P.eauD),color:P.white}} onClick={startEdit}>✏️ Modifier</button>}
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
                <div style={{marginTop:6}}>
                  <label style={lbl}>📓 Note du jour</label>
                  <textarea rows={3} style={{...inp,resize:"vertical"}} value={n.note||""} onChange={e=>setEditN(prev=>({...prev,[c.id]:{...prev[c.id],note:e.target.value}}))}/>
                </div>
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
      {editing&&(
        <div style={{display:"flex",gap:10}}>
          <button style={{...btn(P.eauD),flex:1,justifyContent:"center",color:P.white}} onClick={saveEdit}>💾 Enregistrer</button>
          <button style={{...btn(P.beigeD),flex:1,justifyContent:"center"}} onClick={()=>setEditing(false)}>Annuler</button>
        </div>
      )}
    </div>
  );
}

// ── Notes communes ─────────────────────────────────────────────────────────
function NotesCommunesSection({notesCom,setNotesCom,isAccueillante}){
  const [texte,setTexte]=useState("");
  const add=()=>{if(!texte.trim())return;setNotesCom(prev=>[{date:new Date().toISOString().slice(0,10),texte},...prev]);setTexte("");};
  return(
    <div>
      <h2 style={{color:P.taupeD}}>📢 Notes communes</h2>
      {isAccueillante&&(
        <div style={{...card(P.eauL),marginBottom:20}}>
          <label style={lbl}>Nouvelle note pour tous les parents</label>
          <textarea rows={3} style={{...inp,resize:"vertical",marginBottom:10}} value={texte} onChange={e=>setTexte(e.target.value)} placeholder="Information, rappel, événement…"/>
          <button style={{...btn(P.eauD),color:P.white}} onClick={add}>📢 Publier</button>
        </div>
      )}
      {notesCom.map((n,i)=>(
        <div key={i} style={{...card(P.white),border:`1.5px solid ${P.eauL}`}}>
          <div style={{fontSize:11,color:P.textL,marginBottom:4}}>📅 {new Date(n.date).toLocaleDateString("fr-BE")}</div>
          <p style={{margin:0,fontSize:14}}>{n.texte}</p>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PARENT VIEW
// ═══════════════════════════════════════════════════════════════════════════
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
          <div style={{width:40,height:40,borderRadius:20,background:`linear-gradient(135deg,${P.eau},${P.eauD})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Lapin size={32} op={0.9}/></div>
          <div>
            <div style={{fontWeight:800,fontSize:16,color:P.text}}>{child.prenom} {child.nom}</div>
            <div style={{fontSize:11,color:P.textL}}>Espace parents · Nidly</div>
          </div>
        </div>
        <button style={{...btn(P.beigeD),fontSize:13}} onClick={onLogout}>Déconnexion</button>
      </div>
      <div style={{display:"flex",gap:8,padding:"16px 24px",flexWrap:"wrap",position:"relative",zIndex:2}}>
        {nav.map(n=>(
          <button key={n.key} style={{...btn(pSection===n.key?P.eauD:P.white),color:pSection===n.key?P.white:P.text,border:`1.5px solid ${pSection===n.key?P.eauD:P.border}`}} onClick={()=>setPSection(n.key)}>
            {n.icon} {n.label}
          </button>
        ))}
      </div>
      <div style={{padding:"0 24px 40px",position:"relative",zIndex:2}}>
        {pSection==="calendrier" &&<CalendrierSection conges={conges} setConges={()=>{}} calMonth={calMonth} setCalMonth={setCalMonth} absences={absences} setAbsences={setAbsences} isAccueillante={false} childId={child.id}/>}
        {pSection==="notesjour"  &&<NotesDuJourSection children={[child]} notes={notes} setNotes={()=>{}} isAccueillante={false} childFilter={child.id}/>}
        {pSection==="notescom"   &&<NotesCommunesSection notesCom={notesCom} setNotesCom={()=>{}} isAccueillante={false}/>}
        {pSection==="factures"   &&<ParentFactures child={child}/>}
      </div>
    </div>
  );
}

function ParentFactures({child}){
  const fake=[{mois:"2025-05",jours:18,total:"153.00",payee:true},{mois:"2025-04",jours:20,total:"170.00",payee:true},{mois:"2025-03",jours:17,total:"144.50",payee:false}];
  return(
    <div>
      <h2 style={{color:P.taupeD}}>💶 Mes factures</h2>
      {fake.map((f,i)=>(
        <div key={i} style={{...card(P.white),display:"flex",alignItems:"center",justifyContent:"space-between",border:`1.5px solid ${P.border}`}}>
          <div>
            <div style={{fontWeight:700,color:P.text}}>{f.mois.replace("-","/")} — {child.prenom}</div>
            <div style={{fontSize:13,color:P.textL}}>{f.jours} jours · <strong>{f.total} €</strong></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{background:f.payee?P.eau:"#F9E8E5",color:f.payee?P.taupeD:"#8B3A2E",borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:700}}>{f.payee?"✅ Payée":"⏳ En attente"}</span>
            <QRPh value={`FAC-${f.mois}-${child.id}`}/>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════
function F({label:l,value,onChange,type="text",placeholder=""}){
  return(<div style={{marginBottom:10}}><label style={lbl}>{l}</label><input type={type} style={inp} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/></div>);
}
function G2({children}){return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{children}</div>;}
function Tg({color,bg,children}){return <span style={{background:bg,color,borderRadius:20,padding:"3px 10px",fontWeight:700,fontSize:12}}>{children}</span>;}
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
