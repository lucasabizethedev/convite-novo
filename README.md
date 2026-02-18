# 💍 Convite Digital: Chá de Panela & Noivado - Camilly & Lucas

Este é um projeto de convite digital interativo desenvolvido para o Chá de Panela e Noivado de Camilly e Lucas. O site permite que os convidados confirmem presença, vejam a localização do evento e escolham itens em uma lista de presentes dinâmica.

## 🚀 Funcionalidades

- **Contagem Regressiva**: Contador em tempo real até o dia 12 de Setembro de 2026 às 13h.
- **Lista de Presentes Inteligente**: Os itens são carregados via API. Quando um convidado escolhe um item, ele some da lista para os próximos, evitando presentes repetidos.
- **Escolha de Cores**: Opção obrigatória para os convidados escolherem entre as cores da paleta da casa (Preto, Branco, Amadeirado e Inox).
- **Confirmação de Presença**: Integração com Google Sheets (via SheetDB) para salvar nome, número de acompanhantes e presente escolhido.
- **Design Responsivo**: Visual moderno com tema rústico (tons de marrom) otimizado para celulares.
- **Localização**: Botão direto para o Google Maps.

## 🛠️ Tecnologias Utilizadas

- **React + TypeScript**: Base do projeto.
- **Vite**: Ferramenta de build rápida.
- **CSS3**: Design personalizado com efeitos de Glassmorphism.
- **SheetDB API**: Para transformar uma planilha do Google em um banco de dados JSON.
- **Vercel**: Hospedagem e Deploy contínuo.

## 📦 Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/lucasabizethedev/convite-novo.git](https://github.com/lucasabizethedev/convite-novo.git)
