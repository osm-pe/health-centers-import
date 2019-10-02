for file in data_district/*;
do
    geojsonFile="$(find "${file}" -name '*.geojson' | xargs -n 1 basename)"
    
    echo $geojsonFile

    docker run --rm -v "$PWD":/mnt/data developmentseed/geokit:latest geokit deletenulls \
    data_district/"$geojsonFile" > data_district/new_"$geojsonFile"

    mv data_district/new_"$geojsonFile" data_district/"$geojsonFile"
done
