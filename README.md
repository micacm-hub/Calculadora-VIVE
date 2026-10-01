# Calculadora VIVE de Custos de Latrinas

Aplicação web estática, responsiva e preparada para GitHub Pages.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `vive-calculadora`.
2. Faça upload de todos os ficheiros desta pasta, mantendo a pasta `assets`.
3. No GitHub, vá a **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione `main` e a pasta `/ (root)`.
6. Grave. O GitHub mostrará o endereço público após alguns instantes.

## Funcionalidades

- Seleção do tipo de latrina.
- Quantidades e preços editáveis.
- Campo "Família já tem" para descontar materiais já disponíveis.
- Quantidade a comprar e subtotal calculados automaticamente.
- Mão de obra, transporte e outros custos variáveis.
- Total final automático.
- Botão de impressão / Guardar PDF.
- Resumo copiável para WhatsApp/SMS/email.
- Guarda temporariamente os dados no próprio dispositivo.
- Funciona offline após a primeira abertura graças ao service worker.

## Fonte dos valores de referência

As quantidades e preços iniciais foram estruturados a partir dos mapas de quantidades do manual técnico MBS Sofala fornecido para este trabalho. Todos os valores podem ser alterados pelo utilizador.
