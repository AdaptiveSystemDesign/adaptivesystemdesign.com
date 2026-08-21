(() => {
  const selector = document.getElementById('evidence-selector');
  const readout = document.getElementById('stage-readout');
  const description = document.getElementById('stage-description');
  const states = Array.from(document.querySelectorAll('.cycle-state'));

  if (!selector || !readout || !description || states.length !== 4) return;

  const style = document.createElement('style');
  style.textContent = `
    .instrument-display { color: #b98552; }
    .cycle-state::before { color: #855f3c; }
    .cycle-state.active {
      color: #f0a24a;
      text-shadow: 0 0 5px rgba(240,162,74,.16);
    }
    .cycle-state.active::before { color: #d8832f; }
    .instrument-display strong { color: #ffb457; }
    .instrument-display small { color: #d6ad80; }
    .control-knob {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      -webkit-user-select: none;
    }
  `;
  document.head.appendChild(style);

  const stages = [
    { name: 'OBSERVE', description: 'Capture what actually happened.', angle: -48 },
    { name: 'PRESERVE', description: 'Keep the outcome, source, and context together.', angle: -16 },
    { name: 'LEARN', description: 'Compare evidence and extract reusable knowledge.', angle: 16 },
    { name: 'ADAPT', description: 'Change the next response using what was learned.', angle: 48 }
  ];

  let stage = 0;
  let lastTouch = 0;

  function render() {
    const current = stages[stage];
    states.forEach((item, index) => item.classList.toggle('active', index === stage));
    readout.textContent = `${String(stage + 1).padStart(2, '0')} / ${current.name}`;
    description.textContent = current.description;
    selector.style.setProperty('--knob-angle', `${current.angle}deg`);
    selector.setAttribute('aria-label', `Advance evidence cycle. Current stage: ${current.name.toLowerCase()}`);
  }

  function advance() {
    stage = (stage + 1) % stages.length;
    render();
  }

  selector.addEventListener('touchend', (event) => {
    event.preventDefault();
    lastTouch = Date.now();
    advance();
  }, { passive: false });

  selector.addEventListener('click', () => {
    if (Date.now() - lastTouch < 700) return;
    advance();
  });

  render();
})();
