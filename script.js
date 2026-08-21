(() => {
  const selector = document.getElementById('evidence-selector');
  const readout = document.getElementById('stage-readout');
  const description = document.getElementById('stage-description');
  const states = Array.from(document.querySelectorAll('.cycle-state'));

  if (!selector || !readout || !description || states.length !== 4) return;

  const stages = [
    { name: 'OBSERVE', description: 'Capture what actually happened.', angle: -48 },
    { name: 'PRESERVE', description: 'Keep the outcome, source, and context together.', angle: -16 },
    { name: 'LEARN', description: 'Compare evidence and extract reusable knowledge.', angle: 16 },
    { name: 'ADAPT', description: 'Change the next response using what was learned.', angle: 48 }
  ];

  let stage = 0;

  function render() {
    const current = stages[stage];
    states.forEach((item, index) => item.classList.toggle('active', index === stage));
    readout.textContent = `${String(stage + 1).padStart(2, '0')} / ${current.name}`;
    description.textContent = current.description;
    selector.style.setProperty('--knob-angle', `${current.angle}deg`);
    selector.setAttribute('aria-label', `Advance evidence cycle. Current stage: ${current.name.toLowerCase()}`);
  }

  selector.addEventListener('click', () => {
    stage = (stage + 1) % stages.length;
    render();
  });

  render();
})();
