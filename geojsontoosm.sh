mkdir -p osm_data/
for file in data_district/*;
do
    geojsonFile="$(find "${file}" -name '*.geojson' | xargs -n 1 basename)"
    fileName="${geojsonFile%.geojson}"
    osmFile="${fileName}".osm
    echo " "$geojsonFile" => "$osmFile" "
    geojsontoosm data_district/"$geojsonFile" > osm_data/"$osmFile"
done