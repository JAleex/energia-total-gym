# Energía Total Web

Aplicación web para el **Gimnasio Energía Total**. Permite registrar afiliados, registrar los pagos de las mensualidades, controlar la entrada en la recepción y que cada afiliado consulte su plan desde el celular.

Actividad 4 de **Electiva – Desarrollo de Aplicaciones Web**, Corporación Universitaria Iberoamericana.

**Integrantes:** Jhon Alexander Galindo Hernandez · Diana Toquica

El documento de la actividad está en la carpeta `docs/`.

## Tecnologías

- **Front-end:** React, Vite, React Router, Axios, Hooks y Context API
- **Back-end:** Django y Django REST Framework
- **Documentación de la API:** Swagger (drf-spectacular)
- **Base de datos:** PostgreSQL (con Docker) o SQLite (sin Docker)
- **Despliegue:** Docker y Docker Compose

## Carpetas

```
backend/     API REST en Django (app "gimnasio")
frontend/    Interfaz en React
docs/        Documento de la actividad
docker-compose.yml
```

## Cómo ejecutarlo con Docker

Con Docker Desktop abierto, en **CMD** y desde la carpeta del proyecto:

```bat
docker compose up --build
```

En otra ventana de CMD se crea el usuario administrador y se cargan los planes:

```bat
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py loaddata planes
```

Si la primera vez el back-end muestra un error de conexión a la base de datos, espere unos segundos: se reinicia solo cuando PostgreSQL está listo.

- Aplicación: http://localhost:5173
- Swagger: http://localhost:8000/api/docs/
- Administrador de Django: http://localhost:8000/admin/

## Cómo ejecutarlo sin Docker

**Back-end** (ventana 1 de CMD):

```bat
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata planes
python manage.py createsuperuser
python manage.py runserver
```

**Front-end** (ventana 2 de CMD):

```bat
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173 e ingresar con el usuario creado.

## Probar la API en Swagger

1. Abrir http://localhost:8000/api/docs/
2. En `POST /api/login/` enviar el usuario y la contraseña y copiar el `token`.
3. Pulsar **Authorize** y escribir `Token el-token-copiado`.

## Subir a GitHub

```bat
git init
git add .
git commit -m "Actividad 4 Energia Total Web"
git branch -M main
git remote add origin https://github.com/SU-USUARIO/energia-total-web.git
git push -u origin main
```
