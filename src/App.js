import React, { useState } from 'react';
import { 
  FileText, 
  Trash2, 
  GripVertical, 
  Download, 
  Copy, 
  BookOpen, 
  Clock, 
  Users, 
  Monitor, 
  Briefcase,
  Lightbulb,
  Heart
} from 'lucide-react';

// --- MENTIONS LÉGALES (Protégées) ---
const PDF_COPYRIGHT = "DEV : Pr.M Moumen";
// Correction : "Idea & Development" est la formulation correcte pour "L'idée et le développement".
const WEBSITE_COPYRIGHT = "Idea & Development with ❤️ by Pr. M. MOUMEN";

// --- Styles CSS intégrés ---
const styles = `
  body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; color: #1f2937; }
  * { box-sizing: border-box; }
  
  /* Layout global */
  .app-container { display: flex; flex-direction: column; min-height: 100vh; }
  
  .app-header { background-color: #4338ca; color: white; padding: 1rem; position: sticky; top: 0; z-index: 50; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
  .header-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  .logo-area { display: flex; align-items: center; gap: 0.5rem; }
  .app-title { font-size: 1.25rem; font-weight: bold; margin: 0; }
  
  /* Boutons */
  .btn-group { display: flex; gap: 0.5rem; }
  .btn { padding: 0.5rem 1rem; border-radius: 0.375rem; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; font-size: 0.875rem; font-weight: 500; color: white; }
  .btn-nav { background-color: #4f46e5; }
  .btn-nav:hover { background-color: #4338ca; }
  .btn-nav.active { background-color: white; color: #4338ca; font-weight: bold; }
  .btn-action-green { background-color: #16a34a; }
  .btn-action-green:hover { background-color: #15803d; }
  .btn-action-blue { background-color: #3b82f6; }
  .btn-action-blue:hover { background-color: #2563eb; }
  .btn-small { padding: 0.25rem 0.5rem; font-size: 0.75rem; background-color: #f3f4f6; color: #374151; border: 1px solid #d1d5db; }
  .btn-small:hover { background-color: #e5e7eb; }

  /* Contenu principal */
  .main-container { max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; flex: 1; width: 100%; }
  .grid-layout { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
  
  /* Footer du Site Web (visible écran, caché impression) */
  .site-footer { background-color: #1e1b4b; color: #a5b4fc; padding: 1.5rem; text-align: center; margin-top: auto; border-top: 1px solid #312e81; font-size: 0.9rem; font-weight: 500; letter-spacing: 0.025em; }
  
  /* Cartes et Formulaires */
  .card { background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1); border: 1px solid #e5e7eb; margin-bottom: 1.5rem; }
  .card-header { display: flex; align-items: center; margin-bottom: 1rem; color: #3730a3; font-size: 1.125rem; font-weight: bold; }
  .card-header svg { margin-right: 0.5rem; }
  
  .form-group { margin-bottom: 1rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  .label { display: block; font-size: 0.75rem; font-weight: bold; color: #6b7280; text-transform: uppercase; margin-bottom: 0.25rem; }
  .input { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; font-size: 0.875rem; }
  .input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
  textarea.input { resize: vertical; min-height: 80px; font-family: inherit; }

  /* Aide Bloom */
  .bloom-help { background-color: #eef2ff; padding: 1rem; border-radius: 0.25rem; font-size: 0.75rem; margin-bottom: 1rem; }
  .bloom-cat { margin-bottom: 0.5rem; }
  .bloom-label { font-weight: bold; color: #4338ca; }

  /* Drag & Drop Items */
  .step-item { background: white; border: 1px solid #e5e7eb; border-left: 4px solid #6366f1; border-radius: 0.375rem; padding: 1rem; margin-bottom: 1rem; position: relative; transition: all 0.2s; }
  .step-item.dragging { opacity: 0.5; border-style: dashed; border-color: #9ca3af; }
  .step-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
  .step-handle { display: flex; align-items: center; cursor: move; color: #6b7280; }
  .step-handle:hover { color: #4338ca; }
  .step-title { font-weight: bold; color: #4338ca; text-transform: uppercase; font-size: 0.875rem; margin-left: 0.5rem; }
  .step-controls { display: flex; align-items: center; gap: 1rem; }
  .duration-input { width: 60px; border: none; border-bottom: 1px solid #d1d5db; text-align: right; font-size: 0.875rem; }
  .btn-delete { color: #9ca3af; background: none; border: none; cursor: pointer; }
  .btn-delete:hover { color: #ef4444; }

  /* Aperçu (Feuille A4) */
  .preview-container { display: flex; justify-content: center; padding-bottom: 2rem; }
  .a4-page { 
    background: white; 
    width: 21cm; 
    min-height: 29.7cm; 
    padding: 2cm; 
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); 
    color: black; 
    font-family: 'Times New Roman', serif;
    display: flex; /* Flexbox pour pousser le footer en bas */
    flex-direction: column;
  }
  
  .print-header { border-bottom: 2px solid black; padding-bottom: 1rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; }
  .print-title { font-size: 1.5rem; font-weight: bold; text-transform: uppercase; margin: 0 0 0.5rem 0; letter-spacing: 0.05em; }
  .print-subtitle { font-size: 1rem; margin: 0; }
  
  .module-box { background-color: #f3f4f6; border: 1px solid #d1d5db; padding: 1rem; text-align: center; margin-bottom: 1.5rem; border-radius: 4px; }
  .lesson-title { font-size: 1.25rem; font-weight: bold; text-transform: uppercase; text-decoration: underline; margin: 0.5rem 0 0 0; }
  
  .section-title { font-size: 1.1rem; font-weight: bold; background-color: #e5e7eb; padding: 0.25rem 0.5rem; border-left: 5px solid black; margin-bottom: 0.75rem; text-transform: uppercase; font-family: sans-serif; }
  
  .info-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 1.5rem; }
  .info-table td { padding: 0.5rem; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  .info-label { font-weight: bold; width: 25%; }
  
  .bordered-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; border: 1px solid #000; }
  .bordered-table td { border: 1px solid #000; padding: 0.5rem; }
  .bg-gray { background-color: #f3f4f6; font-weight: bold; }
  
  .main-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; border: 1px solid black; }
  .main-table th { border: 1px solid black; background-color: #f3f4f6; padding: 0.5rem; text-align: left; }
  .main-table td { border: 1px solid black; padding: 0.5rem; vertical-align: top; }

  /* Footer Copyright Styling (PDF) */
  .pdf-copyright { 
    margin-top: auto;
    padding-top: 1rem; 
    border-top: 1px solid #9ca3af;
    text-align: center;
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: bold;
    font-style: italic;
  }

  .hidden { display: none; }
  .no-print { }
  
  /* Responsive */
  @media (min-width: 1024px) {
    .grid-layout { grid-template-columns: 1fr 2fr; }
  }

  /* Impression (PDF) */
  @media print {
    body { background: white; }
    .app-header, .btn-group, .hidden, .grid-layout > div:first-child, .site-footer { display: none !important; }
    .main-container { padding: 0; margin: 0; max-width: none; }
    .grid-layout { display: block; }
    .preview-container { display: block; padding: 0; }
    .a4-page { box-shadow: none; margin: 0; width: 100%; padding: 0; max-width: none; min-height: 29.7cm; }
    #print-area { display: block !important; }
  }
`;

// --- Données et Constantes ---

const BLOOM_TAXONOMY = {
  "Connaissance": ["Définir", "Identifier", "Nommer", "Lister", "Rappeler", "Reconnaître"],
  "Compréhension": ["Expliquer", "Résumer", "Paraphraser", "Décrire", "Illustrer", "Interpréter"],
  "Application": ["Appliquer", "Utiliser", "Démontrer", "Calculer", "Résoudre", "Adapter"],
  "Analyse": ["Analyser", "Comparer", "Différencier", "Catégoriser", "Examiner", "Tester"],
  "Synthèse": ["Créer", "Concevoir", "Organiser", "Planifier", "Composer", "Formuler"],
  "Évaluation": ["Évaluer", "Juger", "Critiquer", "Justifier", "Estimer", "Argumenter"]
};

const DEFAULT_STEPS = [
  { id: 'step-1', type: 'Motivation', duration: '5 min', profActivity: '', studentActivity: '', method: 'Interrogative', resources: 'Tableau' },
  { id: 'step-2', type: 'Construction', duration: '20 min', profActivity: '', studentActivity: '', method: 'Active/Découverte', resources: 'PC, Vidéoprojecteur' },
  { id: 'step-3', type: 'Généralisation', duration: '15 min', profActivity: '', studentActivity: '', method: 'Expositive', resources: 'Tableau' },
  { id: 'step-4', type: 'Évaluation', duration: '10 min', profActivity: '', studentActivity: '', method: 'Individuelle', resources: 'Quiz/Exercice' },
  { id: 'step-5', type: 'Trace', duration: '10 min', profActivity: '', studentActivity: '', method: 'Dictée/Copie', resources: 'Cahier' },
];

const STEP_TYPES = ['Motivation', 'Construction', 'Généralisation', 'Évaluation', 'Trace', 'Remédiation'];

// --- Composants ---

export default function App() {
  const [activeTab, setActiveTab] = useState('edit');
  const [showBloom, setShowBloom] = useState(false);

  // État de la fiche
  const [fiche, setFiche] = useState({
    etablissement: "Lycée Hassi Berkane",
    professeur: "MALSAH MOUMEN",
    date: new Date().toISOString().split('T')[0],
    niveau: "Tronc Commun",
    module: "Généralités sur les systèmes informatiques",
    titre: "Système Informatique",
    competence: "",
    prerequis: "",
    objectifsGeneraux: "",
    objectifsSpecifiques: "",
    duree: "1h",
    ressourcesNumeriques: "",
    preparation: "",
    moyensMateriels: "Tableau, Ordinateurs, Vidéoprojecteur",
    modalite: "Groupe classe / Binômes",
    deroulement: DEFAULT_STEPS
  });

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === null) return;
    const newDeroulement = [...fiche.deroulement];
    const draggedItem = newDeroulement[draggedItemIndex];
    newDeroulement.splice(draggedItemIndex, 1);
    newDeroulement.splice(index, 0, draggedItem);
    setFiche({ ...fiche, deroulement: newDeroulement });
    setDraggedItemIndex(null);
  };

  const handleInputChange = (field, value) => {
    setFiche({ ...fiche, [field]: value });
  };

  const addStep = (type = 'Construction') => {
    const newStep = {
      id: `step-${Date.now()}`,
      type: type,
      duration: '10 min',
      profActivity: '',
      studentActivity: '',
      method: '',
      resources: ''
    };
    setFiche({ ...fiche, deroulement: [...fiche.deroulement, newStep] });
  };

  const removeStep = (index) => {
    const newDeroulement = fiche.deroulement.filter((_, i) => i !== index);
    setFiche({ ...fiche, deroulement: newDeroulement });
  };

  const updateStep = (index, field, value) => {
    const newDeroulement = [...fiche.deroulement];
    newDeroulement[index][field] = value;
    setFiche({ ...fiche, deroulement: newDeroulement });
  };

  const copyToClipboard = () => {
    if (activeTab !== 'preview') {
      setActiveTab('preview');
      setTimeout(() => performCopy(), 100);
    } else {
      performCopy();
    }
  };

  const performCopy = () => {
    const range = document.createRange();
    const selection = window.getSelection();
    const element = document.getElementById('fiche-preview-content');
    if (element) {
      try {
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        alert("Fiche copiée ! Vous pouvez coller dans Word/Google Docs.");
      } catch (err) {
        alert("Erreur lors de la copie.");
      }
    }
  };

  const printFiche = () => {
    window.print();
  };

  // --- Rendu ---

  return (
    <div className="app-container">
      <style>{styles}</style>
      
      {/* Header (Caché à l'impression) */}
      <header className="app-header no-print">
        <div className="header-inner">
          <div className="logo-area">
            <BookOpen size={24} />
            <h1 className="app-title">Fiche Pédagogique Creator</h1>
          </div>
          <div className="btn-group">
             <button onClick={() => setActiveTab('edit')} className={`btn btn-nav ${activeTab === 'edit' ? 'active' : ''}`}>
              <FileText size={16} /> Éditer
            </button>
            <button onClick={() => setActiveTab('preview')} className={`btn btn-nav ${activeTab === 'preview' ? 'active' : ''}`}>
              <Monitor size={16} /> Aperçu
            </button>
            <button onClick={printFiche} className="btn btn-action-green">
              <Download size={16} /> PDF
            </button>
            <button onClick={copyToClipboard} className="btn btn-action-blue">
              <Copy size={16} /> Copier
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-container">
        
        {/* EDIT MODE */}
        <div className={`grid-layout ${activeTab === 'preview' ? 'hidden' : ''}`}>
            
            {/* Colonne Gauche: Infos Générales */}
            <div>
              <div className="card">
                <h2 className="card-header"><Users size={20} /> I. Présentation</h2>
                
                <div className="form-group">
                  <div className="form-row">
                    <div>
                      <label className="label">Date</label>
                      <input type="text" value={fiche.date} onChange={(e) => handleInputChange('date', e.target.value)} className="input" placeholder="JJ/MM/AAAA" />
                    </div>
                    <div>
                      <label className="label">Niveau</label>
                      <input type="text" value={fiche.niveau} onChange={(e) => handleInputChange('niveau', e.target.value)} className="input" placeholder="ex: 2APIC" />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="label">Enseignant</label>
                    <input type="text" value={fiche.professeur} onChange={(e) => handleInputChange('professeur', e.target.value)} className="input" />
                  </div>

                  <div className="form-group">
                    <label className="label">Module</label>
                    <input type="text" value={fiche.module} onChange={(e) => handleInputChange('module', e.target.value)} className="input" placeholder="ex: Logiciels" />
                  </div>

                  <div className="form-group">
                    <label className="label">Titre de la Séance</label>
                    <input type="text" value={fiche.titre} onChange={(e) => handleInputChange('titre', e.target.value)} className="input" style={{fontWeight: 'bold'}} />
                  </div>

                   <div className="form-group">
                    <label className="label">Compétence visée</label>
                    <textarea value={fiche.competence} onChange={(e) => handleInputChange('competence', e.target.value)} className="input" placeholder="Compétence..." />
                  </div>
                   <div className="form-group">
                    <label className="label">Prérequis</label>
                    <textarea value={fiche.prerequis} onChange={(e) => handleInputChange('prerequis', e.target.value)} className="input" placeholder="Savoirs nécessaires..." />
                  </div>
                </div>
              </div>

              <div className="card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                  <h2 className="card-header" style={{marginBottom: 0}}><Lightbulb size={20} /> Objectifs</h2>
                  <button onClick={() => setShowBloom(!showBloom)} style={{background:'none', border:'none', color:'#4f46e5', textDecoration:'underline', cursor:'pointer', fontSize: '0.8rem'}}>
                    {showBloom ? "Masquer Bloom" : "Aide Bloom"}
                  </button>
                </div>

                {showBloom && (
                  <div className="bloom-help">
                    {Object.entries(BLOOM_TAXONOMY).map(([cat, verbs]) => (
                      <div key={cat} className="bloom-cat">
                        <span className="bloom-label">{cat}:</span> {verbs.join(', ')}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="form-group">
                  <label className="label">Objectifs Généraux</label>
                  <textarea value={fiche.objectifsGeneraux} onChange={(e) => handleInputChange('objectifsGeneraux', e.target.value)} className="input" />
                </div>
                 <div className="form-group">
                  <label className="label">Objectifs Spécifiques</label>
                  <textarea value={fiche.objectifsSpecifiques} onChange={(e) => handleInputChange('objectifsSpecifiques', e.target.value)} className="input" style={{minHeight: '120px'}} placeholder="- Définir...&#10;- Appliquer..." />
                </div>
              </div>

               <div className="card">
                <h2 className="card-header"><Clock size={20} /> II. Organisation</h2>
                
                <div className="form-row">
                  <div>
                    <label className="label">Durée</label>
                    <input type="text" value={fiche.duree} onChange={(e) => handleInputChange('duree', e.target.value)} className="input" />
                  </div>
                   <div>
                    <label className="label">Modalité</label>
                    <input type="text" value={fiche.modalite} onChange={(e) => handleInputChange('modalite', e.target.value)} className="input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label">Ressources Numériques</label>
                  <input type="text" value={fiche.ressourcesNumeriques} onChange={(e) => handleInputChange('ressourcesNumeriques', e.target.value)} className="input" />
                </div>
                <div className="form-group">
                  <label className="label">Moyens Matériels</label>
                  <input type="text" value={fiche.moyensMateriels} onChange={(e) => handleInputChange('moyensMateriels', e.target.value)} className="input" />
                </div>
                 <div className="form-group">
                  <label className="label">Préparation de l'enseignant</label>
                  <textarea value={fiche.preparation} onChange={(e) => handleInputChange('preparation', e.target.value)} className="input" />
                </div>
              </div>
            </div>

            {/* Colonne Droite: Déroulement */}
            <div>
              <div className="card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem'}}>
                   <h2 className="card-header" style={{marginBottom: 0}}><Briefcase size={20} /> III. Déroulement</h2>
                   <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    {STEP_TYPES.map(type => (
                       <button 
                        key={type}
                        onClick={() => addStep(type)}
                        className="btn-small"
                      >
                        + {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  {fiche.deroulement.map((step, index) => (
                    <div 
                      key={step.id} 
                      draggable 
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`step-item ${draggedItemIndex === index ? 'dragging' : ''}`}
                    >
                      {/* Header Step */}
                      <div className="step-header-row">
                        <div className="step-handle">
                          <GripVertical size={18} />
                          <span className="step-title">{step.type}</span>
                        </div>
                        <div className="step-controls">
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <Clock size={14} style={{marginRight: '4px', color: '#9ca3af'}} />
                            <input 
                              type="text" 
                              value={step.duration} 
                              onChange={(e) => updateStep(index, 'duration', e.target.value)}
                              className="duration-input"
                            />
                          </div>
                          <button onClick={() => removeStep(index)} className="btn-delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Content Fields */}
                      <div className="form-row">
                        <div>
                          <label className="label">Activité Professeur</label>
                          <textarea 
                            value={step.profActivity} 
                            onChange={(e) => updateStep(index, 'profActivity', e.target.value)}
                            className="input"
                            placeholder="Le prof..."
                          />
                        </div>
                        <div>
                          <label className="label">Activité Élèves</label>
                          <textarea 
                            value={step.studentActivity} 
                            onChange={(e) => updateStep(index, 'studentActivity', e.target.value)}
                            className="input"
                            placeholder="L'élève..."
                          />
                        </div>
                      </div>
                      
                      <div className="form-row" style={{marginBottom: 0}}>
                        <div>
                          <label className="label">Méthode</label>
                           <input 
                              type="text" 
                              value={step.method} 
                              onChange={(e) => updateStep(index, 'method', e.target.value)}
                              className="input"
                            />
                        </div>
                         <div>
                          <label className="label">Ressources</label>
                           <input 
                              type="text" 
                              value={step.resources} 
                              onChange={(e) => updateStep(index, 'resources', e.target.value)}
                              className="input"
                            />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {fiche.deroulement.length === 0 && (
                    <div style={{textAlign: 'center', padding: '2rem', border: '2px dashed #d1d5db', borderRadius: '0.5rem', color: '#9ca3af'}}>
                      Aucune étape. Ajoutez-en une ci-dessus.
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>

        {/* PREVIEW MODE */}
        <div id="print-area" className={`${activeTab === 'preview' ? '' : 'hidden'}`}>
          <div className="preview-container">
            <div id="fiche-preview-content" className="a4-page">
              
              <div style={{flexGrow: 1}}>
                {/* Header Fiche */}
                <div className="print-header">
                  <div style={{width: '66%'}}>
                    <h1 className="print-title">Fiche Pédagogique</h1>
                    <p className="print-subtitle"><strong>{fiche.etablissement}</strong></p>
                    <p className="print-subtitle">Professeur : {fiche.professeur}</p>
                  </div>
                  <div style={{width: '33%', textAlign: 'right'}}>
                    <p className="print-subtitle"><strong>{fiche.date}</strong></p>
                    <p className="print-subtitle">Discipline : Informatique</p>
                    <p className="print-subtitle">Niveau : {fiche.niveau}</p>
                  </div>
                </div>

                {/* Titre et Module */}
                <div className="module-box">
                  <p style={{margin: 0, textTransform: 'uppercase', fontSize: '0.9rem'}}>Module : {fiche.module}</p>
                  <h2 className="lesson-title">{fiche.titre}</h2>
                </div>

                {/* I. Présentation */}
                <div style={{marginBottom: '1.5rem'}}>
                  <h3 className="section-title">I. Présentation de la séance</h3>
                  <table className="info-table">
                    <tbody>
                      <tr>
                        <td className="info-label">Compétence visée :</td>
                        <td>{fiche.competence}</td>
                      </tr>
                      <tr>
                        <td className="info-label">Prérequis :</td>
                        <td>{fiche.prerequis}</td>
                      </tr>
                      <tr>
                        <td className="info-label">Objectifs Généraux :</td>
                        <td>{fiche.objectifsGeneraux}</td>
                      </tr>
                      <tr>
                        <td className="info-label">Objectifs Spécifiques :</td>
                        <td>
                          {fiche.objectifsSpecifiques && (
                            <ul style={{paddingLeft: '1.2rem', margin: 0}}>
                              {fiche.objectifsSpecifiques.split('\n').map((obj, i) => (
                                obj.trim() && <li key={i}>{obj.replace(/^- /, '')}</li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* II. Organisation */}
                <div style={{marginBottom: '1.5rem'}}>
                  <h3 className="section-title">II. Organisation de la séance</h3>
                  <table className="bordered-table">
                    <tbody>
                      <tr>
                        <td className="bg-gray" style={{width: '25%'}}>Durée</td>
                        <td style={{width: '25%'}}>{fiche.duree}</td>
                        <td className="bg-gray" style={{width: '25%'}}>Modalité</td>
                        <td style={{width: '25%'}}>{fiche.modalite}</td>
                      </tr>
                      <tr>
                        <td className="bg-gray">Moyens Matériels</td>
                        <td colSpan="3">{fiche.moyensMateriels}</td>
                      </tr>
                      <tr>
                        <td className="bg-gray">Ressources Numériques</td>
                        <td colSpan="3">{fiche.ressourcesNumeriques}</td>
                      </tr>
                      <tr>
                        <td className="bg-gray">Préparation Enseignant</td>
                        <td colSpan="3">{fiche.preparation}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* III. Déroulement */}
                <div>
                  <h3 className="section-title">III. Déroulement de la séance</h3>
                  <table className="main-table">
                    <thead>
                      <tr>
                        <th style={{width: '15%'}}>Étapes / Durée</th>
                        <th>Activité du Professeur</th>
                        <th>Activité des Élèves</th>
                        <th style={{width: '15%'}}>Méthode</th>
                        <th style={{width: '15%'}}>Ressources</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fiche.deroulement.map((step) => (
                        <tr key={step.id}>
                          <td style={{background: '#f9fafb', fontWeight: 'bold', textAlign: 'center'}}>
                            {step.type}
                            <div style={{fontWeight: 'normal', fontSize: '0.8rem', marginTop: '5px', borderTop: '1px solid #ddd', paddingTop: '2px'}}>{step.duration}</div>
                          </td>
                          <td>{step.profActivity}</td>
                          <td>{step.studentActivity}</td>
                          <td style={{textAlign: 'center'}}>{step.method}</td>
                          <td style={{textAlign: 'center'}}>{step.resources}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer pour le PDF/Impression uniquement */}
              <div className="pdf-copyright">
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'normal'}}>
                  <span>Généré numériquement le {new Date().toLocaleDateString()}</span>
                  <span>Enseignant : {fiche.professeur}</span>
                </div>
                <div>{PDF_COPYRIGHT}</div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer du Site Web (Caché à l'impression) */}
      <footer className="site-footer no-print">
        {WEBSITE_COPYRIGHT}
      </footer>
    </div>
  );
}