export default function Cart_item_list() {
    this.cart_item_list = [];

    //Method to Add new objects to the collection
    this.addCartItem = (cart_item) => this.cart_item_list.push(cart_item);

    //Method to Retrieve objects based on specific criteria
    this.getCartItemsByUser = (user_id) => {
        let filtered_cartitems = this.cart_item_list.filter((c) => c.user.id==user_id?true:false);
        return filtered_cartitems;
    };

    //Method to Manipulate the collection (e.g. sorting on specific properties, changing properties of multiple objects, test if the collection respects some constraints)
    //To Be Implemented

    //Method to Delete a specific object from the collection
    this.deleteCartItem = (id) => {
        const index = this.cart_item_list.findIndex(c => c.id === id);
        this.cart_item_list.splice(index, 1);
    }
}