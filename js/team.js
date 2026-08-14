/* CodeLab - Team page timelines
   ------------------------------------------------------------------
   Renders one "behaviour thread" per member: a wavy line carrying
   marker dots, matching the visual language of the homepage hero and
   the milestone axis. Plain dots are read-only; key dots (amber ring)
   open a detail panel.

   ENCODING: this file is deliberately 100% ASCII. Every accented or
   typographic character is written as a \uXXXX escape. Do not paste
   literal non-ASCII characters in here - if the file is ever saved as
   GBK/Big5/Latin-1 they render as mojibake. Escapes cannot break.

   This file only OWNS the team page. It touches nothing in main.js and
   exposes a single global: renderTeam(). Call it BEFORE initSite() and
   merge the returned dictionaries into the page translations, so the
   existing data-i18n machinery drives language switching for free.
   ------------------------------------------------------------------ */
(function (global) {
  'use strict';

  /* ==================================================================
     CONTENT
     ==================================================================
     !! SAMPLE DATA - REPLACE BEFORE PUBLISHING !!

     Names, roles and links below come from the live site. The `events`
     arrays are PLACEHOLDERS written to demonstrate the layout - apart
     from Arko Ghosh's, which reuse milestones already published on the
     homepage. Nothing here should be treated as biography. Each member
     supplies their own list.

     Event schema
     ------------
     { y: "2019",          // label shown under/next to the dot
       type: "dot",        // "dot" = marker only, "key" = click to expand
       en: { l, t, b },    // l = short label (2-5 words, ALWAYS)
       nl: { l, t, b } }   //     t = detail title, b = detail body
                           //     t and b are only read when type === "key"

     Member schema
     -------------
     { id, name, roleKey, photo, href, linkKey, events }
       roleKey  - reuses a key already defined in team.html translations
       photo    - optional; falls back to the outline avatar if missing
       href     - deep link to the member's research topic

     Playback speed is FIXED site-wide at PLAY_SPEED. There is
     deliberately no per-member speed and no viewer-facing control.
     ================================================================== */

  var PLAY_SPEED = 1.5;

  var STAFF = [
    {
      id: 'arko-ghosh',
      name: 'Arko Ghosh',
      roleKey: 'roleGhosh',
      photo: 'assets/img/team/arko-ghosh.jpg',
      href: 'questions.html#q1',
      linkKey: 'tmLinkQ1',
      events: [
        { y: '2014', type: 'key',
          en: { l: 'WIRED covers the smartphone-shaped brain',
                t: 'The smartphone-shaped brain reaches the public',
                b: 'Early work showing that everyday touchscreen use leaves a measurable imprint on the sensory cortex. WIRED\u2019s coverage brought the idea out of the lab and started the conversation this group has been having ever since.' },
          nl: { l: 'WIRED bericht over het door smartphones gevormde brein',
                t: 'Het door smartphones gevormde brein bereikt het publiek',
                b: 'Vroeg werk dat liet zien dat alledaags touchscreengebruik een meetbare afdruk achterlaat in de sensorische cortex. De berichtgeving van WIRED haalde het idee uit het lab en startte het gesprek dat deze groep sindsdien voert.' } },
        { y: '2016', type: 'key',
          en: { l: 'QuantActions AG founded',
                t: 'First spin-off',
                b: 'The first attempt to turn smartphone interaction data into a usable digital biomarker outside an academic setting.' },
          nl: { l: 'QuantActions AG opgericht',
                t: 'Eerste spin-off',
                b: 'De eerste poging om smartphone-interactiedata om te zetten in een bruikbare digitale biomarker buiten een academische omgeving.' } },
        { y: '2019', type: 'dot',
          en: { l: 'Sleep-wake cycles read from taps' },
          nl: { l: 'Slaap-waakcycli afgelezen uit tikken' } },
        { y: '2021', type: 'dot',
          en: { l: 'The Guardian names the field \u201Ctappigraphy\u201D' },
          nl: { l: 'The Guardian noemt het veld \u201Ctappigraphy\u201D' } },
        { y: '2023', type: 'dot',
          en: { l: 'Multi-day rhythms found in phone use' },
          nl: { l: 'Meerdaagse ritmes ontdekt in telefoongebruik' } },
        { y: '2024', type: 'key',
          en: { l: 'AXITE BV founded',
                t: 'From discovery to the clinic',
                b: 'A second spin-off, this time aimed squarely at clinical brain-health monitoring rather than general-purpose biomarkers.' },
          nl: { l: 'AXITE BV opgericht',
                t: 'Van ontdekking naar de kliniek',
                b: 'Een tweede spin-off, ditmaal specifiek gericht op klinische monitoring van hersengezondheid in plaats van algemene biomarkers.' } }
      ]
    },
    {
      id: 'guido-band',
      name: 'Guido Band',
      roleKey: 'roleBand',
      photo: 'assets/img/team/guido-band.jpg',
      href: 'questions.html#q1',
      linkKey: 'tmLinkQ1',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'Cognitive control and error monitoring' },
          nl: { l: 'Cognitieve controle en foutmonitoring' } },
        { y: '\u2014', type: 'key',
          en: { l: 'Joins CODELAB as teaching-focused mentor',
                t: 'Why a second mentor',
                b: 'The group runs two senior mentors side by side \u2014 one for research, one for teaching \u2014 so that a first-year student and a postdoc can both find a way in.' },
          nl: { l: 'Sluit zich aan bij CODELAB als onderwijsgerichte mentor',
                t: 'Waarom een tweede mentor',
                b: 'De groep werkt met twee senior mentoren naast elkaar \u2014 \u00e9\u00e9n voor onderzoek, \u00e9\u00e9n voor onderwijs \u2014 zodat zowel een eerstejaars als een postdoc een ingang vindt.' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Supervises first tappigraphy theses' },
          nl: { l: 'Begeleidt eerste tappigraphy-scripties' } }
      ]
    },
    {
      id: 'khrystyna-semkiv',
      name: 'Khrystyna Semkiv',
      roleKey: 'rolePhd',
      photo: 'assets/img/team/khrystyna-semkiv.jpg',
      href: 'questions.html#q3',
      linkKey: 'tmLinkQ3',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'MSc in cognitive neuroscience' },
          nl: { l: 'MSc in cognitieve neurowetenschap' } },
        { y: '\u2014', type: 'key',
          en: { l: 'Ballet years \u2014 measuring her own knee-jerk reflex',
                t: 'Where the interest actually started',
                b: 'Years of ballet training, and a stubborn curiosity about why the same reflex test gave different answers before and after rehearsal. Not a publication \u2014 but the reason the rest of this timeline exists.' },
          nl: { l: 'Balletjaren \u2014 haar eigen kniepeesreflex meten',
                t: 'Waar de interesse werkelijk begon',
                b: 'Jarenlange balletopleiding, en een hardnekkige nieuwsgierigheid naar waarom dezelfde reflextest v\u00f3\u00f3r en n\u00e1 de repetitie andere antwoorden gaf. Geen publicatie \u2014 maar wel de reden dat de rest van deze tijdlijn bestaat.' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Starts PhD at CODELAB' },
          nl: { l: 'Start promotieonderzoek bij CODELAB' } },
        { y: '\u2014', type: 'key',
          en: { l: 'First clinical data collection',
                t: 'Working inside the clinic',
                b: 'Collecting touchscreen data alongside clinical recordings means fitting research around care, not the other way round \u2014 the slowest and most instructive part of the project so far.' },
          nl: { l: 'Eerste klinische dataverzameling',
                t: 'Werken binnen de kliniek',
                b: 'Touchscreendata verzamelen naast klinische metingen betekent onderzoek inpassen rond de zorg, niet andersom \u2014 tot nu toe het traagste en leerzaamste deel van het project.' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Thesis in progress' },
          nl: { l: 'Proefschrift in wording' } }
      ]
    },
    {
      id: 'wenyu-wan',
      name: 'Wenyu Wan',
      roleKey: 'roleGuest',
      photo: 'assets/img/team/wenyu-wan.jpg',
      href: 'questions.html#q2',
      linkKey: 'tmLinkQ2',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'Background in ageing research' },
          nl: { l: 'Achtergrond in ouderdomsonderzoek' } },
        { y: '\u2014', type: 'key',
          en: { l: 'Joins CODELAB as guest researcher',
                t: 'A visiting perspective',
                b: 'Guest researchers bring methods the group does not already own. Placeholder text \u2014 replace with the visit\u2019s actual focus.' },
          nl: { l: 'Sluit zich aan bij CODELAB als gastonderzoeker',
                t: 'Een blik van buiten',
                b: 'Gastonderzoekers brengen methoden mee die de groep nog niet in huis heeft. Plaatsaanduiding \u2014 vervang door de werkelijke focus van het bezoek.' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Behavioural-age modelling' },
          nl: { l: 'Modellering van gedragsleeftijd' } }
      ]
    },
    {
      id: 'ruchella-kock',
      name: 'Ruchella Kock',
      roleKey: 'roleGuest',
      photo: 'assets/img/team/ruchella-kock.jpg',
      href: 'questions.html#q5',
      linkKey: 'tmLinkQ5',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'Time-series methods' },
          nl: { l: 'Tijdreeksmethoden' } },
        { y: '\u2014', type: 'key',
          en: { l: 'Hidden rhythms in everyday behaviour',
                t: 'Looking past the 24-hour day',
                b: 'Most behavioural work stops at the daily cycle. Placeholder text \u2014 replace with a short account of the multi-day rhythm work.' },
          nl: { l: 'Verborgen ritmes in alledaags gedrag',
                t: 'Voorbij de 24-uursdag kijken',
                b: 'Het meeste gedragsonderzoek stopt bij de dagelijkse cyclus. Plaatsaanduiding \u2014 vervang door een korte beschrijving van het meerdaagse-ritmeonderzoek.' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Guest researcher at CODELAB' },
          nl: { l: 'Gastonderzoeker bij CODELAB' } }
      ]
    },
    {
      id: 'fleur-van-der-laan',
      name: 'Fleur van der Laan',
      roleKey: 'roleLaan',
      photo: 'assets/img/team/fleur-van-der-laan.jpg',
      href: 'questions.html#q6',
      linkKey: 'tmLinkQ6',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'BSc psychology, Leiden' },
          nl: { l: 'BSc psychologie, Leiden' } },
        { y: '\u2014', type: 'key',
          en: { l: 'Runs participant recruitment',
                t: 'The people behind the data',
                b: 'Every tap in the dataset belongs to someone who agreed to share it. Placeholder text \u2014 replace with a note on how recruitment and consent actually run.' },
          nl: { l: 'Verzorgt de werving van deelnemers',
                t: 'De mensen achter de data',
                b: 'Elke tik in de dataset is van iemand die ermee instemde die te delen. Plaatsaanduiding \u2014 vervang door een notitie over hoe werving en toestemming werkelijk verlopen.' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Education and research assistant' },
          nl: { l: 'Onderwijs- en onderzoeksassistent' } }
      ]
    },
    {
      id: 'sezin-mumcu',
      name: 'Sezin Mumcu',
      roleKey: 'roleMember',
      photo: 'assets/img/team/sezin-mumcu.jpg',
      href: 'questions.html#q4',
      linkKey: 'tmLinkQ4',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'Joins the group' },
          nl: { l: 'Sluit zich aan bij de groep' } },
        { y: '\u2014', type: 'key',
          en: { l: 'Sleep and wearable data',
                t: 'Two instruments, one night',
                b: 'Placeholder text \u2014 replace with a short account of combining wearables with touchscreen activity.' },
          nl: { l: 'Slaap- en wearabledata',
                t: 'Twee instrumenten, \u00e9\u00e9n nacht',
                b: 'Plaatsaanduiding \u2014 vervang door een korte beschrijving van het combineren van wearables met touchscreenactiviteit.' } }
      ]
    }
  ];

  var STUDENTS = [
    {
      id: 'david-hof',
      name: 'David Hof',
      roleKey: 'roleMsc',
      photo: 'assets/img/team/david-hof.jpg',
      href: 'questions.html#q5',
      linkKey: 'tmLinkQ5',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'BSc psychology' },
          nl: { l: 'BSc psychologie' } },
        { y: '\u2014', type: 'key',
          en: { l: 'MSc thesis: rhythms in phone use',
                t: 'The thesis question',
                b: 'Placeholder text \u2014 replace with one or two sentences on what the thesis is actually asking.' },
          nl: { l: 'MSc-scriptie: ritmes in telefoongebruik',
                t: 'De scriptievraag',
                b: 'Plaatsaanduiding \u2014 vervang door een of twee zinnen over wat de scriptie werkelijk onderzoekt.' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Defence expected' },
          nl: { l: 'Verdediging verwacht' } }
      ]
    },
    {
      id: 'oyku-gurcan',
      name: '\u00d6yk\u00fc G\u00fcrcan',
      roleKey: 'roleMsc',
      photo: 'assets/img/team/oyku-gurcan.jpg',
      href: 'questions.html#q3',
      linkKey: 'tmLinkQ3',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'BSc psychology' },
          nl: { l: 'BSc psychologie' } },
        { y: '\u2014', type: 'key',
          en: { l: 'MSc thesis: touch data and disease markers',
                t: 'The thesis question',
                b: 'Placeholder text \u2014 replace with one or two sentences on what the thesis is actually asking.' },
          nl: { l: 'MSc-scriptie: aanraakdata en ziektemarkers',
                t: 'De scriptievraag',
                b: 'Plaatsaanduiding \u2014 vervang door een of twee zinnen over wat de scriptie werkelijk onderzoekt.' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Defence expected' },
          nl: { l: 'Verdediging verwacht' } }
      ]
    }
  ];

  /* Alumni use exactly the same card, thread, palette and layout as
     current members. The only difference is a flat end cap instead of
     an arrow, marking a finished project. These two entries are
     deliberately generic so no real former member is described with
     invented detail. Replace wholesale. */
  var ALUMNI = [
    {
      id: 'alumnus-sample-01',
      name: 'Sample Alumnus 01',
      roleKey: 'roleAlumnus',
      photo: 'assets/img/team/alumnus-sample-01.jpg',
      href: 'questions.html#q2',
      linkKey: 'tmLinkQ2',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'Joins as MSc student' },
          nl: { l: 'Start als MSc-student' } },
        { y: '\u2014', type: 'key',
          en: { l: 'Thesis on ageing and touch dynamics',
                t: 'What the project left behind',
                b: 'Placeholder text \u2014 replace with the finished project and where the person went next.' },
          nl: { l: 'Scriptie over veroudering en aanraakdynamiek',
                t: 'Wat het project heeft nagelaten',
                b: 'Plaatsaanduiding \u2014 vervang door het afgeronde project en waar de persoon daarna heen ging.' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Project complete \u2014 leaves the group' },
          nl: { l: 'Project afgerond \u2014 verlaat de groep' } }
      ]
    },
    {
      id: 'alumnus-sample-02',
      name: 'Sample Alumnus 02',
      roleKey: 'roleAlumnus',
      photo: 'assets/img/team/alumnus-sample-02.jpg',
      href: 'questions.html#q4',
      linkKey: 'tmLinkQ4',
      events: [
        { y: '\u2014', type: 'dot',
          en: { l: 'Joins as research assistant' },
          nl: { l: 'Start als onderzoeksassistent' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Sleep data pipeline' },
          nl: { l: 'Pijplijn voor slaapdata' } },
        { y: '\u2014', type: 'dot',
          en: { l: 'Project complete \u2014 leaves the group' },
          nl: { l: 'Project afgerond \u2014 verlaat de groep' } }
      ]
    }
  ];

  /* ==================================================================
     GEOMETRY
     ------------------------------------------------------------------
     Card height is derived from the TALLEST label actually rendered,
     measured in the browser rather than assumed. That keeps every card
     as short as its own content allows instead of padding all of them
     out to a worst-case constant.

     Horizontal band, top to bottom:
        blockH   tallest label, sitting above the wave crest
        CLEAR    breathing room
        AMP_Y*2  the wave itself
        CLEAR
        blockH   tallest label, sitting below the wave trough
     ================================================================== */

  var LABEL_W   = 132;
  var LABEL_MIN = 96;
  var LABEL_GAP = 12;
  var PITCH_MAX = 172;
  var PAD_X     = 66;
  var LEAD      = 16;
  var AMP_Y     = 18;   /* was 26 - a flatter wave costs less height */
  var TURNS_H   = 2.25;
  var CLEAR     = 12;   /* gap between a dot and its label block */

  var V_COL   = 72;
  var V_MID   = 50;
  var V_AMP   = 24;
  var V_PAD   = 36;
  var V_TURNS = 1.75;
  var V_GAP   = 20;     /* gap between stacked label blocks */

  var TAIL_LEN  = 44;   /* length of the tapered tail (alumni) */
  var STROKE_HW = 1;    /* half of the 2px stroke */
  var TAIL_STEPS = 26;

  function waveH(x, drawW, mid) {
    var span = drawW - PAD_X * 2;
    var t = span > 0 ? (x - PAD_X) / span : 0;
    return mid + AMP_Y * Math.sin(t * TURNS_H * Math.PI * 2);
  }

  function waveV(y, boxH) {
    var span = boxH - V_PAD * 2;
    var t = span > 0 ? (y - V_PAD) / span : 0;
    return V_MID + V_AMP * Math.sin(t * V_TURNS * Math.PI * 2);
  }

  /* A stroke cannot change width along its length, so the tapered end
     is a FILLED outline: walk the last stretch of the curve, offset it
     perpendicular by a half-width that falls from STROKE_HW to zero,
     and close the two sides into one shape that ends in a point. */
  function taper(sample) {
    var up = [], dn = [], i, s, p, q, dx, dy, len, nx, ny, hw;
    for (i = 0; i <= TAIL_STEPS; i++) {
      s = i / TAIL_STEPS;
      p = sample(s);
      q = sample(Math.min(s + 0.02, 1));
      dx = q.x - p.x; dy = q.y - p.y;
      len = Math.sqrt(dx * dx + dy * dy) || 1;
      nx = -dy / len; ny = dx / len;
      hw = STROKE_HW * (1 - s);
      up.push((p.x + nx * hw).toFixed(2) + ' ' + (p.y + ny * hw).toFixed(2));
      dn.push((p.x - nx * hw).toFixed(2) + ' ' + (p.y - ny * hw).toFixed(2));
    }
    return 'M' + up.join('L') + 'L' + dn.reverse().join('L') + 'Z';
  }

  function buildH(n, stageW, blockH, tapered) {
    var natural = PITCH_MAX * Math.max(n - 1, 1) + PAD_X * 2;
    var drawW = Math.min(stageW, natural);
    var span = drawW - PAD_X * 2;
    var mid = CLEAR + blockH + AMP_Y;
    var boxH = mid + AMP_Y + CLEAR + blockH;

    var pts = [], i, x;
    for (i = 0; i < n; i++) {
      x = n === 1 ? drawW / 2 : PAD_X + span * (i / (n - 1));
      pts.push({ x: x, y: waveH(x, drawW, mid) });
    }

    var x0 = PAD_X - LEAD, x1 = drawW - PAD_X + LEAD;
    var stop = tapered ? x1 - TAIL_LEN : x1;
    var d = '';
    for (x = x0; x <= stop; x += 4) d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + waveH(x, drawW, mid).toFixed(2) + ' ';
    d += 'L' + stop.toFixed(1) + ' ' + waveH(stop, drawW, mid).toFixed(2);

    var tailD = null;
    if (tapered) {
      tailD = taper(function (s) {
        var tx = stop + TAIL_LEN * s;
        return { x: tx, y: waveH(tx, drawW, mid) };
      });
    }

    return {
      d: d, tailD: tailD, pts: pts, drawW: drawW, boxH: boxH, mid: mid,
      offset: Math.max((stageW - drawW) / 2, 0),
      end: { x: x1, y: waveH(x1, drawW, mid) },
      prev: { x: x1 - 3, y: waveH(x1 - 3, drawW, mid) }
    };
  }

  function buildV(n, stageW, blockH, tapered) {
    var step = blockH + V_GAP;
    var boxH = V_PAD * 2 + step * Math.max(n - 1, 0);
    var pts = [], i, y;
    for (i = 0; i < n; i++) {
      y = V_PAD + step * i;
      pts.push({ x: waveV(y, boxH), y: y });
    }

    var y0 = V_PAD - LEAD, y1 = boxH - V_PAD + LEAD;
    var stop = tapered ? y1 - TAIL_LEN : y1;
    var d = '';
    for (y = y0; y <= stop; y += 3) d += (d ? 'L' : 'M') + waveV(y, boxH).toFixed(2) + ' ' + y.toFixed(1) + ' ';
    d += 'L' + waveV(stop, boxH).toFixed(2) + ' ' + stop.toFixed(1);

    var tailD = null;
    if (tapered) {
      tailD = taper(function (s) {
        var ty = stop + TAIL_LEN * s;
        return { x: waveV(ty, boxH), y: ty };
      });
    }

    return {
      d: d, tailD: tailD, pts: pts, drawW: V_COL, boxH: boxH, offset: 0,
      end: { x: waveV(y1, boxH), y: y1 },
      prev: { x: waveV(y1 - 3, boxH), y: y1 - 3 }
    };
  }

  /* ==================================================================
     RENDER
     ================================================================== */

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var reduced = global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var portraitMQ = global.matchMedia('(orientation: portrait)');
  var dict = { en: {}, nl: {} };

  function el(tag, cls, parent) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (parent) parent.appendChild(n);
    return n;
  }

  function svgEl(tag, cls, parent) {
    var n = document.createElementNS(SVG_NS, tag);
    if (cls) n.setAttribute('class', cls);
    if (parent) parent.appendChild(n);
    return n;
  }

  function put(key, en, nl) {
    dict.en[key] = en;
    dict.nl[key] = nl;
  }

  /* The width/height/fill/stroke below are PRESENTATION ATTRIBUTES, not
     styling for its own sake. CSS normally overrides them. They exist so
     that if css/team.css ever fails to load, the avatar degrades to a
     small outline glyph instead of expanding to fill its parent and
     painting itself solid black (the SVG default fill). */
  function avatarSvg(parent) {
    var s = svgEl('svg', null, parent);
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('width', '22');
    s.setAttribute('height', '22');
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke', '#1F5AE0');
    s.setAttribute('stroke-width', '1.5');
    s.setAttribute('stroke-linecap', 'round');
    s.setAttribute('aria-hidden', 'true');
    var c = svgEl('circle', null, s);
    c.setAttribute('cx', '12'); c.setAttribute('cy', '8'); c.setAttribute('r', '4');
    var p = svgEl('path', null, s);
    p.setAttribute('d', 'M4 20a8 8 0 0 1 16 0');
    return s;
  }

  function buildMember(m, isAlumni) {
    var card = el('article', 'tmember reveal' + (isAlumni ? ' is-alumni' : ''));
    card.setAttribute('data-id', m.id);

    /* ---- head: photo, name, (alumni role), replay, research link ---- */
    var head = el('div', 'tmember-head', card);

    var photo = el('div', 'tmember-photo', head);
    avatarSvg(photo);
    if (m.photo) {
      var img = el('img', null, photo);
      img.src = m.photo;
      img.alt = m.name;
      img.loading = 'lazy';
      img.addEventListener('error', function () { img.remove(); });
    }

    var idBox = el('div', 'tmember-id', head);
    var nm = el('p', 'tmember-name', idBox);
    nm.textContent = m.name;
    /* Roles are not shown for current members. Alumni keep theirs, since
       it is the only per-card marker that the project has finished. */
    if (isAlumni) {
      el('p', 'tmember-role', idBox).setAttribute('data-i18n', m.roleKey);
    }

    var actions = el('div', 'tmember-actions', head);
    var replay = el('button', 'tml-replay', actions);
    replay.type = 'button';
    replay.setAttribute('data-i18n', 'tmReplay');
    replay.setAttribute('aria-label', 'Replay timeline');
    var link = el('a', 'tmember-link', actions);
    link.href = m.href;
    link.setAttribute('data-i18n', m.linkKey);

    /* ---- stage: svg wave + absolutely positioned dots/labels ---- */
    var tl = el('div', 'tml', card);
    var n = m.events.length;
    var stage = el('div', 'tml-stage', tl);
    var svg = svgEl('svg', 'tml-svg', stage);
    svg.setAttribute('aria-hidden', 'true');
    var guide = svgEl('path', 'tml-guide', svg);
    var path = svgEl('path', 'tml-path', svg);
    [guide, path].forEach(function (p) {
      p.setAttribute('fill', 'none');
      p.setAttribute('pathLength', '1');
    });
    /* alumni threads end in a tapered point instead of an arrow */
    var tail = isAlumni ? svgEl('path', 'tml-tail', svg) : null;
    if (tail) tail.setAttribute('stroke', 'none');

    var nodes = el('div', 'tml-nodes', stage);
    var details = el('div', 'tml-details', tl);

    m.events.forEach(function (ev, i) {
      var base = 'tm-' + m.id + '-' + i;
      put(base + '-l', ev.en.l, ev.nl.l);
      var isKey = ev.type === 'key';

      /* The dot carries no text, so it is NOT the accessible control:
         it is a decorative span with a click handler for mouse users.
         The label below is a real button - it has the wording, so it
         is what keyboard and screen-reader users reach. */
      var dot = el('span', 'tml-dot' + (isKey ? ' is-key' : ''), nodes);
      dot.setAttribute('aria-hidden', 'true');
      el('span', 'tml-mark', dot);

      var lab = el(isKey ? 'button' : 'div', 'tml-label' + (isKey ? ' is-key' : ''), nodes);
      /* A bare em-dash year carries no information but costs a whole
         line of card height, so placeholder years are simply not drawn.
         Members with real dates (see Arko Ghosh) still show them. */
      if (ev.y && ev.y !== '\u2014') {
        el('span', 'tml-year', lab).textContent = ev.y;
      }
      var txt = el('span', 'tml-text', lab);
      txt.setAttribute('data-i18n', base + '-l');

      if (isKey) {
        lab.type = 'button';
        lab.setAttribute('aria-expanded', 'false');
        lab.setAttribute('aria-controls', base + '-d');
        el('span', 'tml-more', lab).setAttribute('data-i18n', 'tmMore');

        put(base + '-t', ev.en.t, ev.nl.t);
        put(base + '-b', ev.en.b, ev.nl.b);
        var d = el('div', 'tml-detail', details);
        d.id = base + '-d';
        d.hidden = true;
        if (ev.y && ev.y !== '\u2014') {
          el('p', 'tml-detail-year', d).textContent = ev.y;
        }
        el('p', 'tml-detail-title', d).setAttribute('data-i18n', base + '-t');
        el('p', 'tml-detail-body', d).setAttribute('data-i18n', base + '-b');

        /* Both the dot and the whole label (including "Read more")
           open the same panel. */
        var open = function () { toggleDetail(card, lab, d); };
        lab.addEventListener('click', open);
        dot.addEventListener('click', open);
        dot.style.cursor = 'pointer';

        /* hovering either one highlights the other */
        lab.addEventListener('mouseenter', function () { dot.classList.add('is-hot'); });
        lab.addEventListener('mouseleave', function () { dot.classList.remove('is-hot'); });
        lab.addEventListener('focus', function () { dot.classList.add('is-hot'); });
        lab.addEventListener('blur', function () { dot.classList.remove('is-hot'); });
      }
    });

    var cap = isAlumni ? null : el('span', 'tml-cap', nodes);
    if (cap) cap.setAttribute('aria-hidden', 'true');

    card._tl = { n: n, svg: svg, guide: guide, path: path, tail: tail,
                 nodes: nodes, cap: cap, stage: stage,
                 alumni: !!isAlumni, played: false, mode: null };

    replay.addEventListener('click', function () { play(card, true); });

    card.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = card.querySelector('.tml-label[aria-expanded="true"]');
      if (open) { open.click(); open.focus(); }
    });

    return card;
  }

  function toggleDetail(card, lab, panel) {
    var isOpen = lab.getAttribute('aria-expanded') === 'true';
    card.querySelectorAll('.tml-label[aria-expanded="true"]').forEach(function (l) {
      l.setAttribute('aria-expanded', 'false');
    });
    card.querySelectorAll('.tml-detail').forEach(function (p) { p.hidden = true; });
    card.querySelectorAll('.tml-dot.is-open').forEach(function (d) {
      d.classList.remove('is-open');
    });
    if (!isOpen) {
      lab.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      /* mark the matching dot: labels and dots alternate in .tml-nodes,
         so the dot is the label's immediately preceding sibling */
      var dot = lab.previousElementSibling;
      if (dot && dot.classList.contains('tml-dot')) dot.classList.add('is-open');
    }
  }

  /* ==================================================================
     LAYOUT
     ------------------------------------------------------------------
     Orientation is the rule: portrait -> vertical, landscape ->
     horizontal. The one exception is a landscape viewport so narrow
     (or a thread so long) that horizontal labels would fall below
     LABEL_MIN and stop being readable; those fall back to vertical.
     ================================================================== */

  function measureLabels(card, labelW) {
    var labs = card.querySelectorAll('.tml-label'), max = 0;
    labs.forEach(function (l) { l.style.width = labelW + 'px'; });
    labs.forEach(function (l) { max = Math.max(max, l.offsetHeight); });
    return Math.max(max, 24);
  }

  function layout(card) {
    var t = card._tl;
    if (!t) return;
    var w = t.stage.clientWidth;
    if (!w) return; /* hidden (collapsed alumni panel) - retry on open */

    var mode = portraitMQ.matches ? 'v' : 'h';
    var labelW;

    if (mode === 'h') {
      var drawW = Math.min(w, PITCH_MAX * Math.max(t.n - 1, 1) + PAD_X * 2);
      var pitch = t.n > 1 ? (drawW - PAD_X * 2) / (t.n - 1) : drawW - PAD_X * 2;
      if (t.n > 1 && pitch - LABEL_GAP < LABEL_MIN) mode = 'v';
      else labelW = Math.max(Math.min(LABEL_W, pitch - LABEL_GAP), LABEL_MIN);
    }
    if (mode === 'v') labelW = Math.max(w - V_COL - 18, 120);

    /* measure first, then size the band to what was actually rendered */
    var blockH = measureLabels(card, labelW);
    var geo = mode === 'h' ? buildH(t.n, w, blockH, t.alumni)
                           : buildV(t.n, w, blockH, t.alumni);

    t.mode = mode;
    card.classList.toggle('is-vert', mode === 'v');

    t.svg.setAttribute('viewBox', '0 0 ' + geo.drawW + ' ' + geo.boxH);
    t.guide.setAttribute('d', geo.d);
    t.path.setAttribute('d', geo.d);
    if (t.tail && geo.tailD) t.tail.setAttribute('d', geo.tailD);
    t.stage.style.height = geo.boxH + 'px';
    t.svg.style.width = geo.drawW + 'px';
    t.svg.style.height = geo.boxH + 'px';
    t.svg.style.left = geo.offset + 'px';

    var dots = card.querySelectorAll('.tml-dot');
    var labs = card.querySelectorAll('.tml-label');
    geo.pts.forEach(function (p, i) {
      var x = p.x + geo.offset;
      dots[i].style.left = x + 'px';
      dots[i].style.top = p.y + 'px';
      var lab = labs[i];
      if (mode === 'h') {
        var above = p.y < geo.mid;
        lab.style.left = x + 'px';
        lab.style.top = (above ? p.y - CLEAR : p.y + CLEAR) + 'px';
        lab.classList.toggle('is-above', above);
      } else {
        lab.style.left = (V_COL + 18) + 'px';
        lab.style.top = p.y + 'px';
        lab.classList.remove('is-above');
      }
    });

    if (t.cap) {
      var ex = geo.end.x + geo.offset, px = geo.prev.x + geo.offset;
      var ang = Math.atan2(geo.end.y - geo.prev.y, ex - px) * 180 / Math.PI;
      t.cap.style.left = ex + 'px';
      t.cap.style.top = geo.end.y + 'px';
      t.cap.style.transform = 'translate(-50%,-50%) rotate(' + ang.toFixed(1) + 'deg)';
    }
  }

  /* ==================================================================
     PLAYBACK - fixed speed, no viewer control
     ================================================================== */

  function play(card, force) {
    var t = card._tl;
    if (!t) return;
    if (t.played && !force) return;
    t.played = true;

    var dots = card.querySelectorAll('.tml-dot');
    var labs = card.querySelectorAll('.tml-label');
    var endMark = t.cap || t.tail;

    function showEnd(on) {
      if (!endMark) return;
      if (endMark === t.tail) {
        endMark.setAttribute('class', 'tml-tail' + (on ? ' is-in' : ''));
      } else {
        endMark.classList.toggle('is-in', on);
      }
    }

    if (reduced) {
      t.path.style.transition = 'none';
      t.path.style.strokeDashoffset = '0';
      showEnd(true);
      dots.forEach(function (d) { d.classList.add('is-in'); });
      labs.forEach(function (l) { l.classList.add('is-in'); });
      return;
    }

    var dur = (420 + 260 * Math.max(t.n - 1, 1)) / PLAY_SPEED;

    (t.timers || []).forEach(clearTimeout);
    t.timers = [];

    t.path.style.transition = 'none';
    t.path.style.strokeDashoffset = '1';
    showEnd(false);
    dots.forEach(function (d) { d.classList.remove('is-in'); });
    labs.forEach(function (l) { l.classList.remove('is-in'); });

    void t.path.getBoundingClientRect();

    t.path.style.transition = 'stroke-dashoffset ' + Math.round(dur) + 'ms linear';
    t.path.style.strokeDashoffset = '0';

    var lead = 420 / PLAY_SPEED;
    dots.forEach(function (d, i) {
      var at = lead + (t.n === 1 ? 0 : (i / (t.n - 1)) * (dur - lead));
      t.timers.push(setTimeout(function () {
        d.classList.add('is-in');
        labs[i].classList.add('is-in');
      }, at));
    });
    t.timers.push(setTimeout(function () { showEnd(true); }, dur + 40));
  }

  /* ==================================================================
     BOOT
     ================================================================== */

  function mount(list, host, isAlumni) {
    if (!host) return [];
    return list.map(function (m) {
      var c = buildMember(m, isAlumni);
      host.appendChild(c);
      return c;
    });
  }

  function observe(cards) {
    if (!('IntersectionObserver' in global)) {
      cards.forEach(function (c) { play(c); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        play(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.25 });
    cards.forEach(function (c) { io.observe(c); });
  }

  function renderTeam() {
    var live = [];
    live = live.concat(mount(STAFF, document.getElementById('staffList'), false));
    live = live.concat(mount(STUDENTS, document.getElementById('studentList'), false));

    /* NB: mounts into #alumniPanel - the same element the toggle shows
       and hides. Keep this id in sync with team.html. */
    var alumniHost = document.getElementById('alumniPanel');
    if (!alumniHost) {
      console.error('[CodeLab] #alumniPanel not found in team.html. ' +
        'The alumni cards cannot be mounted and the count will read (0).');
    }
    var alumniCards = mount(ALUMNI, alumniHost, true);

    /* The count comes from the data, not from DOM children, so it can
       never silently disagree with what was actually mounted. */
    var badge = document.getElementById('alumniCount');
    if (badge) badge.textContent = '(' + ALUMNI.length + ')';
    if (alumniHost && alumniCards.length !== ALUMNI.length) {
      console.error('[CodeLab] mounted ' + alumniCards.length + ' of ' +
        ALUMNI.length + ' alumni cards.');
    }

    var all = live.concat(alumniCards);

    put('tmMore', 'Read more', 'Lees meer');
    put('tmReplay', 'Replay', 'Opnieuw');
    put('roleAlumnus', 'Alumnus \u00b7 project complete', 'Alumnus \u00b7 project afgerond');
    put('tmLinkQ1', 'Brain &amp; touchscreen <span class="arrow">\u2192</span>', 'Brein &amp; touchscreen <span class="arrow">\u2192</span>');
    put('tmLinkQ2', 'Ageing <span class="arrow">\u2192</span>', 'Veroudering <span class="arrow">\u2192</span>');
    put('tmLinkQ3', 'Neurological disease <span class="arrow">\u2192</span>', 'Neurologische aandoeningen <span class="arrow">\u2192</span>');
    put('tmLinkQ4', 'Sleep <span class="arrow">\u2192</span>', 'Slaap <span class="arrow">\u2192</span>');
    put('tmLinkQ5', 'Hidden rhythms <span class="arrow">\u2192</span>', 'Verborgen ritmes <span class="arrow">\u2192</span>');
    put('tmLinkQ6', 'Digital health tools <span class="arrow">\u2192</span>', 'Digitale gezondheidstools <span class="arrow">\u2192</span>');
    put('alumniOpen', 'Show alumni', 'Toon alumni');
    put('alumniClose', 'Hide alumni', 'Verberg alumni');

    requestAnimationFrame(function () {
      live.forEach(layout);
      observe(live);
    });

    /* alumni panel: collapsed by default, at the foot of the page */
    var toggle = document.getElementById('alumniToggle');
    var panel = document.getElementById('alumniPanel');
    var label = toggle && toggle.querySelector('.alumni-toggle-text');
    if (toggle && panel && label) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        panel.hidden = open;
        var key = open ? 'alumniOpen' : 'alumniClose';
        var lang = document.documentElement.lang === 'nl' ? 'nl' : 'en';
        label.setAttribute('data-i18n', key);
        label.innerHTML = dict[lang][key];
        if (!open) {
          /* alumni cards never enter the IntersectionObserver (they are
             hidden at boot), so reveal them by hand on first open */
          requestAnimationFrame(function () {
            alumniCards.forEach(function (c) {
              c.classList.add('is-in');
              layout(c);
              play(c, true);
            });
          });
        }
      });
    }

    /* re-layout on resize and on device rotation */
    var rt;
    function relayout() {
      clearTimeout(rt);
      rt = setTimeout(function () { all.forEach(layout); }, 140);
    }
    global.addEventListener('resize', relayout, { passive: true });
    if (portraitMQ.addEventListener) portraitMQ.addEventListener('change', relayout);
    else if (portraitMQ.addListener) portraitMQ.addListener(relayout);

    /* labels can rewrap when the language changes, which changes the
       measured block height - relayout after the switch */
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { setTimeout(relayout, 0); });
    });

    return dict;
  }

  global.renderTeam = renderTeam;
})(window);
