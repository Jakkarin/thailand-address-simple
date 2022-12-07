import axios from "axios";
import { Address, Config, Database } from "./types";

const DEFAULT_CONFIG = {
    database: "https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/database/db.json",
};

function reStructure(database: Database) {
    var data: any[] = [];
    var words: string[] = [];
    var lookup: string[] = [];
    var expanded: any[] = [];

    if (database.lookup && database.words) {
        data = database.data;
        words = database.words.split("|");
        lookup = database.lookup.split("|");
    }

    var translate = function (text: string | number) {
        function replace(m: string) {
            var ch = m.charCodeAt(0);
            return words[ch < 97 ? ch - 65 : 26 + ch - 97];
        }

        if (typeof text === "number") {
            text = lookup[text];
        }

        return text.replace(/[A-Z]/gi, replace);
    };

    // decompacted database in hierarchical form of:
    // [["province",[["amphur",[["district",["zip"...]]...]]...]]...]
    data.map(function (provinces: any) {
        // 2 = geographic database
        const type = provinces.length === 3 ? 2 : 1;

        provinces[type].map(function (amphoes: any) {
            amphoes[type].map(function (districts: any) {
                districts[type] = districts[type] instanceof Array ? districts[type] : [districts[type]];
                districts[type].map(function (zipcode: any) {
                    const entry: any = {
                        district: translate(districts[0]),
                        amphoe: translate(amphoes[0]),
                        province: translate(provinces[0]),
                        zipcode: zipcode.toString(),
                    };

                    if (type === 2) {
                        entry.district_code = districts[1] || false;
                        entry.amphoe_code = amphoes[1] || false;
                        entry.province_code = provinces[1] || false;
                    }

                    expanded.push(entry);
                });
            });
        });
    });

    return expanded;
}

export default class ThailandAddressSimple {
    config: Config;
    address!: Address[];

    constructor(config?: Config) {
        this.config = config ?? DEFAULT_CONFIG;
    }

    init = async () => {
        this.address = reStructure((await axios.get<Database>(this.config.database)).data);
    };

    search = (input: string) => {
        const possibles = input.split(" ");

        const stack = possibles
            .filter((v, i) => possibles.indexOf(v) === i)
            .map(
                (txt) => (v: Address) =>
                    v.zipcode.includes(txt) || v.amphoe.includes(txt) || v.district.includes(txt) || v.province.includes(txt)
            );

        return this.address.filter((v) => stack.every((cb) => cb(v)));
    };

    searchByDistrict = (input: string) => {
        return this.address.filter((v) => v.district.includes(input));
    };

    searchByAmphoe = (input: string) => {
        return this.address.filter((v) => v.amphoe.includes(input));
    };

    searchByProvince = (input: string) => {
        return this.address.filter((v) => v.province.includes(input));
    };

    searchByZipCode = (input: string) => {
        return this.address.filter((v) => v.zipcode.includes(input));
    };
}
