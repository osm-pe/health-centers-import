const fs = require('fs');
const csv = require('async-csv');

async function main() {
    try {
        // Reading districts
        let healths = await csv.parse(fs.readFileSync('./data/health_center_data_cleaned.csv', 'utf8'), { columns: true });
        // console.log(healths);

        healths = healths.map(place => {

            const phone = place.phone;

            if (phone === "SN" || phone === "sn" || phone == "ACTUALIZAR" || phone == "NO TIENE" || phone == "NO CUENTA CON TELEFONO" || phone == "RADIO" || phone == "NO EXISTE" || phone == "RADIO 6.500 KHZ" || phone == "000-000000" || phone == "000-0000000") {
                delete place.phone;
            }

            // evaluar categoria

            const category = fixStr(place.category);

            if (category === "i-1" || category === "i-2") {
                delete place.classification;
                place.amenity = "doctors";
            }

            if (category === "i-3" || category === "i-4") {
                delete place.classification;
                place.amenity = "clinic";
            }

            if (category === "ii-1" || category === "ii-2" || category === "iii-1" || category === "iii-2" || category === "ii-e" || category === "iii-e") {
                delete place.classification;
                place.amenity = "hospital";
            }

            return place
        })

        fs.writeFile('results/results.json', JSON.stringify(healths), (err) => {
            console.log('saved!');
        });

    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

main();

function fixStr(str) {
    return str.replace(/ /g, '').toLowerCase();
}