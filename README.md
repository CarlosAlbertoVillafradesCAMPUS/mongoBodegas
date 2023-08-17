# MongoBodegas

## Descripción

Esta es una aplicación que utiliza mongoDB, Node y Express para crear y gestionar diferentes rutas relacionadas con la base de datos de Bodegas.

## A Tener en Cuenta

- se manejara un token de acceso **JWT** para limitar la manipulacion de los Endpoints en cada una de las collecciones, entonces se debe crear un token cada vez que queramos acceder a la infromacion de cada colleccion.
- Los datos que se ingresaran seran validados y transfromados utilizando **DTO**.

## Funcionamiento

## Requisitos previos

- Node.js instalado en tu máquina.

## Instalación

1. Clona este repositorio o descarga los archivos en tu máquina local.
2. Abre una terminal en el directorio raíz de la aplicación.
3. Ejecuta el siguiente comando para instalar las dependencias:

```
npm install
```



## Configuración

1. Crea una copia del archivo `.env.example` con el nombre `.env` en el directorio raíz de la aplicación.
2. El archivo `.env` , viene con las iguientes varibales definidas:

```
MY_CONFIG={"hostname":"127.17.0.92", "port":5017}
MY_CONNECT= {"user": "cavillafrades", "password":"1005344957", "nameDB": "db_campus_alquiler"}
MY_JWT="villafrades"
```

De esa manera podremos acceder a la base de datos que hemos creado y sus registros por defectos.

1. Ahora corremos en la terminal el comando **npm run dev**.

2. Revisar que el "hostname" y el "port" no se encuentren en uso, en caso de generar algun error cambiar esos datos en el archivo `.env`.

   #### Ubicacion db

   - La creacion de nuestra base de datos e insercion de registros se ecuentran en la ruta **db/query.mongodb**

## Uso

### Importante antes de empezar

Antes de empezar a realizar las consultas o EndPoints debemosos generar un token de acceso  cada vez que queremos acceder a la informacion de una colleccion. Este token debemos colocarlo en nuestro **header/Autorization**, este token tiene un limite de **30m** por colleccion, en ese rango de tiempo podremos acceder a las consultas de dicha colleccion.

- para generar nuestro token, debemos acceder a nuestra extencion de visual estudio llamada **Thunder-Client**, colocar la siguiente ruta:

  `GET: http://"hostname":"port"/token/"nombreColleccion"`

**collecciones**

- users
- bodegas
- inventarios
- productos

Una vez generado el token de respectiva collecion podemos acceder a los Endpoints de esas colleccion

## EndPoints

### GETS ALL

- `http://"hostname":"port"/users/` para obtener todos los registros de users.
- `http://"hostname":"port"/bodegas/` para obtener todos los registros de bodegas.
- `http://"hostname":"port"/inventarios/` para obtener todos los registros de inventarios.
- `http://"hostname":"port"/productos/`para obtener todos los registros de productos.

### 

## Contacto

Nombre: Carlos Villafrades Pinilla

Email: [cavillafrades@gmail.com](mailto:cavillafrades@gmail.com)