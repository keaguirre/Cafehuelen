# Changelog
- ### Aquí irá el registro de cambios, commits, todo's con fecha y descripción.
<br>

# 14/04/23 Correccion de rutas
- Modulos creados, rutas creadas.
- Corrección general.

# 18/04/23 Login funcional - Falta estilos
- Creado environments.
- Creado componente Admin-Home.
- Creadas nuevas rutas, login es: admin/login y home es admin/ .
- Creado el servicio para hacer consultas a nuestra api en local.
- component.ts de admin-login hace consultas a la api con los campos del html.
- **Creado el 404, falta dejarlo optimo**.
- **Arregladas la conexion entre módulos y routing**.

# 19/04/23 Agregados diagramas de bd, libreria animatecss y rutas admin
- https://github.com/bentzibentz/tailwindcss-animate.css .
- Creados los componentes y rutas para los crud de Ingredientes, ingre-prep, preparaciones-categorias.
- [x] Crear los componentes por crud de la pagina de admin.

# 21/04/23 Primer crud creado, Ingredientes
- Creado primer crud de ingredientes
- Arreglado el backend con las peticiones put

# 02/05/23 Bloque productos Gran avance
- todos los crud creados y funcionando pero con detalles
- [x] Tabla de listados para items

# 08/05/23 Presentacion de avance
- [x] Ppt de avance
- [x] Actualizacion de los diagramas de db
- [x] Definicion de que pasara con preparaciones las cuales se les 'elimine' la categoria
- [x] Modificar los modal update por dropdown
- [x] Última evaluacion de como implementar los agregar en las tablas(sidebar-dropdown) - SERÁ MODAL

# 12/05/23 Avances con vista a cierre semanal (parcial) de bloque productos
- [x] Ppt de avance
- [x] Actualizacion de los diagramas de db
- [x] Definicion de que pasara con preparaciones las cuales se les 'elimine' la categoria
- [x] Modificar los modal update por dropdown
- [x] Última evaluacion de como implementar los agregar en las tablas(sidebar-dropdown) - SERÁ MODAL
- [x] Actualizar la tabla al momento de agregar, editar o eliminar por separado sin tener que recargar la pagina completa
- [x] Actualizar las tablas al hacer una operacion
- [x] Arreglado product service que eliminaba en vez de hacer el path
- [x] Crear tabla para categorias deshabilitadas
- [x] Cuando se haga una actualizacion, traer los select de las cosas relacionadas, para poder mostar las opciones y seleccionar el id en base al nombre
- [/] Pagination o Scrollbar para las tablas.      
- [/] modificacion a la tabla de categorias desactivadas (falta que en vez de eliminar haga patch true a la categoria, insertar el estado true en la soli en el ts)
- [x] minificar los inputs 
- [x] capitalizar las tablas

# 17/05/23
- Instalado el modulo Cryto-js y definido con @types/crypto-js.
- Implementado el cifrado de contraseña con el login. El admin al momento de registrar a un supervisor, lo hará asignandole una contraseña ya hasheada, desde el front
    una vez el usuario usa el login, el sistema hashea la contraseña que el usuario intenta y si el hash que corresponde a la pass, coincide con el hash almacenado
    como pass en el back, esta persona se logea.
- [x] Currency pipe para mostrar precios en clp
- [/] Implementar la pagination
- Login con validaciones en el front.
- [x] ¡POPE! login-admin.component.ts MIRAR @beta en onSearch. PASAR LA VALIDACION AL BACK
- [x] Comienza el desarrollo del webview del totem con las consultas al backend.
- Se completa las primeras paginaciones, falta terminarlas
- Comienzo de creacion del carrito.
- [/] empezar a hacer las consultas con electronjs
- [x] Login con validaciones en el back.
- [x] Botón de para habilitar las categorias
- Se avanza en las consultas con electronjs al back
- [x] empezar a hacer las consultas con electronjs

# 19/05/23
- Terminada la tabla de preparaciones deshabilitadas, se pueden reactivar de manera funcional.
- Se crea servicio compra y se generan sus metodos, get, post y patch(para tabla compra).
- Nueva libreria para paginaciones **ngx-pagination**
- [x] Implementar la pagination
- Responsibilidad de las tablas
- Paginación

# 22/05/23
- Comienzo de implementacion de imgBB dentro de la tabla de ingredientes y preparaciones.
- Investigacion de insertar en un input la url para subirla al backend.

# 23/05/23
- Completada la implementacion de imgbb 
- [] Integrarla al proyecto main.

# 24/05/23
- [/] Comienza el desarrollo de la nueva pagina de preparacion e detalle preparacion.

# 25/05/23
- Avance de la nueva pagina de preparaciones.
- Se crean los opbjetos dentro del session Storage.
- [/] Solucionar problema de sobreescritura de objetos.

# 26/05/23
- Avance de la nueva pagina de preparaciones.
- [x] Solucionado problema de sobreescritura de objetos.
- [/] Solucionar error del array al usar el metodo .parse *is not a funtion*

# 29/05/23
- Completada la pagina agregar preparaciones y detalle preparaciones. 
- [x] Solucionado error del array al usar el metodo .parse *is not a funtion*
- Se utiliza el modulo uidv4 para entregar el id del detalle preparacion.

# 30/05/23
- [x] Integracion de imgbb y la pagina detalle preparaciaon al proyecto main.
- [x] Refactor a la tabla de ingrediente.
- [] Actualizacion de la rutas.
- [x] Eliminar los setValue del estado en los metodos onCreate (considerar que no deben eliminarse en los metodos con funciones pull).

# 31/05/23
- [x] Completada creacion de  Formulario de agregar stock
- Unificacion de las vistas de admin y catalogo en el mismo proyecto.

# 02/06/23
- Creacion del apiwatcher en el front(falta optimizar el observable y que solo liste como maximo 3 compras y las renueve)

# 05/06/23
- Api watcher terminado totalmente
- Comienzan las graficas y las analiticas para el home admin
- Comienza la investigación de mercadopago
- [x] seccionar por componente tablas del admin home

# 06/06/23
- [x] Agregar el cerrar session. solo falta descomentarlo en routing para implementarlo
- Se muestran los primeros graficos en el adminHome
- [x] Corregir agregar preparaciones

# 07/06/23
- Hay un error de django que muestra dias que no existen, pero si se hace la query directa esta esta bien en la base de datos
    la vista en question en el backend es: def total_compra_diaria_semanal.
- Falta implementar mas detalle de graficas, pero la base esta

# 10/06/23
- diseño de la vista admin 

# 12/06/23
- Ruta de print, se comienza a configurar print desde angular
- Creacion de voucher de pago
- Correcciones del catalogo


# To do:
- [ ] Integracion de MP.
- [ ] Catalogo biblioteca de audios investigar ['Howler.js', 'SoundJS', 'Web Audio API'].
- [ ] SheperdJS para el tutorial.
- [ ] Integrar audio y tutorial juntos en la seccion de enseñame a comprar del catalogo.
- [ ] Cambiar el fondo de las categorias en el catalogo.
- [ ] Nuevas cartas con ajuste de imagenes, por si las imagenes son mas chicas, se deberán estirar en base a su marco.
- [ ] Adaptar mejor el catalogo a las distintas resoluciones.