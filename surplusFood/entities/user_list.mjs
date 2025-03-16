export default function User_list() {
    this.user_list = [];

    //Method to Add new objects to the collection
    this.addUser = (user) => this.user_list.push(user);

    //Method to Retrieve objects based on specific criteria
    this.getUserById = (id) => {
        let filtered_users = this.user_list.filter((u) => u.id==id?true:false);
        return filtered_users;
    };

    //Method to Manipulate the collection (e.g. sorting on specific properties, changing properties of multiple objects, test if the collection respects some constraints)
    //To Be Implemented

    //Method to Delete a specific object from the collection
    this.deleteUser = (id) => {
        const index = this.user_list.findIndex(u => u.id === id);
        this.user_list.splice(index, 1);
    }

}