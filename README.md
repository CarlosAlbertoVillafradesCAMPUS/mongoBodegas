# MongoBodegas

## Descripción

Esta es una aplicación que utiliza mongoDB, Node y Express para crear y gestionar diferentes rutas relacionadas con la base de datos de Bodegas y sus respectivas consultas.

## Consultas  a Realizar

1.  Realizar un EndPolnt que permita listar todas las bodegas ordenadas alfabéticamente. 

2.  Realizar un EndPolnt que permita crear una bodegas.(agregar en los comentarios de la función los datos de entrada).

3.  Realizar un EndPoint que permita listar todos los productos en orden descendente por el campo "Total". • El campo "Total" es la cantidad de unidades que la empresa tiene de este producto, considerando la unión de todas las bodegas, es decir que el dato como tal no existe en la base de datos,sino se debe calcular. Si la Bodega A tiene 1O unidades, la Bodega B tiene 5 unidades y la Bodega C tiene 3 unidades. Total= 18.

4.  Realizar un EndPoint que permita insertar un productos y a su vez asigne una cantidad inicial del mismo en la tabla inventarios en una de las bodegas por default.

5.  Realizar un EndPoint que permita insertar registros en la tabla de inventarios, los parámetros de entradadebenser (id_producto,id_bodega,cantidad). • La tabla no puede repetir la combinación de Bodega I Producto Por lo tanto será necesario validar si el ingreso que se está realizado ya existe o es una combinación totalmente nueva. • Si es una combinación totalmente nueva, se debe hacer un lnsert, considerando los datos ingresados. • Si es una combinación existente, entonces se debe hacer un Update a este registro, considerando la suma de la cantidad existente con la cantidad nueva. 

6.  Realizar un EndPolnt que permita Trasladar unproducto de una bodega a otra • Se debe validar que la cantidad de unidades que se pretende sacar de una Bodega, sea posible, ya que si tengo 1O unidades en la Bodega A, no podré sacar de ella 20 unidades. Esta acción debe generar una alerta e impedir el registro. • Para la afectación de las tablas se debe considerar que del Origen debo restar la cantidad,y al destino le debo sumar lacantidad. Por ejemplo: Bodega A = 1O unidades. Bodega B = 1O unidades. Haré el traslado de 5 unidades desde la Bodega A para la Bodega B,Por lo cual el resultado será hacer Updated a los dos registros en inventarios: Bodega A = 5 unidades. Bodega B = 15 unidades. Además hacer un lnsert con toda la información en la tabla de historiales.

![diagrama](./assets/Screenshot%20from%202023-08-25%2014-20-27.png)

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

   - La creacion de nuestra base de datos e insercion de registros por defecto se ecuentran en la ruta **db/query.mongodb**

## Uso

### Accesibilidad

Antes de empezar a realizar las consultas o EndPoints debemosos generar un token de acceso  cada vez que queremos acceder a la informacion de una colleccion. Este token debemos colocarlo en nuestro **header/Autorization**, tiene un limite de **30m** por colleccion, en ese rango de tiempo podremos acceder a las consultas de dicha colleccion.

- para generar nuestro token, debemos acceder a nuestra extencion de visual estudio llamada **Thunder-Client**, colocar la siguiente ruta:

  `GET: http://"hostname":"port"/token/"nombreColleccion"`

**collecciones**

- users
- bodegas
- inventarios
- productos

**Ejemplo**

![diagrama](./assets/Screenshot%20from%202023-08-25%2014-24-13.png)

![diagrama](./assets/Screenshot%20from%202023-08-25%2013-32-58.png)

![diagrama](./assets/Screenshot%20from%202023-08-25%2014-24-34.png)

Una vez generado el token de respectiva coleccion podemos acceder a los Endpoints de esas colleccion

## EndPoints 

#### Importante

tener en cuenta que si se quiere realizar un post o put en las siguientes rutas, se debe realizar de la manera en que se explica y respetando el orden y la estructura de los datos de entrada, ya que el codigo esta programado para validar la estructura de los datos de entrada y en caso de no concordar el orden de la estructura este retornara un error.

### bodegas

-  Realizar un EndPolnt que permita listar todas las bodegas ordenadas alfabéticamente. 

  #### Get : `http://"hostname":"port"/bodegas/`

  

-  Realizar un EndPolnt que permita crear bodegas.

  #### Post : `http://"hostname":"port"/bodegas/`

  **Parámetros de entrada:**

  - `Nombre` : Nombre completo de nuestra bodega. (string)
  - `Responsable` : Id o numero de cedula del responsable de nuestra bodega. (int).
  - `Estado` : Al estado se refiere al estado en que se encuentra nuestra bodega (int)
  - `Created_By` : Id del usuario que creó la bodega.  (int).

  ###### Ejemplo

  ```javascript
  {
     "Nombre": " El gran villa",
     "Responsable": 1007514215,
     "Estado": 1,
     "Created_By": 1
  }
  ```

  

### productos

- Realizar un EndPoint que permita listar todos los productos en orden descendente por el campo "Total". • El campo "Total" es la cantidad de unidades que la empresa tiene de este producto, considerando la unión de todas las bodegas, es decir que el dato como tal no existe en la base de datos,sino se debe calcular. Si la Bodega A tiene 1O unidades, la Bodega B tiene 5 unidades y la Bodega C tiene 3 unidades. Total= 18.

  #### Get : `http://"hostname":"port"/productos/`

  

-  Realizar un EndPoint que permita insertar un productos y a su vez asigne una cantidad inicial del mismo en la tabla inventarios en una de las bodegas por default.

  #### Post : `http://"hostname":"port"/productos/`

  **Parámetros de entrada:**

  - `Nombre` : Nombre completo del producto. (string)
  - `Descripcion` : Text descriptivo de nuestro producto. (string).
  - `Estado` : Al estado se refiere al estado en que se encuentra nuestro producto (int)
  - `Created_By` : Id del usuario  (int).

  ###### Ejemplo

  ```javascript
  {
     "Nombre": "Pantalones",
     "Descripcion": "Descripción del Pantalones",
     "Estado": 1,
     "Created_By": 1,
  }
  ```

  

### inventarios

- Realizar un EndPoint que permita insertar registros en la tabla de inventarios.  La tabla no puede repetir la combinación de Bodega I Producto Por lo tanto será necesario validar si el ingreso que se está realizado ya existe o es una combinación totalmente nueva.  Si es una combinación totalmente nueva, se debe hacer un lnsert, considerando los datos ingresados. Si es una combinación existente, entonces se debe hacer un Update a este registro, considerando la suma de la cantidad existente con la cantidad nueva

  #### Post : `http://"hostname":"port"/inventarios/`

  **Parámetros de entrada:**

- `  Id_Bodega` : Id de la bodega. (int)

- `Id_Producto` : Id del producto del que vamos a realizar el inventario. (int).
- `Cantidad` : cantidad que hay de ese producto (int)
- `Created_By` : Id del usuario  (int).

###### Ejemplo

```javascript
{
   "Id_Bodega": 2,
    "Id_Producto": 5,
    "Cantidad": 3,
    "Created_By": 1
}
```

### 

-  Realizar un EndPolnt que permita Trasladar unproducto de una bodega a otra • Se debe validar que la cantidad de unidades que se pretende sacar de una Bodega, sea posible, ya que si tengo 1O unidades en la Bodega A, no podré sacar de ella 20 unidades. Esta acción debe generar una alerta e impedir el registro. • Para la afectación de las tablas se debe considerar que del Origen debo restar la cantidad,y al destino le debo sumar lacantidad. Por ejemplo: Bodega A = 1O unidades. Bodega B = 1O unidades. Haré el traslado de 5 unidades desde la Bodega A para la Bodega B,Por lo cual el resultado será hacer Updated a los dos registros en inventarios: Bodega A = 5 unidades. Bodega B = 15 unidades. 

  #### Post : `http://"hostname":"port"/inventarios/transladar`

  **Parámetros de entrada:**

  - `  Id_Bodega_origen `: Id de la bodega de origen. (int)
  - `  Id_Bodega_Destino` : Id de la bodega de destino. (int)

  - `Id_Producto` : Id del producto. (int).
  - `Cantidad` : cantidad que vamos a transladar (int)
  - `Created_By` : Id del usuario  (int).

  ###### Ejemplo

  ```javascript
  {
     "Id_Bodega_Origen": 2,
    "Id_Bodega_Destino": 4,
    "Id_Producto": 1,
    "Cantidad": 3,
    "Created_By": 1
  }
  ```

### 

## opcional

### GETS ALL

- `http://"hostname":"port"/users/` para obtener todos los registros de users.
- `http://"hostname":"port"/bodegas/` para obtener todos los registros de bodegas.
- `http://"hostname":"port"/inventarios/` para obtener todos los registros de inventarios.
- `http://"hostname":"port"/productos/`para obtener todos los registros de productos.

## Contacto

Nombre: Carlos Villafrades Pinilla

Email: [cavillafrades@gmail.com](mailto:cavillafrades@gmail.com)
