import React, { useState } from 'react';
import { BlogPost } from '../types';
import { EditIcon, TrashIcon, PlusIcon, SaveIcon, XIcon, ArrowRightIcon } from './Icons';

interface AdminPanelProps {
  articles: BlogPost[];
  onUpdateArticles: (articles: BlogPost[]) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ articles, onUpdateArticles, onClose }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogPost | null>(null);

  const handleEdit = (article: BlogPost) => {
    setEditingId(article.id);
    setFormData({ ...article });
  };

  const handleCreate = () => {
    const newArticle: BlogPost = {
      id: Date.now().toString(),
      title: "Nouvel article",
      category: "Divers",
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      content: "<p>Écrivez votre contenu ici...</p>",
      summary: "Résumé de l'article..."
    };
    setEditingId(newArticle.id);
    setFormData(newArticle);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      const updated = articles.filter(a => a.id !== id);
      onUpdateArticles(updated);
      if (editingId === id) {
        setEditingId(null);
        setFormData(null);
      }
    }
  };

  const handleSave = () => {
    if (!formData) return;

    let updatedArticles;
    if (articles.find(a => a.id === formData.id)) {
      // Update existing
      updatedArticles = articles.map(a => a.id === formData.id ? formData : a);
    } else {
      // Create new
      updatedArticles = [formData, ...articles];
    }
    
    onUpdateArticles(updatedArticles);
    setEditingId(null);
    setFormData(null);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "articles_actalon.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
           <div className="flex items-center">
              <button onClick={onClose} className="mr-4 p-2 bg-white rounded-full hover:bg-slate-200 text-slate-600">
                <ArrowRightIcon className="w-5 h-5 rotate-180" />
              </button>
              <h1 className="text-2xl font-serif font-bold text-actalon-navy">Administration du Blog</h1>
           </div>
           <div className="flex space-x-3">
             <button 
                onClick={handleExport}
                className="px-4 py-2 bg-slate-600 text-white rounded-sm text-sm font-medium hover:bg-slate-700 transition-colors"
             >
                Exporter (JSON)
             </button>
             <button 
                onClick={handleCreate}
                className="px-4 py-2 bg-actalon-gold text-actalon-navy rounded-sm text-sm font-bold hover:bg-white transition-colors flex items-center"
             >
                <PlusIcon className="w-4 h-4 mr-2" /> Nouvel Article
             </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* List */}
          <div className="lg:col-span-1 space-y-4">
             {articles.map(article => (
               <div 
                 key={article.id} 
                 className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer border-l-4 transition-all ${editingId === article.id ? 'border-actalon-gold ring-2 ring-actalon-gold/20' : 'border-transparent hover:border-slate-300'}`}
                 onClick={() => handleEdit(article)}
               >
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="font-bold text-slate-800 text-sm">{article.title}</h3>
                     <p className="text-xs text-slate-400 mt-1">{article.date} • {article.category}</p>
                   </div>
                   <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(article.id); }}
                      className="text-red-400 hover:text-red-600 p-1"
                   >
                     <TrashIcon className="w-4 h-4" />
                   </button>
                 </div>
               </div>
             ))}
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            {editingId && formData ? (
              <div className="bg-white rounded-lg shadow-xl p-6 border border-slate-200">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                   <h2 className="font-serif font-bold text-xl text-actalon-navy">Éditer l'article</h2>
                   <div className="flex space-x-2">
                      <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:text-slate-600"><XIcon className="w-5 h-5"/></button>
                      <button 
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-sm text-sm font-medium hover:bg-green-700"
                      >
                        <SaveIcon className="w-4 h-4 mr-2" /> Enregistrer
                      </button>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Titre</label>
                        <input 
                          type="text" 
                          value={formData.title} 
                          onChange={e => setFormData({...formData, title: e.target.value})}
                          className="w-full p-2 border border-slate-300 rounded text-sm focus:border-actalon-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catégorie</label>
                        <input 
                          type="text" 
                          value={formData.category} 
                          onChange={e => setFormData({...formData, category: e.target.value})}
                          className="w-full p-2 border border-slate-300 rounded text-sm focus:border-actalon-gold outline-none"
                        />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                        <input 
                          type="text" 
                          value={formData.date} 
                          onChange={e => setFormData({...formData, date: e.target.value})}
                          className="w-full p-2 border border-slate-300 rounded text-sm focus:border-actalon-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image URL</label>
                        <input 
                          type="text" 
                          value={formData.imageUrl || ''} 
                          onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                          className="w-full p-2 border border-slate-300 rounded text-sm focus:border-actalon-gold outline-none"
                        />
                      </div>
                   </div>

                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Résumé</label>
                      <textarea 
                        value={formData.summary || ''} 
                        onChange={e => setFormData({...formData, summary: e.target.value})}
                        className="w-full p-2 border border-slate-300 rounded text-sm focus:border-actalon-gold outline-none h-20"
                      />
                   </div>

                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contenu (HTML accepté)</label>
                      <textarea 
                        value={formData.content} 
                        onChange={e => setFormData({...formData, content: e.target.value})}
                        className="w-full p-4 border border-slate-300 rounded text-sm focus:border-actalon-gold outline-none h-96 font-mono text-xs"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Utilisez les balises &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt; pour formater.</p>
                   </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-lg p-12">
                 <div className="text-center">
                    <p className="mb-2">Sélectionnez un article à gauche ou créez-en un nouveau.</p>
                 </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};