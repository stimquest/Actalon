import React from 'react';
import { BlogPost } from '../types';
import { NewspaperIcon, ArrowRightIcon, MapPinIcon } from './Icons';

interface ArticleDetailProps {
  article: BlogPost;
  onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Top Navigation Bar for easy exit */}
      <div className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur z-20">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
            <button 
              onClick={onBack}
              className="flex items-center text-sm font-medium text-slate-500 hover:text-actalon-navy transition-colors group"
            >
              <ArrowRightIcon className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
              Retour aux actualités
            </button>
        </div>
      </div>

      <article>
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
            <div className="inline-flex items-center justify-center space-x-2 text-actalon-gold font-bold uppercase tracking-widest text-xs mb-6">
                <span className="bg-actalon-gold/10 px-3 py-1 rounded-full">{article.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-actalon-navy mb-8 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-center text-slate-400 text-sm space-x-6 border-b border-slate-100 pb-12 mb-12">
               <div className="flex items-center">
                   <NewspaperIcon className="w-4 h-4 mr-2 text-actalon-gold"/>
                   {article.date}
               </div>
               <div className="flex items-center">
                   <MapPinIcon className="w-4 h-4 mr-2 text-actalon-gold"/>
                   Actalon Notaires
               </div>
            </div>
        </div>

        {/* Featured Image - Wide but not full width */}
        {article.imageUrl && (
            <div className="max-w-5xl mx-auto px-4 mb-16">
                <div className="aspect-w-16 aspect-h-9 md:aspect-h-6 rounded-xl overflow-hidden shadow-2xl">
                    <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        )}

        {/* Content Section - Narrow column for readability */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
            {/* The Prose class does the magic here thanks to tailwind.config settings */}
            <div 
              className="prose prose-lg prose-slate mx-auto focus:outline-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Footer Note */}
            <div className="mt-16 p-8 bg-actalon-cream rounded-xl border border-actalon-gold/20 flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
               <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                   <div className="w-16 h-16 bg-actalon-navy rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl">
                       A
                   </div>
               </div>
               <div>
                   <h4 className="font-serif font-bold text-actalon-navy text-lg mb-2">Une question sur ce sujet ?</h4>
                   <p className="text-slate-600 text-sm italic mb-4">
                       Les informations juridiques évoluent. Cet article est donné à titre indicatif. Pour sécuriser votre situation, rien ne remplace un acte authentique.
                   </p>
                   <button onClick={onBack} className="text-actalon-gold font-bold text-sm hover:underline uppercase tracking-wider">
                       Prendre rendez-vous à l'étude
                   </button>
               </div>
            </div>
        </div>
      </article>
    </div>
  );
};