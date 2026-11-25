FROM python:3.12-slim

WORKDIR /app

# Se instalan las librerías de Python
COPY requirements.txt .
RUN pip install -r requirements.txt

# Se copia el código del proyecto
COPY . .

EXPOSE 8000

# Se crean las tablas y se inicia el servidor
CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000
