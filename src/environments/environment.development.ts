export const environment = {
    production: false,
/**
    *   Para más información, consulta la pagina general de la api con todos sus enlaces
    *   {@link http://127.0.0.1:8000/api}.
*/
    urlApiLogin: 'http://127.0.0.1:8000/api/v1/supervisores_login/',
    urlApiIngredientes: 'http://127.0.0.1:8000/api/v1/ingredientes/',
    urlApiPreparaciones: 'http://127.0.0.1:8000/api/v1/preparaciones/',
    urlApiDetallePrep: 'http://127.0.0.1:8000/api/v1/detalles_prep/',
    urlApiCategorias: 'http://127.0.0.1:8000/api/v1/categorias/',
    urlApiCategoriasFindId: 'http://127.0.0.1:8000/api/v1/categorias/find_id/',
    urlApiCategoriasDesh: 'http://127.0.0.1:8000/api/v1/categorias/deshabilitadas',
    urlApiPreparacionesDesh: 'http://127.0.0.1:8000/api/v1/preparaciones/deshabilitadas',
    urlApiComprasRecientes: 'http://127.0.0.1:8000/api/v1/compras/compras_recientes_paginadas',
    //analiticas
    urlComprasHoy:'http://127.0.0.1:8000/api/v1/analiticas/cantidad_compras/cantidad_compras_hoy/',
    urlApiComprasDiaSemana:' http://127.0.0.1:8000/api/v1/analiticas/cantidad_compras/compras_dia_semana/',
    urlApiCompraMesActual:'http://127.0.0.1:8000/api/v1/analiticas/cantidad_compras/total_compras_mes/',
    urlApiTotalComprasMesSemana:'http://127.0.0.1:8000/api/v1/analiticas/cantidad_compras/total_compras_mes_x_semana/',
    urlApiTotalComprasPorMesAnual:'http://127.0.0.1:8000/api/v1/analiticas/cantidad_compras/compras_por_mes_anual/',
    urlApiTotalCompraSemanalAnual:'http://127.0.0.1:8000/api/v1/analiticas/cantidad_compras/total_compras_semana_anual/',
    urlApiTotalComprasMesAnteriorSemana:'http://127.0.0.1:8000/api/v1/analiticas/cantidad_compras/total_compras_mes_anterior_x_semana/',
    urlApiTotalCompraDiariaSemanal:'http://127.0.0.1:8000/api/v1/analiticas/total_compras/total_compra_diaria_semanal/',
    //Bloque compras----------------------------------------
    urlCompras: 'http://127.0.0.1:8000/api/v1/compras/',
    urlItemCompra:'http://127.0.0.1:8000/api/v1/items_compra/'
        
    // urlApiLogin: 'https://cafehuelenbackend.onrender.com/api/superv_local/',
    // urlApiIngredientes: 'https://cafehuelenbackend.onrender.com/api/ingrediente/',
    // urlApiPreparaciones: 'https://cafehuelenbackend.onrender.com/api/preparacion/',
    // urlApiIngredPrep: 'https://cafehuelenbackend.onrender.com/api/ingrediente_prep/',
    // urlApiCategorias: 'https://cafehuelenbackend.onrender.com/api/categoria/',
};
