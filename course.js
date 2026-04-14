(() => {
  const COURSE_DATA = {
    'html-course': {
      title: 'HTML',
      accent: '#e34c26',
      hook: 'Ndërto strukturën e çdo faqeje si një pro.',
      questions: [
        { q: 'Çfarë bën HTML?', o: ['Shton stil', 'Ndërton strukturën e faqes', 'Mban të dhëna në server'], a: 1 },
        { q: 'Cili element zakonisht përdoret për titullin kryesor?', o: ['p', 'h1', 'footer'], a: 1 },
        { q: 'Çfarë përfaqëson atributi href te një link?', o: ['Adresën e destinacionit', 'Ngjyrën e linkut', 'Madhësinë e tekstit'], a: 0 },
        { q: 'Cili tag përdoret për një listë të parenditur?', o: ['ul', 'ol', 'li'], a: 0 },
        { q: 'Për çfarë shërben <img>?', o: ['Për video', 'Për imazhe', 'Për tabela'], a: 1 },
      ],
    },
    'css-course': {
      title: 'CSS',
      accent: '#264de4',
      hook: 'Jepi faqes personalitet dhe stil.',
      questions: [
        { q: 'CSS përdoret kryesisht për...', o: ['Strukturë', 'Pamje dhe stil', 'Ruajtje në databazë'], a: 1 },
        { q: 'Cila pronë ndryshon ngjyrën e tekstit?', o: ['font-size', 'color', 'padding'], a: 1 },
        { q: 'Çfarë bën margin?', o: ['Hapësirë jashtë elementit', 'Hapësirë brenda elementit', 'Vendos fontin'], a: 0 },
        { q: 'Cili selektor zgjedh një class?', o: ['#id', '.class', 'tag'], a: 1 },
        { q: 'Flexbox përdoret për...', o: ['Layout fleksibël', 'Audio', 'Animacione vetëm'], a: 0 },
      ],
    },
    'javascript-course': {
      title: 'JavaScript',
      accent: '#f7df1e',
      hook: 'Shto lëvizje, logjikë dhe ndërveprim.',
      questions: [
        { q: 'Cila fjalë kyçe krijon një variabël që mund të ndryshojë?', o: ['const', 'let', 'static'], a: 1 },
        { q: 'JavaScript në browser përdoret për...', o: ['Interaktivitet', 'Printim PDF', 'Komprimim fotosh'], a: 0 },
        { q: 'Cili është operatori i barazisë së sigurt?', o: ['==', '===', '='], a: 1 },
        { q: 'Çfarë kthen querySelector?', o: ['Elementin e parë që përputhet', 'Të gjitha elementet', 'Vetëm tekst'], a: 0 },
        { q: 'Për çfarë shërben addEventListener?', o: ['Për të shtuar evente', 'Për të fshirë CSS', 'Për të krijuar tabela'], a: 0 },
      ],
    },
    'python-course': {
      title: 'Python',
      accent: '#ffd43b',
      hook: 'Mëso një gjuhë të qartë, të fuqishme dhe shumë të dashur.',
      questions: [
        { q: 'Python njihet për sintaksën e tij...', o: ['Të ndërlikuar', 'Të lexueshme', 'Vetëm me simbole'], a: 1 },
        { q: 'Cila strukturë përdoret për kushte?', o: ['if', 'loop', 'class'], a: 0 },
        { q: 'Cili është tipi për një tekst?', o: ['int', 'str', 'bool'], a: 1 },
        { q: 'Për çfarë shërben një listë?', o: ['Ruajtje e shumë vlerave', 'Vetëm një vlerë', 'Vetëm numra realë'], a: 0 },
        { q: 'Cili është funksioni për dalje në ekran?', o: ['print()', 'show()', 'echo()'], a: 0 },
      ],
    },
    'cpp-course': {
      title: 'C++',
      accent: '#00bfff',
      hook: 'Shpejtësi, kontroll dhe performancë.',
      questions: [
        { q: 'C++ njihet për...', o: ['Shpejtësi dhe kontroll', 'Vetëm dizajn UI', 'Skriptim në browser'], a: 0 },
        { q: 'Cili është simboli i komentit në një rresht?', o: ['//', '##', '!--'], a: 0 },
        { q: 'Çfarë bën `std::cout`?', o: ['Shkruan në ekran', 'Fshin memorie', 'Krijon një klasë'], a: 0 },
        { q: 'Cili koncept lidhet me klasat dhe objektet?', o: ['OOP', 'SEO', 'DOM'], a: 0 },
        { q: 'Për çfarë përdoret `#include`?', o: ['Të fusë header files', 'Të krijojë loop', 'Të deklarojë variabla'], a: 0 },
      ],
    },
  };

  const safeKey = (str) => String(str || '').replace(/[^a-z0-9_-]/gi, '').toLowerCase();
  const courseKey = (() => {
    const match = location.pathname.match(/([a-z]+-course)\.html$/i);
    return match ? match[1].toLowerCase() : safeKey(document.title);
  })();

  const data = COURSE_DATA[courseKey];
  if (!data) return;

  const storageKey = `kodal_progress_${courseKey}`;
  const loadProgress = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  };
  const saveProgress = (obj) => localStorage.setItem(storageKey, JSON.stringify(obj));

  function injectStyles() {
    if (document.getElementById('kodal-course-style')) return;
    const style = document.createElement('style');
    style.id = 'kodal-course-style';
    style.textContent = `
      .course-fun-panel {
        margin: 24px 0 34px;
        padding: 24px;
        border-radius: 18px;
        background: linear-gradient(135deg, rgba(255,255,255,0.96), rgba(245,239,230,0.92));
        border: 1px solid rgba(174,189,202,0.28);
        box-shadow: 0 14px 30px rgba(10,20,35,0.08);
      }
      .course-fun-top {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 14px;
      }
      .course-fun-title {
        margin: 0;
        font-family: 'Syne', sans-serif;
        font-size: 24px;
        color: var(--dark, #0f1720);
      }
      .course-fun-hook {
        margin: 6px 0 0;
        color: var(--text, #45525f);
      }
      .progress-shell {
        width: 100%;
        margin-top: 10px;
      }
      .progress-track {
        width: 100%;
        height: 12px;
        background: rgba(10,20,35,0.08);
        border-radius: 999px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        width: 0%;
        border-radius: 999px;
        background: linear-gradient(90deg, ${data.accent}, rgba(255,255,255,0.65));
        transition: width 260ms ease;
      }
      .progress-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        font-size: 13px;
        margin-top: 8px;
        color: var(--text, #45525f);
      }
      .complete-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: none;
        border-radius: 999px;
        padding: 10px 14px;
        margin-top: 14px;
        background: rgba(10,20,35,0.92);
        color: #fff;
        cursor: pointer;
        font: inherit;
        transition: transform 180ms ease, opacity 180ms ease;
      }
      .complete-btn:hover { transform: translateY(-1px); }
      .complete-btn.done {
        background: #1f8a4c;
      }
      .complete-btn:disabled {
        opacity: .8;
        cursor: default;
      }
      .quiz-card {
        margin-top: 34px;
        padding: 26px;
        border-radius: 18px;
        border: 1px solid rgba(174,189,202,0.28);
        background: #fff;
        box-shadow: 0 14px 30px rgba(10,20,35,0.08);
      }
      .quiz-title {
        margin: 0 0 6px;
        font-family: 'Syne', sans-serif;
        font-size: 26px;
      }
      .quiz-intro {
        margin: 0 0 18px;
        color: var(--text, #45525f);
      }
      .quiz-item {
        padding: 18px 0;
        border-top: 1px solid rgba(174,189,202,0.18);
      }
      .quiz-item:first-of-type { border-top: none; }
      .quiz-question { font-weight: 700; margin: 0 0 12px; color: var(--dark, #0f1720); }
      .quiz-options {
        display: grid;
        gap: 10px;
      }
      .quiz-option {
        width: 100%;
        text-align: left;
        border: 1px solid rgba(174,189,202,0.55);
        background: #f8fbfd;
        color: var(--dark, #0f1720);
        border-radius: 14px;
        padding: 12px 14px;
        cursor: pointer;
        transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;
      }
      .quiz-option:hover { transform: translateY(-1px); border-color: ${data.accent}; }
      .quiz-option.correct { background: rgba(31,138,76,0.12); border-color: #1f8a4c; }
      .quiz-option.wrong { background: rgba(220,53,69,0.1); border-color: #dc3545; }
      .quiz-feedback {
        margin-top: 10px;
        font-size: 14px;
        color: var(--text, #45525f);
      }
      .quiz-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 18px;
      }
      .quiz-retry {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(174,189,202,0.55);
        background: transparent;
        color: var(--dark, #0f1720);
        border-radius: 999px;
        padding: 10px 14px;
        cursor: pointer;
      }
      .kodal-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(10,20,35,0.05);
        color: var(--text, #45525f);
      }
    `;
    document.head.appendChild(style);
  }

  function buildProgressPanel(courseBody) {
    const panel = document.createElement('section');
    panel.className = 'course-fun-panel';
    panel.innerHTML = `
      <div class="course-fun-top">
        <div>
          <h3 class="course-fun-title">${data.title} Lab</h3>
          <p class="course-fun-hook">${data.hook}</p>
        </div>
        <div class="kodal-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> mini-progres + quiz</div>
      </div>
      <div class="progress-shell">
        <div class="progress-track"><div class="progress-fill" id="kodal-progress-fill"></div></div>
        <div class="progress-row">
          <span id="kodal-progress-text">0% e përfunduar</span>
          <span id="kodal-progress-count">0/${courseBody.querySelectorAll('.module-item').length || 0} module</span>
        </div>
      </div>
    `;
    const meta = courseBody.querySelector('.course-meta');
    if (meta && meta.parentNode) {
      meta.insertAdjacentElement('afterend', panel);
    } else {
      courseBody.prepend(panel);
    }
  }

  function attachCompletionButtons(courseBody) {
    const modules = [...courseBody.querySelectorAll('.module-item')];
    const progress = loadProgress();

    modules.forEach((module, index) => {
      if (module.querySelector('.complete-btn')) return;
      const body = module.querySelector('.module-body') || module;
      const btn = document.createElement('button');
      btn.className = 'complete-btn';
      btn.type = 'button';
      btn.innerHTML = `<i class="fa-solid fa-check"></i><span>Shëno si të mbaruar</span>`;
      btn.addEventListener('click', () => {
        progress[index] = !progress[index];
        saveProgress(progress);
        updateModuleState(module, index, progress[index]);
        updateProgressBar(modules, progress);
      });
      body.appendChild(btn);
      updateModuleState(module, index, !!progress[index]);
    });

    updateProgressBar(modules, progress);
  }

  function updateModuleState(module, index, done) {
    const btn = module.querySelector('.complete-btn');
    if (!btn) return;
    btn.classList.toggle('done', done);
    btn.innerHTML = done
      ? `<i class="fa-solid fa-circle-check"></i><span>U mbarua</span>`
      : `<i class="fa-solid fa-check"></i><span>Shëno si të mbaruar</span>`;
    module.classList.toggle('is-complete', done);
  }

  function updateProgressBar(modules, progress) {
    const doneCount = modules.filter((_, i) => !!progress[i]).length;
    const total = modules.length || 1;
    const percent = Math.round((doneCount / total) * 100);
    const fill = document.getElementById('kodal-progress-fill');
    const text = document.getElementById('kodal-progress-text');
    const count = document.getElementById('kodal-progress-count');
    if (fill) fill.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}% e përfunduar`;
    if (count) count.textContent = `${doneCount}/${total} module`;
  }

  function buildQuiz(courseBody) {
    const quiz = document.createElement('section');
    quiz.className = 'quiz-card';
    quiz.innerHTML = `
      <h3 class="quiz-title">Mini quiz</h3>
      <p class="quiz-intro">5 pyetje të shpejta për të provuar veten para se të vazhdosh.</p>
      <div class="quiz-list"></div>
      <div class="quiz-actions">
        <button type="button" class="quiz-retry"><i class="fa-solid fa-rotate-right"></i> Provo përsëri</button>
      </div>
    `;

    const list = quiz.querySelector('.quiz-list');

    data.questions.forEach((item, idx) => {
      const q = document.createElement('div');
      q.className = 'quiz-item';
      q.innerHTML = `
        <p class="quiz-question">${idx + 1}. ${item.q}</p>
        <div class="quiz-options">
          ${item.o.map((option, oIdx) => `<button type="button" class="quiz-option" data-answer="${oIdx}">${option}</button>`).join('')}
        </div>
        <div class="quiz-feedback" aria-live="polite"></div>
      `;
      list.appendChild(q);
    });

    let scoreState = Array(data.questions.length).fill(null);

    function resetQuiz() {
      scoreState = Array(data.questions.length).fill(null);
      quiz.querySelectorAll('.quiz-item').forEach((item) => {
        item.querySelectorAll('.quiz-option').forEach((btn) => btn.classList.remove('correct', 'wrong'));
        const fb = item.querySelector('.quiz-feedback');
        if (fb) fb.textContent = '';
      });
    }

    quiz.addEventListener('click', (e) => {
      const btn = e.target.closest('.quiz-option');
      if (!btn) return;
      const item = btn.closest('.quiz-item');
      const all = [...item.querySelectorAll('.quiz-option')];
      const qIndex = [...quiz.querySelectorAll('.quiz-item')].indexOf(item);
      const answer = Number(btn.dataset.answer);
      const correct = data.questions[qIndex].a;

      all.forEach((b) => b.disabled = true);
      all.forEach((b) => {
        const idx = Number(b.dataset.answer);
        if (idx === correct) b.classList.add('correct');
        if (idx === answer && idx !== correct) b.classList.add('wrong');
      });
      const feedback = item.querySelector('.quiz-feedback');
      if (feedback) feedback.textContent = answer === correct ? 'Saktë — bukur!' : `Gabim. Përgjigjja e saktë është: ${data.questions[qIndex].o[correct]}.`;
      scoreState[qIndex] = answer === correct;
    });

    quiz.querySelector('.quiz-retry').addEventListener('click', resetQuiz);
    courseBody.appendChild(quiz);
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    const courseBody = document.querySelector('.course-body');
    if (!courseBody) return;
    buildProgressPanel(courseBody);
    attachCompletionButtons(courseBody);
    buildQuiz(courseBody);
  });
})();