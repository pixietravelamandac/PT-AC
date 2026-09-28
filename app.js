/*
 * Disney World Match quiz: questions, scoring and rendering.
 * Resort and restaurant data lives in data.js.
 */
(function () {
  "use strict";

  var DATA = window.PT_DATA;
  var STORAGE_KEY = "pt-match-v1";

  var PARKS = { mk: "Magic Kingdom", epcot: "EPCOT", hs: "Hollywood Studios", ak: "Animal Kingdom", springs: "Disney Springs" };
  var TIERS = { value: "Value", moderate: "Moderate", deluxe: "Deluxe", villa: "Deluxe Villa" };
  var TRANSPORT = { monorail: "Monorail", skyliner: "Skyliner", boat: "Boat", walk: "Walking" };
  var VIBES = {
    tropical: "Tropical", rustic: "Rustic lodge", elegant: "Classic elegance", playful: "Bright and playful",
    nature: "Close to nature", lively: "Lively", quiet: "Quiet and relaxed", modern: "Sleek and modern"
  };
  var INTERESTS = { princess: "princess fans", classic: "Mickey fans", pixar: "Pixar fans", starwars: "Star Wars and space fans", animals: "animal lovers" };
  var CELEBRATE = { birthday: "Fun for a birthday", anniversary: "Romantic for an anniversary", first: "A classic first-visit meal" };
  var KINDS = { character: "Character meal", table: "Table service", signature: "Signature dining", quick: "Quick service" };

  var QUESTIONS = [
    { id: "who", section: "Your stay", type: "multi",
      prompt: "Who's coming on this trip?", help: "Pick everyone that applies.",
      options: [
        { value: "young-kids", label: "Little ones", hint: "Under 7" },
        { value: "kids", label: "Kids", hint: "Ages 7 to 12" },
        { value: "teens", label: "Teens", hint: "Ages 13 to 17" },
        { value: "adults", label: "Adults", hint: "18 and up" },
        { value: "grandparents", label: "Grandparents", hint: "Or anyone who prefers a slower pace" }
      ] },
    { id: "size", section: "Your stay", type: "single",
      prompt: "How many people will share one room?",
      help: "Most standard rooms sleep 4. Some sleep 5, and suites and villas sleep 6 or more.",
      options: [
        { value: "4", label: "4 or fewer" },
        { value: "5", label: "5" },
        { value: "6", label: "6 or more" }
      ] },
    { id: "budget", section: "Your stay", type: "single",
      prompt: "Which resort level fits your budget?",
      options: [
        { value: "value", label: "Value", hint: "Keep it affordable. Fun, themed buildings" },
        { value: "moderate", label: "Moderate", hint: "A step up in theming, pools and dining" },
        { value: "deluxe", label: "Deluxe", hint: "Prime locations, the best pools and restaurants" },
        { value: "flex", label: "Not sure yet", hint: "Show me the best fit at any level" }
      ] },
    { id: "parks", section: "Your stay", type: "multi", max: 2,
      prompt: "Which parks matter most to you?",
      help: "Pick up to two. We'll favor resorts with easy access to them.",
      options: [
        { value: "mk", label: "Magic Kingdom", hint: "The castle, classic rides, fireworks" },
        { value: "epcot", label: "EPCOT", hint: "World Showcase, festivals, food" },
        { value: "hs", label: "Hollywood Studios", hint: "Star Wars, Toy Story, thrill rides" },
        { value: "ak", label: "Animal Kingdom", hint: "Safaris, Pandora, Expedition Everest" }
      ] },
    { id: "transport", section: "Your stay", type: "multi",
      prompt: "How would you like to get to the parks?",
      help: "Pick any you'd be happy with. Every resort has free buses to all four parks.",
      options: [
        { value: "monorail", label: "Monorail" },
        { value: "skyliner", label: "Skyliner gondola" },
        { value: "boat", label: "Boat" },
        { value: "walk", label: "Walk to a park" },
        { value: "bus", label: "Bus", hint: "Free Disney buses from every resort" },
        { value: "car", label: "We'll have a car" }
      ] },
    { id: "vibe", section: "Your stay", type: "multi", max: 2,
      prompt: "What should your resort feel like?", help: "Pick up to two.",
      options: Object.keys(VIBES).map(function (k) { return { value: k, label: VIBES[k] }; }) },
    { id: "pool", section: "Your stay", type: "single",
      prompt: "How important is the pool?",
      options: [
        { value: "big", label: "Very important", hint: "Slides, splash areas, maybe a pool day" },
        { value: "nice", label: "Nice to have" },
        { value: "skip", label: "We won't use it much" }
      ] },
    { id: "pace", section: "Your stay", type: "single",
      prompt: "How will you spend your days?",
      options: [
        { value: "parks", label: "Rope drop to fireworks", hint: "The room is for sleeping" },
        { value: "mix", label: "A mix", hint: "Some park mornings, some resort afternoons" },
        { value: "relax", label: "Plenty of downtime", hint: "The resort is part of the vacation" }
      ] },
    { id: "characters", section: "Your dining", type: "single",
      prompt: "How do you feel about character dining?",
      help: "Characters visit your table during the meal for photos and autographs.",
      options: [
        { value: "must", label: "It's a must" },
        { value: "some", label: "One would be fun" },
        { value: "none", label: "No thanks" }
      ] },
    { id: "style", section: "Your dining", type: "multi",
      prompt: "What kinds of meals do you enjoy?", help: "Pick any that apply.",
      options: [
        { value: "quick", label: "Quick and casual", hint: "Order at the counter" },
        { value: "table", label: "Sit-down meals", hint: "Table service" },
        { value: "family", label: "Buffets and family-style", hint: "All you care to enjoy" },
        { value: "signature", label: "Special-occasion dining", hint: "Signature restaurants" }
      ] },
    { id: "diningPlan", section: "Your dining", type: "single",
      prompt: "Are you planning to use a Disney dining plan?",
      help: "Dining plans are added to a Walt Disney World resort package. Your advisor will confirm current pricing and details.",
      options: [
        { value: "full", label: "Disney Dining Plan", hint: "One table-service meal, one quick-service meal and one snack per person, per night" },
        { value: "quick", label: "Quick-Service Dining Plan", hint: "Two quick-service meals and one snack per person, per night" },
        { value: "deluxe", label: "Deluxe Dining Plan", hint: "Two table-service meals and one quick-service meal per person, per night. For 2027 trips" },
        { value: "none", label: "No, we'll pay as we go" },
        { value: "unsure", label: "Not sure yet", hint: "Your advisor can help you compare" }
      ] },
    { id: "diningBudget", section: "Your dining", type: "single",
      prompt: "What would you spend per adult on a sit-down meal?", help: "Before tax and tip.",
      options: [
        { value: "2", label: "Up to about $35" },
        { value: "3", label: "$35 to $60" },
        { value: "4", label: "Over $60 for the right meal" }
      ] },
    { id: "eaters", section: "Your dining", type: "single",
      prompt: "How adventurous are your eaters?",
      options: [
        { value: "picky", label: "We have picky eaters", hint: "Chicken nuggets and pizza keep the peace" },
        { value: "mixed", label: "A mix of both" },
        { value: "adventurous", label: "We love trying new flavors" }
      ] },
    { id: "interests", section: "Your dining", type: "multi", optional: true,
      prompt: "Which stories does your group love?", help: "Pick any that apply, or skip.",
      options: [
        { value: "princess", label: "Princesses" },
        { value: "classic", label: "Mickey and friends" },
        { value: "pixar", label: "Toy Story and Pixar" },
        { value: "starwars", label: "Star Wars and space" },
        { value: "animals", label: "Animals and adventure" }
      ] },
    { id: "celebrate", section: "Your dining", type: "single",
      prompt: "Are you celebrating anything?",
      options: [
        { value: "birthday", label: "A birthday" },
        { value: "anniversary", label: "An anniversary or honeymoon" },
        { value: "first", label: "A first visit" },
        { value: "none", label: "Just a vacation" }
      ] }
  ];

  // ---------- Scoring ----------

  var TIER_RANK = { value: 0, moderate: 1, deluxe: 2, villa: 2 };

  // Older saved answers stored transport as a single value.
  function transportList(a) {
    var t = a.transport;
    return Array.isArray(t) ? t : (t ? [t] : []);
  }

  // Dining plan credits: signature meals take 2, other meals 1.
  // 0 means the plan isn't accepted; null means participation needs checking.
  function planCredits(d) {
    if (d.credits !== undefined) return d.credits;
    return d.kind === "signature" ? 2 : 1;
  }

  function creditLabel(d) {
    var c = planCredits(d);
    if (c === null) return "Dining plan: ask your advisor";
    if (c === 0) return "Not on the dining plan";
    if (d.kind === "quick") return "1 quick-service credit";
    return c + " table-service credit" + (c > 1 ? "s" : "") + (d.creditsNote ? " (" + d.creditsNote + ")" : "");
  }

  var MENU_BASE = "https://disneyworld.disney.go.com/dining/";
  function menuLink(d) {
    if (d.menuUrl) return { href: d.menuUrl, label: "View menu" };
    if (d.menu) return { href: MENU_BASE + d.menu + "/menus/", label: "View menu" };
    return {
      href: "https://www.google.com/search?q=" + encodeURIComponent('site:disneyworld.disney.go.com "' + d.name + '" menu'),
      label: "Find menu"
    };
  }

  // Ratings default to 1 (neutral) when the data leaves them out.
  function rating(v) { return v == null ? 1 : v; }

  function audience(a) {
    var who = a.who || [];
    var hasKids = who.some(function (w) { return w === "young-kids" || w === "kids" || w === "teens"; });
    return { who: who, hasKids: hasKids, youngKids: who.indexOf("young-kids") >= 0, adultsOnly: !hasKids };
  }

  function usesPlan(a) { return a.diningPlan === "full" || a.diningPlan === "quick" || a.diningPlan === "deluxe"; }

  function scoreResort(r, a) {
    var s = 0, why = [];
    var need = Number(a.size || 4);
    var fitsStandard = r.sleeps >= need;
    if (!fitsStandard && !(r.suiteSleeps >= need)) return null;
    if (!fitsStandard) { s -= 4; why.push(r.suiteLabel + " sleep up to " + r.suiteSleeps); }
    else if (need >= 5 && !r.camping) why.push((r.roomLabel || (r.tier === "villa" ? "Studios" : "Standard rooms")) + " sleep " + r.sleeps);

    if (r.camping) { s -= 40; why.push("Bring your own tent or RV"); }
    if (r.partner && usesPlan(a)) { s -= 15; why.push("Dining plans aren't available here"); }

    if (a.budget && a.budget !== "flex") {
      var diff = TIER_RANK[r.tier] - TIER_RANK[a.budget];
      if (diff === 0) { s += 30; why.push("Fits a " + TIERS[a.budget].toLowerCase() + " budget"); }
      else if (diff < 0) s += 14 + diff * 4;
      else s -= 25 * diff;
    }

    (a.parks || []).forEach(function (p) {
      s += (r.parks[p] - 1) * 10;
      if (r.access && r.access[p]) why.push(r.access[p]);
    });

    var rides = transportList(a).filter(function (t) { return TRANSPORT[t] && r.transport.indexOf(t) >= 0; });
    if (rides.length) {
      s += 15 + (rides.length - 1) * 4;
      rides.forEach(function (t) {
        if (!why.some(function (w) { return w.toLowerCase().indexOf(t) >= 0; })) why.push(TRANSPORT[t] + " access");
      });
    }

    (a.vibe || []).forEach(function (v) {
      if (r.vibes.indexOf(v) >= 0) { s += 14; why.push(VIBES[v] + " feel"); }
    });

    var poolWeight = { big: 6, nice: 2, skip: 0 }[a.pool] || 0;
    s += poolWeight * r.pool;
    if (a.pool === "big" && r.poolNote) why.push(r.poolNote);

    if (a.pace === "relax") s += (TIER_RANK[r.tier] * 4) + r.pool * 2;
    if (a.pace === "parks" && r.tier === "value") s += 6;

    var aud = audience(a);
    var groups = aud.adultsOnly ? ["adults"] : aud.who.filter(function (w) { return w !== "adults"; });
    groups.forEach(function (g) { if (r.goodFor.indexOf(g) >= 0) s += 4; });

    return { item: r, score: s, why: why.slice(0, 4) };
  }

  function scoreRestaurant(d, a, topResort) {
    var s = 0, why = [];
    var aud = audience(a);
    var isChar = d.kind === "character";
    var picky = rating(d.picky), adv = rating(d.adv), kids = rating(d.kids), adults = rating(d.adults);

    if (d.minAge && aud.youngKids) return null;
    if (a.characters === "none" && isChar) return null;
    if (a.characters === "must" && isChar) s += 30;
    if (a.characters === "some" && isChar) s += 12;

    var styles = a.style || [];
    if (styles.length) {
      var matched = styles.some(function (st) {
        if (st === "family") return !!d.family;
        if (st === "table") return d.kind === "table" || (isChar && !d.family);
        return d.kind === st;
      });
      s += matched ? 14 : -6;
    }

    var credits = planCredits(d);
    if (a.diningPlan === "full" || a.diningPlan === "deluxe") {
      if (credits === 0) { s -= 20; why.push("Not on the dining plan"); }
      else if (credits === null) s -= 4;
      else if (d.kind !== "quick" && credits === 1) s += 8;
      else if (credits === 2) s += a.diningPlan === "deluxe" ? 4 : -4;
    }
    if (a.diningPlan === "quick") {
      if (d.kind === "quick" && credits === 1) { s += 20; why.push("Covered by the Quick-Service plan"); }
      else if (d.kind !== "quick") s -= 8;
    }

    if (d.kind !== "quick") {
      var over = d.price - Number(a.diningBudget || 3);
      s += over > 0 ? -14 * over : 6;
    }

    if (a.eaters === "picky") { s += (picky - 1) * 10; if (picky === 2) why.push("Easy for picky eaters"); }
    if (a.eaters === "adventurous") { s += (adv - 1) * 10; if (adv === 2) why.push("Adventurous flavors"); }
    if (a.eaters === "mixed" && picky + adv >= 2) s += 4;

    (a.interests || []).forEach(function (t) {
      if ((d.themes || []).indexOf(t) >= 0) { s += 12; why.push("Great for " + INTERESTS[t]); }
    });

    if (CELEBRATE[a.celebrate] && (d.celebrate || []).indexOf(a.celebrate) >= 0) { s += 12; why.push(CELEBRATE[a.celebrate]); }

    if (aud.adultsOnly) { s += (adults - 1) * 8; if (adults === 2) why.push("Grown-up atmosphere"); }
    else { s += (kids - 1) * 6; if (kids === 0) s -= 20; }

    var atTop = topResort && d.resort && (d.resort === topResort.id || d.resort === topResort.host);
    if (atTop) { s += 10; why.unshift("At your top resort match"); }
    else if ((a.parks || []).indexOf(d.park) >= 0) { s += 6; why.push("In " + PARKS[d.park]); }

    if (d.status) s -= 3;

    return { item: d, score: s, why: why.slice(0, 3) };
  }

  function rank(list, fn) {
    return list.map(fn).filter(Boolean).sort(function (x, y) { return y.score - x.score; });
  }

  var DINING_GROUPS = [
    { title: "Character meals", kinds: ["character"] },
    { title: "Table service", kinds: ["table", "signature"] },
    { title: "Quick service", kinds: ["quick"] }
  ];

  function computeResults(a) {
    var resorts = rank(DATA.resorts, function (r) { return scoreResort(r, a); }).slice(0, 3);
    var top = resorts[0] && resorts[0].item;
    var dining = rank(DATA.restaurants, function (d) { return scoreRestaurant(d, a, top); });
    return {
      plan: a.diningPlan,
      resorts: resorts,
      dining: DINING_GROUPS.map(function (g) {
        var skip = g.kinds[0] === "character" && a.characters === "none";
        return {
          title: g.title,
          items: skip ? [] : dining.filter(function (x) { return g.kinds.indexOf(x.item.kind) >= 0 && x.score > -10; }).slice(0, 3)
        };
      }).filter(function (g) { return g.items.length; })
    };
  }

  // ---------- State ----------

  var state = load() || { step: -1, answers: {}, contact: {} };

  function load() {
    try { var raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  }

  // ---------- Rendering ----------

  var root = document.getElementById("app");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render() {
    root.classList.toggle("wide", state.step >= QUESTIONS.length);
    if (state.step < 0) renderIntro();
    else if (state.step >= QUESTIONS.length) renderResults();
    else renderQuestion();
    save();
  }

  function go(step) {
    state.step = step;
    render();
    var focus = root.querySelector("h1, h2");
    if (focus) { focus.setAttribute("tabindex", "-1"); focus.focus({ preventScroll: true }); }
    window.scrollTo({ top: 0 });
  }

  function renderIntro() {
    root.innerHTML =
      '<section class="intro">' +
        '<p class="eyebrow">Walt Disney World planning quiz</p>' +
        '<h1>Find your resort, and where to eat.</h1>' +
        '<p class="lede">Answer ' + QUESTIONS.length + ' quick questions about your group and how you like to travel. ' +
        'We\'ll match you with Walt Disney World resorts and restaurants that fit, and you can send the results to your Pixie Travel Co. advisor.</p>' +
        '<ul class="intro-facts">' +
          '<li><strong>' + DATA.resorts.length + '</strong> resorts compared</li>' +
          '<li><strong>' + DATA.restaurants.length + '</strong> restaurants considered</li>' +
          '<li><strong>3</strong> minutes, give or take</li>' +
        '</ul>' +
        '<div class="actions"><button class="btn primary" id="start" type="button">Start the quiz</button></div>' +
      '</section>';
    document.getElementById("start").onclick = function () { go(0); };
  }

  function renderQuestion() {
    var q = QUESTIONS[state.step];
    var ans = state.answers[q.id];
    var selected = q.type === "multi" ? (ans || []) : (ans ? [ans] : []);
    var sectionStart = QUESTIONS.findIndex(function (x) { return x.section === q.section; });
    var sectionCount = QUESTIONS.filter(function (x) { return x.section === q.section; }).length;
    var pct = Math.round((state.step / QUESTIONS.length) * 100);

    root.innerHTML =
      '<section class="question" aria-labelledby="q-title">' +
        '<div class="progress">' +
          '<div class="progress-label"><span>' + esc(q.section) + '</span>' +
          '<span class="num">' + (state.step - sectionStart + 1) + ' of ' + sectionCount + '</span></div>' +
          '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div>' +
        '</div>' +
        '<h2 id="q-title">' + esc(q.prompt) + '</h2>' +
        (q.help ? '<p class="help">' + esc(q.help) + '</p>' : '') +
        '<div class="options' + (q.options.length > 4 ? ' many' : '') + '" role="group" aria-labelledby="q-title">' +
          q.options.map(function (o) {
            var on = selected.indexOf(o.value) >= 0;
            return '<button type="button" class="option" id="opt-' + q.id + '-' + o.value + '" data-value="' + esc(o.value) + '" aria-pressed="' + on + '">' +
              '<span class="mark" aria-hidden="true"></span>' +
              '<span class="option-text"><span class="option-label">' + esc(o.label) + '</span>' +
              (o.hint ? '<span class="option-hint">' + esc(o.hint) + '</span>' : '') + '</span></button>';
          }).join('') +
        '</div>' +
        '<p class="limit" id="limit" hidden></p>' +
        '<div class="actions">' +
          '<button class="btn ghost" id="back" type="button">Back</button>' +
          '<button class="btn primary" id="next" type="button">' + (state.step === QUESTIONS.length - 1 ? 'See my matches' : 'Next') + '</button>' +
        '</div>' +
      '</section>';

    var next = document.getElementById("next");
    var limit = document.getElementById("limit");
    function refresh() {
      var cur = state.answers[q.id];
      var has = q.type === "multi" ? (cur && cur.length) : !!cur;
      next.disabled = !has && !q.optional;
      if (q.optional && !has) next.textContent = "Skip";
      else next.textContent = state.step === QUESTIONS.length - 1 ? "See my matches" : "Next";
    }

    root.querySelectorAll(".option").forEach(function (btn) {
      btn.onclick = function () {
        var v = btn.getAttribute("data-value");
        if (q.type === "single") {
          state.answers[q.id] = v;
          root.querySelectorAll(".option").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        } else {
          var list = (state.answers[q.id] || []).slice();
          var i = list.indexOf(v);
          if (i >= 0) list.splice(i, 1);
          else if (q.max && list.length >= q.max) {
            limit.textContent = "You can pick up to " + q.max + ". Unselect one to choose another.";
            limit.hidden = false;
            return;
          } else list.push(v);
          limit.hidden = true;
          state.answers[q.id] = list;
          btn.setAttribute("aria-pressed", String(i < 0));
        }
        save();
        refresh();
      };
    });
    document.getElementById("back").onclick = function () { go(state.step - 1); };
    next.onclick = function () { go(state.step + 1); };
    refresh();
  }

  var PLAN_NOTES = {
    full: "You're planning on the Disney Dining Plan, so we favored restaurants that take one table-service credit. Signature restaurants and some character meals take two, and a few don't accept the plan.",
    deluxe: "You're planning on the Deluxe Dining Plan. With two table-service credits a night, signature restaurants are easier to fit in. A few don't accept the plan.",
    quick: "You're planning on the Quick-Service Dining Plan, so we favored quick-service spots. Sit-down meals would be paid separately.",
    unsure: "Not sure about a dining plan? Your advisor can compare the plan with paying as you go, based on the restaurants you like here."
  };
  function planNote(plan) {
    return PLAN_NOTES[plan] ? '<p class="plan-note">' + esc(PLAN_NOTES[plan]) + '</p>' : '';
  }

  function restaurantCard(d, why) {
    var credits = planCredits(d);
    var link = menuLink(d);
    return '<li class="restaurant">' +
      '<div class="r-head"><h4>' + esc(d.name) + '</h4><span class="price" aria-label="Price level ' + d.price + ' of 4">' + priceTag(d.price) + '</span></div>' +
      '<p class="meta">' + esc(d.where) + ' &middot; ' + esc(KINDS[d.kind]) + (d.family ? ', family-style' : '') + '</p>' +
      (d.status ? '<p class="status-note">' + esc(d.status) + '</p>' : '') +
      (d.chars ? '<p class="chars">Characters: ' + esc(d.chars) + '</p>' : '') +
      '<p class="blurb">' + esc(d.note) + '</p>' +
      (why.length ? '<ul class="why small">' + why.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>' : '') +
      '<div class="r-foot">' +
        '<span class="credits' + (credits === 0 ? ' off' : '') + '">' + esc(creditLabel(d)) + '</span>' +
        '<a class="menu-link" href="' + esc(link.href) + '" target="_blank" rel="noopener">' + link.label + '<span class="sr-only"> for ' + esc(d.name) + ' (opens in a new tab)</span></a>' +
      '</div>' +
    '</li>';
  }

  function priceTag(n) { return "$$$$".slice(0, n); }

  function renderResults() {
    var res = computeResults(state.answers);
    var labels = ["Best match", "Great fit", "Also worth a look"];
    var c = state.contact || {};

    root.innerHTML =
      '<section class="results">' +
        '<header class="results-head">' +
          '<p class="eyebrow">Your matches</p>' +
          '<h1>Here\'s where we\'d start.</h1>' +
          '<p class="lede">These picks are based on your answers. Your advisor will check availability, current pricing and dining reservations before anything is booked.</p>' +
        '</header>' +

        '<h2 class="section-title">Resorts</h2>' +
        (res.resorts.length ? '<ol class="resorts">' + res.resorts.map(function (x, i) {
          var r = x.item;
          return '<li class="resort' + (i === 0 ? ' top' : '') + '">' +
            '<p class="rank">' + labels[i] + '</p>' +
            '<h3>' + esc(r.name) + '</h3>' +
            '<p class="meta">' + esc(r.sub) + '</p>' +
            '<p class="blurb">' + esc(r.blurb) + '</p>' +
            (x.why.length ? '<ul class="why">' + x.why.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>' : '') +
          '</li>';
        }).join('') + '</ol>' :
        '<p class="empty">No resort fits every answer. Your advisor can look at connecting rooms or villas for larger groups.</p>') +

        '<h2 class="section-title">Dining ideas</h2>' +
        planNote(res.plan) +
        res.dining.map(function (g) {
          return '<div class="dining-group"><h3 class="group-title">' + esc(g.title) + '</h3><ul class="dining">' +
            g.items.map(function (x) { return restaurantCard(x.item, x.why); }).join('') + '</ul></div>';
        }).join('') +
        '<p class="fineprint">Menus, prices, character lineups and dining plan rules change often. Price levels per adult: $ under $15, $$ $15 to $35, $$$ $35 to $60, $$$$ over $60.</p>' +

        '<section class="browse" aria-labelledby="browse-title">' +
          '<h2 id="browse-title" class="section-title">Browse every restaurant</h2>' +
          '<p class="help">All ' + DATA.restaurants.length + ' table-service, character and quick-service restaurants at the parks, resorts and Disney Springs. Snack stands and bars aren\'t listed.</p>' +
          '<div class="filters">' +
            '<label class="field" for="browse-kind"><span>Type</span><select id="browse-kind">' +
              DINING_GROUPS.map(function (g, i) { return '<option value="' + i + '">' + esc(g.title) + '</option>'; }).join('') +
            '</select></label>' +
            '<label class="field" for="browse-area"><span>Where</span><select id="browse-area">' +
              '<option value="">Everywhere</option>' +
              ["mk", "epcot", "hs", "ak", "springs"].map(function (p) { return '<option value="' + p + '">' + esc(PARKS[p]) + '</option>'; }).join('') +
              '<option value="resort">Resort hotels</option>' +
            '</select></label>' +
          '</div>' +
          '<p class="count" id="browse-count" aria-live="polite"></p>' +
          '<ul class="dining" id="browse-list"></ul>' +
        '</section>' +

        '<section class="send" aria-labelledby="send-title">' +
          '<h2 id="send-title">Send these to your advisor</h2>' +
          '<p>Add a few details, copy your summary, and paste it into an email or message to your Pixie Travel Co. advisor.</p>' +
          '<form id="contact" class="contact" novalidate>' +
            field("c-name", "Your name", "name", c.name, "text", "name") +
            field("c-email", "Email", "email", c.email, "email", "email") +
            field("c-dates", "Travel dates", "dates", c.dates, "text", "off", "For example: March 8 to 14, 2027") +
            '<label class="field wide" for="c-notes"><span>Anything else we should know?</span>' +
              '<textarea id="c-notes" name="notes" rows="3" placeholder="Allergies, mobility needs, must-do experiences">' + esc(c.notes) + '</textarea></label>' +
          '</form>' +
          '<label class="field wide" for="summary"><span>Your summary</span>' +
            '<textarea id="summary" rows="10" readonly></textarea></label>' +
          '<div class="actions">' +
            '<button class="btn ghost" id="retake" type="button">Retake the quiz</button>' +
            '<button class="btn primary" id="copy" type="button">Copy summary</button>' +
          '</div>' +
          '<p class="status" id="copy-status" role="status" aria-live="polite"></p>' +
        '</section>' +
        '<p class="fineprint">Pixie Travel Co. is an independent travel agency and is not affiliated with Disney.</p>' +
      '</section>';

    var kindSel = document.getElementById("browse-kind");
    var areaSel = document.getElementById("browse-area");
    function renderBrowse() {
      var kinds = DINING_GROUPS[Number(kindSel.value)].kinds;
      var area = areaSel.value;
      var list = DATA.restaurants.filter(function (d) {
        return kinds.indexOf(d.kind) >= 0 && (!area || d.park === area);
      }).sort(function (x, y) { return x.where.localeCompare(y.where) || x.name.localeCompare(y.name); });
      document.getElementById("browse-count").textContent = list.length + " restaurant" + (list.length === 1 ? "" : "s");
      document.getElementById("browse-list").innerHTML = list.map(function (d) { return restaurantCard(d, []); }).join("");
    }
    kindSel.onchange = renderBrowse;
    areaSel.onchange = renderBrowse;
    renderBrowse();

    var summary = document.getElementById("summary");
    var form = document.getElementById("contact");
    function updateSummary() {
      var val = function (id) { return document.getElementById(id).value; };
      state.contact = { name: val("c-name"), email: val("c-email"), dates: val("c-dates"), notes: val("c-notes") };
      summary.value = buildSummary(res, state.answers, state.contact);
      save();
    }
    form.addEventListener("input", updateSummary);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    updateSummary();

    document.getElementById("retake").onclick = function () {
      state.answers = {};
      go(0);
    };
    document.getElementById("copy").onclick = function () {
      var status = document.getElementById("copy-status");
      var done = function () { status.textContent = "Copied. Paste it into an email to your advisor."; };
      var fallback = function () {
        summary.focus();
        summary.select();
        status.textContent = "Your summary is selected. Press Ctrl+C (or Cmd+C) to copy it.";
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summary.value).then(done, fallback);
      } else fallback();
    };
  }

  function field(id, label, name, value, type, autocomplete, placeholder) {
    return '<label class="field" for="' + id + '"><span>' + label + '</span>' +
      '<input id="' + id + '" name="' + name + '" type="' + type + '" autocomplete="' + autocomplete + '"' +
      (placeholder ? ' placeholder="' + esc(placeholder) + '"' : '') + ' value="' + esc(value) + '"></label>';
  }

  function answerText(q, a) {
    var v = a[q.id];
    var vals = Array.isArray(v) ? v : (v ? [v] : []);
    if (!vals.length) return "No preference";
    return vals.map(function (x) {
      var o = q.options.find(function (o) { return o.value === x; });
      return o ? o.label : x;
    }).join(", ");
  }

  function buildSummary(res, a, c) {
    var lines = ["Walt Disney World Match results", ""];
    if (c.name) lines.push("Name: " + c.name);
    if (c.email) lines.push("Email: " + c.email);
    if (c.dates) lines.push("Travel dates: " + c.dates);
    if (c.name || c.email || c.dates) lines.push("");
    lines.push("MY ANSWERS");
    QUESTIONS.forEach(function (q) { lines.push("- " + q.prompt + " " + answerText(q, a)); });
    lines.push("", "RESORT MATCHES");
    res.resorts.forEach(function (x, i) {
      lines.push((i + 1) + ". " + x.item.name + " (" + TIERS[x.item.tier] + ")" + (x.why.length ? ": " + x.why.join("; ") : ""));
    });
    lines.push("", "DINING IDEAS");
    res.dining.forEach(function (g) {
      lines.push(g.title + ":");
      g.items.forEach(function (x) {
        lines.push("- " + x.item.name + ", " + x.item.where + " (" + priceTag(x.item.price) + ", " + creditLabel(x.item) + ")");
      });
    });
    if (c.notes) lines.push("", "NOTES", c.notes);
    return lines.join("\n");
  }

  render();
})();
