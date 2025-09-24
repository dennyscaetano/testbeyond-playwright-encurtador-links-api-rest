# 🔗 Projeto Encurtador de URL  
Projeto de prática desenvolvido no **Bootcamp TestBeyond**, conduzido pelo mentor **Fernando Papito**.  
O objetivo é construir um encurtador de links completo, com **Conteinirização de API, Banco de Dados, Front-end, Serviços e Adminer** para administração.

Este repositório traz a configuração necessária para rodar os serviços usando **containers** e praticar os conceitos apresentados em aula.  

---

## 📋 Checklist de Instalação de Softwares Básicos  

Antes de começar, siga este checklist para garantir que seu ambiente esteja pronto para rodar o projeto:  

### 🚀 Por que seguir todos os passos?  
- Evitar erros durante a execução do projeto.  
- Garantir ambiente padronizado com o usado nas aulas.  
- Aumentar produtividade com ferramentas modernas.  
- Criar uma base sólida para futuros projetos em **Qualidade de Software**.  

👉 **Siga a ordem recomendada:** Node.js → Windows Terminal (somente Windows) → VS Code → Git.  

---

## ✅ Softwares Essenciais  

### 📦 Node.js  
**Versão recomendada:** v22.19.0  

- **Windows:** [Download Node.js v22.19.0](https://nodejs.org/dist/v22.19.0/node-v22.19.0-x64.msi)  

- **Linux/Mac:**  
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
. "$HOME/.nvm/nvm.sh"
nvm install 22
nvm use 22
nvm alias default 22
```

**Verificar instalação:**  
```bash
node -v   # v22.xx.x
npm -v    # 10.x.x
```

---

### 💻 Windows Terminal (somente Windows)  
Terminal moderno e padronizado para uso no curso.  

- Instale pela **Microsoft Store** (recomendado).  
- Alternativa: [Releases no GitHub](https://github.com/microsoft/terminal/releases).  

---

### 📝 Visual Studio Code  
Editor de código recomendado.  

- Baixar em: [Visual Studio Code](https://code.visualstudio.com/)  
- Extensões recomendadas:  
  - **Material Icon Theme** (ícones)  
  - **One Dark Pro** (tema)  

---

### 🔧 Git  
Controle de versão utilizado no projeto.  

**Instalação no Windows:**  
- [Baixar Git for Windows](https://gitforwindows.org/)  
- Durante a instalação, habilite o **Git Bash no Windows Terminal**.  

**Linux (Ubuntu/Debian):**  
```bash
sudo apt update
sudo apt install git -y
```

**Mac (via Homebrew):**  
```bash
brew install git
```

**Configuração inicial:**  
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
git config --list
```

**Verificar instalação:**  
```bash
git --version
```

---

## 🛠️ Rodando o Projeto  

Após preparar o ambiente e instalar os softwares essenciais, você poderá:  
1. Clonar este repositório:  
```bash
git clone https://github.com/dennyscaetano/testbeyond-playwright-encurtador-links-api-rest.git
cd testbeyond-playwright-encurtador-links-api-rest
```
2. Subir os containers (com Podman ou Docker):  
```bash
# Exemplo com Podman
podman play kube shortbeyond.yaml

# Exemplo com Docker Compose
docker compose up -d
```
3. Acessar os serviços:  
- **API:** [http://localhost:3333/docs#](http://localhost:3333/docs#)  
- **Adminer:** [http://localhost:8080](http://localhost:8080)  
- **Front-end (Web):** [http://localhost](http://localhost)  

---

## 📝 Notas Importantes  

- Reinicie o terminal após cada instalação para atualizar variáveis de ambiente.  
- Se alguma porta já estiver em uso (exemplo: 5432 para PostgreSQL), ajuste no arquivo de configuração.  
- Use o mesmo setup do checklist para evitar incompatibilidades.  

---

## 📚 Créditos  
Projeto de prática desenvolvido durante o **Bootcamp TestBeyond**  
Mentoria de **Fernando Papito**
