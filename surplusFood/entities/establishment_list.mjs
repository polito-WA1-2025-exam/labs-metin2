import sqlite from 'sqlite3'

import Establishment from "./establishment.mjs";

export default function Establishment_list() {
    this.establishment_list = [];

    //Method to Add new objects to the collection
    this.addEstablishment = (establishment) => this.establishment_list.push(establishment);

    //Method to Retrieve objects based on specific criteria
    this.getEstablishmentByCuisine = (type_cuisine) => {
        let filtered_establishments = this.establishment_list.filter((e) => e.type_cuisine==type_cuisine?true:false);
        return filtered_establishments;
    };

    //Method to Manipulate the collection (e.g. sorting on specific properties, changing properties of multiple objects, test if the collection respects some constraints)
    //To Be Implemented

    //Method to Delete a specific object from the collection
    this.deleteEstablishment = (id) => {
        const index = this.establishment_list.findIndex(e => e.id === id);
        this.establishment_list.splice(index, 1);
    }

    //Method to retrieve all establishments from DB
    this.getAllEstablishments = () => new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sql = `SELECT * FROM Establishments`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (!rows) {
                    reject(err);
                } else {    
                    const result = rows.map((item) => new Establishment(item.id, item.name, item.address, item.phone_number, item.type_cuisine));
                    resolve(result);
                }

            }
        });

        db.close();

    })
    

}