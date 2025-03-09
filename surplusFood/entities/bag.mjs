export default function Bag(id, type, status, price, establishment, ...food_items) {
  this.id = id;
  this.type = type;
  this.status = status;
  this.price = price;
  this.establishment = establishment;
  this.food_items = [...food_items];
}
