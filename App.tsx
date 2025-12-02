import React, { useState, useEffect } from 'react';
import { ViewState, BlogPost } from './types';
import { ArticleDetail } from './components/ArticleDetail';
import { AdminPanel } from './components/AdminPanel';
import { initialArticles } from './data/initialArticles';
import {
  ScaleIcon, HomeIcon, UsersIcon, CoinsIcon, ArrowRightIcon,
  PhoneIcon, MailIcon, ShieldIcon, ClockIcon, HeartIcon, CheckCircleIcon,
  MapPinIcon, BriefcaseIcon, LeafIcon, CalculatorIcon, NewspaperIcon, LockIcon
} from './components/Icons';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [currentArticle, setCurrentArticle] = useState<BlogPost | null>(null);

  // Load articles from LocalStorage or default to initial data
  useEffect(() => {
    const saved = localStorage.getItem('actalon_articles');
    if (saved) {
      try {
        setArticles(JSON.parse(saved));
      } catch (e) {
        setArticles(initialArticles);
      }
    } else {
      setArticles(initialArticles);
    }
  }, []);

  const handleUpdateArticles = (newArticles: BlogPost[]) => {
    setArticles(newArticles);
    localStorage.setItem('actalon_articles', JSON.stringify(newArticles));
  };

  const handleArticleClick = (article: BlogPost) => {
    setCurrentArticle(article);
    setView(ViewState.ARTICLE);
    window.scrollTo(0, 0);
  };

  const handleNavClick = (sectionId: string) => {
    if (view !== ViewState.HOME) {
      setView(ViewState.HOME);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Utilisation du scrollIntoView pour déclencher le scroll-margin-top
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Petit délai pour laisser le temps à la vue de changer
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = () => {
    setView(ViewState.HOME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Nav = () => (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div
            className="flex items-center cursor-pointer group"
            onClick={handleHomeClick}
          >
            {/* New PNG Logo */}
            <div className="w-14 h-14 mr-3">
              <img src="public/logo.png" alt="Logo Actalon" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-logo font-bold text-actalon-navy tracking-tight leading-none">Actalon</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-sans mt-1">Office Notarial</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => handleNavClick('etude')} className="nav-link text-sm font-medium text-slate-600 hover:text-actalon-navy hover:underline decoration-actalon-gold underline-offset-4">L'Étude</button>
            <button onClick={() => handleNavClick('expertises')} className="nav-link text-sm font-medium text-slate-600 hover:text-actalon-navy hover:underline decoration-actalon-gold underline-offset-4">Services</button>
            <button onClick={() => handleNavClick('tarifs')} className="nav-link text-sm font-medium text-slate-600 hover:text-actalon-navy hover:underline decoration-actalon-gold underline-offset-4">Tarifs</button>
            <button onClick={() => handleNavClick('blog')} className="nav-link text-sm font-medium text-slate-600 hover:text-actalon-navy hover:underline decoration-actalon-gold underline-offset-4">Actualités</button>
            <button onClick={() => handleNavClick('contact')} className="nav-link text-sm font-medium text-slate-600 hover:text-actalon-navy hover:underline decoration-actalon-gold underline-offset-4">Contact</button>
          </div>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <div className="relative bg-slate-900 min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="public/" // Confirmed path for image
          alt="Salon de Provence - Fontaine Moussue ou Place"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 border border-white/20 rounded-full mb-6 backdrop-blur-sm bg-white/5">
            <MapPinIcon className="w-4 h-4 text-actalon-gold mr-2" />
            <span className="text-slate-100 text-xs font-bold tracking-widest uppercase">Salon-de-Provence • Pays Salonais</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-logo font-bold text-white mb-6 leading-tight">
            Étude notariale <br />
            <span className="text-actalon-gold">Actalon</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed border-l-4 border-actalon-gold pl-6">
            Me Marie-Caroline LOUVEL vous accompagne en droit immobilier, famille et patrimoine.
            <br /><span className="text-sm opacity-80 mt-2 block"></span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-actalon-gold text-actalon-navy px-8 py-4 rounded-sm font-bold text-lg hover:bg-white transition-all shadow-lg"
            >
              Prendre rendez-vous
            </button>
            <button
              onClick={() => handleNavClick('expertises')}
              className="bg-transparent border border-white text-white px-8 py-4 rounded-sm font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all"
            >
              Accéder aux services
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-sm text-slate-400">
            <span className="flex items-center"><CheckCircleIcon className="w-4 h-4 mr-2 text-actalon-gold" /> Disponibilité</span>
            <span className="flex items-center"><CheckCircleIcon className="w-4 h-4 mr-2 text-actalon-gold" /> Transparence Tarifaire</span>
            <span className="flex items-center"><CheckCircleIcon className="w-4 h-4 mr-2 text-actalon-gold" /> Expertise Locale</span>
          </div>
        </div>
      </div>
    </div>
  );

  const Etude = () => (
    <section id="etude" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-actalon-gold/20 rounded-full z-0"></div>
            <img
              src="public/CaroNotaire.png" // Confirmed path for image
              alt="Me Marie-Caroline LOUVEL"
              className="relative z-10 w-full rounded-sm shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-lg border-l-4 border-actalon-gold max-w-xs z-20 hidden md:block">
              <p className="font-serif italic text-lg text-slate-700">"La confiance se bâtit sur la proximité et l'écoute."</p>
            </div>
          </div>

          <div className="md:w-1/2">
            <span className="text-actalon-gold font-bold tracking-widest text-sm uppercase">L'Étude</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-actalon-navy mt-4 mb-6">Me Marie-Caroline LOUVEL</h2>
            <div className="prose text-slate-600 mb-8">
              <p className="mb-4">
                Forte de <span className="font-semibold text-actalon-navy">25 ans d'expérience</span> en région parisienne, Maître Marie-Caroline LOUVEL a choisi de s'installer à Salon-de-Provence pour offrir une approche plus humaine et personnalisée du notariat.
              </p>
              <p>
                Actalon est une structure nouvelle, moderne, pensée pour vous accueillir sereinement. Nous mettons un point d'honneur à rendre le droit accessible grâce à une pédagogie claire et une réactivité sans faille.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start">
                <div className="bg-slate-100 p-3 rounded-full mr-4 text-actalon-navy"><ClockIcon className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-slate-800">Réactivité</h4>
                  <p className="text-sm text-slate-500">Prise de rendez-vous rapide et suivi rigoureux.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-slate-100 p-3 rounded-full mr-4 text-actalon-navy"><HeartIcon className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-slate-800">Proximité</h4>
                  <p className="text-sm text-slate-500">Un interlocuteur unique qui connaît votre dossier.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Services = () => (
    <section id="expertises" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-actalon-gold font-bold tracking-widest text-sm uppercase">Nos Services Notariaux</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-actalon-navy mt-3">Une expertise complète</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Immobilier */}
          <div className="bg-white p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <HomeIcon className="w-10 h-10 text-actalon-navy mb-6" />
            <h3 className="text-xl font-serif font-bold text-actalon-navy mb-3">Immobilier</h3>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              Sécurisez vos transactions. De la promesse de vente à l'acte authentique.
            </p>
            <ul className="text-sm text-slate-500 space-y-2 mb-6">
              <li>• Vente & Achat</li>
              <li>• Division parcellaire</li>
              <li>• Copropriété</li>
            </ul>
          </div>

          {/* Famille */}
          <div className="bg-white p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <UsersIcon className="w-10 h-10 text-actalon-navy mb-6" />
            <h3 className="text-xl font-serif font-bold text-actalon-navy mb-3">Famille</h3>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              Protégez vos proches à chaque étape de la vie.
            </p>
            <ul className="text-sm text-slate-500 space-y-2 mb-6">
              <li>• Mariage & PACS</li>
              <li>• Successions & Donations</li>
              <li>• Divorce & Partage</li>
            </ul>
          </div>

          {/* Patrimoine */}
          <div className="bg-white p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CoinsIcon className="w-10 h-10 text-actalon-navy mb-6" />
            <h3 className="text-xl font-serif font-bold text-actalon-navy mb-3">Patrimoine</h3>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              Optimisez la gestion et la transmission de vos biens.
            </p>
            <ul className="text-sm text-slate-500 space-y-2 mb-6">
              <li>• Stratégie de transmission</li>
              <li>• Assurance-vie</li>
              <li>• Fiscalité</li>
            </ul>
          </div>

          {/* Entreprise */}
          <div className="bg-white p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <BriefcaseIcon className="w-10 h-10 text-actalon-navy mb-6" />
            <h3 className="text-xl font-serif font-bold text-actalon-navy mb-3">Entreprise</h3>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              Accompagnement du chef d'entreprise et des sociétés.
            </p>
            <ul className="text-sm text-slate-500 space-y-2 mb-6">
              <li>• Cession de parts / fonds</li>
              <li>• Baux commerciaux</li>
              <li>• Statuts de société</li>
            </ul>
          </div>

          {/* Rural */}
          <div className="bg-white p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <LeafIcon className="w-10 h-10 text-actalon-navy mb-6" />
            <h3 className="text-xl font-serif font-bold text-actalon-navy mb-3">Rural & Viticole</h3>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              Expertise spécifique aux terres agricoles et domaines viticoles de Provence.
            </p>
            <ul className="text-sm text-slate-500 space-y-2 mb-6">
              <li>• Baux ruraux</li>
              <li>• Transmission d'exploitation</li>
              <li>• GFA</li>
            </ul>
          </div>

          {/* CTA Card */}
          <div className="bg-actalon-navy p-8 shadow-xl flex flex-col justify-center text-white">
            <h3 className="text-xl font-serif font-bold mb-4">Besoin d'un conseil ?</h3>
            <p className="text-slate-300 text-sm mb-6">
              Chaque situation est unique. Prenez rendez-vous pour une analyse personnalisée.
            </p>
            <button onClick={() => handleNavClick('contact')} className="w-full bg-actalon-gold text-actalon-navy py-3 font-bold rounded-sm hover:bg-white transition-colors">
              Prendre rendez-vous
            </button>
          </div>

        </div>
      </div>
    </section>
  );

  const Tarifs = () => (
    <section id="tarifs" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <CalculatorIcon className="w-12 h-12 text-actalon-gold mx-auto mb-6" />
        <h2 className="text-3xl font-serif font-bold text-actalon-navy mb-6">Transparence Tarifaire</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Le tarif du notaire est strictement réglementé pour la plupart des actes (ventes, successions, donations). On parle d'<strong>émoluments</strong> fixés par l'État.
          <br />
          Pour les prestations de conseil détachables (audit patrimonial, rédaction de statuts complexes), des <strong>honoraires</strong> libres sont pratiqués sur devis préalable.
        </p>
      </div>
    </section>
  );

  const Blog = () => (
    <section id="blog" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-actalon-gold font-bold tracking-widest text-sm uppercase">Actualités & Conseils</span>
            <h2 className="text-3xl font-serif font-bold text-actalon-navy mt-2">Dernières publications</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer" onClick={() => handleArticleClick(article)}>
              <div className="h-48 bg-slate-200 mb-4 overflow-hidden rounded-sm relative">
                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold text-actalon-navy uppercase tracking-wider z-10">{article.category}</div>
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-slate-300 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-slate-400">Pas d'image</div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex items-center text-xs text-slate-400 mb-2 space-x-2">
                <NewspaperIcon className="w-3 h-3" />
                <span>{article.date}</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-800 group-hover:text-actalon-gold transition-colors leading-tight">
                {article.title}
              </h3>
              {article.summary && <p className="text-sm text-slate-500 mt-2 line-clamp-2">{article.summary}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Contact = () => (
    <section id="contact" className="bg-actalon-navy py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          <div>
            <span className="text-actalon-gold font-bold tracking-widest text-sm uppercase mb-2 block">Contact</span>
            <h2 className="text-4xl font-serif font-bold mb-8">Nous rencontrer</h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <MapPinIcon className="w-6 h-6 text-actalon-gold mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold">L'Étude</h4>
                  <p className="text-slate-300">436 boulevard de la République</p>
                  <p className="text-slate-300">13300 Salon-de-Provence</p>
                  <p className="text-sm text-slate-400 mt-2 italic">Parking public "L'Empéri" à proximité.</p>
                </div>
              </div>

              <div className="flex items-start">
                <PhoneIcon className="w-6 h-6 text-actalon-gold mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold">Téléphone</h4>
                  <p className="text-slate-300 text-xl">04 65 26 04 90</p>
                  <p className="text-sm text-slate-400">Du Lundi au Vendredi : 9h00-12h30 / 14h00-18h00</p>
                </div>
              </div>

              <div className="flex items-start">
                <MailIcon className="w-6 h-6 text-actalon-gold mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold">Email</h4>
                  <p className="text-slate-300 text-sm break-all">act@actalon.notaires.fr</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-slate-800 p-8 md:p-10 rounded-sm shadow-2xl">
            <h3 className="text-2xl font-serif font-bold mb-6">Envoyez-nous un message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nom" className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-none focus:border-actalon-navy rounded-sm" />
                <input type="text" placeholder="Prénom" className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-none focus:border-actalon-navy rounded-sm" />
              </div>
              <input type="email" placeholder="Email" className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-none focus:border-actalon-navy rounded-sm" />
              <input type="tel" placeholder="Téléphone" className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-none focus:border-actalon-navy rounded-sm" />
              <textarea rows={4} placeholder="Votre demande..." className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-none focus:border-actalon-navy rounded-sm"></textarea>
              <button className="w-full bg-actalon-navy text-white font-bold py-4 hover:bg-slate-800 transition-colors rounded-sm">
                Envoyer
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 font-light text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-logo font-bold text-white tracking-wide mb-4">Actalon</h2>
            <p className="opacity-70">Office Notarial à Salon-de-Provence.</p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavClick('expertises')} className="hover:text-actalon-gold text-left">Immobilier</button></li>
              <li><button onClick={() => handleNavClick('expertises')} className="hover:text-actalon-gold text-left">Famille</button></li>
              <li><button onClick={() => handleNavClick('expertises')} className="hover:text-actalon-gold text-left">Entreprise</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-actalon-gold">Mentions Légales</a></li>
              <li><button onClick={() => handleNavClick('tarifs')} className="hover:text-actalon-gold text-left">Honoraires</button></li>
              <li><a href="#" className="hover:text-actalon-gold">Confidentialité</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">Horaires</h4>
            <p>Lun - Ven : 9h - 18h</p>
            <p>Sam : Sur rendez-vous</p>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-slate-900 flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Actalon Notaires. Tous droits réservés.</p>
          <button
            onClick={() => setView(ViewState.ADMIN)}
            className="text-slate-800 hover:text-slate-600 p-1"
            title="Espace Administration"
          >
            <LockIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );

  if (view === ViewState.ADMIN) {
    return (
      <AdminPanel
        articles={articles}
        onUpdateArticles={handleUpdateArticles}
        onClose={handleHomeClick}
      />
    );
  }

  if (view === ViewState.ARTICLE && currentArticle) {
    return (
      <>
        <Nav />
        <ArticleDetail article={currentArticle} onBack={handleHomeClick} />
        <Footer />
      </>
    );
  }


  // Home View
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Nav />

      <main className="flex-grow">
        <Hero />
        <Etude />
        <Services />
        <Tarifs />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;