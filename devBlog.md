# 03/05/23 Trabajo del dia
- Actualizados los metodos, rutas y servicios en funcion de los cambios nuevos en la base de datos en el bloque de productos, falta con esto mismo edit y elminar de DetallePreparacion
- Falta cambiar el eliminar por el false en los estados de la tabla

# 04/05/23 Trabajo del dia
- [x] Terminar crud del refactor de Detalle_prep
- [x] Investigar que mejor para los formularios final, para crear y edit - modal
- [x] Cambiar el boton eliminar por un cambio de estado

# 08/05/23 Trabajo del dia
- [x] Investigar que mejor para los formularios final, para crear y edit - modal
- [x] Cambiar el boton eliminar por un cambio de estado
- [x] Terminadas las nuevas vistas para el front desde el back

# 09/05/23 Trabajo del dia
- [x] Ppt de avance
- [x] Actualizacion de los diagramas de db
- [x] Definicion de que pasara con preparaciones las cuales se les 'elimine' la categoria
- [x] Modificar los modal update por dropdown
- [x] Última evaluacion de como implementar los agregar en las tablas(sidebar-dropdown) - SERÁ MODAL

# 10/05/23
- [x] Actualizar la tabla al momento de agregar, editar o eliminar por separado sin tener que recargar la pagina completa
- [x] Actualizar las tablas al hacer una operacion
- [x] Arreglado product service que eliminaba en vez de hacer el path

# 11/05/23
- [x] Crear tabla para categorias deshabilitadas
- [x] Cuando se haga una actualizacion, traer los select de las cosas relacionadas,
      para poder mostar las opciones y seleccionar el id en base al nombre
- [/] Pagination o Scrollbar para las tablas.      

# 12/05/23
- [/] modificacion a la tabla de categorias desactivadas (falta que en vez de eliminar haga patch true a la categoria, insertar el estado true en la soli en el ts)
- [x] minificar los inputs 
- [x] capitalizar las tablas

# 14/05/23
- Instalado el modulo Cryto-js y definido con @types/crypto-js.
- Implementado el cifrado de contraseña con el login. El admin al momento de registrar a un supervisor, lo hará asignandole una contraseña ya hasheada, desde el front
    una vez el usuario usa el login, el sistema hashea la contraseña que el usuario intenta y si el hash que corresponde a la pass, coincide con el hash almacenado
    como pass en el back, esta persona se logea.

# 14/05/23
### Agustin to do
- [x] Currency pipe para mostrar precios en clp
- [/] Implementar la pagination
- [ ] Implementar Amazon S3 para subir las imagenes y entregarlas como url.
- Login con validaciones en el front.

# 15/05/23
- [x] ¡POPE! login-admin.component.ts MIRAR @beta en onSearch. PASAR LA VALIDACION AL BACK
- [x] Comienza el desarrollo del webview del totem con las consultas al backend.
- Se completa las primeras paginaciones, falta terminarlas
- Comienzo de creacion del carrito
- [/] empezar a hacer las consultas con electronjs
- [x] Login con validaciones en el back.

# 16/05/23
- [x] Botón de para habilitar las categorias
- Se avanza en las consultas con electronjs al back
- [x] empezar a hacer las consultas con electronjs

# 17/05/23
- Terminada la tabla de preparaciones deshabilitadas, se pueden reactivar de manera funcional.
- Se crea servicio compra y se generan sus metodos, get, post y patch(para tabla compra).

# 18/05/23
- Nueva libreria para paginaciones **ngx-pagination**
- [x] Implementar la pagination

# 19/05/23
- Responsibilidad de las tablas
- Paginación

# 22/05/23
- Comienzo de implementacion de imgBB dentro de la tabla de ingredientes y preparaciones.
- Investigacion de insertar en un input la url para subirla al backend

# 23/05/23
- Completada la implementacion de imgbb 

# 24/05/23
- Comienza el desarrollo de la nueva pagina de preparacion e detalle preparacion
- Se necesita que al crear la preparacion se deba crear el detalle de dicha preparacion, segun esto se necesti que el detalle preparacion se cree dentro del session storage para luego ser enviado al backend.

# 25/05/23
- Avance de la nueva pagina de preparaciones.
- Se crean los opbjetos dentro del session Storage.
- [/] Solucionar problema de sobreescritura de objetos.

# 26/05/23
- Avance de la nueva pagina de preparaciones.
- Se crean los opbjetos dentro del session Storage.
- [x] Solucionado problema de sobreescritura de objetos.
- [/] Solucionar error del array al usar el metodo .parse *is not a funtion*

# 29/05/23
- Completada la pagina agregar preparaciones y detalle preparaciones. 
- [x] Solucionado error del array al usar el metodo .parse *is not a funtion*
- Se utiliza el modulo uidv4 para entregar el id del detalle preparacion

# 30/05/23
- Integracion de imgbb y la pagina detalle preparaciaon al proyecto main.
- Refactor a la tabla de ingrediente
- Actulaizcion de la rutas.
- Eliminar los setValue del estado en los metodos onCreate (considerar que no deben eliminarse en los metodos con funciones pull).

# 31/03/23
- [x] Completada creacion de  Formulario de agregar stock
- Unificacion de las vistas de admin y catalogo en el mismo proyecto.
- [x] tabla de compras
# ideas
- integrar un paso antes de subir la imagen al imb bb

# 02/06/23
- [x] Decorar home admin.
- [x] Paleta de colores.
- Arreglar estructuras en catalogo
- Centrar muchas cosas en catalogo
- Finalizado producto destacado
- Titulo categorias en el catalogo

# 05/06/23
- Api watcher terminado totalmente
- Comienzan las graficas y las analiticas para el home admin
- Comienza la investigación de mercadopago
- [x] seccionar por componente tablas del admin home

# To do:
- [ ] CORREGIR AGREGAR INGREDIENTES, PAGINAR LA CREACION DEL INGREDIENTE CON EL SIGUIENTE PASO DE DETALLES PREPARACION!!!!
- [ ] Integracion de MP.
- [ ] Agregar el cerrar session.
- [ ] Catalogo biblioteca de audios investigar ['Howler.js', 'SoundJS', 'Web Audio API'].
- [ ] SheperdJS para el tutorial.
- [ ] Integrar audio y tutorial juntos en la seccion de enseñame a comprar del catalogo.
- [ ] Cambiar el fondo de las categorias en el catalogo.
- [ ] Nuevas cartas con ajuste de imagenes, por si las imagenes son mas chicas, se deberán estirar en base a su marco.
- [ ] Adaptar mejor el catalogo a las distintas resoluciones.
