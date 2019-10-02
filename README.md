# Importación de centros de salud

### Datos originales

- Los datos iniciales se encuentran en el folder **data**.

    - health_centers_original_data.csv
    - health_center_data_cleaned.csv

### Procesamiento de datos

- Eliminar teléfonos incorrectos y agregar la etiqueta de amenity según la categoría.

`node index.js`

- Modificar los números telefonicos al formato ITU y agregar el código telefónico según el departamento.

`node fix_phone.js`

- Convertir el archivo "results_final.csv" en la carpeta "results" a formato geojson "results_final.geojson". 

- Filtrar los puntos por cada distrito y generar un archivo con el nombre del distrito.

`bash filter_per_district.sh results/results_final.geojson`

- Eliminar las etiquetas que tengan como valores null.

`bash deletenulls.sh`

- Convertir los archivos de formato geojson a formato osm.

`bash geojsontoosm.sh`

### Datos finales para importación

Los datos a importar se encuentran en la carpeta de osm_data.

### Flujo de trabajo

Las herramientas y el flujo de trabajo se encuentran detallados en https://wiki.openstreetmap.org/wiki/Health_centers_import_in_Peru