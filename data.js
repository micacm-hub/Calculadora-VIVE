const VIVE_SOLUTIONS = {
  upgrade_sato: {
    name: "Upgrade de laje + SATO Pan",
    note: "Baseado no modelo de substituição da tampa existente por uma laje circular de betão reforçado com SATO Pan. Pode ajustar todos os valores.",
    materials: [
      { name: "SATO Pan", unit: "unid", qty: 1, price: 776 },
      { name: "Cimento 32.5 N", unit: "kg", qty: 27, price: 11 },
      { name: "Areia", unit: "balde 10 L", qty: 4.5, price: 10 },
      { name: "Cascalho / brita", unit: "balde 10 L", qty: 9, price: 50 },
      { name: "Molde/cofragem (rateio)", unit: "unid", qty: 0.02, price: 1500 },
      { name: "Pregos", unit: "kg", qty: 0.2, price: 80 },
      { name: "Ferro para armação", unit: "kg", qty: 4, price: 80 }
    ],
    labor: 1200
  },
  upgrade_no_sato: {
    name: "Upgrade de laje sem SATO Pan",
    note: "Usa a mesma base de laje reforçada, sem incluir a compra do SATO Pan. Ajuste materiais e quantidades conforme a solução instalada.",
    materials: [
      { name: "Cimento 32.5 N", unit: "kg", qty: 27, price: 11 },
      { name: "Areia", unit: "balde 10 L", qty: 4.5, price: 10 },
      { name: "Cascalho / brita", unit: "balde 10 L", qty: 9, price: 50 },
      { name: "Molde/cofragem (rateio)", unit: "unid", qty: 0.02, price: 1500 },
      { name: "Pregos", unit: "kg", qty: 0.2, price: 80 },
      { name: "Ferro para armação", unit: "kg", qty: 4, price: 80 }
    ],
    labor: 1200
  },
  twin_offset: {
    name: "Latrina de Fossa Dupla Deslocada",
    note: "Solução resiliente com duas fossas deslocadas, caixa de inspeção e SATO Pan.",
    materials: [
      { name: "Areia", unit: "m³", qty: 0.35, price: 1250 },
      { name: "Cimento 50 kg", unit: "saco", qty: 4, price: 600 },
      { name: "Blocos de 10", unit: "unid", qty: 135, price: 17 },
      { name: "Tubo PVC 4\"", unit: "m", qty: 4, price: 300 },
      { name: "SATO Pan", unit: "unid", qty: 1, price: 630 },
      { name: "Pregos", unit: "kg", qty: 0.5, price: 100 },
      { name: "Brita", unit: "m³ / lote", qty: 0.15, price: 4300 },
      { name: "Ferro 8 mm", unit: "varão", qty: 3, price: 130 },
      { name: "Pranchas de madeira", unit: "unid", qty: 8, price: 100 },
      { name: "Arame", unit: "kg", qty: 0.5, price: 100 }
    ],
    labor: 2000
  },
  twin_direct: {
    name: "Latrina de Descarga Direta de Fossa Dupla",
    note: "Solução resiliente com duas fossas alternadas e descarga direta.",
    materials: [
      { name: "Areia", unit: "m³", qty: 0.35, price: 1250 },
      { name: "Cimento 50 kg", unit: "saco", qty: 4, price: 500 },
      { name: "Blocos de 10", unit: "unid", qty: 115, price: 25 },
      { name: "Tubo PVC 4\"", unit: "m", qty: 2, price: 100 },
      { name: "SATO Pan", unit: "unid", qty: 1, price: 630 },
      { name: "Pregos", unit: "kg", qty: 1, price: 100 },
      { name: "Brita", unit: "m³ / lote", qty: 0.11, price: 4300 },
      { name: "Ferro 8 mm", unit: "varão", qty: 8, price: 150 },
      { name: "Pranchas de madeira", unit: "unid", qty: 8, price: 100 },
      { name: "Arame", unit: "kg", qty: 0.5, price: 100 }
    ],
    labor: 2000
  },
  biodigester: {
    name: "Fossa Biodigestora",
    note: "Solução resiliente com câmara de tratamento compacta e placa porosa.",
    materials: [
      { name: "Areia", unit: "m³", qty: 0.15, price: 1250 },
      { name: "Cimento 50 kg", unit: "saco", qty: 3, price: 500 },
      { name: "Água", unit: "m³", qty: 0.12, price: 500 },
      { name: "Rede galinheira", unit: "m", qty: 2, price: 100 },
      { name: "Tubo PVC 4\"", unit: "m", qty: 4, price: 200 },
      { name: "Material orgânico / serradura", unit: "lote", qty: 0, price: 0 },
      { name: "Arame queimado", unit: "kg", qty: 0.5, price: 100 },
      { name: "Varão 8 mm", unit: "unid", qty: 3, price: 186 },
      { name: "Brita", unit: "m³ / lote", qty: 0.15, price: 4300 },
      { name: "Blocos", unit: "unid", qty: 50, price: 25 },
      { name: "Prancha para molde", unit: "unid", qty: 1, price: 600 },
      { name: "Tampa de inspeção", unit: "unid", qty: 1, price: 500 },
      { name: "Plástico", unit: "m", qty: 4, price: 30 }
    ],
    labor: 2000
  },
  raised_pit: {
    name: "Latrina de Fossa Elevada",
    note: "Solução resiliente para zonas inundáveis, lençol freático alto ou solos rochosos.",
    materials: [
      { name: "Areia", unit: "m³", qty: 0.7, price: 1250 },
      { name: "Cimento 50 kg", unit: "saco", qty: 3, price: 600 },
      { name: "Blocos de 10", unit: "unid", qty: 145, price: 17 },
      { name: "SATO Pan", unit: "unid", qty: 1, price: 630 },
      { name: "Tubo de ventilação", unit: "m", qty: 1.5, price: 100 },
      { name: "Pregos", unit: "kg", qty: 0.33, price: 100 },
      { name: "Brita", unit: "m³ / lote", qty: 0.15, price: 4300 },
      { name: "Ferro 8 mm", unit: "varão", qty: 3, price: 150 },
      { name: "Pranchas de madeira", unit: "unid", qty: 1, price: 500 },
      { name: "Arame", unit: "kg", qty: 0.5, price: 100 }
    ],
    labor: 2000
  }
};
