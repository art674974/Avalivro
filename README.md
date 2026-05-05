📚 Avalivro
Avalivro é um sistema web desenvolvido em Django para gerenciamento de livros e avaliações.
O projeto permite cadastrar obras, consultar detalhes, realizar buscas e interagir com o catálogo de forma simples e organizada.

🚀 Funcionalidades
Cadastro e listagem de livros

Detalhes individuais de cada obra

Busca por título ou autor

Estrutura modular com apps Django (biblioteca e catalogo)

Templates HTML e recursos estáticos (CSS, JS, imagens)

🛠️ Requisitos
Antes de rodar o projeto, certifique-se de ter instalado:

- Python 3.10+
- pip (gerenciador de pacotes do Python)

📦 Instalação
Clone o repositório:

bash
git clone https://github.com/art674974/Avalivro.git
cd Avalivro
Crie e ative um ambiente virtual:

bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
Instale as dependências:

bash
pip install -r requirements.txt
⚙️ Configuração
Crie um arquivo .env na raiz do projeto para armazenar variáveis sensíveis:

Código
SECRET_KEY=suachavesecretaaqui
DEBUG=False
DATABASE_URL=sqlite:///db.sqlite3
O projeto já está configurado para usar SQLite por padrão.
Se quiser usar PostgreSQL ou outro banco, ajuste o DATABASE_URL no .env.

▶️ Executando o projeto
Aplique as migrações:

bash
python manage.py migrate
Crie um superusuário:

bash
python manage.py createsuperuser
Inicie o servidor:

bash
python manage.py runserver
Acesse no navegador:

Código
http://127.0.0.1:8000/
📖 Contexto
Este projeto foi desenvolvido como prática de Django e organização de sistemas web.
Ele serve como base para estudos, podendo ser expandido com funcionalidades como avaliações de livros, notas, recomendações e integração com APIs externas.
