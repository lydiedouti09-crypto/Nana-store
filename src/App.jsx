import React, { useEffect, useState } from 'react';
import nanaLogo from '../WhatsApp Image 2026-10-11 at 19.21.01.jpeg';
import homeSlideOne from "../image de page d'accueil/WhatsApp Image 2026-10-11 at 19.17.52 (2).jpeg";
import homeSlideTwo from "../image de page d'accueil/WhatsApp Image 2026-10-11 at 19.17.53 (1).jpeg";
import homeSlideThree from "../image de page d'accueil/WhatsApp Image 2026-10-18 at 18.19.01.jpeg";
import homeSlideFour from "../image de page d'accueil/WhatsApp Image 2026-10-18 at 18.19.05.jpeg";
import homeSlideFive from "../image de page d'accueil/WhatsApp Image 2026-10-18 at 18.19.05 (1).jpeg";
import homeSlideSix from "../image de page d'accueil/WhatsApp Image 2026-10-18 at 18.19.06.jpeg";
import shoeCampusGrey from '../imaage de chaussures/WhatsApp Image 2026-10-18 at 18.08.35.jpeg';
import shoeSambaBlack from '../imaage de chaussures/WhatsApp Image 2026-10-18 at 18.08.39 (3).jpeg';
import shoeSambaPink from '../imaage de chaussures/WhatsApp Image 2026-10-18 at 18.08.40 (1).jpeg';
import shoeAirBlack from '../imaage de chaussures/WhatsApp Image 2026-10-18 at 18.10.16.jpeg';
import shoeAsicsKhaki from '../imaage de chaussures/WhatsApp Image 2026-10-18 at 18.10.19.jpeg';
import shoeTrailBlack from '../imaage de chaussures/WhatsApp Image 2026-10-18 at 18.10.20.jpeg';
import shoeLeCoqBeige from '../imaage de chaussures/WhatsApp Image 2026-10-18 at 18.10.36.jpeg';
import shoeCampusBrown from '../imaage de chaussures/WhatsApp Image 2026-10-18 at 18.19.08.jpeg';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Play,
  X,
} from 'lucide-react';

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '+228 97 17 32 32').replace(/\D/g, '');
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'bonjour@nanastore.sn';
const whatsappMessage = 'Bonjour Nana Store, je souhaite en savoir plus sur votre sélection.';
const storeAddress = 'Lomé, Togo';
const mapQuery = encodeURIComponent(storeAddress);
const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=14&output=embed`;
const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

function whatsappUrl(message) {
  const query = `text=${encodeURIComponent(message)}`;
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber}?${query}`
    : `https://api.whatsapp.com/send?${query}`;
}

const heroSlides = [homeSlideOne, homeSlideTwo, homeSlideThree, homeSlideFour, homeSlideFive, homeSlideSix]
  .map((image, index) => ({ image, alt: `Chaussures de la sélection Nana Store, modèle ${index + 1}` }));

const shoeProducts = [
  { name: 'Campus gris & blanc', image: shoeCampusGrey, alt: 'Sneakers Campus grises et blanches' },
  { name: 'Samba noir cœur', image: shoeSambaBlack, alt: 'Sneakers noires avec détails cœur' },
  { name: 'Samba blanc & rose', image: shoeSambaPink, alt: 'Sneakers blanches et roses' },
  { name: 'Basket noire & blanche', image: shoeAirBlack, alt: 'Baskets de sport noires et blanches' },
  { name: 'Asics rétro kaki', image: shoeAsicsKhaki, alt: 'Sneakers rétro grises et kaki' },
  { name: 'Trail noir imperméable', image: shoeTrailBlack, alt: 'Baskets de trail noires' },
  { name: 'Sneaker beige & camel', image: shoeLeCoqBeige, alt: 'Sneakers beige et camel' },
  { name: 'Campus marron', image: shoeCampusBrown, alt: 'Sneakers Campus marron et blanc' },
];

const shoePhotoEntries = Object.entries(import.meta.glob('../imaage de chaussures/*.jpeg', {
  eager: true,
  import: 'default',
})).sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath));
const namedShoeProducts = new Map(shoeProducts.map((product) => [product.image, product]));
const collectionProducts = shoePhotoEntries.map(([path, image]) => {
  const fileName = path.split('/').pop() || '';
  const reference = fileName.replace('WhatsApp Image 2026-10-18 at ', '').replace('.jpeg', '');
  return namedShoeProducts.get(image) || {
    image,
    reference,
    alt: 'Chaussure de la collection Nana Store',
  };
});
const featuredProducts = shoeProducts.slice(0, 4);

function WhatsAppLink({ children, className = '', productName, reference }) {
  const message = productName
    ? `Bonjour Nana Store, je suis intéressé(e) par : ${productName}.`
    : reference
      ? `Bonjour Nana Store, je voudrais des informations sur le modèle de référence ${reference}.`
    : whatsappMessage;

  return (
    <a
      className={className}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label={productName
        ? `Demander des informations sur ${productName} sur WhatsApp`
        : reference
          ? `Demander des informations sur le modèle ${reference} sur WhatsApp`
          : undefined}
    >
      {children}
    </a>
  );
}

function ShoeCard({ product }) {
  return (
    <article className="product-item">
      <WhatsAppLink className="product-image-link" productName={product.name} reference={product.reference}>
        <img src={product.image} alt={product.alt} loading="lazy" />
        <span className="product-quick-link">Demander la disponibilité <ArrowUpRight size={16} /></span>
      </WhatsAppLink>
      {product.name && (
        <div className="product-details">
          <div className="product-title-row">
            <h3>{product.name}</h3>
          <WhatsAppLink className="product-arrow" productName={product.name} aria-label={`Contacter Nana Store pour ${product.name}`}>
            <ArrowUpRight size={18} />
          </WhatsAppLink>
        </div>
        </div>
      )}
    </article>
  );
}

function BrandMark() {
  return (
    <a className="brand" href="#accueil" aria-label="Nana Store, accueil">
      <img className="brand-logo" src={nanaLogo} alt="Nana Store — La qualité au petit prix" />
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showShoesPage, setShowShoesPage] = useState(() => window.location.hash === '#chaussures');
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    function syncPageWithHash() {
      setShowShoesPage(window.location.hash === '#chaussures');
    }

    window.addEventListener('hashchange', syncPageWithHash);
    return () => window.removeEventListener('hashchange', syncPageWithHash);
  }, []);

  useEffect(() => {
    if (!heroPlaying || heroSlides.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [heroPlaying]);

  function showFullCollection() {
    setShowShoesPage(true);
    window.location.hash = 'chaussures';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function returnToCollection() {
    setShowShoesPage(false);
    window.history.pushState(null, '', '#produits');
    window.setTimeout(() => document.querySelector('#produits')?.scrollIntoView({ behavior: 'smooth' }), 0);
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navigation principale">
            <a href="#accueil" onClick={() => { setShowShoesPage(false); setMenuOpen(false); }}>Accueil</a>
            <a href="#produits" onClick={() => { setShowShoesPage(false); setMenuOpen(false); }}>La collection</a>
            <a href="#contact" onClick={() => { setShowShoesPage(false); setMenuOpen(false); }}>Contact</a>
          </nav>
          <WhatsAppLink className="button button-primary header-contact">
            <MessageCircle size={17} />
            <span>WhatsApp</span>
          </WhatsAppLink>
        </div>
      </header>

      <main>
        {showShoesPage ? (
          <section className="shoe-catalog-page">
            <div className="page-width">
              <button className="shoe-back-button" type="button" onClick={returnToCollection}>
                <ArrowLeft size={17} /> Retour à la collection
              </button>
              <div className="shoe-page-heading">
                <p className="eyebrow">LA SÉLECTION NANA STORE</p>
                <h1>La collection sneakers</h1>
                <p>Des modèles choisis pour le quotidien, le sport et les petits pas.</p>
              </div>
              <div className="product-grid">
                {collectionProducts.map((product) => <ShoeCard key={product.image} product={product} />)}
              </div>
            </div>
          </section>
        ) : (
          <>
        <section className="hero" id="accueil" aria-label="Bienvenue chez Nana Store">
          <div className="hero-slides" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <img
                className={index === activeHeroSlide ? 'hero-background is-active' : 'hero-background'}
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
              />
            ))}
          </div>
          <div className="hero-content page-width">
            <p className="hero-eyebrow"><span /> NANA STORE <span className="hero-location">Lomé, Togo</span></p>
            <h1>La collection<br /><em>sneakers.</em></h1>
            <p className="hero-description">
              Ville · Sport · Enfant
            </p>
            <div className="hero-actions">
              <button className="hero-button hero-button-light" type="button" onClick={showFullCollection}>
                Voir les modèles <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="hero-carousel-controls" aria-label="Commandes du diaporama">
            <button
              className="hero-carousel-arrow"
              type="button"
              aria-label="Image précédente"
              onClick={() => setActiveHeroSlide((activeHeroSlide - 1 + heroSlides.length) % heroSlides.length)}
            >
              <ChevronLeft size={19} />
            </button>
            <div className="hero-carousel-dots" aria-label={`Image ${activeHeroSlide + 1} sur ${heroSlides.length}`}>
              {heroSlides.map((slide, index) => (
                <button
                  className={index === activeHeroSlide ? 'hero-carousel-dot is-active' : 'hero-carousel-dot'}
                  key={slide.image}
                  type="button"
                  aria-label={`Afficher l'image ${index + 1}`}
                  aria-current={index === activeHeroSlide ? 'true' : undefined}
                  onClick={() => setActiveHeroSlide(index)}
                />
              ))}
            </div>
            <button
              className="hero-carousel-arrow"
              type="button"
              aria-label="Image suivante"
              onClick={() => setActiveHeroSlide((activeHeroSlide + 1) % heroSlides.length)}
            >
              <ChevronRight size={19} />
            </button>
            <button
              className="hero-carousel-arrow hero-carousel-play"
              type="button"
              aria-label={heroPlaying ? 'Mettre le diaporama en pause' : 'Reprendre le diaporama'}
              onClick={() => setHeroPlaying((playing) => !playing)}
            >
              {heroPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>
          </div>
        </section>

        <section className="products-section section-space" id="produits">
          <div className="page-width">
            <div className="section-heading products-heading">
              <div>
                <p className="eyebrow">NANA STORE · SNEAKERS</p>
                <h2>Les modèles du moment</h2>
              </div>
              <p className="section-aside">Une sélection courte. Des paires faites pour être portées.</p>
            </div>
            <div className="product-grid">
              {featuredProducts.map((product) => <ShoeCard key={product.name} product={product} />)}
            </div>
            <div className="collection-actions">
              <button className="button button-dark" type="button" onClick={showFullCollection}>
                Toute la collection <ArrowRight size={17} />
              </button>
              <span>{shoeProducts.length} modèles sélectionnés</span>
            </div>
          </div>
        </section>

        <section className="location-section" id="localisation">
          <div className="location-inner page-width">
            <div className="location-copy">
              <p className="eyebrow">NANA STORE · TOGO</p>
              <h2>Retrouvez-nous à Lomé.</h2>
              <p>Une question sur une paire ou sa disponibilité ? Écrivez-nous avant votre visite.</p>
              <WhatsAppLink className="button button-primary location-contact">
                <MessageCircle size={17} /> Contacter la boutique
              </WhatsAppLink>
              <a className="location-directions" href={mapLinkUrl} target="_blank" rel="noreferrer">
                <MapPin size={16} /> Voir l’itinéraire
              </a>
            </div>
            <div className="map-embed">
              <iframe
                title="Localisation de Nana Store à Lomé, Togo"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-inner page-width">
          <div className="footer-brand-block">
            <div className="footer-brand-row">
              <a className="footer-logo" href="#accueil" aria-label="Nana Store, accueil">
                <img src={nanaLogo} alt="" />
              </a>
              <div>
                <a className="footer-brand" href="#accueil">Nana store</a>
                <p className="footer-brand-tagline">La qualité au petit prix</p>
              </div>
            </div>
            <p className="footer-manifesto">Sneakers sélectionnées avec soin à Lomé.</p>
          </div>
          <div className="footer-column">
            <h2 className="footer-title">Une question ?</h2>
            <a className="footer-link" href="tel:+22897173232">+228 97 17 32 32</a>
            <a className="footer-link" href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <nav className="footer-column footer-nav" aria-label="Navigation de pied de page">
            <h2 className="footer-title">Navigation</h2>
            <a href="#produits">La collection</a>
            <button type="button" onClick={showFullCollection}>Tous les modèles</button>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Nana Store. Tous droits réservés.</span>
          </div>
        </div>
      </footer>
      <a
        className="floating-whatsapp"
        href={whatsappUrl(whatsappMessage)}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter Nana Store sur WhatsApp"
      >
        <MessageCircle size={21} />
        <span>WhatsApp</span>
      </a>
    </>
  );
}

export default App;