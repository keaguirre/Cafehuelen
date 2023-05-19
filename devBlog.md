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

# Ideas
- Posible drop de detalle preparacion e ingredientes, priorizar bloque de compras con preparaciones y evaluar la posibilidad de seguir con la automatizacion
    del inventario.

# To do:
- Terminar el crud con electronjs
- Benjamin, crear el crud con la api de la compra
- Crear vista tabla de preparaciones deshabilitadas en el back
- terminar la paginacion
- iniciar la implementacion de amazon s3
- [ ] Revisar drf los tokens y las sesiones para el front

-----------------
- [ ] Crear bloques de compra y local.
- [ ] Paleta de colores.
- [ ] Decorar home admin.
