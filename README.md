

EndPoints:
La ruta principal de acceso a la API es:
http://localhost:3000
Desde esta dirección se accede a todos los endpoints.
**User**:
-	User Post: ruta API (/user/createUser), método (POST), en lo que refiere a este método recibe un body con un objeto que contiene el nickName (mínimo de 8 caracteres, máximo de 12 y no puede ser vacío )  y email (debe contener formato de email y no puede ser vacío).

-	Get User: ruta API (/user/getUser/<-----IdDeBusqeda----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del usuario se pasa como parámetro de ruta al final del endpoint.


-	Get All Users: ruta API (/user/getAllUsers), método (GET), en lo que refiera a este método permite obtener una lista de todos los usuarios registrados, incluye campos como: nickname, email, followers, following e id.

-	Update User NickName: ruta API  (/user/updateNickName/<-----IdDeBusqeda----->), método (PUT), en lo que refiere a este método, el ID del usuario se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar el nickname del usuario, siempre y cuando este dentro del rango de validaciones.

-	Update User Email: ruta API  (/user/updateEmail/<-----IdDeBusqeda----->), método (PUT), en lo que refiere a este método, el ID del usuario se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar el email del usuario, siempre y cuando este dentro del rango de validaciones.
	


-	followUser: ruta API (/user/seguirUsuario/<-IdUsuario->/<- IdUsuarioASeguir->), método (POST), en lo que refiere a este método, se pasan dos ID como parametros de ruta, en donde el primero se trata del usuario y el ultimo, el usuario a seguir. En ambos casos se deben de validar de forma que existan usuarios registrados con esos ID y además que cumpla con los requerimientos previos. 

-	deleteUser: : ruta API (/user/deleteUser/<-IdUsuario-->), método (DELETE), en lo que refiere a este método, el ID del usuario se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por ultimo se valida si existe un usuario con ese ID, en caso de que existe, se elimina el mismo-



**Post**:
-	Create Post: ruta API (/post/createPost), método (POST), en lo que refiere a este método recibe un body con un objeto que contiene el contenido (mínimo de 10 caracteres, máximo de 200 y no puede ser vacío) y nickName (es obligatorio y no puede ser vacío).

-	Get Post: ruta API (/post/getPost/<-----IdDeBusqeda----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del post se pasa como parámetro de ruta al final del endpoint. Incluye campos como: comentarios, imágenes y etiquetas.


-	Get All Post: ruta API (/post/getAllPost), método (GET), en lo que refiera a este método permite obtener una lista de todos los post creados por los usuarios, incluye campos como: comentarios, imágenes y etiquetas.

-	Get All User Post: ruta API (/post/getAllUserPost), método (GET), en lo que refiera a este método permite obtener una lista de todos los post creados por el usuario ID que se pasa como parámetro de ruta al final, incluye campos como: tags.

-	Update Post: ruta API  (/post/updatePost/<-----IdPost----->), método (PUT), en lo que refiere a este método, el ID del post se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar el post, siempre y cuando este dentro del rango de validaciones.

-	Delete Post: : ruta API (/post/deleteUser/<-IdPost-->), método (DELETE), en lo que refiere a este método, el ID del post se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por último se valida si existe un usuario con ese ID, en caso de que existe, se elimina el mismo-



**Post_Images**:
-	Add images: ruta API(image/addImages/<- IdPost->), método (POST), en lo que refiere a este método se pasa el IdPost (debe existir el posteo) como parámetro de ruta al final del mismo y un body con un array que contiene las url(debe tener un formato url valido).

-	Get Image: ruta API (/image/getImage/<-----IdDeBusqeda----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del post se pasa como parámetro de ruta al final del endpoint. 


-	Get All Images: ruta API (/image/getAllImages), método (GET), en lo que refiera a este método permite obtener una lista de todas las images creados por los usuarios.

-	Get All Post Images: ruta API (/image/getImages/<-IdPost->), método (GET), en lo que refiera a este método permite obtener una lista de todas las imágenes del post señalado por el IdPost que se pasa como parámetro de ruta al final.

-	Update image: ruta API  (/image/updateImage/<-----IdImage----->), método (PUT), en lo que refiere a este método, el ID de la image se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar la url de image, siempre y cuando este dentro del rango de validaciones.

-	Delete image: ruta API (/image/deleteImage/<-IdImage-->), método (DELETE), en lo que refiere a este método, el ID de la image se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por último se valida si existe una image con ese ID, en caso de que existe, se elimina el mismo-







**Comment**:

-	Create comment: ruta API(comment/createComment/<- IdPost->), método (POST), en lo que refiere a este método se pasa el IdPost (debe existir el posteo) como parámetro de ruta al final del mismo y un body con un array que contiene el comentario(requerido, mínimo de 5 caracteres, máximo de 200 caracteres).

-	Get comment: ruta API (/comment/getComment/<-----IdComment----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del comment se pasa como parámetro de ruta al final del endpoint. Devuelve el comentario y el usuario que lo realizo.


-	Get All Comments: ruta API (/comment/getAllcomment), método (GET), en lo que refiera a este método permite obtener una lista de todos los comments realizados.

-	Get All Post comment: ruta API (/comment/getAllComments/<-IdPost->), método (GET), en lo que refiera a este método permite obtener todos los comments del post señalado por el IdPost que se pasa como parámetro de ruta al final. Devuelve los comentarios y el usuario que lo realizo.

-	Update comment: ruta API  (/comment/updatecomment/<-----IdComment----->), método (PUT), en lo que refiere a este método, el ID del comment se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar el comentario, siempre y cuando este dentro del rango de validaciones.

-	Delete image: ruta API (/comment/deleteComment/<-IdComment-->), método (DELETE), en lo que refiere a este método, el ID del comment se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por último se valida si existe una image con ese ID, en caso de que existe, se elimina el mismo-




**Tag**:

-	Post tag: ruta API(tag/createTag), método (POST), en lo que refiere a este método, se manda un body con un objeto que contiene la descripción (requerido, mínimo de 5 caracteres, máximo de 50 caracteres, no puede ser vacio).

-	Get tag: ruta API (/tag/getTag/<-----IdTag----->), método (GET), en lo que refiere a este método el ID ( No puede contener menos de 24 caracteres, no puede ser nulo, ni negativo) del tag se pasa como parámetro de ruta al final del endpoint.


-	Get All tags: ruta API (/tag/getAllTags), método (GET), en lo que refiera a este método permite obtener una lista de todos los tags realizados.

-	Add All Tags to Post: ruta API (tag/setTags/<-IdPost->), método (GET), en lo que refiera a este método permite agregar una lista de comments al post señalado por el IdPost que se pasa como parámetro de ruta al final.

-	Update Tag: ruta API (/tag/updateTag/<-----IdTag----->), método (PUT), en lo que refiere a este método, el ID del tag se pasa como parámetro de ruta al final del endpoint, este hace una consulta y si el mismo existe. Permite modificar la descripcion, siempre y cuando este dentro del rango de validaciones.

-	Delete image: ruta API (/tag/deleteTag/<-IdTag-->), método (DELETE), en lo que refiere a este método, el ID del tag se pasa como parámetro de ruta al final del endpoint, se realizan las validaciones necesarias, y por último se valida si existe una image con ese ID, en caso de que existe, se elimina el mismo-




