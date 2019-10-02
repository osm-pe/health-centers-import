mkdir -p data_district/
shpfile=$1

ogr2ogr -f GeoJSON data_district/distric.geojson $shpfile

jq ".features[] | .properties.distrito" data_district/distric.geojson | sort | uniq |  tr -d \" > data_district/distric-files.txt
while IFS= read -r line; do
    docker run --rm -v "$PWD":/mnt/data developmentseed/geokit:latest geokit filterbyprop \
    data_district/distric.geojson --prop distrito="${line}" > data_district/"${line}".geojson
    num=$(grep -o -i OBJECTID_1 data_district/"${line}".geojson | wc -l)
    echo $num,"${line}"
done < data_district/distric-files.txt