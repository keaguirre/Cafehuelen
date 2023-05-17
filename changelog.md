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
- Comienzo de creacion del carrito
- [/] empezar a hacer las consultas con electronjs
- [x] Login con validaciones en el back.
- [x] Botón de para habilitar las categorias
- Se avanza en las consultas con electronjs al back
- [x] empezar a hacer las consultas con electronjs

## To do: 
- [ ] Implementar Amazon S3 para subir las imagenes y entregarlas como url.

### Detalles
- [-] Terminar de implementar todos los crud
- Los items que tienen relacion con otros item no se puedes eliminar(anidados).
- Detalles en componentes como responsive item.
- Detalle de modal editar de cada bloque(modificarlo a un sweerAlert)
- Ajustar mejor el sidebarComponent que tenga mejor responsividad
- Revision de carga en catálogo

