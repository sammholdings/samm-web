
:root {
  --bg: #050811;
  --surface: #0b1220;
  --surface-light: #111d30;
  --text: #f4f7fc;
  --muted: #a7b2c5;
  --blue: #078cff;
  --blue-light: #32c5ff;
  --silver: #cbd5e1;
  --line: rgba(167, 190, 220, .18);
  --max-width: 1180px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

button, input, select, textarea {
  font: inherit;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--blue-light);
  outline-offset: 3px;
}

.header {
  min-height: 78px;
  padding: 14px max(5%, calc((100% - var(--max-width)) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background: rgba(5, 8, 17, .96);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(14px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: 3px;
  line-height: 1.15;
}

.brand small {
  display: block;
  margin-top: 5px;
  color: var(--blue-light);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 3px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--blue);
  color: var(--silver);
  font-family: Georgia, serif;
  font-size: 25px;
  box-shadow: 0 0 20px rgba(0, 140, 255, .12);
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 13px;
}

.nav a:not(.nav-cta) {
  color: #d0d9e7;
}

.nav a:hover,
.service-card a:hover {
  color: var(--blue-light);
}

.nav-cta {
  padding: 10px 16px;
  border: 1px solid var(--blue);
  color: var(--blue-light);
}

.menu-toggle {
  display: none;
  border: 1px solid var(--line);
  color: var(--text);
  background: var(--surface);
  border-radius: 6px;
  min-width: 44px;
  min-height: 44px;
  font-size: 23px;
  cursor: pointer;
}

.hero {
  max-width: var(--max-width);
  margin: auto;
  padding: 74px 30px 85px;
  display: grid;
  grid-template-columns: 1fr .88fr;
  align-items: center;
  gap: 55px;
}

.eyebrow {
  color: var(--blue-light);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.5px;
  line-height: 1.8;
}

.hero h1 {
  max-width: 620px;
  margin: 20px 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 5vw, 67px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -1.6px;
}

.hero h1 span {
  color: var(--blue-light);
}

.hero-text {
  max-width: 510px;
  color: #c1ccdc;
  font-size: 15px;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  padding: 12px 19px;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  transition: transform .2s, background .2s;
}

.button:hover {
  transform: translateY(-2px);
}

.button-gold {
  background: linear-gradient(110deg, #087cff, #30c2ff);
  color: #03101f;
}

.button-gold:hover {
  background: #6bd4ff;
}

.button-outline {
  border-color: #647b99;
  color: var(--text);
  background: transparent;
}

.button-full {
  width: 100%;
}

.hero-note {
  margin-top: 25px;
  color: var(--muted);
  font-size: 11px;
}

.hero-image {
  min-height: 440px;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(0deg, rgba(2, 6, 15, .82), transparent 65%),
    url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85")
      center / cover no-repeat,
    #15253a;
  border: 1px solid var(--line);
}

.image-label {
  position: absolute;
  right: 22px;
  bottom: 22px;
  left: 22px;
  display: grid;
  gap: 5px;
}

.image-label span {
  color: var(--blue-light);
  font-size: 9px;
  letter-spacing: 2px;
}

.image-label strong {
  font-family: Georgia, serif;
  font-size: 24px;
  font-weight: 400;
}

.section {
  padding: 85px max(5%, calc((100% - var(--max-width)) / 2));
}

.section-heading {
  max-width: 660px;
  margin: 0 auto 38px;
  text-align: center;
}

.section-heading h2,
.quote-intro h2,
.contact-banner h2 {
  margin: 10px 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 400;
  line-height: 1.2;
}

.section-heading > p:last-child,
.quote-intro > p:not(.eyebrow),
.contact-banner > p:not(.eyebrow) {
  color: var(--muted);
  font-size: 14px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.service-card {
  position: relative;
  min-width: 0;
  padding: 27px 22px;
  border: 1px solid var(--line);
  background: linear-gradient(145deg, var(--surface), #080d18);
  transition: border-color .2s, transform .2s;
}

.service-card:hover {
  border-color: rgba(0, 140, 255, .65);
  transform: translateY(-3px);
}

.service-number {
  color: var(--blue-light);
  font-size: 10px;
  letter-spacing: 2px;
}

.service-icon {
  margin-top: 25px;
  color: var(--silver);
  font-family: Georgia, serif;
  font-size: 35px;
}

.service-card h3 {
  font-size: 17px;
  line-height: 1.4;
}

.service-card p {
  min-height: 115px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}

.service-card a {
  color: var(--blue-light);
  font-size: 11px;
}

.portfolio {
  padding: 85px max(5%, calc((100% - var(--max-width)) / 2));
  background: #080e1a;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.portfolio-item {
  min-height: 280px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
}

.portfolio-item::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(2, 6, 15, .9), transparent 75%);
}

.portfolio-item > * {
  position: relative;
}

.portfolio-item span {
  color: var(--blue-light);
  font-size: 9px;
  letter-spacing: 2px;
}

.portfolio-item h3 {
  margin-bottom: 0;
  font-family: Georgia, serif;
  font-size: 23px;
  font-weight: 400;
}

.portfolio-house {
  background-image: url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80");
}

.portfolio-interior {
  background-image: url("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80");
}

.portfolio-building {
  background-image: url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80");
}

.portfolio-note {
  color: var(--muted);
  font-size: 11px;
  text-align: center;
  margin-top: 22px;
}

.quote-section {
  display: grid;
  grid-template-columns: .85fr 1fr;
  gap: 65px;
  align-items: start;
}

.quote-intro {
  position: sticky;
  top: 110px;
}

.quote-intro h2 {
  font-size: clamp(34px, 4vw, 48px);
}

.quote-assurance {
  margin-top: 28px;
  color: #d2dcea;
  font-size: 13px;
  line-height: 2.4;
}

.quote-form {
  padding: 30px;
  border: 1px solid var(--line);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quote-form label {
  margin-top: 6px;
  color: #dce5f2;
  font-size: 12px;
}

.quote-form input,
.quote-form select,
.quote-form textarea {
  width: 100%;
  min-height: 46px;
  padding: 11px 12px;
  border: 1px solid #34445c;
  border-radius: 3px;
  background: #070c16;
  color: var(--text);
}

.quote-form textarea {
  resize: vertical;
}

.quote-form input::placeholder,
.quote-form textarea::placeholder {
  color: #8594aa;
}

.estimate {
  display: grid;
  gap: 6px;
  margin: 8px 0;
  padding: 20px;
  border: 1px solid rgba(0, 140, 255, .45);
  background: linear-gradient(120deg, #0c1a30, #09101d);
}

.estimate span {
  color: var(--blue-light);
  font-size: 9px;
  letter-spacing: 2px;
}

.estimate strong {
  overflow-wrap: anywhere;
  font-family: Georgia, serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 400;
}

.estimate small,
.form-note {
  color: var(--muted);
  font-size: 10px;
  line-height: 1.7;
}

.hidden {
  display: none !important;
}

.form-message {
  margin: 0;
  color: var(--blue-light);
  font-size: 12px;
}

.contact-banner {
  padding: 75px 22px;
  text-align: center;
  border-top: 1px solid var(--line);
  background:
    radial-gradient(ellipse at center, rgba(0, 140, 255, .12), transparent 65%),
    #080d18;
}

.contact-banner h2 {
  max-width: 670px;
  margin: 12px auto;
}

.contact-banner > p:not(.eyebrow) {
  margin-bottom: 25px;
}

.footer {
  padding: 35px 20px;
  text-align: center;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 11px;
}

.footer-brand {
  justify-content: center;
  color: var(--text);
}

.footer-note {
  max-width: 650px;
  margin: 15px auto 0;
  font-size: 10px;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    padding-top: 55px;
  }

  .hero-image {
    min-height: 360px;
  }

  .service-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .service-card p {
    min-height: auto;
  }

  .quote-section {
    gap: 30px;
  }
}

@media (max-width: 640px) {
  html {
    scroll-padding-top: 72px;
  }

  .header {
    min-height: 68px;
    padding: 10px 18px;
  }

  .brand {
    font-size: 18px;
  }

  .brand-mark {
    width: 37px;
    height: 37px;
  }

  .menu-toggle {
    display: block;
  }

  .nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 18px;
    background: #080e1a;
    border-bottom: 1px solid var(--line);
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .nav.open {
    display: flex;
  }

  .nav a {
    padding: 14px 8px;
  }

  .nav-cta {
    margin-top: 8px;
    text-align: center;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 48px 20px 55px;
  }

  .hero h1 {
    font-size: clamp(38px, 11vw, 52px);
  }

  .hero-text {
    font-size: 14px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .button {
    width: 100%;
  }

  .hero-image {
    min-height: 310px;
  }

  .section,
  .portfolio {
    padding: 60px 20px;
  }

  .section-heading {
    margin-bottom: 28px;
  }

  .service-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .service-card {
    padding: 23px;
  }

  .service-icon {
    margin-top: 14px;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-item {
    min-height: 250px;
  }

  .quote-section {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .quote-intro {
    position: static;
  }

  .quote-form {
    padding: 20px 16px;
  }

  .contact-banner {
    padding: 60px 20px;
  }

  .contact-banner .button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition: none !important;
  }
}
