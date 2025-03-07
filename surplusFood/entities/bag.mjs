function Bag(type, status, price, establishment, ...food_items) {
    this.type = type;
    this.status = status;
    this.price = price;
    this.establishment = establishment;
    this.food_items = [...food_items];
  }
  
  export default Bag;
  