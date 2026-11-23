/* ==========================================================================
   NLP GENIUS: BUSINESS TEXT ANALYTICS - W3SCHOOLS SIDEBAR & INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// App State
const state = {
  currentTab: 'roadmap',
  theme: localStorage.getItem('nlp_theme') || 'dark',
  completedQuizzes: JSON.parse(localStorage.getItem('nlp_completed_quizzes') || '{}'),
  quizScores: JSON.parse(localStorage.getItem('nlp_quiz_scores') || '{}'),
  searchQuery: ''
};

function initApp() {
  applyStoredTheme();
  renderCurriculum();
  renderQuizzes();
  renderExamPrep();
  setupPlaygrounds();
  setupSearch();
  updateProgressStats();
}

/* --------------------------------------------------------------------------
   W3SCHOOLS SIDEBAR & SECTION SWITCHER
   -------------------------------------------------------------------------- */
window.switchSection = function(targetId, sidebarElem) {
  document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
  if (sidebarElem) {
    sidebarElem.classList.add('active');
  }

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  const targetSection = document.getElementById(`${targetId}-tab`);
  if (targetSection) {
    targetSection.classList.add('active');
    state.currentTab = targetId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.jumpToTopic = function(topicId) {
  switchSection('curriculum');
  setTimeout(() => {
    const elem = document.getElementById(topicId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      elem.style.borderColor = 'var(--text-white)';
      setTimeout(() => { elem.style.borderColor = 'var(--border-subtle)'; }, 2000);
    }
  }, 100);
};

const UNIT_PRACTICES = {
  "unit-1": {
    kind: "foundations",
    title: "Classify a business text record",
    description: "Switch between a free-text review and a structured order row, then compare their formats.",
    example: "The package arrived two days late, and support has not replied.",
    structuredExample: "Order ID: A1042 | Delay (days): 2 | Refund requested: Yes",
    note: "The selected format demonstrates the structured vs. unstructured distinction."
  },
  "unit-2": {
    kind: "preprocessing",
    title: "Run a mini preprocessing pipeline",
    description: "Normalize a dummy complaint, tokenize it, remove filler words, and keep negation.",
    example: "The order was NOT delivered on time, and support never responded. See https://example.com",
    note: "This is a lightweight browser demo, not a full stemming or lemmatization library."
  },
  "unit-3": {
    kind: "insights",
    title: "Find sentiment and a likely support topic",
    description: "Try a made-up customer complaint and inspect its sentiment cues and likely route.",
    example: "The order arrived late and the package was damaged.",
    note: "Keyword rules make this example easy to inspect; they are not a trained NLP model."
  },
  "unit-4": {
    kind: "context",
    title: "See a word change meaning with context",
    description: "Edit the sentence around “bank” to compare finance and river contexts.",
    example: "The company deposited its funds at the bank.",
    note: "This is an illustrative context-matching simulation; no embedding or BERT model runs here."
  },
  "unit-5": {
    kind: "governance",
    title: "Estimate a business case and review safeguards",
    description: "Change the dummy workload and cost figures, then review the governance checks.",
    note: "All figures are hypothetical. Use the safeguards as a discussion prompt, not a compliance assessment."
  }
};

function escapePracticeText(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function renderUnitPractice(unit) {
  const practice = UNIT_PRACTICES[unit.id];
  if (!practice) return '';

  let controls = '';
  if (practice.kind === 'foundations') {
    controls = `
      <div class="practice-field-grid">
        <div class="input-group">
          <label for="practice-format-${unit.id}">Record format</label>
          <select id="practice-format-${unit.id}" class="practice-select" data-practice-format data-sample="unstructured">
            <option value="unstructured" data-example="${escapePracticeText(practice.example)}" selected>Customer review (unstructured)</option>
            <option value="structured" data-example="${escapePracticeText(practice.structuredExample)}">Order table row (structured)</option>
          </select>
        </div>
        <div class="input-group">
          <label for="practice-text-${unit.id}">Dummy business text</label>
          <textarea id="practice-text-${unit.id}" class="text-area-custom" rows="3" data-practice-text data-sample="${escapePracticeText(practice.example)}">${escapePracticeText(practice.example)}</textarea>
        </div>
      </div>
    `;
  } else if (practice.kind === 'governance') {
    controls = `
      <div class="practice-number-grid">
        <label class="practice-number-field">Tickets reviewed per month
          <input type="number" min="0" step="1" value="600" data-practice-field="tickets" data-sample="600">
        </label>
        <label class="practice-number-field">Minutes saved per ticket
          <input type="number" min="0" step="1" value="6" data-practice-field="minutes" data-sample="6">
        </label>
        <label class="practice-number-field">Hourly labor cost ($)
          <input type="number" min="0" step="0.01" value="24" data-practice-field="hourly-cost" data-sample="24">
        </label>
        <label class="practice-number-field">Monthly tool cost ($)
          <input type="number" min="0" step="0.01" value="900" data-practice-field="tool-cost" data-sample="900">
        </label>
      </div>
      <fieldset class="practice-guardrails">
        <legend>Safeguards in the dummy scenario</legend>
        <label><input type="checkbox" data-practice-guardrail data-sample="true" checked> Personal data is minimized</label>
        <label><input type="checkbox" data-practice-guardrail data-sample="true" checked> A person reviews high-impact decisions</label>
        <label><input type="checkbox" data-practice-guardrail data-sample="false"> Bias checks are documented</label>
      </fieldset>
    `;
  } else {
    const label = practice.kind === 'context' ? 'Dummy sentence' : 'Dummy customer feedback';
    controls = `
      <div class="input-group">
        <label for="practice-text-${unit.id}">${label}</label>
        <textarea id="practice-text-${unit.id}" class="text-area-custom" rows="3" data-practice-text data-sample="${escapePracticeText(practice.example)}">${escapePracticeText(practice.example)}</textarea>
      </div>
    `;
  }

  return `
    <section class="unit-practice" data-unit-practice="${unit.id}" aria-labelledby="practice-title-${unit.id}">
      <div class="unit-practice-heading">
        <div>
          <span class="badge">TRY A DUMMY EXAMPLE · ${unit.number.toUpperCase()}</span>
          <h3 id="practice-title-${unit.id}">${practice.title}</h3>
          <p>${practice.description}</p>
        </div>
      </div>
      ${controls}
      <div class="unit-practice-actions">
        <button class="btn btn-primary" type="button" data-practice-action="run" data-unit-id="${unit.id}">Run example</button>
        <button class="btn btn-secondary" type="button" data-practice-action="reset" data-unit-id="${unit.id}">Load dummy example</button>
      </div>
      <div class="unit-practice-output" data-practice-output role="status" aria-live="polite">
        <p>Run the example to see an illustrative result.</p>
      </div>
      <p class="unit-practice-note">${practice.note}</p>
    </section>
  `;
}

/* --------------------------------------------------------------------------
   DYNAMIC DARK & LIGHT THEME SWITCHER
   -------------------------------------------------------------------------- */
function applyStoredTheme() {
  const html = document.documentElement;
  html.setAttribute('data-theme', state.theme);
  updateThemeButtonText();
}

window.toggleTheme = function(event) {
  const html = document.documentElement;
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  state.theme = newTheme;
  localStorage.setItem('nlp_theme', newTheme);

  // Dynamic Ripple Visual Feedback
  const ripple = document.getElementById('theme-ripple');
  if (ripple && event) {
    const x = event.clientX || window.innerWidth / 2;
    const y = event.clientY || window.innerHeight / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.background = newTheme === 'light' ? '#ffffff' : '#000000';
    
    ripple.classList.remove('active');
    void ripple.offsetWidth; // Trigger reflow
    ripple.classList.add('active');
  }

  // Switch Theme Attribute
  html.setAttribute('data-theme', newTheme);
  updateThemeButtonText();
};

function updateThemeButtonText() {
  const btnText = document.getElementById('theme-btn-text');
  if (btnText) {
    btnText.innerText = `THEME: ${state.theme.toUpperCase()}`;
  }
}

/* --------------------------------------------------------------------------
   CURRICULUM RENDERER
   -------------------------------------------------------------------------- */
function renderCurriculum() {
  const container = document.getElementById('curriculum-container');
  if (!container) return;

  let html = '';
  NLP_DATA.units.forEach(unit => {
    html += `
      <div class="unit-section" style="margin-bottom: 3.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <div>
            <span class="badge" style="font-size: 0.8rem; background: var(--text-white); color: var(--text-inverse); font-weight: 900;">${unit.number}</span>
            <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--text-white); display: inline-block; margin-left: 0.75rem; text-transform: uppercase; letter-spacing: 1px;">${unit.title}</h2>
          </div>
          <span class="badge" style="border-color: var(--border-medium);">${unit.hours}</span>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.75rem; max-width: 900px; font-size: 1rem; line-height: 1.7;">${unit.summary}</p>
        
        <div class="card-grid">
          ${unit.topics.map(topic => `
            <div class="card" id="${topic.id}">
              <div class="card-header">
                <span class="badge" style="background: var(--text-white); color: var(--text-inverse); font-weight: 900;">CONCEPT LESSON</span>
              </div>
              <h3 class="card-title">${topic.title}</h3>
              <p class="card-desc">${topic.concept}</p>
              
              <!-- ELI5 Child-Friendly Box -->
              <div class="eli5-box">
                <div class="eli5-header">
                  <span>EXPLAIN LIKE I'M 5 (ELI5)</span>
                </div>
                <div class="eli5-text">${topic.eli5}</div>
              </div>

              <!-- Business Value Connection -->
              <div class="biz-box">
                <div class="biz-header">
                  <span>BUSINESS IMPACT</span>
                </div>
                <div class="biz-text">${topic.bizValue}</div>
              </div>

              <!-- Key Terms -->
              <div style="margin-top: 1.25rem;">
                <span style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Key Terms:</span>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.5rem;">
                  ${topic.keyTerms.map(kt => `<span class="badge" style="background: var(--bg-dark); border-color: var(--border-medium);" title="${kt.def}">${kt.term}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        ${renderUnitPractice(unit)}
      </div>
    `;
  });

  container.innerHTML = html;
  container.querySelectorAll('[data-practice-action="run"]').forEach(button => {
    button.addEventListener('click', () => runUnitPractice(button.dataset.unitId));
  });
  container.querySelectorAll('[data-practice-action="reset"]').forEach(button => {
    button.addEventListener('click', () => resetUnitPractice(button.dataset.unitId));
  });
  container.querySelectorAll('[data-practice-format]').forEach(select => {
    select.addEventListener('change', () => {
      const sample = select.selectedOptions[0].dataset.example;
      const textField = select.closest('[data-unit-practice]').querySelector('[data-practice-text]');
      if (sample && textField) textField.value = sample;
    });
  });
}

function resetUnitPractice(unitId) {
  const panel = document.querySelector(`[data-unit-practice="${unitId}"]`);
  if (!panel) return;

  panel.querySelectorAll('[data-sample]').forEach(field => {
    if (field.type === 'checkbox') {
      field.checked = field.dataset.sample === 'true';
    } else {
      field.value = field.dataset.sample;
    }
  });

  panel.querySelector('[data-practice-output]').innerHTML =
    '<p>Dummy example loaded. Run it to see an illustrative result.</p>';
}

function runUnitPractice(unitId) {
  const panel = document.querySelector(`[data-unit-practice="${unitId}"]`);
  const output = panel && panel.querySelector('[data-practice-output]');
  const practice = UNIT_PRACTICES[unitId];
  if (!panel || !output || !practice) return;

  if (practice.kind === 'governance') {
    const values = {};
    let invalidValue = false;
    panel.querySelectorAll('[data-practice-field]').forEach(field => {
      const value = Number(field.value);
      if (!field.value.trim() || !Number.isFinite(value) || value < 0) {
        invalidValue = true;
      }
      values[field.dataset.practiceField] = value;
    });
    if (invalidValue) {
      output.innerHTML = '<p>Enter non-negative numbers for each estimate.</p>';
      return;
    }

    const monthlySavings = values.tickets * (values.minutes / 60) * values['hourly-cost'];
    const netBenefit = monthlySavings - values['tool-cost'];
    const roiLabel = values['tool-cost'] > 0
      ? `${((netBenefit / values['tool-cost']) * 100).toFixed(1)}%`
      : 'Not defined when tool cost is $0';
    const guardrails = [...panel.querySelectorAll('[data-practice-guardrail]')];
    const checkedCount = guardrails.filter(field => field.checked).length;
    const currency = amount => `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

    output.innerHTML = `
      <h4>Illustrative monthly estimate</h4>
      <dl class="practice-results-grid">
        <div><dt>Labor time savings</dt><dd>${currency(monthlySavings)}</dd></div>
        <div><dt>After tool cost</dt><dd>${currency(netBenefit)}</dd></div>
        <div><dt>Simple ROI</dt><dd>${roiLabel}</dd></div>
        <div><dt>Safeguards checked</dt><dd>${checkedCount} of ${guardrails.length}</dd></div>
      </dl>
    `;
    return;
  }

  const textField = panel.querySelector('[data-practice-text]');
  const text = textField ? textField.value.trim() : '';
  if (!text) {
    output.innerHTML = '<p>Enter a short example before running this practice.</p>';
    return;
  }

  const words = text.toLowerCase().match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [];
  if (practice.kind === 'foundations') {
    const format = panel.querySelector('[data-practice-format]').value;
    const label = format === 'structured' ? 'Structured record' : 'Unstructured text';
    const nextStep = format === 'structured'
      ? 'Validate the fields and align their types before joining them to text records.'
      : 'Record the source and permission, then prepare the text for preprocessing.';
    output.innerHTML = `
      <h4>${label}</h4>
      <p><strong>Dummy record:</strong> ${escapePracticeText(text)}</p>
      <p><strong>Word count:</strong> ${words.length}</p>
      <p><strong>Next pipeline step:</strong> ${nextStep}</p>
    `;
    return;
  }

  if (practice.kind === 'preprocessing') {
    const normalized = text
      .replace(/<[^>]*>/g, ' ')
      .replace(/https?:\/\/\S+/gi, ' ')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const tokens = normalized.match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [];
    const stopWords = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'for', 'in', 'is', 'it', 'of', 'on', 'our', 'the', 'to', 'was', 'were']);
    const filtered = tokens.filter(token => !stopWords.has(token));
    const bigrams = filtered.slice(0, -1).map((token, index) => `${token} ${filtered[index + 1]}`);
    const negations = filtered.filter(token => ['no', 'not', 'never'].includes(token));
    output.innerHTML = `
      <h4>Preprocessing result</h4>
      <p><strong>Normalized:</strong> ${escapePracticeText(normalized || 'No text remained after cleaning.')}</p>
      <p><strong>Tokens kept (${filtered.length}):</strong> ${filtered.map(escapePracticeText).join(', ') || 'None'}</p>
      <p><strong>Negation kept:</strong> ${negations.map(escapePracticeText).join(', ') || 'None'}</p>
      <p><strong>Adjacent bigrams:</strong> ${bigrams.map(escapePracticeText).join(' · ') || 'Not enough tokens'}</p>
    `;
    return;
  }

  if (practice.kind === 'insights') {
    const positiveWords = new Set(['amazing', 'excellent', 'fast', 'good', 'great', 'helpful', 'love', 'resolved', 'smooth']);
    const negativeWords = new Set(['angry', 'bad', 'broken', 'damaged', 'delayed', 'hate', 'late', 'lost', 'never', 'poor', 'slow', 'terrible']);
    const positive = words.filter(word => positiveWords.has(word));
    const negative = words.filter(word => negativeWords.has(word));
    const sentiment = positive.length > negative.length ? 'Positive'
      : negative.length > positive.length ? 'Negative' : 'Mixed or neutral';
    const score = ((positive.length - negative.length) / Math.max(positive.length + negative.length, 1)).toFixed(2);
    const routeTerms = {
      Delivery: new Set(['arrived', 'delivery', 'late', 'order', 'package', 'shipping']),
      Support: new Set(['agent', 'help', 'reply', 'responded', 'support']),
      Billing: new Set(['bill', 'charge', 'invoice', 'payment', 'refund'])
    };
    const route = Object.entries(routeTerms)
      .map(([name, terms]) => [name, words.filter(word => terms.has(word)).length])
      .sort((left, right) => right[1] - left[1])[0];
    output.innerHTML = `
      <h4>${sentiment} feedback <span class="practice-result-score">score ${score}</span></h4>
      <p><strong>Matched cues:</strong> ${positive.length} positive, ${negative.length} negative</p>
      <p><strong>Likely support route:</strong> ${route && route[1] ? route[0] : 'Needs human triage'}</p>
      <p><strong>Dummy text:</strong> ${escapePracticeText(text)}</p>
    `;
    return;
  }

  if (practice.kind === 'context') {
    const financeCues = new Set(['account', 'banking', 'cash', 'company', 'deposit', 'fund', 'funds', 'loan', 'money', 'salary']);
    const riverCues = new Set(['boat', 'fishing', 'river', 'shore', 'stream', 'water']);
    const financeMatches = words.filter(word => financeCues.has(word));
    const riverMatches = words.filter(word => riverCues.has(word));
    let meaning = 'Context is ambiguous; add finance or river clues.';
    if (!words.includes('bank')) meaning = 'Add the word “bank” to compare its two meanings.';
    else if (financeMatches.length > riverMatches.length) meaning = '“Bank” most likely means a financial institution.';
    else if (riverMatches.length > financeMatches.length) meaning = '“Bank” most likely means the land beside a river.';
    output.innerHTML = `
      <h4>Contextual meaning demo</h4>
      <p><strong>Interpretation:</strong> ${meaning}</p>
      <p><strong>Finance cues:</strong> ${financeMatches.map(escapePracticeText).join(', ') || 'None'}</p>
      <p><strong>River cues:</strong> ${riverMatches.map(escapePracticeText).join(', ') || 'None'}</p>
      <p><strong>Sentence:</strong> ${escapePracticeText(text)}</p>
    `;
  }
}

/* --------------------------------------------------------------------------
   INTERACTIVE PLAYGROUNDS
   -------------------------------------------------------------------------- */
function setupPlaygrounds() {
  // 1. Tokenizer & Cleaner
  const cleanBtn = document.getElementById('run-cleaner-btn');
  if (cleanBtn) {
    cleanBtn.addEventListener('click', () => {
      const text = document.getElementById('cleaner-input').value;
      if (!text.trim()) return;

      const words = text.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
      const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'in', 'to', 'for', 'of', 'with', 'it', 'this', 'that', 'by', 'from', 'as']);
      
      const tokensHtml = words.map(w => {
        const isStop = stopWords.has(w);
        return `<span class="token-chip ${isStop ? 'token-stopword' : ''}">${w}</span>`;
      }).join('');

      const cleanTokens = words.filter(w => !stopWords.has(w));
      const stemmed = cleanTokens.map(w => w.length > 4 ? w.replace(/(ing|ed|es|s)$/, '') : w);

      document.getElementById('cleaner-output').innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--text-white); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">All Tokens (${words.length} total, <span style="text-decoration: line-through; color: var(--text-muted);">strikethrough = stopword</span>):</h4>
          <div>${tokensHtml}</div>
        </div>
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--text-white); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Clean Vocabulary (${cleanTokens.length} terms):</h4>
          <div>${cleanTokens.map(w => `<span class="token-chip" style="background: var(--text-white); color: var(--text-inverse); font-weight: 700;">${w}</span>`).join('')}</div>
        </div>
        <div>
          <h4 style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Stemmed Roots (Porter Algorithm Simulation):</h4>
          <div>${stemmed.map(w => `<span class="token-chip" style="background: var(--bg-subtle); border-color: var(--border-medium);">${w}</span>`).join('')}</div>
        </div>
      `;
    });
  }

  // 2. Sentiment & Emotion Detector
  const sentBtn = document.getElementById('run-sent-btn');
  if (sentBtn) {
    sentBtn.addEventListener('click', () => {
      const text = document.getElementById('sent-input').value.toLowerCase();
      if (!text.trim()) return;

      const posWords = ['great', 'excellent', 'love', 'good', 'awesome', 'best', 'happy', 'fast', 'amazing', 'helpful', 'clean', 'perfect'];
      const negWords = ['bad', 'terrible', 'worst', 'hate', 'slow', 'horrible', 'broken', 'poor', 'useless', 'delayed', 'dirty', 'annoying'];

      let score = 0;
      posWords.forEach(w => { if (text.includes(w)) score += 0.3; });
      negWords.forEach(w => { if (text.includes(w)) score -= 0.3; });

      score = Math.max(-1, Math.min(1, score));
      let label = 'NEUTRAL';
      if (score > 0.15) { label = 'POSITIVE'; }
      if (score < -0.15) { label = 'NEGATIVE'; }

      const pct = Math.round(((score + 1) / 2) * 100);

      document.getElementById('sent-output').innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <h3 style="color: var(--text-white); font-size: 1.25rem; font-weight: 900; letter-spacing: 1px;">TONE RESULT: ${label}</h3>
          <span class="badge" style="background: var(--text-white); color: var(--text-inverse); font-weight: 900;">SCORE: ${score.toFixed(2)}</span>
        </div>
        <div style="background: var(--bg-subtle); height: 10px; border-radius: 2px; overflow: hidden; margin-bottom: 1.25rem; border: 1px solid var(--border-medium);">
          <div style="width: ${pct}%; height: 100%; background: var(--text-white); transition: var(--transition);"></div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; font-size: 0.8rem; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
          <div style="background: var(--bg-card); border: 1px solid var(--border-medium); padding: 0.6rem; border-radius: 4px; color: var(--text-white);">Joy: ${score > 0 ? Math.round(score * 100) : 10}%</div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-medium); padding: 0.6rem; border-radius: 4px; color: var(--text-white);">Frustration: ${score < 0 ? Math.round(Math.abs(score) * 100) : 5}%</div>
          <div style="background: var(--bg-card); border: 1px solid var(--border-medium); padding: 0.6rem; border-radius: 4px; color: var(--text-white);">Confidence: 92%</div>
        </div>
      `;
    });
  }

  // 3. Named Entity Recognition (NER) Visualizer
  const nerBtn = document.getElementById('run-ner-btn');
  if (nerBtn) {
    nerBtn.addEventListener('click', () => {
      let text = document.getElementById('ner-input').value;
      if (!text.trim()) return;

      const entities = [
        { word: "Google", type: "ORG", cls: "entity-org" },
        { word: "Amazon", type: "ORG", cls: "entity-org" },
        { word: "Tesla", type: "ORG", cls: "entity-org" },
        { word: "Sundar Pichai", type: "PERSON", cls: "entity-person" },
        { word: "Elon Musk", type: "PERSON", cls: "entity-person" },
        { word: "New York", type: "LOCATION", cls: "entity-gpe" },
        { word: "India", type: "LOCATION", cls: "entity-gpe" },
        { word: "Texas", type: "LOCATION", cls: "entity-gpe" },
        { word: "$100 Million", type: "MONEY", cls: "entity-money" },
        { word: "$50", type: "MONEY", cls: "entity-money" },
        { word: "2026", type: "DATE", cls: "entity-date" },
        { word: "Monday", type: "DATE", cls: "entity-date" }
      ];

      let taggedText = text;
      entities.forEach(e => {
        const regex = new RegExp(`\\b${e.word}\\b`, 'gi');
        taggedText = taggedText.replace(regex, `<span class="${e.cls}">${e.word} <sup style="font-size:0.65rem;">[${e.type}]</sup></span>`);
      });

      document.getElementById('ner-output').innerHTML = `
        <h4 style="color: var(--text-white); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.75rem;">Tagged Entities Result:</h4>
        <div style="font-size: 1.05rem; line-height: 2; background: var(--bg-card); border: 1px solid var(--border-medium); padding: 1.25rem; border-radius: 4px; color: var(--text-white);">
          ${taggedText}
        </div>
      `;
    });
  }
}

/* --------------------------------------------------------------------------
   QUIZ ENGINE
   -------------------------------------------------------------------------- */
function renderQuizzes() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  let html = `
    <div style="margin-bottom: 2.5rem;">
      <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--text-white); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Diagnostic Assessment MCQs</h2>
      <p style="color: var(--text-secondary);">Test your comprehension of each NLP unit. Instant feedback with ELI5 explanations is provided for every question.</p>
    </div>
  `;

  NLP_DATA.quizzes.forEach((q, index) => {
    html += `
      <div class="quiz-card" id="quiz-card-${q.id}">
        <div class="quiz-header">
          <span class="badge" style="background: var(--text-white); color: var(--text-inverse); font-weight: 800;">QUESTION ${index + 1} OF ${NLP_DATA.quizzes.length}</span>
          <span class="badge" style="border-color: var(--border-medium);">${q.unitId.toUpperCase()}</span>
        </div>
        <div class="quiz-question">${q.question}</div>
        
        <div class="options-list" id="options-${q.id}">
          ${q.options.map((opt, optIdx) => `
            <button class="option-btn" onclick="selectQuizOption('${q.id}', ${optIdx}, ${q.correctIndex})">
              <span style="font-weight: 800; width: 24px; height: 24px; border-radius: 2px; background: var(--bg-subtle); color: var(--text-white); display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">
                ${String.fromCharCode(65 + optIdx)}
              </span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>

        <div class="quiz-feedback" id="feedback-${q.id}" style="display: none;"></div>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.selectQuizOption = function(quizId, selectedIdx, correctIdx) {
  const quiz = NLP_DATA.quizzes.find(q => q.id === quizId);
  if (!quiz) return;

  const optionsContainer = document.getElementById(`options-${quizId}`);
  const optionBtns = optionsContainer.querySelectorAll('.option-btn');
  const feedbackBox = document.getElementById(`feedback-${quizId}`);

  optionBtns.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) {
      btn.classList.add('correct');
    } else if (idx === selectedIdx) {
      btn.classList.add('wrong');
    }
  });

  const isCorrect = selectedIdx === correctIdx;
  state.completedQuizzes[quizId] = true;
  state.quizScores[quizId] = isCorrect ? 100 : 0;
  
  localStorage.setItem('nlp_completed_quizzes', JSON.stringify(state.completedQuizzes));
  localStorage.setItem('nlp_quiz_scores', JSON.stringify(state.quizScores));

  feedbackBox.style.display = 'block';
  feedbackBox.style.borderColor = isCorrect ? 'var(--text-white)' : 'var(--border-medium)';
  feedbackBox.innerHTML = `
    <div style="font-weight: 900; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-white); margin-bottom: 0.5rem;">
      ${isCorrect ? '✓ CORRECT RESPONSE' : '✕ INCORRECT SELECTION'}
    </div>
    <div style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${quiz.explanation}</div>
  `;

  updateProgressStats();
};

/* --------------------------------------------------------------------------
   EXAM PREP & CAPSTONE RENDERER
   -------------------------------------------------------------------------- */
function renderExamPrep() {
  const container = document.getElementById('examprep-container');
  if (!container) return;

  const ep = NLP_DATA.examPrep;

  let html = `
    <!-- Mid Exam Prep Section -->
    <div style="margin-bottom: 3.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
        <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--text-white); text-transform: uppercase; letter-spacing: 1px;">Mid-Semester Exam Prep (Assessment A1)</h2>
        <span class="badge" style="background: var(--text-white); color: var(--text-inverse); font-weight: 900;">${ep.midExam.weightage}</span>
      </div>
      
      <h3 style="color: var(--text-white); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1.5px; margin: 1.5rem 0 1rem;">Section A: Short Answer Questions & Model Answers</h3>
      ${ep.midExam.shortAnswer.map((sa, i) => `
        <div class="accordion-item" id="mid-sa-${i}">
          <div class="accordion-header" onclick="toggleAccordion('mid-sa-${i}')">
            <span class="accordion-title">${sa.q}</span>
            <span style="color: var(--text-white); font-weight: 800; font-family: var(--font-code);">[ + ]</span>
          </div>
          <div class="accordion-content">
            <p style="color: var(--text-white); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; margin-bottom: 0.5rem;">Model Answer:</p>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7;">${sa.a}</p>
          </div>
        </div>
      `).join('')}

      <h3 style="color: var(--text-white); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1.5px; margin: 2rem 0 1rem;">Section B: Analytical Design Problem</h3>
      ${ep.midExam.analytical.map((an, i) => `
        <div class="card">
          <h4 style="font-size: 1.15rem; color: var(--text-white); font-weight: 800; margin-bottom: 0.5rem;">${an.title}</h4>
          <p style="color: var(--text-secondary); margin-bottom: 1.25rem;"><strong>Problem Statement:</strong> ${an.problem}</p>
          <div style="background: var(--bg-dark); border: 1px solid var(--border-medium); padding: 1.25rem; border-radius: 4px;">
            <h5 style="color: var(--text-white); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.75rem;">Recommended Solution Pipeline:</h5>
            ${an.solutionSteps.map(step => `<div style="margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.95rem;">${step}</div>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- End Exam Prep Section -->
    <div style="margin-bottom: 3.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
        <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--text-white); text-transform: uppercase; letter-spacing: 1px;">End-Semester Theory Exam Prep (Assessment A3)</h2>
        <span class="badge" style="background: var(--text-white); color: var(--text-inverse); font-weight: 900;">${ep.endExam.weightage}</span>
      </div>

      <h3 style="color: var(--text-white); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1.5px; margin: 1.5rem 0 1rem;">Part A: Theory Foundations</h3>
      ${ep.endExam.partA.map((pa, i) => `
        <div class="accordion-item" id="end-pa-${i}">
          <div class="accordion-header" onclick="toggleAccordion('end-pa-${i}')">
            <span class="accordion-title">${pa.q}</span>
            <span style="color: var(--text-white); font-weight: 800; font-family: var(--font-code);">[ + ]</span>
          </div>
          <div class="accordion-content">
            <p style="color: var(--text-white); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; margin-bottom: 0.5rem;">Model Answer:</p>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7;">${pa.a}</p>
          </div>
        </div>
      `).join('')}

      <h3 style="color: var(--text-white); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1.5px; margin: 2rem 0 1rem;">Part B: Comprehensive Architecture & Governance Challenge</h3>
      ${ep.endExam.partB.map((pb, i) => `
        <div class="card">
          <h4 style="font-size: 1.15rem; color: var(--text-white); font-weight: 800; margin-bottom: 0.5rem;">${pb.title}</h4>
          <p style="color: var(--text-secondary); margin-bottom: 1.25rem;"><strong>Scenario:</strong> ${pb.problem}</p>
          <div style="background: var(--bg-dark); border: 1px solid var(--border-medium); padding: 1.25rem; border-radius: 4px;">
            <h5 style="color: var(--text-white); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.75rem;">Enterprise Architecture Blueprint:</h5>
            ${pb.architecturalBlocks.map(block => `<div style="margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.95rem;">${block}</div>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Capstone Projects Hub -->
    <div id="capstone-hub">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
        <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--text-white); text-transform: uppercase; letter-spacing: 1px;">Capstone Project Hub (Assessment A2)</h2>
        <span class="badge" style="background: var(--text-white); color: var(--text-inverse); font-weight: 900;">${ep.capstone.weightage}</span>
      </div>
      <div class="card-grid">
        ${ep.capstone.options.map(cap => `
          <div class="card">
            <span class="badge" style="width: fit-content; margin-bottom: 0.75rem;">DATASET: ${cap.dataset}</span>
            <h3 class="card-title">${cap.name}</h3>
            <p class="card-desc">${cap.objectives}</p>
            <h5 style="color: var(--text-white); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.4rem;">Python Starter Code:</h5>
            <pre><code>${cap.pythonCode}</code></pre>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

window.toggleAccordion = function(id) {
  const item = document.getElementById(id);
  if (item) {
    item.classList.toggle('active');
  }
};

/* --------------------------------------------------------------------------
   SEARCH & UTILITIES
   -------------------------------------------------------------------------- */
function setupSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    state.searchQuery = query;

    document.querySelectorAll('.card').forEach(card => {
      const text = card.innerText.toLowerCase();
      if (!query || text.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

function updateProgressStats() {
  const completedCount = Object.keys(state.completedQuizzes).length;
  const totalQuizzes = NLP_DATA.quizzes.length;
  const pct = Math.round((completedCount / totalQuizzes) * 100);

  const statPill = document.getElementById('progress-stat');
  if (statPill) {
    statPill.innerHTML = `QUIZ PROGRESS: ${completedCount}/${totalQuizzes} (${pct}%)`;
  }
}
