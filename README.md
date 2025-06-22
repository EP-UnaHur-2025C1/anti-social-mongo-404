Introducción:
Este proyecto corresponde al backend de "Anti-Social", una red social con funcionalidades de posts, comentarios, imágenes, etiquetas, y autenticación de usuarios. Se desarrolló utilizando Node.js, Express.js, MongoDB, Redis y documentación mediante Swagger.
 Tecnologías implementadas
•	Node.js + Express: para el desarrollo del servidor backend.
•	MongoDB: base de datos NoSQL para almacenar usuarios, posts, comentarios, etc.
•	Redis: usado para almacenamiento en caché (por ejemplo, comentarios por TTL).
•	Docker + Docker Compose: para la creación y administración de los contenedores de MongoDB, Redis y herramientas administrativas.
•	Swagger UI: para documentar y probar la API.
•	Multer: para manejo de subida de imágenes.
•	dotenv: para configuración de variables de entorno.

Conexión a la Base de Datos y Sistema de Caché
Este proyecto utiliza MongoDB como base de datos principal y Redis como sistema de caché para mejorar el rendimiento y la eficiencia en la lectura de datos.
Conexión a MongoDB
La conexión a MongoDB se gestiona a través del archivo db.js, utilizando la biblioteca mongoose, que permite mapear documentos de la base de datos a objetos de JavaScript.
Archivo: src/db/config/db.js
Descripción:
•	La URL de conexión (MONGO_URI) se obtiene del archivo .env, lo que permite manejar configuraciones sin exponer datos sensibles en el código.
•	En caso de una conexión exitosa, se muestra un mensaje de confirmación por consola.
•	Si ocurre un error, el mismo se captura y se muestra detalladamente.
•	Este módulo es requerido en main.js para establecer la conexión antes de iniciar el servidor.
Conexión a Redis
Redis se usa como mecanismo de caché para guardar temporalmente ciertos datos, como los comentarios, mejorando así la velocidad de respuesta del sistema.
Archivo: src/db/config/redis.js

Descripción:
•	Se configura el cliente Redis con la URL y contraseña especificadas en el archivo .env.
•	La conexión incluye un tiempo de espera (timeout) de 10 segundos.
•	Se manejan eventos de conexión y error para informar en consola el estado de Redis.
•	Este cliente es utilizado en los controladores que necesitan guardar o leer datos de forma temporal (por ejemplo, en la lógica de comentarios).

Variables de entorno relevantes (.env):
•  MONGO_URI: conexión a MongoDB.
•  REDIS_URL: URL del servidor Redis.
•  REDIS_PASSWORD: clave de acceso para Redis.
•  TTL: tiempo de vida en segundos para los datos cacheados (por ejemplo, comentarios).

Relaciones entre Modelos
Las relaciones entre los modelos están definidas utilizando referencias de Mongoose (ObjectId). Esto permite establecer vínculos entre documentos de distintas colecciones en MongoDB de forma eficiente.
________________________________________
👤 User
•	1:N con Post
Un usuario puede crear muchos posts.
Relación:
js
CopiarEditar
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
•	1:N con Comment
Un usuario puede realizar múltiples comentarios.
Relación:
js
CopiarEditar
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
•	N:N con User (followers / following)
Cada usuario puede seguir y ser seguido por muchos otros usuarios.
Relación recursiva:
js
CopiarEditar
followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
________________________________________
📝 Post
•	N:1 con User
Cada post pertenece a un único usuario (autor).
•	1:N con Comment
Un post puede tener múltiples comentarios relacionados.
Relación:
js
CopiarEditar
comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
•	1:N con Post_Image
Un post puede tener varias imágenes asociadas.
•	N:M con Tag
Un post puede tener múltiples etiquetas, y una etiqueta puede pertenecer a múltiples posts.
Relación bidireccional:
js
CopiarEditar
tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
________________________________________
💬 Comment
•	N:1 con Post
Cada comentario está vinculado a un único post.
•	N:1 con User
Cada comentario es hecho por un usuario específico.
________________________________________
🏷️ Tag
•	M:N con Post
Las etiquetas pueden estar asociadas a múltiples publicaciones, y viceversa.
(Relación solo reflejada en el modelo Post.)
________________________________________
🖼️ Post_Image
•	N:1 con Post
Varias imágenes pueden asociarse a un solo post.



EndPoints:
La ruta principal de acceso a la API es:
http://localhost:3000
Desde esta dirección se accede a todos los endpoints.
**User**:
-	User Post: ruta API (/user/createUser), método (POST), en lo que refiere a este método recibe un body con un objeto que contiene el nickName (mínimo de 8 caracteres, máximo de 12 y no puede ser vacío )  y email (debe contener formato de email y no puede ser vacío). En lo que es la ruta de crear usuario, antes de llegar al controlador del usuario, pasa por un schema de validación donde se corrobora los campos de nickname y email. 
Al finalizar la petición, si todo esta correcto, nos devuelve un status 201 created y un json con los campos de nickname, email, followers, posts,following y id.
En caso de que alguna información se haya ingresado de forma errónea, nos lanza un 400 bad requeres, con el mensaje de “Error al crear el usuario” y un campo de “error” en donde se especifica que es lo que esta mal en la petición.
-	Get User: ruta API (/user/getUser/<-----IdDeBusqeda----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del usuario se pasa como parámetro de ruta al final del endpoint.
En lo que refiere a la ruta de la petición, antes de llegar al controlador pasa por dos middlewares genéricos, que es invalidID, en este mismo se evalúa la longitud del ID, el cual deberá tener 24 caracteres y validSearch que corrobora que ese ID corresponda a un usuario. 
En caso de que la petición sea correcta, nos devuelve un status 200 OK, con un Json con los campos de id,nickName, email. Followors, posts y following.
En caso de que el ID tenga menos de 24 caracteres:
En caso de que el no exista un usuario con ese ID, arroja un status 400 bad request, con el mensaje “No se encuentra el User buscado”


-	Get All Users: ruta API (/user/getAllUsers), método (GET), en lo que refiera a este método permite obtener una lista de todos los usuarios registrados, incluye campos como: nickname, email, followers, following e id.

-	Update User NickName: ruta API  (/user/updateNickName/<-----IdDeBusqeda----->), método (PUT), en lo que refiere a este método, el ID del usuario se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar el nickname del usuario, siempre y cuando este dentro del rango de validaciones.

En las rutas del mismo antes de llegar a controlador, pasa por invalidID (tenga 24 caracteres), validSearch (para validar usuario) y validNickname (validación que el nickname cumpla con los requisitos).
En caso de que este todo bien, nos arroja un status 200 OK con la descripción del usuario y con su nickname actualizado.
	
-	Update User Email: ruta API  (/user/updateEmail/<-----IdDeBusqeda----->), método (PUT), en lo que refiere a este método, el ID del usuario se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar el email del usuario, siempre y cuando este dentro del rango de validaciones.
-	En las rutas del mismo antes de llegar a controlador, pasa por invalidID (tenga 24 caracteres), validSearch (para validar usuario) y validEmail(validación que el email cumpla con los requisitos).
-	En caso de que este todo bien, nos arroja un status 200 OK con la descripción del usuario y con su nickname actualizado.
-	En caso de que este mal el nickname, lanza error con el mensaje “error al actualizar el nickname”, y en error especifica que es lo que esta mal del nickname


-	followUser: ruta API (/user/seguirUsuario/<-IdUsuario->/<- IdUsuarioASeguir->), método (POST), en lo que refiere a este método, se pasan dos ID como parametros de ruta, en donde el primero se trata del usuario y el ultimo, el usuario a seguir. En ambos casos se deben de validar de forma que existan usuarios registrados con esos ID y además que cumpla con los requerimientos previos. En la ruta pasa por un invalidId en donde se verifica que el usuario que quiere seguir, tenga el formato correcto. 
si todo esta bien nos devuelve un status 201 created, con un mensaje “ {nickname} siguió de forma exitosa a: el nickname del usuario seguido.
-	En caso de que el id del usuario a seguir no existe, arroja status 404, con el mensaje de error “Usuario no encontrado”
-	deleteUser: : ruta API (/user/deleteUser/<-IdUsuario-->), método (DELETE), en lo que refiere a este método, el ID del usuario se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por ultimo se valida si existe un usuario con ese ID, en caso de que existe, se elimina el mismo-
-	en la ruta pasa antes de llegar al controlador, pasa por invalidId (Id tenga 24 caracteres) y validSeach(que el id corresponda a un User).
-	En caso de que este todo bien status 200 OK, con un mensaje de “Usuario eliminado con éxito”
-	En caso de que el Id no corresponda a ningun usuario, status 400 Bad Reques  con el mensaje “Bar reques: no se encuentra el User buscado”
- **Post**: Publicación realizada por un usuario en una fecha determinada que contiene el texto que desea publicar. Puede tener **cero o más imágenes** asociadas. Debe contemplarse la posibilidad de **agregar o eliminar imágenes** posteriormente.


**Post**:
-	Create Post: ruta API (/post/createPost), método (POST), en lo que refiere a este método recibe un body con un objeto que contiene el contenido (mínimo de 10 caracteres, máximo de 200 y no puede ser vacío) y nickName (es obligatorio y no puede ser vacío).
En su ruta antes de llegar al controlador para por un Schema de validación en donde se corrobora que el contenido cumpla con lo requerido.
Si todo esta bien, lanza un status 201 created y nos devuelve un json con los campos: contenido, user, comment, image, tags, id, creación, actualización, etc.
En caso de que no se encuentre el Nickname, lanza status 404 Not Found, con el mensaje “Usuario no encontrado con ese nickname”
-	Get Post: ruta API (/post/getPost/<-----IdDeBusqeda----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del post se pasa como parámetro de ruta al final del endpoint. Incluye campos como: comentarios, imágenes y etiquetas.
-	En su ruta antes de llegar al controlador para por dos middleware genérico, InvalidID y validSearch, de validación en donde se corrobora que el contenido cumpla con lo requerido.
En caso de que este todo bien, lanza un status 200 OK y un json con los campos id, contenido, user, comment, image, tags, etc.
En caso de que no se encuentre el post lanza un status 400 Bad Reques, con el mensaje “no se encuentra el post buscado”

-	Get All Post: ruta API (/post/getAllPost), método (GET), en lo que refiera a este método permite obtener una lista de todos los post creados por los usuarios, incluye campos como: comentarios, imágenes y etiquetas.
Nos devuelve todos los post 
-	Get All User Post: ruta API (/post/getAllUserPost), método (GET), en lo que refiera a este método permite obtener una lista de todos los post creados por el usuario ID que se pasa como parámetro de ruta al final, incluye campos como: tags.
-	En su ruta antes de llegar al controlador para por dos middleware genérico, InvalidID y validSearch, de validación en donde se corrobora que el contenido cumpla con lo requerido.
En caso de que este todo bien, lanza un status 200 OK y un json con un array de todos los post realizados.
En caso de que no se encuentre el post lanza un status 400 Bad Reques, con el mensaje “no se encuentra el User buscado”

-	Update Post: ruta API  (/post/updatePost/<-----IdPost----->), método (PUT), en lo que refiere a este método, el ID del post se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar el post, siempre y cuando este dentro del rango de validaciones.
-	En su ruta antes de llegar al controlador para por dos middleware genérico, InvalidID y validSearch, de validación en donde se corrobora que el contenido cumpla con lo requerido.
En caso de que este todo bien, lanza un status 200 OK y un json con los datos del post actualizado.
En caso de que no se encuentre el post lanza un status 400 Bad Reques, con el mensaje “no se encuentra el Post buscado”

-	Delete Post: : ruta API (/post/deleteUser/<-IdPost-->), método (DELETE), en lo que refiere a este método, el ID del post se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por último se valida si existe un usuario con ese ID, en caso de que existe, se elimina el mismo-
-	En su ruta antes de llegar al controlador para por dos middleware genérico, InvalidID y validSearch, de validación en donde se corrobora que el contenido cumpla con lo requerido.
-	En caso de que este todo bien, lanza un status 200 OK y un mensaje
En caso de que no se encuentre el post lanza un status 400 Bad Request, con el mensaje “no se encuentra el Post buscado”


- **Post_Images**: Entidad que registra las imágenes asociadas a los posts. Para el MVP, solo se requiere almacenar la **URL de la imagen alojada**.

**Post_Images**:
-	Add images: ruta API(image/addImages/<- IdPost->), método (POST), en lo que refiere a este método se pasa el IdPost (debe existir el posteo) como parámetro de ruta al final del mismo y un body con un array que contiene las url(debe tener un formato url valido).
-	En su ruta antes de llegar al controlador para por dos middleware genérico, InvalidID y validSearch (valida que el post sea valido)y tiene un middleware de validationSchemma, en donde agarra todas las imágenes y verifica que esten en un array con una url (string).
-	En caso de que este todo bien, lanza un status 201 created y un mensaje “proceso de subida finalizado”, muestra tambien cuales imágenes fueron subidas de forma exitosa y cuales fallaron. Esto lo realiza porque en el controlador en la función de addAllImage, aprovecha el array y hace el upload de las imágenes de forma local. Por ese motivo esto que especifica en el mensaje, es mas que nada cuales imágenes tiene una url real y pueden realizar la descarga de la imagen. 
En caso de que no se encuentre el post lanza un status 400 Bad Request, con el mensaje “no se encuentra el Post buscado”

-	Get Image: ruta API (/image/getImage/<-----IdDeBusqeda----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del post se pasa como parámetro de ruta al final del endpoint. 
-	En su ruta antes de llegar al controlador para por dos middleware genérico, InvalidID y validSearch, de validación en donde se corrobora que el contenido cumpla con lo requerido.
En caso de que este todo bien, lanza un status 200 OK y un json con los campos id, y url.
En caso de que no se encuentre el post lanza un status 400 Bad Request, con el mensaje “no se encuentra el post_image buscado”


-	Get All Images: ruta API (/image/getAllImages), método (GET), en lo que refiera a este método permite obtener una lista de todas las images creados por los usuarios.
-	Nos devuelve un array con todas las imagenes

-	Get All Images to Post: ruta API (/image/getImages/<-IdPost->), método (GET), en lo que refiera a este método permite obtener una lista de todas las imágenes del post señalado por el IdPost que se pasa como parámetro de ruta al final.
-	En su ruta antes de llegar al controlador para por dos middleware genérico, InvalidID y validSearch, de validación en donde se corrobora que el contenido cumpla con lo requerido.
En caso de que este todo bien, lanza un status 200 OK y el posteo con todas las imágenes relacionadas.
En caso de que no se encuentre el post lanza un status 400 Bad Request, con el mensaje “no se encuentra el User buscado”

-	Update image: ruta API  (/image/updateImage/<-----IdImage----->), método (PUT), en lo que refiere a este método, el ID de la image se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar la url de image, siempre y cuando este dentro del rango de validaciones.
-	En su ruta antes de llegar al controlador para por dos middleware genérico, InvalidID y validSearch, de validación en donde se corrobora que el contenido cumpla con lo requerido.
En caso de que este todo bien, lanza un status 200 OK y la actualización de la url. 
En caso de que no se encuentre el post lanza un status 400 Bad Request, con el mensaje “no se encuentra el Post_image buscado”

-	Delete image: ruta API (/image/deleteImage/<-IdImage-->), método (DELETE), en lo que refiere a este método, el ID de la image se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por último se valida si existe una image con ese ID, en caso de que existe, se elimina el mismo-
-	En su ruta antes de llegar al controlador para por dos middleware genérico, InvalidID y validSearch, de validación en donde se corrobora que el contenido cumpla con lo requerido.
En caso de que este todo bien, lanza un status 200 OK y la actualización de la url. 
En caso de que no se encuentre el post lanza un status 400 Bad Request, con el mensaje “no se encuentra el Post_image buscado”





- **Comment**: Comentario que un usuario puede realizar sobre una publicación. Incluye la fecha en la que fue realizado y una indicación de si está **visible o no**, dependiendo de la configuración (X meses).

**Comment**:

-	Create comment: ruta API(comment/createComment/<- IdPost->), método (POST), en lo que refiere a este método se pasa el IdPost (debe existir el posteo) como parámetro de ruta al final del mismo y un body con un array que contiene el comentario(requerido, mínimo de 5 caracteres, máximo de 200 caracteres).
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch, tiene uno mas que es validationSchema(comentarioSchema) en donde valida el comentario. 
-	Si todo esta bien, lanza un status 201 created y nos devuelve un json con los campos: comentario,post, user, image, tags, id, creación, actualización, esVisible, etc.
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400 Not Found, con el mensaje “ Bad request: no se encuentra el Post buscado”

-	Get comment: ruta API (/comment/getComment/<-----IdComment----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del comment se pasa como parámetro de ruta al final del endpoint. Devuelve el comentario y el usuario que lo realizo.
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch, tiene uno mas que es validationSchema(comentarioSchema) en donde valida el comentario. 
-	Si todo esta bien, lanza un status 200 OK y nos devuelve un json con los campos: id, comentario, post, user, esVisible, etc. 
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400 Not Found, con el mensaje “ Bad request: no se encuentra el Comment buscado”


-	Get All Comments: ruta API (/comment/getAllcomment), método (GET), en lo que refiera a este método permite obtener una lista de todos los comments realizados.
Nos devuelve todos los comentarios.
-	Get All Post comment: ruta API (/comment/getAllComments/<-IdPost->), método (GET), en lo que refiera a este método permite obtener todos los comments del post señalado por el IdPost que se pasa como parámetro de ruta al final. Devuelve los comentarios y el usuario que lo realizo.
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch. 
-	Si todo esta bien, lanza un status 200 OK y nos devuelve un json un array con los comentarios.
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400 Not Found, con el mensaje “ Bad request: no se encuentra el Post buscado”

-	Update comment: ruta API  (/comment/updatecomment/<-----IdComment----->), método (PUT), en lo que refiere a este método, el ID del comment se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar el comentario, siempre y cuando este dentro del rango de validaciones.
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch y la validación del comentario. 
-	Si todo esta bien, lanza un status 200 OK y con el mensaje “Comentario modificado con éxito” y el comment.
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400 Not Found, con el mensaje “ Bad request: no se encuentra el Post buscado”

-	Delete image: ruta API (/comment/deleteComment/<-IdComment-->), método (DELETE), en lo que refiere a este método, el ID del comment se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por último se valida si existe una image con ese ID, en caso de que existe, se elimina el mismo-
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch y la validación del comentario. 
-	Si todo esta bien, lanza un status 200 OK y con el mensaje “Comentario borrado con éxito”.
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400 Not Found, con el mensaje “ Bad request: no se encuentra el Comment buscado”


- **Tag**: Etiqueta que puede ser asignada a un post. Una etiqueta puede estar asociada a **muchos posts**, y un post puede tener **múltiples etiquetas**.



**Tag**:

-	Post tag: ruta API(tag/createTag), método (POST), en lo que refiere a este método, se manda un body con un objeto que contiene la descripción (requerido, mínimo de 5 caracteres, máximo de 50 caracteres, no puede ser vacio).
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch, tiene uno mas que es validationSchema(comentarioSchema) en donde valida el comentario. 
-	Si todo esta bien, lanza un status 201 created y nos devuelve un json con los campos: descripción y id
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400Bad Request, con el mensaje ”Error al crear el tag”

-	Get tag: ruta API (/tag/getTag/<-----IdTag----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del tag se pasa como parámetro de ruta al final del endpoint.
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch, tiene uno mas que es validationSchema(comentarioSchema) en donde valida el comentario. 
-	Si todo esta bien, lanza un status 201 created y nos devuelve un json con los campos: comentario,post, user, image, tags, id, creación, actualización, esVisible, etc.
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400 Not Found, con el mensaje “ Bad request: no se encuentra el Tag buscado”


-	Get All tags: ruta API (/tag/getAllTags), método (GET), en lo que refiera a este método permite obtener una lista de todos los tags realizados.
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch, tiene uno mas que es validationSchema(comentarioSchema) en donde valida el comentario. 
-	Nos devuelve todos los tag creados.
-	

-	Add All Tags to Post: ruta API (tag/setTags/<-IdPost->), método (GET), en lo que refiera a este método permite agregar una lista de comments al post señalado por el IdPost que se pasa como parámetro de ruta al final.
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch. 
-	Si todo esta bien, lanza un status 201 created y nos devuelve un mensaje de tag agregados con éxito.
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400 Not Found, con el mensaje “ Bad request: no se encuentra el Post buscado”

-	Update Tag: ruta API (/tag/updateTag/<-----IdTag----->), método (PUT), en lo que refiere a este método, el ID del tag se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar la descripcion, siempre y cuando este dentro del rango de validaciones.

-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch, tiene uno mas que es validationSchema(comentarioSchema) en donde valida el comentario. 
-	Si todo esta bien, lanza un status 201 created y nos devuelve mensaje “Tag actualizado”.
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400 Not Found, con el mensaje “ Bad request: no se encuentra el Tag buscado”
-	

-	Delete image: ruta API (/tag/deleteTag/<-IdTag-->), método (DELETE), en lo que refiere a este método, el ID del tag se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por último se valida si existe una image con ese ID, en caso de que existe, se elimina el mismo-
-	En su ruta antes de llegar al controlador para por dos middleware genéricos de invalidId y valisSearch, tiene uno mas que es validationSchema(comentarioSchema) en donde valida el comentario. 
-	Si todo esta bien, lanza un status 201 created y nos devuelve mensaje “Tag Eliminado”.
-	En caso de que no se hayan cargado los datos correctamente, lanza status 400 Not Found, con el mensaje “ Bad request: no se encuentra el Tag buscado”





# Bonus

- Hace el upload de las imagenes que se asocian a un POST que lo guarden en una carpeta de imagenes dentro del servidor web.
Para poder lograr el upload de las imágenes asociadas a un post se utlizo en primera instancia File System que sirve para crear o escribir archivos, se utilizó para guardar las imágenes localmente. Despues requerimos patch, que se implementó para construir la ruta de los archivos y para finalizar usamos axios que para descargar la imagen desde una URL externa, usando una petición.
Esta implementación nos permite que las imágenes de un post sean descargadas, siempre y cuando sea una URL valida, eso quiere decir que debe existir realmente. En caso de que no se pueda descargar alguna o algunas imágenes, se agregaran a una lista de  fallidas. 


- ¿Cómo modelarías que un usuario pueda "seguir" a otros usuarios, y a su vez ser seguido por muchos? Followers
- Con la información de los post no varia muy seguido que estrategias podrian utilizar la que la información no sea constantemente consultada desde la base de datos.

Podríamos utilizar guardar esos datos en la cache, asi el tiempo de respuesta se reduce.






# Bonus

- Hace el upload de las imagenes que se asocian a un POST que lo guarden en una carpeta de imagenes dentro del servidor web.
Para poder lograr el upload de las imágenes asociadas a un post se utlizo en primera instancia File System que sirve para crear o escribir archivos, se utilizó para guardar las imágenes localmente. Despues requerimos patch, que se implementó para construir la ruta de los archivos y para finalizar usamos axios que para descargar la imagen desde una URL externa, usando una petición.
Esta implementación nos permite que las imágenes de un post sean descargadas, siempre y cuando sea una URL valida, eso quiere decir que debe existir realmente. En caso de que no se pueda descargar alguna o algunas imágenes, se agregaran a una lista de  fallidas. 


- ¿Cómo modelarías que un usuario pueda "seguir" a otros usuarios, y a su vez ser seguido por muchos? Followers
- Con la información de los post no varia muy seguido que estrategias podrian utilizar la que la información no sea constantemente consultada desde la base de datos.

Podríamos utilizar guardar esos datos en la cache, asi el tiempo de respuesta se reduce.


