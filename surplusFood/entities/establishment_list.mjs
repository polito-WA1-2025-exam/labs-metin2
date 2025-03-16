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

}