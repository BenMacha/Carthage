<?xml version="1.0" encoding="UTF-8"?>
<!-- Généré par scripts/generate-sitemap.mjs — ne pas modifier à la main. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap — Carthage</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,700..900&amp;family=Instrument+Sans:wght@400;500;600&amp;family=Noto+Sans+Phoenician&amp;family=Noto+Naskh+Arabic:wght@400;700&amp;display=swap"/>
        <style>
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#F4EEE3;color:#16130F;font:400 15px/1.5 'Instrument Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
          a{color:inherit;text-decoration:none}
          [lang=ar]{font-family:'Noto Naskh Arabic',serif}
          .wrap{max-width:1200px;margin:0 auto;padding:clamp(12px,2vw,24px)}
          .top{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:999px;padding:8px 8px 8px 22px}
          .brand{display:flex;align-items:center;gap:10px;font:800 19px/1 'Archivo',sans-serif;font-stretch:112%}
          .tanit{display:flex;flex-direction:column;align-items:center;gap:2px}
          .tanit i{display:block;background:#6E1E47}
          .tanit i:nth-child(1){width:11px;height:11px;border-radius:50%}
          .tanit i:nth-child(2){width:20px;height:3px;border-radius:2px}
          .tanit i:nth-child(3){width:16px;height:12px;clip-path:polygon(50% 0,100% 100%,0 100%)}
          .top-link{background:#16130F;color:#fff;border-radius:999px;padding:12px 18px;font-weight:600;font-size:14px}
          .hero{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:12px;margin-top:12px}
          .hero-main{position:relative;overflow:hidden;background:#16130F;color:#fff;border-radius:32px;padding:clamp(24px,4vw,48px);min-height:280px;display:flex;flex-direction:column;justify-content:space-between;gap:24px}
          .wm{position:absolute;inset-inline-end:-8px;bottom:-24px;font:400 clamp(80px,12vw,160px)/1 'Noto Sans Phoenician',sans-serif;color:rgba(255,255,255,.06);white-space:nowrap}
          .chip{align-self:flex-start;position:relative;background:rgba(255,255,255,.14);border-radius:999px;padding:8px 12px;font-weight:600;font-size:13px}
          h1{position:relative;font:900 clamp(44px,7vw,88px)/.9 'Archivo',sans-serif;letter-spacing:-.04em}
          .lede{position:relative;margin-top:14px;color:#C9C0B3;max-width:560px;font-size:clamp(15px,1.3vw,18px)}
          .hero-side{background:#fff;border-radius:32px;padding:clamp(22px,3vw,36px);display:flex;flex-direction:column;justify-content:center;gap:10px}
          .stat{display:flex;align-items:baseline;gap:14px;padding:10px 0;border-top:1px solid rgba(22,19,15,.1)}
          .stat:first-child{border-top:0}
          .stat b{font:900 clamp(34px,4vw,48px)/1 'Archivo',sans-serif;color:#6E1E47;min-width:84px}
          .stat span{color:#6B6258}
          .group{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,3fr);gap:12px;margin-top:12px}
          .group-head{border-radius:28px;padding:26px;display:flex;flex-direction:column;justify-content:flex-end;gap:6px;min-height:150px}
          .group-head h2{font:800 clamp(26px,3vw,38px)/.98 'Archivo',sans-serif;letter-spacing:-.03em}
          .count{font-weight:700;font-size:13px;opacity:.8;margin-bottom:auto}
          .alt{font-size:13px;opacity:.75}
          .rows{list-style:none;display:flex;flex-direction:column;gap:6px}
          .row{display:grid;grid-template-columns:minmax(0,1fr) auto 48px;align-items:center;gap:16px;background:#fff;border-radius:18px;padding:12px 12px 12px 20px}
          .row-title{display:block;font:800 18px/1.2 'Archivo',sans-serif}
          .row-title:hover{color:#6E1E47}
          .row-sub{display:block;color:#6B6258;font-size:13px;margin-top:2px}
          .row-langs{display:flex;gap:6px}
          .lang{display:grid;place-items:center;min-width:44px;height:36px;border-radius:999px;background:#F4EEE3;font-weight:600;font-size:13px}
          .lang:hover{background:#16130F;color:#fff}
          .row-meta{justify-self:end;font-size:12px;color:#A9A094;font-variant-numeric:tabular-nums}
          .foot{margin-top:12px;background:#16130F;color:#A9A094;border-radius:28px;padding:22px 26px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;font-size:13px}
          .foot a{color:#E7B75A}
          @media (max-width:860px){.hero,.group{grid-template-columns:minmax(0,1fr)}.group-head{min-height:0}}
          @media (max-width:560px){.row{grid-template-columns:minmax(0,1fr);gap:10px}.row-meta{display:none}.top-link{padding:11px 14px}}
        </style>
      </head>
      <body>
        <div class="wrap">
          <header class="top">
            <a class="brand" href="/fr"><span class="tanit"><i></i><i></i><i></i></span>Carthage</a>
            <a class="top-link" href="/fr/plan-du-site">Plan du site →</a>
          </header>
          <section class="hero">
            <div class="hero-main">
              <span class="wm" aria-hidden="true">𐤒𐤓𐤕𐤇𐤃𐤔𐤕</span>
              <span class="chip">sitemap.xml</span>
              <div>
                <h1>Sitemap</h1>
                <p class="lede">Fichier destiné aux moteurs de recherche : chaque page, ses trois versions linguistiques (hreflang) et sa priorité.</p>
              </div>
            </div>
            <div class="hero-side">
              <div class="stat"><b><xsl:value-of select="count(s:urlset/s:url)"/></b><span>adresses</span></div>
              <div class="stat"><b><xsl:value-of select="count(s:urlset/s:url) div 3"/></b><span>pages</span></div>
              <div class="stat"><b>3</b><span>langues · FR · EN · <span lang="ar">ع</span></span></div>
            </div>
          </section>

      <section class="group">
        <header class="group-head" style="background:#6E1E47;color:#FFFFFF">
          <span class="count">6 pages</span>
          <h2>Repères</h2>
          <span class="alt">Essentials · <span dir="rtl" lang="ar">معالم</span></span>
        </header>
        <ul class="rows">
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Accueil</a>
                <span class="row-sub">Home · <span dir="rtl" lang="ar">الرئيسية</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/chronologie']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Chronologie</a>
                <span class="row-sub">Timeline · <span dir="rtl" lang="ar">التسلسل الزمني</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/carte']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Carte animée</a>
                <span class="row-sub">Animated map · <span dir="rtl" lang="ar">الخريطة المتحركة</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/tunisie']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Carthage vit en Tunisie</a>
                <span class="row-sub">Carthage lives in Tunisia · <span dir="rtl" lang="ar">قرطاج تحيا في تونس</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/histoire-des-vainqueurs']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Histoire des vainqueurs</a>
                <span class="row-sub">The victors' history · <span dir="rtl" lang="ar">تاريخ المنتصرين</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/quiz']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Quiz</a>
                <span class="row-sub">Quiz · <span dir="rtl" lang="ar">اختبار</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
        </ul>
      </section>
      <section class="group">
        <header class="group-head" style="background:#B8492A;color:#FFFFFF">
          <span class="count">9 pages</span>
          <h2>Histoire</h2>
          <span class="alt">History · <span dir="rtl" lang="ar">التاريخ</span></span>
        </header>
        <ul class="rows">
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/fondation']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">La fondation</a>
                <span class="row-sub">The founding · <span dir="rtl" lang="ar">التأسيس</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/guerres-puniques']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Les guerres puniques</a>
                <span class="row-sub">The Punic Wars · <span dir="rtl" lang="ar">الحروب البونيقية</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/guerre-des-mercenaires']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">La guerre des Mercenaires</a>
                <span class="row-sub">The Mercenary War · <span dir="rtl" lang="ar">حرب المرتزقة</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/prise-de-carthage']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">La prise de Carthage</a>
                <span class="row-sub">The fall of Carthage · <span dir="rtl" lang="ar">سقوط قرطاج</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/apres-146']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Carthage après 146</a>
                <span class="row-sub">Carthage after 146 · <span dir="rtl" lang="ar">قرطاج بعد 146</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/richesse-rome']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">La richesse et Rome</a>
                <span class="row-sub">Wealth and Rome · <span dir="rtl" lang="ar">الثروة وروما</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/afrique']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">L'Afrique et son nom</a>
                <span class="row-sub">Africa and its name · <span dir="rtl" lang="ar">إفريقيا واسمها</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/lieux']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Lieux historiques</a>
                <span class="row-sub">Historic places · <span dir="rtl" lang="ar">أماكن تاريخية</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/monde-punique']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Le monde punique</a>
                <span class="row-sub">The Punic world · <span dir="rtl" lang="ar">العالم البونيقي</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
        </ul>
      </section>
      <section class="group">
        <header class="group-head" style="background:#16130F;color:#FFFFFF">
          <span class="count">4 pages</span>
          <h2>Hannibal &amp; la guerre</h2>
          <span class="alt">Hannibal &amp; war · <span dir="rtl" lang="ar">حنبعل والحرب</span></span>
        </header>
        <ul class="rows">
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/hannibal']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Hannibal Barca</a>
                <span class="row-sub">Hannibal Barca · <span dir="rtl" lang="ar">حنبعل برقا</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/tactiques']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Les tactiques</a>
                <span class="row-sub">Tactics · <span dir="rtl" lang="ar">التكتيكات</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/elephants']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Les éléphants et les Alpes</a>
                <span class="row-sub">Elephants and the Alps · <span dir="rtl" lang="ar">الفيلة وجبال الألب</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/armee']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">L'armée de Carthage</a>
                <span class="row-sub">Carthage's army · <span dir="rtl" lang="ar">جيش قرطاج</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
        </ul>
      </section>
      <section class="group">
        <header class="group-head" style="background:#D6A23E;color:#16130F">
          <span class="count">8 pages</span>
          <h2>Civilisation</h2>
          <span class="alt">Civilisation · <span dir="rtl" lang="ar">الحضارة</span></span>
        </header>
        <ul class="rows">
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/institutions']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Institutions et société</a>
                <span class="row-sub">Institutions and society · <span dir="rtl" lang="ar">المؤسسات والمجتمع</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/economie']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Économie</a>
                <span class="row-sub">Economy · <span dir="rtl" lang="ar">الاقتصاد</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/agriculture']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Agriculture</a>
                <span class="row-sub">Agriculture · <span dir="rtl" lang="ar">الفلاحة</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/religion']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Religion</a>
                <span class="row-sub">Religion · <span dir="rtl" lang="ar">الديانة</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/art-et-artisanat']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Art et artisanat</a>
                <span class="row-sub">Art and crafts · <span dir="rtl" lang="ar">الفن والحِرف</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/langue-ecriture']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Langue et écriture</a>
                <span class="row-sub">Language and writing · <span dir="rtl" lang="ar">اللغة والكتابة</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/vie-quotidienne']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">La vie quotidienne</a>
                <span class="row-sub">Daily life · <span dir="rtl" lang="ar">الحياة اليومية</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/heritage']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">L'héritage culturel</a>
                <span class="row-sub">Cultural legacy · <span dir="rtl" lang="ar">الإرث الثقافي</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
        </ul>
      </section>
      <section class="group">
        <header class="group-head" style="background:#1D3F66;color:#FFFFFF">
          <span class="count">10 pages</span>
          <h2>Personnages</h2>
          <span class="alt">People · <span dir="rtl" lang="ar">الشخصيات</span></span>
        </header>
        <ul class="rows">
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/biographies']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Tous les personnages</a>
                <span class="row-sub">All people · <span dir="rtl" lang="ar">كل الشخصيات</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/didon']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Élissa / Didon</a>
                <span class="row-sub">Elissa / Dido · <span dir="rtl" lang="ar">عليسة / ديدون</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/hamilcar']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Hamilcar Barca</a>
                <span class="row-sub">Hamilcar Barca · <span dir="rtl" lang="ar">حملقار برقا</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/hasdrubal']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Les deux Hasdrubal</a>
                <span class="row-sub">The two Hasdrubals · <span dir="rtl" lang="ar">صدربعل الاثنان</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/magon-barca']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Magon Barca</a>
                <span class="row-sub">Mago Barca · <span dir="rtl" lang="ar">ماغون برقا</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/hannon']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Hannon le Navigateur</a>
                <span class="row-sub">Hanno the Navigator · <span dir="rtl" lang="ar">حنون الملاح</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/magon-agronome']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Magon l'Agronome</a>
                <span class="row-sub">Mago the Agronomist · <span dir="rtl" lang="ar">ماغون المهندس الزراعي</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/sophonisbe']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Sophonisbe</a>
                <span class="row-sub">Sophonisba · <span dir="rtl" lang="ar">صفنبعل</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/massinissa']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Massinissa</a>
                <span class="row-sub">Masinissa · <span dir="rtl" lang="ar">ماسينيسا</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/hannon-le-grand']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Hannon le Grand</a>
                <span class="row-sub">Hanno the Great · <span dir="rtl" lang="ar">حنون الكبير</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
        </ul>
      </section>
      <section class="group">
        <header class="group-head" style="background:#E6DED1;color:#16130F">
          <span class="count">4 pages</span>
          <h2>À propos du site</h2>
          <span class="alt">About the site · <span dir="rtl" lang="ar">عن الموقع</span></span>
        </header>
        <ul class="rows">
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/plan-du-site']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Plan du site</a>
                <span class="row-sub">Site map · <span dir="rtl" lang="ar">خريطة الموقع</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/bibliographie']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Sources et bibliographie</a>
                <span class="row-sub">Sources and bibliography · <span dir="rtl" lang="ar">المصادر والمراجع</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/glossaire']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Glossaire</a>
                <span class="row-sub">Glossary · <span dir="rtl" lang="ar">المعجم</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
          <xsl:for-each select="s:urlset/s:url[s:loc='https://carthage.benmacha.tn/fr/credits']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">Crédits</a>
                <span class="row-sub">Credits · <span dir="rtl" lang="ar">الحقوق</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(@hreflang, 'fraen', 'FRAEN')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>
        </ul>
      </section>
          <footer class="foot">
            <span>Mis à jour le <xsl:value-of select="s:urlset/s:url[1]/s:lastmod"/></span>
            <span><a href="/llms.txt">llms.txt</a> · <a href="/robots.txt">robots.txt</a> · <a href="/fr/credits">Crédits</a></span>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
