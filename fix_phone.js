const fs = require('fs');
const csv = require('async-csv');

const configPhones = require("./config/config-phone.json")

let new_phone = '';

async function main() {
    try {
        let healths = await csv.parse(fs.readFileSync('./results/results.csv', 'utf8'), { columns: true });
        //console.log(healths);
        for (let i = 0; i < healths.length; i++) {

            if (healths[i].phone !== null) {

                if (healths[i].phone.length === 6 || (healths[i].phone.length === 7 && healths[i].phone.charAt(0) !== "#" && healths[i].phone.charAt(0) !== "*")) {
                    const configPhone = configPhones.find(c => fixStr(c.name) === fixStr(healths[i].departamento));
                    if (configPhone) {
                        new_phone = "+51 " + configPhone.codigo + " " + healths[i].phone;
                        healths[i].phone_new = new_phone;
                    }
                    // console.log("------>6--" + healths[i].phone);
                    // console.log("------6--" + new_phone);
                }

                if (healths[i].phone.length === 9) {

                    new_phone = "+51 " + healths[i].phone;
                    healths[i].phone_new = new_phone;
                    // console.log("------>9--" + healths[i].phone);
                    // console.log("------9--" + new_phone);
                }

                if (healths[i].phone.length === 8) {
                    const configPhone = configPhones.find(c => fixStr(c.name) === fixStr(healths[i].departamento));
                    if (configPhone && (configPhone.codigo == healths[i].phone.slice(0, 2))) {
                        const phone_code = healths[i].phone.slice(0, 2);
                        new_phone = healths[i].phone.replace(phone_code, "+51 " + configPhone.codigo + " ");
                        healths[i].phone_new = new_phone;
                    }
                    // console.log("------>6--" + healths[i].phone);
                    // console.log("------6--" + new_phone);
                }

                if (healths[i].phone.charAt(3) === "-") {
                    const configPhone = configPhones.find(c => fixStr(c.name) === fixStr(healths[i].departamento));
                    if (configPhone) {
                        const phone_code = healths[i].phone.slice(0, 4);
                        new_phone = healths[i].phone.replace(phone_code, "+51 " + configPhone.codigo + " ");
                        healths[i].phone_new = new_phone;

                    }

                }

                if (healths[i].phone_new === undefined) {
                    new_phone = healths[i].phone;
                    healths[i].phone_new = new_phone;
                }

            }
            delete healths[i].codigo;
            delete healths[i].type;
            delete healths[i].provincia;
            delete healths[i].ubigeo;
            delete healths[i].codigo_DISA;
            delete healths[i].opening_hours;
            
        }

        fs.writeFile('results/results_final.json', JSON.stringify(healths), (err) => {
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
