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

### Detalles
- [-] Terminar de implementar todos los crud
- Los items que tienen relacion con otros item no se puedes eliminar(anidados).
- Detalles en componentes como responsive item.
- Detalle de modal editar de cada bloque(modificarlo a un sweerAlert)
- Ajustar mejor el sidebarComponent que tenga mejor responsividad
- Revision de carga en catálogo

# To do:
- [ ] Pagination o Scrollbar para las tablas.
- [ ] Última evaluacion de como implementar los agregar en las tablas(sidebar-dropdown)
- [ ] Actualizar la tabla al momento de agregar, editar o eliminar por separado sin tener que recargar la pagina completa.
- [ ] Login
- [ ] Paleta de colores.
- [ ] Decorar home admin. 