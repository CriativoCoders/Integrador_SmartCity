# Smart City Backend

Este é o backend do projeto **Smart City**, desenvolvido com Django e Django Rest Framework. Ele gerencia sensores instalados em ambientes urbanos, permitindo o cadastro, consulta, atualização, exclusão, importação e exportação de dados de sensores, ambientes e históricos. A autenticação é feita via JWT.

---

---

## 🚀 Instalação e Execução

### 1. Clone o repositório

```sh
git clone https://github.com/seu-usuario/smart_city_backend.git
cd smart_city_backend/project

```

## 2. Crie e ative um ambiente virtual

```sh
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

```

## 3. Instale as dependências

```sh
pip install -r requirements.txt
```

### Se não houver um requirements.txt, instale manualmente:

```sh
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers django-filter
```

### 4. Realize as migrações

```sh
python manage.py migrate

```

## 5. Crie um superusuário

```sh
python manage.py createsuperuser
```

## 6. Rode o servidor

```sh
python manage.py runserver
```

## 🔑 Autenticação

- Utiliza JWT (JSON Web Token).
- Endpoints de autenticação: 
- POST /api/token/ — obtém o token de acesso e refresh.
- POST /api/token/refresh/ — renova o token de acesso.
- POST /api/register/ — cadastro de novo usuário.

## 🗂️ Modelos Principais

- Ambiente: locais onde sensores estão instalados.
- Sensor: representa um sensor físico (tipo, valor, localização, status, ambiente, - usuário, data da leitura).
- Historico: armazena leituras históricas dos sensores.


## 🛣️ Endpoints REST

- Usuários
POST /api/register/ — Cadastro de usuário (username, password).

- Autenticação
POST /api/token/ — Login (JWT).
POST /api/token/refresh/ — Refresh do token.

- Sensores
GET /api/sensores/ — Lista todos os sensores do usuário autenticado.
POST /api/sensores/ — Cria um novo sensor.
GET /api/sensores/{id}/ — Detalhe de um sensor.
PUT /api/sensores/{id}/ — Atualiza um sensor.
DELETE /api/sensores/{id}/ — Remove um sensor.
GET /api/sensores/export_csv/ — Exporta sensores em CSV.
POST /api/sensores/import_data/ — Importa sensores em lote (JSON).

- Filtros disponíveis em /api/sensores/:
?id=
?tipo=
?status=
?ambiente__sig=
?data_leitura=
Busca textual: ?search=

- Ambientes
GET /api/ambientes/ — Lista ambientes.
POST /api/ambientes/ — Cria ambiente.
GET /api/ambientes/{id}/ — Detalhe.
PUT /api/ambientes/{id}/ — Atualiza.
DELETE /api/ambientes/{id}/ — Remove.

- Históricos
GET /api/historicos/ — Lista históricos.
POST /api/historicos/ — Cria histórico.
GET /api/historicos/{id}/ — Detalhe.
PUT /api/historicos/{id}/ — Atualiza.
DELETE /api/historicos/{id}/ — Remove.

Filtros disponíveis em /api/historicos/:
?id=
?sensor__id=
?ambiente__sig=
?data_leitura=
Busca textual: ?search=


## 📄 Documentação da API ( Inplentação Futura por falta de Tempo tive alguns problemas )
Acesse a documentação interativa em:

http://127.0.0.1:8000/swagger/
http://127.0.0.1:8000/redoc/


## 🛡️ Permissões
Apenas usuários autenticados podem acessar os endpoints protegidos.
Cada usuário só vê e manipula seus próprios sensores.

#

## ⚙️ Configurações Importantes
CORS: Liberado para localhost:3000 e localhost:<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>517</vscode_annotation>3 (React).
Filtros: Ativados via django-filter.
JWT: Configurado via rest_framework_simplejwt.

#

## 📥 Importação e Exportação ( Melhorias futuras )
Importação: Envie uma lista de sensores em JSON para /api/sensores/import_data/.
Exportação: Baixe um CSV de sensores em /api/sensores/export_csv/.

#

## 👨‍💻 Exemplos de Uso
- Cadastro de usuário - ( No cadstro pode cadastra normalmente)

```sh
POST /api/register/
{
  "username": "talita",
  "password": "123"
}
```


- Login
```sh
POST /api/token/
{
  "username": "talita",
  "password": "123"
}
```

- Criar sensor
 ```sh
POST /api/sensores/
Authorization: Bearer <token>
{
  "tipo": "temperatura",
  "valor": 25.5,
  "localizacao": "Praça Central",
  "status": "ativo",
  "ambiente": 1
}
 ```

 ## 📝 Licença
Projeto educacional - SENAI Roberto Mange.


## 📫 Contato
Dúvidas ou sugestões?
talitacristina13877@gmail.com