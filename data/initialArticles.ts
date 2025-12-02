import { BlogPost } from '../types';

export const initialArticles: BlogPost[] = [
  {
    id: '1',
    title: "Achat immobilier à Salon-de-Provence : étapes et conseils",
    category: "Immobilier",
    date: "12 Oct 2023",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    summary: "Le marché immobilier du Pays Salonais est dynamique. Découvrez les étapes clés pour sécuriser votre acquisition, de l'offre d'achat à la signature définitive.",
    content: `
      <p>Acheter à <strong>Salon-de-Provence</strong>, Pélissanne ou Lançon-Provence demande une bonne réactivité. Le marché est dynamique, notamment sur les biens familiaux avec extérieur. Cependant, la précipitation ne doit pas exclure la prudence juridique.</p>
      
      <h2>1. L'offre d'achat : un engagement ferme</h2>
      <p>Contrairement aux idées reçues, l'offre d'achat vous engage dès qu'elle est contresignée par le vendeur. Ne la rédigez pas à la légère. Il est recommandé de mentionner les conditions suspensives (obtention de prêt) dès ce stade pour éviter tout blocage futur.</p>
      
      <blockquote>
        "Une offre d'achat acceptée vaut vente. Le notaire intervient pour sécuriser cet accord et le transformer en acte juridique solide."
      </blockquote>

      <h2>2. Le compromis de vente : l'étape clé</h2>
      <p>C'est ici que tout se joue. Le notaire va vérifier l'ensemble des pièces administratives et juridiques du bien :</p>
      <ul>
        <li>L'origine de propriété sur trente ans (titre trentenaire).</li>
        <li>Les servitudes éventuelles (droit de passage, canalisations enterrées).</li>
        <li>Les règles d'urbanisme (zone inondable, alignement, PLU).</li>
        <li>Les diagnostics techniques obligatoires (DPE, amiante, plomb, électricité).</li>
      </ul>
      <p>À Salon, une attention particulière est portée aux risques naturels (inondation) et aux règlements de copropriété parfois anciens dans le centre historique.</p>
      
      <h2>3. Le financement et l'acte authentique</h2>
      <p>Une fois le prêt obtenu (comptez généralement 45 à 60 jours), nous fixons la date de signature définitive. C'est à ce moment précis que s'opère le transfert de propriété, le paiement du prix et la remise des clés.</p>
      
      <p><strong>Le conseil d'Actalon :</strong> N'attendez pas le compromis pour consulter votre notaire. Nous pouvons analyser le dossier dès la visite pour anticiper les éventuelles difficultés.</p>
    `
  },
  {
    id: '2',
    title: "Succession : comment préparer sereinement sa transmission ?",
    category: "Famille",
    date: "28 Sept 2023",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    summary: "Anticiper sa succession permet de protéger ses proches et de limiter la fiscalité. Testament, donation, assurance-vie : quels outils choisir ?",
    content: `
      <h2>Pourquoi est-il crucial d'anticiper ?</h2>
      <p>La loi française prévoit une répartition par défaut de votre patrimoine (la dévolution légale). Si celle-ci ne vous convient pas — par exemple pour protéger un partenaire de PACS, un concubin, ou avantager un enfant plus vulnérable — vous devez agir de votre vivant.</p>
      
      <h3>Le Testament : la pierre angulaire</h3>
      <p>Le testament-partage ou le legs permet de choisir précisément qui recevra quoi. Nous recommandons vivement le <strong>testament authentique</strong> (dicté à deux notaires ou un notaire et deux témoins). Contrairement au testament olographe (écrit seul), il est quasiment incontestable et ne risque pas d'être perdu.</p>
      
      <h3>La Donation au dernier vivant</h3>
      <p>Indispensable pour les couples mariés, elle permet au conjoint survivant d'avoir un choix plus large sur la succession :</p>
      <ul>
        <li>La totalité en usufruit (usage des biens jusqu'à la fin de sa vie).</li>
        <li>1/4 en pleine propriété et 3/4 en usufruit.</li>
        <li>La quotité disponible ordinaire en pleine propriété.</li>
      </ul>
      <p>Sans cet acte, les droits du conjoint peuvent être limités, surtout en présence d'enfants issus d'une autre union.</p>
      
      <blockquote>
        "Préparer sa succession, ce n'est pas penser à sa mort, c'est penser à la paix de sa famille."
      </blockquote>

      <h3>L'Assurance-Vie</h3>
      <p>C'est un outil "hors succession" très puissant fiscalement. Il permet de transmettre jusqu'à <strong>152 500 € par bénéficiaire</strong> sans aucun impôt (pour les primes versées avant 70 ans). C'est le complément idéal aux outils notariaux classiques.</p>
    `
  },
  {
    id: '3',
    title: "Donation : quelles stratégies fiscales pour 2025 ?",
    category: "Patrimoine",
    date: "15 Sept 2023",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    summary: "Transmettre de son vivant permet d'aider ses enfants tout en bénéficiant d'abattements fiscaux renouvelables. Le point sur la donation-partage et le démembrement.",
    content: `
      <h2>L'abattement fiscal : le compteur tourne</h2>
      <p>Le principe est simple mais puissant : chaque parent peut donner à chaque enfant <strong>100 000 € tous les 15 ans</strong> sans payer aucun droit de donation à l'État. Pour un couple avec deux enfants, c'est donc une enveloppe globale de 400 000 € qui peut être transmise en franchise d'impôt.</p>
      
      <h3>Le don de somme d'argent (dit "Don Sarkozy")</h3>
      <p>En plus de l'abattement classique, vous pouvez donner <strong>31 865 €</strong> en argent (chèque, virement) si vous avez moins de 80 ans et que le bénéficiaire est majeur. C'est un levier idéal pour aider un enfant à constituer un apport personnel pour un premier achat immobilier.</p>
      
      <h2>La donation avec réserve d'usufruit</h2>
      <p>C'est la stratégie reine en gestion de patrimoine immobilier. Le mécanisme est le suivant :</p>
      <ol>
          <li>Vous donnez la "nue-propriété" de votre résidence (les murs).</li>
          <li>Vous en gardez l'"usufruit" (le droit d'y habiter ou de percevoir les loyers).</li>
      </ol>
      
      <blockquote>
        "Le démembrement de propriété permet de réduire la base taxable de 40% à 50% selon votre âge au moment de la donation."
      </blockquote>

      <p><strong>Avantages majeurs :</strong></p>
      <ul>
        <li>Vous restez chez vous sans changement.</li>
        <li>Les droits de donation sont calculés sur une valeur réduite.</li>
        <li>Au moment du décès, les enfants récupèrent l'usufruit gratuitement : ils deviennent pleins propriétaires sans payer d'impôt supplémentaire.</li>
      </ul>
      
      <p>Attention, chaque situation familiale est unique. Un audit patrimonial est nécessaire avant de signer pour vérifier que vous ne vous démunissez pas excessivement.</p>
    `
  }
];