import Bag from "./bag.mjs";

function Establishment(name, address, phone_number, type_cuisine) {
    this.name = name;
    this.address = address;
    this.phone_number = phone_number;
    this.type_cuisine = type_cuisine;
    this.bags = [];
  }
  
  let establishment = new Establishment(
    "Mc",
    "via roma",
    33391023,
    "fast food"
  );
  let bag = new Bag(
    "regular",
    "available",
    13,
    establishment,
    "chips"
  );
  console.log(bag);
  
  