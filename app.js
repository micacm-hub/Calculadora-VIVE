const el = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0 });

let state = {
  type: 'upgrade_sato',
  materials: [],
  costs: []
};

function formatMoney(v) {
  return `${money.format(Number(v || 0))} MZN`;
}

function safeNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function loadSolution(key, preserveHeader = true) {
  const solution = VIVE_SOLUTIONS[key];
  state.type = key;
  state.materials = solution.materials.map((m, i) => ({
    id: `${Date.now()}-${i}-${Math.random()}`,
    name: m.name,
    unit: m.unit,
    qty: m.qty,
    owned: 0,
    price: m.price
  }));
  state.costs = [
    { id: `labor-${Date.now()}`, label: 'Mão de obra', value: solution.labor, labor: true },
    { id: `transport-${Date.now()}`, label: 'Transporte', value: 0, labor: false }
  ];
  el('solutionNote').textContent = solution.note;
  if (!preserveHeader) {
    el('clientName').value = '';
    el('locationName').value = '';
  }
  render();
  saveState();
}

function renderMaterialRows() {
  const body = el('materialsBody');
  const cards = el('materialsCards');
  body.innerHTML = '';
  cards.innerHTML = '';

  state.materials.forEach((m, index) => {
    const buyQty = Math.max(safeNum(m.qty) - safeNum(m.owned), 0);
    const total = buyQty * safeNum(m.price);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input class="material-name" data-index="${index}" data-field="name" value="${escapeHtml(m.name)}"></td>
      <td><input data-index="${index}" data-field="unit" value="${escapeHtml(m.unit)}"></td>
      <td><input type="number" min="0" step="0.01" inputmode="decimal" data-index="${index}" data-field="qty" value="${m.qty}"></td>
      <td><input type="number" min="0" step="0.01" inputmode="decimal" data-index="${index}" data-field="owned" value="${m.owned}"></td>
      <td class="readonly-value">${buyQty.toFixed(2).replace('.00','')}</td>
      <td><input type="number" min="0" step="0.01" inputmode="decimal" data-index="${index}" data-field="price" value="${m.price}"></td>
      <td class="readonly-value">${formatMoney(total)}</td>
      <td><button type="button" class="icon-btn remove-material" data-index="${index}">×</button></td>
    `;
    body.appendChild(tr);

    const card = document.createElement('div');
    card.className = 'material-card';
    card.innerHTML = `
      <div class="material-card-head">
        <strong>${escapeHtml(m.name)}</strong>
        <button type="button" class="icon-btn remove-material" data-index="${index}">×</button>
      </div>
      <div class="material-grid">
        <label><span>Material</span><input data-index="${index}" data-field="name" value="${escapeHtml(m.name)}"></label>
        <label><span>Unidade</span><input data-index="${index}" data-field="unit" value="${escapeHtml(m.unit)}"></label>
        <label><span>Qtd. necessária</span><input type="number" min="0" step="0.01" inputmode="decimal" data-index="${index}" data-field="qty" value="${m.qty}"></label>
        <label><span>Família já tem</span><input type="number" min="0" step="0.01" inputmode="decimal" data-index="${index}" data-field="owned" value="${m.owned}"></label>
        <label><span>Qtd. a comprar</span><input value="${buyQty.toFixed(2).replace('.00','')}" readonly></label>
        <label><span>Preço unit. (MZN)</span><input type="number" min="0" step="0.01" inputmode="decimal" data-index="${index}" data-field="price" value="${m.price}"></label>
      </div>
      <div class="material-total"><span>Total</span><span>${formatMoney(total)}</span></div>
    `;
    cards.appendChild(card);
  });
}

function renderCosts() {
  const list = el('costsList');
  list.innerHTML = '';
  const template = el('costRowTemplate');

  state.costs.forEach((c, index) => {
    const node = template.content.cloneNode(true);
    const row = node.querySelector('.cost-row');
    const label = node.querySelector('.cost-label');
    const value = node.querySelector('.cost-value');
    const remove = node.querySelector('.remove-cost');
    label.value = c.label;
    value.value = c.value;
    label.dataset.index = index;
    value.dataset.index = index;
    remove.dataset.index = index;
    if (c.labor) remove.style.visibility = 'hidden';
    list.appendChild(node);
  });
}

function totals() {
  const materials = state.materials.reduce((sum, m) => {
    const buyQty = Math.max(safeNum(m.qty) - safeNum(m.owned), 0);
    return sum + buyQty * safeNum(m.price);
  }, 0);
  const labor = state.costs.filter(c => c.labor).reduce((s,c)=>s+safeNum(c.value),0);
  const other = state.costs.filter(c => !c.labor).reduce((s,c)=>s+safeNum(c.value),0);
  return { materials, labor, other, grand: materials + labor + other };
}

function renderSummary() {
  const t = totals();
  el('materialsTotal').textContent = formatMoney(t.materials);
  el('laborTotal').textContent = formatMoney(t.labor);
  el('otherTotal').textContent = formatMoney(t.other);
  el('grandTotal').textContent = formatMoney(t.grand);

  const solution = VIVE_SOLUTIONS[state.type];
  const client = el('clientName').value.trim();
  const location = el('locationName').value.trim();
  el('clientSummary').innerHTML = `
    <strong>${escapeHtml(solution.name)}</strong><br>
    ${client ? `Cliente/Família: ${escapeHtml(client)}<br>` : ''}
    ${location ? `Localidade: ${escapeHtml(location)}<br>` : ''}
    Materiais a comprar: <strong>${formatMoney(t.materials)}</strong><br>
    Mão de obra: <strong>${formatMoney(t.labor)}</strong><br>
    Outros custos: <strong>${formatMoney(t.other)}</strong><br>
    <span style="font-size:1.1em">Total estimado: <strong>${formatMoney(t.grand)}</strong></span>
  `;
}

function render() {
  renderMaterialRows();
  renderCosts();
  renderSummary();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function saveState() {
  localStorage.setItem('viveCalculatorState', JSON.stringify({
    ...state,
    clientName: el('clientName')?.value || '',
    locationName: el('locationName')?.value || ''
  }));
}

function restoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem('viveCalculatorState'));
    if (!saved || !VIVE_SOLUTIONS[saved.type]) return false;
    state.type = saved.type;
    state.materials = Array.isArray(saved.materials) ? saved.materials : [];
    state.costs = Array.isArray(saved.costs) ? saved.costs : [];
    el('latrineType').value = state.type;
    el('clientName').value = saved.clientName || '';
    el('locationName').value = saved.locationName || '';
    el('solutionNote').textContent = VIVE_SOLUTIONS[state.type].note;
    render();
    return true;
  } catch { return false; }
}

function populateSelect() {
  const select = el('latrineType');
  Object.entries(VIVE_SOLUTIONS).forEach(([key, s]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = s.name;
    select.appendChild(option);
  });
}

populateSelect();
if (!restoreState()) loadSolution('upgrade_sato');

el('latrineType').addEventListener('change', (e) => loadSolution(e.target.value));

function onMaterialInput(e) {
  const target = e.target;
  if (!target.dataset.field) return;
  const index = Number(target.dataset.index);
  const field = target.dataset.field;
  state.materials[index][field] = ['qty','owned','price'].includes(field) ? safeNum(target.value) : target.value;
  render();
  saveState();
}
el('materialsBody').addEventListener('change', onMaterialInput);
el('materialsCards').addEventListener('change', onMaterialInput);

function onRemoveMaterial(e) {
  const btn = e.target.closest('.remove-material');
  if (!btn) return;
  state.materials.splice(Number(btn.dataset.index), 1);
  render(); saveState();
}
el('materialsBody').addEventListener('click', onRemoveMaterial);
el('materialsCards').addEventListener('click', onRemoveMaterial);

el('addMaterialBtn').addEventListener('click', () => {
  state.materials.push({ id: `custom-${Date.now()}`, name: 'Novo material', unit: 'unid', qty: 1, owned: 0, price: 0 });
  render(); saveState();
});

el('costsList').addEventListener('change', (e) => {
  const index = Number(e.target.dataset.index);
  if (!Number.isInteger(index)) return;
  if (e.target.classList.contains('cost-label')) state.costs[index].label = e.target.value;
  if (e.target.classList.contains('cost-value')) state.costs[index].value = safeNum(e.target.value);
  renderSummary(); saveState();
});

el('costsList').addEventListener('click', (e) => {
  const btn = e.target.closest('.remove-cost');
  if (!btn) return;
  state.costs.splice(Number(btn.dataset.index), 1);
  render(); saveState();
});

el('addCostBtn').addEventListener('click', () => {
  state.costs.push({ id: `cost-${Date.now()}`, label: 'Outro custo', value: 0, labor: false });
  render(); saveState();
});

['clientName','locationName'].forEach(id => el(id).addEventListener('input', () => { renderSummary(); saveState(); }));

el('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('viveCalculatorState');
  el('latrineType').value = 'upgrade_sato';
  loadSolution('upgrade_sato', false);
});

el('printBtn').addEventListener('click', () => window.print());

el('copyBtn').addEventListener('click', async () => {
  const t = totals();
  const s = VIVE_SOLUTIONS[state.type];
  const lines = [
    'VIVE - Estimativa de custo de latrina',
    `Solução: ${s.name}`,
    el('clientName').value ? `Cliente/Família: ${el('clientName').value}` : '',
    el('locationName').value ? `Localidade: ${el('locationName').value}` : '',
    `Materiais a comprar: ${formatMoney(t.materials)}`,
    `Mão de obra: ${formatMoney(t.labor)}`,
    `Outros custos: ${formatMoney(t.other)}`,
    `TOTAL ESTIMADO: ${formatMoney(t.grand)}`
  ].filter(Boolean).join('\n');
  try {
    await navigator.clipboard.writeText(lines);
    el('copyBtn').textContent = 'Resumo copiado ✓';
    setTimeout(()=> el('copyBtn').textContent = 'Copiar resumo', 1800);
  } catch {
    alert(lines);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
}
