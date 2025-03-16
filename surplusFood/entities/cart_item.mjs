export default function Cart_item(id, userId, bagId, pickup_time, food_items_to_delete) {
    this.id = id;
    this.userId = userId;
    this.bagId = bagId;
    this.pickup_time = pickup_time;
    this.food_items_to_delete = food_items_to_delete;
}