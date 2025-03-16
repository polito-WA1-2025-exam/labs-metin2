export default function Order_list() {
    this.order_list = [];

    //Method to Add new objects to the collection
    this.addOrder = (order) => this.order_list.push(order);

    //Method to Retrieve objects based on specific criteria
    this.getOrdersByUser = (user_id) => {
        let filtered_orders = this.order_list.filter((o) => o.user.id==user_id?true:false);
        return filtered_orders;
    };

    //Method to Manipulate the collection (e.g. sorting on specific properties, changing properties of multiple objects, test if the collection respects some constraints)
    //To Be Implemented

    //Method to Delete a specific object from the collection
    this.deleteCartItem = (id) => {
        const index = this.order_list.findIndex(o => o.id === id);
        this.order_list.splice(index, 1);
    }

}