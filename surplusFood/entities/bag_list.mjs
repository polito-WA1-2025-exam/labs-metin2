export default function Bag_list() {
    this.bag_list = [];

    //Method to Add new objects to the collection
    this.addBag = (bag) => this.bag_list.push(bag);

    //Method to Retrieve objects based on specific criteria
    this.getBagByStatus = (status) => {
        let filtered_bags = this.bag_list.filter((b) => b.status==status?true:false);
        return filtered_bags;
    };

    //Method to Manipulate the collection (e.g. sorting on specific properties, changing properties of multiple objects, test if the collection respects some constraints)
    //To Be Implemented

    //Method to Delete a specific object from the collection
    this.deleteBag = (id) => {
        const index = this.bag_list.findIndex(b => b.id === id);
        this.bag_list.splice(index, 1);
    }

}