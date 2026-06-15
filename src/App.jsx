import React, { useState, useEffect, useRef } from 'react';

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Fade = ({ children, delay = 0, className = '' }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ transition: `opacity 700ms ${delay}ms, transform 700ms ${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}>
      {children}
    </div>
  );
};

const Diamond = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block mx-3">
    <rect x="6" y="0.5" width="7.78" height="7.78" transform="rotate(45 6 0.5)" fill="#C4A882" fillOpacity="0.6" />
  </svg>
);

const Rule = () => (
  <div className="flex items-center justify-center my-8">
    <div className="flex-1 h-px bg-[#C4A882] opacity-40" />
    <Diamond />
    <div className="flex-1 h-px bg-[#C4A882] opacity-40" />
  </div>
);

const Stars = ({ n = 4 }) => (
  <div className="flex gap-1 justify-center my-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? '#C4A882' : 'none'} stroke="#C4A882" strokeWidth="1.5">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '', date: '', type: 'kamer' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [['Over ons', '#intro'], ['Diensten', '#diensten'], ['Middagthee', '#thee'], ['Kamers', '#kamers'], ['Contact', '#contact']];
  const btn = 'inline-flex items-center gap-2 bg-[#8B6F47] text-[#F7F3EE] font-inter text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#2C2420] transition-all duration-500 ease-in-out shadow-sm hover:shadow-md';
  const btnOut = 'inline-flex items-center gap-2 border border-[#8B6F47] text-[#8B6F47] text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#8B6F47] hover:text-[#F7F3EE] transition-all duration-500 ease-in-out';
  const inp = 'w-full bg-[#F7F3EE] border border-[#C4A882]/40 rounded-xl px-5 py-4 text-[#2C2420] text-sm placeholder:text-[#8C7B6E] focus:outline-none focus:border-[#8B6F47] focus:ring-1 focus:ring-[#8B6F47]/30 transition-all duration-300';

  return (
    <div className="font-sans text-[#2C2420] bg-[#F7F3EE]" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#F7F3EE] shadow-sm border-b border-[#C4A882]/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <a href="#hero" style={{ fontFamily: "'Cormorant Garamond', serif" }} className={`text-xl md:text-2xl font-medium tracking-wide ${scrolled ? 'text-[#2C2420]' : 'text-[#F7F3EE]'}`}>Hotel Cardiff</a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(([l, h]) => (
              <a key={h} href={h} className={`text-xs tracking-widest uppercase transition-colors duration-300 hover:text-[#8B6F47] ${scrolled ? 'text-[#2C2420]' : 'text-[#F7F3EE]'}`}>{l}</a>
            ))}
            <a href="#contact" className="inline-flex items-center text-xs tracking-widest uppercase bg-[#8B6F47] text-[#F7F3EE] px-6 py-3 rounded-full hover:bg-[#2C2420] transition-all duration-500">Reserveer</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden flex flex-col gap-1.5 p-2 ${scrolled ? 'text-[#2C2420]' : 'text-[#F7F3EE]'}`}>
            {[0, 1, 2].map(i => (
              <span key={i} className="block w-6 h-px bg-current transition-all duration-300" style={{ transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px,4px)' : menuOpen && i === 1 ? 'scaleX(0)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
            ))}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#F7F3EE] border-t border-[#C4A882]/20 px-6 py-6 flex flex-col gap-4">
            {navLinks.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[#2C2420] hover:text-[#8B6F47]">{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=85" alt="Hotel Cardiff" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C2420]/70 via-[#2C2420]/30 to-transparent" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <Fade>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-5xl md:text-7xl font-light text-[#F7F3EE] leading-tight mb-4">
              Aan de kust,<br /><em>een ogenblik voor uzelf</em>
            </h1>
          </Fade>
          <Fade delay={150}>
            <p className="text-[#F7F3EE]/80 font-light text-base md:text-lg mb-10 tracking-wide">Gastvrij onthaal in het hart van Oostende, op stap van de Noordzee.</p>
          </Fade>
          <Fade delay={250}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#kamers" className={btn}>Een kamer boeken</a>
              <a href="#thee" className={`${btnOut} text-[#F7F3EE] border-[#F7F3EE]/60 hover:bg-[#F7F3EE] hover:text-[#2C2420]`}>Middagthee reserveren</a>
            </div>
          </Fade>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-[#F7F3EE]/40" />
        </div>
      </section>

      {/* INTRO */}
      <section id="intro" className="py-24 px-6 md:px-12 lg:px-20 bg-[#F7F3EE] max-w-3xl mx-auto text-center">
        <Rule />
        <Fade>
          <p className="text-xs tracking-widest uppercase text-[#8C7B6E] mb-6">Sint-Sebastiaansstraat 4 · Oostende</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl md:text-3xl font-light text-[#2C2420] leading-relaxed">
            Hotel Cardiff is een rustig onderkomen aan de Belgische kust — een plek waar de tijd iets langzamer lijkt te gaan, het ontbijt de dag een goede start geeft, en een goed gezette kop thee meer zegt dan woorden.
          </p>
        </Fade>
        <Fade delay={150}>
          <blockquote style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light italic text-[#8B6F47] mt-10 leading-snug">
            "Een kleine luxe die blijft hangen."
          </blockquote>
        </Fade>
        <Rule />
      </section>

      {/* SERVICES */}
      <section id="diensten" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <Fade><h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light text-center mb-16">Wat wij u aanbieden</h2></Fade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏨', title: 'Hotelkamers', desc: 'Rustige kamers met zorg ingericht, op loopafstand van het strand en de Oostendse binnenstad.' },
              { icon: '🍵', title: 'Middagthee', desc: 'Een verfijnd thee-moment met huisgemaakte gebakjes, scones en zachte sandwiches — elke dag van de week.' },
              { icon: '🍳', title: 'Ontbijt', desc: 'Een warme start van de dag met verse producten, brood van de bakker en Belgische kazen.' },
              { icon: '🍷', title: 'Lounge & dining', desc: 'Geniet van een lichte lunch of avondmaaltijd in onze sfeervolle lounge, met een selectie regionale wijnen.' },
              { icon: '🎉', title: 'Evenementen', desc: 'Kleine bijeenkomsten, verjaardagen of zakelijke ontmoetingen — wij ontvangen u met aandacht voor detail.' },
              { icon: '📅', title: 'Kamerboeking', desc: 'Reserveer eenvoudig via ons contactformulier of bel ons rechtstreeks op 059 70 28 98.' },
            ].map(({ icon, title, desc }) => (
              <Fade key={title}>
                <div className="bg-white rounded-xl p-8 md:p-10 shadow-[0_2px_24px_rgba(44,36,32,0.07)] hover:shadow-[0_8px_40px_rgba(44,36,32,0.12)] transition-shadow duration-500 border border-[#C4A882]/20 h-full">
                  <div className="text-3xl mb-4">{icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-medium mb-2 tracking-wide">{title}</h3>
                  <p className="text-[#8C7B6E] text-sm leading-relaxed">{desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* AFTERNOON TEA */}
      <section id="thee" className="py-32 px-6 md:px-12 lg:px-20 bg-[#F7F3EE]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Fade>
            <div className="overflow-hidden rounded-xl aspect-[4/5] group">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85" alt="Middagthee bij Hotel Cardiff" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
            </div>
          </Fade>
          <Fade delay={150}>
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-[0_2px_24px_rgba(44,36,32,0.07)] border border-[#C4A882]/20">
              <p className="text-xs tracking-widest uppercase text-[#8C7B6E] mb-4">Dagelijks · 14:00 – 17:00</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light leading-tight mb-6">Een kopje thee<br /><em>en stilte</em></h2>
              <p className="text-[#8C7B6E] text-sm leading-relaxed mb-8">Onze middagthee is met zorg samengesteld — een moment van rust dat u uitnodigt om even stil te staan. Bij Hotel Cardiff schenken wij thee zoals het hoort: rustig, met aandacht, en met gebak dat die middag is bereid.</p>
              <ul className="space-y-3 mb-8">
                {['Selectie van losse theesoorten uit eigen collectie', 'Huisgemaakte scones met clotted cream en confiture', 'Fijne sandwiches met Belgische charcuterie', 'Seizoensgebonden petit fours en macarons'].map(i => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#2C2420]">
                    <span className="text-[#C4A882] mt-0.5">◆</span>{i}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={btn}>Reserveer uw thee-moment</a>
            </div>
          </Fade>
        </div>
      </section>

      {/* ROOMS */}
      <section id="kamers" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <Fade><h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light text-center mb-20">Een kamer die u verwelkomt</h2></Fade>
          {[
            { name: 'Kuststandaard', desc: 'Een rustige kamer met warm ingericht interieur, comfortabel bed en uitzicht op de straten van Oostende. Ideaal voor een kort verblijf aan de kust.', price: 'Vanaf €89', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=85', reverse: false },
            { name: 'Cardiff Suite', desc: 'Een ruimere kamer met aparte zithoek en zachte verlichting. Voor wie iets meer rust en ruimte zoekt na een dag langs de Noordzee.', price: 'Vanaf €139', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=85', reverse: true },
          ].map(({ name, desc, price, img, reverse }) => (
            <Fade key={name}>
              <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center mb-24`}>
                <div className="w-full md:w-1/2 overflow-hidden rounded-xl group aspect-[16/9]">
                  <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl md:text-4xl font-light italic mb-3">{name}</h3>
                  <p className="text-[#8C7B6E] text-sm leading-relaxed mb-4">{desc}</p>
                  <p className="text-[#C4A882] font-medium text-base mb-6">{price}</p>
                  <a href="#contact" className={btnOut}>Kamer bekijken</a>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#F7F3EE]">
        <div className="max-w-5xl mx-auto text-center">
          <Fade>
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-[#C4A882]/20 mb-16">
              <Stars n={4} />
              <span className="text-sm text-[#8C7B6E]">4/5 op Google · 247 beoordelingen</span>
            </div>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { quote: 'De middagthee was een aangename verrassing — met zorg bereid en in een sfeer die je meteen op je gemak stelt.', name: 'Lieselot V., Gent' },
              { quote: 'Hotel Cardiff heeft de warmte van een gastvrij onthaal. Klein, verzorgd, oprecht. Precies wat je zoekt aan de kust.', name: 'Marc D., Brussel' },
              { quote: 'Een rustig verblijf met een goed ontbijt. De ligging is ideaal — het strand op vijf minuten wandelen.', name: 'Sofie en Jan, Antwerpen' },
            ].map(({ quote, name }) => (
              <Fade key={name}>
                <div className="bg-white rounded-xl p-8 shadow-[0_2px_24px_rgba(44,36,32,0.07)] border border-[#C4A882]/20">
                  <blockquote style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl italic text-[#2C2420] leading-relaxed mb-4">"{quote}"</blockquote>
                  <Stars n={4} />
                  <p className="text-xs text-[#8C7B6E] tracking-wide mt-2">{name}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="locatie" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <Fade><p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-center text-2xl font-light italic text-[#8B6F47] mb-16">Op steenworp afstand van de Noordzee, in het hart van Oostende.</p></Fade>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <Fade>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light mb-6">Hoe u ons vindt</h2>
                <div className="space-y-4 text-sm text-[#8C7B6E] leading-relaxed">
                  <p>📍 Sint-Sebastiaansstraat 4, 8400 Oostende, België</p>
                  <p>📞 059 70 28 98</p>
                  <p>🕑 Middagthee: dagelijks 14:00 – 17:00<br />Ontbijt: 7:30 – 10:30 · Lounge: 12:00 – 21:00</p>
                  <p>🚉 Op 10 minuten wandelen van station Oostende-Centraal.<br />Bushalte aan de hoek van de straat. Parkeren mogelijk in de buurt.</p>
                </div>
              </div>
            </Fade>
            <Fade delay={150}>
              <div className="rounded-xl overflow-hidden aspect-[16/9] shadow-sm">
                <iframe title="Hotel Cardiff locatie" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2500.45!2d2.9145!3d51.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dcca7eee47f40b%3A0x6bba87bdb92d8e9c!2sSint-Sebastiaansstraat%204%2C%208400%20Oostende!5e0!3m2!1snl!2sbe!4v1699999999999" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 bg-[#F7F3EE]">
        <div className="max-w-2xl mx-auto">
          <Fade>
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-[0_2px_24px_rgba(44,36,32,0.07)] border border-[#C4A882]/20">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl font-light text-center mb-2">Neem contact op</h2>
              <p className="text-center text-[#8C7B6E] text-sm mb-8">Wij antwoorden u binnen één werkdag — met alle aandacht die uw vraag verdient.</p>
              <form onSubmit={e => e.preventDefault()} className="space-y-4">
                <input className={inp} placeholder="Uw naam" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input type="email" className={inp} placeholder="E-mailadres" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <input type="date" className={inp} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                <select className={inp} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="kamer">Kamerboeking</option>
                  <option value="thee">Middagthee</option>
                  <option value="evenement">Evenement</option>
                  <option value="overig">Overige vraag</option>
                </select>
                <textarea className={`${inp} min-h-[120px] resize-none`} placeholder="Uw bericht" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                <button type="submit" className={`${btn} w-full justify-center mt-2`}>Verstuur uw bericht</button>
              </form>
            </div>
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C2420] pt-16 pb-8 px-6 md:px-12 lg:px-20">
        <div className="h-px bg-[#C4A882] opacity-40 mb-12" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#F7F3EE] mb-3">Hotel Cardiff</h2>
            <p className="text-[#8C7B6E] text-sm leading-relaxed">Een gastvrij onthaal aan de kust van Oostende, sinds jaar en dag.</p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-[#8C7B6E] mb-4">Navigatie</p>
            <div className="flex flex-col gap-2">
              {navLinks.map(([l, h]) => (
                <a key={h} href={h} className="text-sm text-[#F7F3EE]/70 hover:text-[#C4A882] transition-colors duration-300">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-[#8C7B6E] mb-4">Contact</p>
            <div className="space-y-2 text-sm text-[#F7F3EE]/70">
              <p>Sint-Sebastiaansstraat 4</p>
              <p>8400 Oostende, België</p>
              <p>059 70 28 98</p>
            </div>
          </div>
        </div>
        <div className="h-px bg-[#C4A882] opacity-20 mb-6" />
        <p className="text-center text-xs text-[#8C7B6E]">© {new Date().getFullYear()} Hotel Cardiff & Afternoon Tea Lounge · Alle rechten voorbehouden</p>
      </footer>

    </div>
  );
}