export default function Bag(
  id,
  type,
  status,
  price,
  size,
  establishment,
  food_items
  //add time range to picking up
) {
  this.id = id;
  this.type = type;
  this.status = status;
  this.price = price;
  this.size = size;
  this.establishment = establishment;
  this.content = food_items;
}
