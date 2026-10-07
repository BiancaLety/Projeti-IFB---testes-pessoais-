# DOCUMENTAÇÃO DO SISTEMA F&F IMPORTS

Este projeto consiste em uma plataforma de catálogo digital para a loja **F&F Imports**, focada na exibição de produtos eletrônicos e acessórios, facilitando a conversão de vendas através do redirecionamento direto para o WhatsApp.

---

# 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

---

# 📋 Pré-requisitos

Para rodar este projeto, você precisará de:

- Um navegador web atualizado (Chrome, Firefox ou Edge).
- Editor de código (Recomendado: VS Code).
- Extensão Live Server no VS Code (para visualizar as alterações em tempo real).
- Conexão com a internet (para carregar o framework Bootstrap via CDN).

---

# 🔧 Instalação

## 1 - Clone o repositório

```bash
git clone https://github.com/seu-usuario/f-f-imports.git
```

## 2 - Navegue até a pasta do projeto

```bash
cd f-f-imports
```

## 3 - Abra o projeto no VS Code

```bash
code .
```

## 4 - Execute o projeto

Clique com o botão direito no arquivo `index.html` e selecione:

```bash
Open with Live Server
```

---

# ⚙️ Executando os testes

Ainda estamos implementando as funcionalidades com JavaScript.

---

# 📦 Implantação

Para colocar o sistema online:

- GitHub Pages: Gratuito e ideal para projetos front-end (HTML/CSS/JS).

---

# 🛠️ Construído com

- **HTML5 / CSS3** — Estrutura e estilização.
- **Bootstrap 4.1** — Framework CSS para responsividade e componentes.
- **Figma** — Usado para o protótipo de alta fidelidade e UI Design.
- **JavaScript** — Para manipulação dinâmica do catálogo. Ainda vamos realizar a implementação.

---

# 👥 Integrantes

1. Bianca Letícia de Araújo Alves  
2. Vinicius de Carvalho Pereira  
3. Yves Xavier Nishiyama
4. Maria Clara Barroso de Carvalho 

---

# 🔗 Links Importantes

## 📄 Documentação Online (Google Docs)

[https://docs.google.com/document/d/1nZZCuTt1yP35JgcCF8BM0kzLZD4t48lz5xLCV8eKo54/edit?tab=t.0](https://docs.google.com/document/d/10ttjtH6XIEGrUIZEbtg748bn7q_YgG0iAu9CPboo78E/edit?usp=sharing)
---

## 📌 Quadro Kanban do Projeto

https://github.com/orgs/infocbra/projects/64/views/1

---

## 🎨 Protótipo no Figma

https://www.figma.com/proto/RsTJOJcoIhYRd6Xo39FLam/Sem-t%C3%ADtulo?node-id=0-1&t=fLoede83uMjoJi6B-1

---

# 📌 Objetivo do Sistema

O sistema F&F Imports tem como objetivo oferecer uma experiência moderna e prática para clientes que desejam visualizar produtos eletrônicos e acessórios online, permitindo contato rápido com a loja através do WhatsApp para facilitar o processo de compra.

---

# 📱 Funcionalidades do Sistema

- Exibição de catálogo de produtos.
- Layout responsivo para dispositivos móveis e desktops.
- Redirecionamento direto para WhatsApp.
- Interface moderna utilizando Bootstrap.
- Estrutura preparada para futuras funcionalidades em JavaScript.

---
## 🚀 Estado atual do sistema

| Funcionalidade | Estado |
| :--- | :--- |
| Estrutura da API | Implementada |
| Banco de dados MySQL | Implementado |
| Modelagem das entidades | Implementada |
| Prisma ORM | Implementado |
| Autenticação de administrador | Implementada |
| Hash de senhas | Implementado |
| JWT | Implementado |
| Middleware de autenticação | Implementado |
| CRUD de produtos | Em desenvolvimento |
| CRUD de categorias | Em desenvolvimento |
| CRUD de marcas | Em desenvolvimento |
| Gerenciamento de imagens | Em desenvolvimento |
| Integração com frontend | Pendente |

---

## ⚙️ Instruções para rodar a API

Para rodar o projeto localmente, execute os seguintes comandos no terminal:

```bash
npm install
npx prisma db pull
npx prisma generate
npm run dev
# 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
