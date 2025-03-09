import Bag from "./bag.mjs";
import Establishment from "./establishment.mjs";
import Establishment_list from "./establishment_list.mjs";
import Bag_list from "./bag_list.mjs";


//create establishments and print
const establishment1 = new Establishment(1, "McDonald", "Via roma 2", 123908032198032, "Fast Food");
const establishment2 = new Establishment(2, "Bella Napoli", "Via roma 7", 3143353452353, "Pizzeria");
console.log("====printing establishment1====");
console.log(establishment1);
console.log("====printing establishment2====");
console.log(establishment2);

//create an establishment list and print
const my_establishments = new Establishment_list();
console.log("====printing my_establishments====");
console.log(my_establishments);

//create a bag and print
const bag1 = new Bag(1, "Regular", "Available", 13, establishment1, "Chips", "McBurger");
console.log("====printing bag1====");
console.log(bag1);

//create a bag_list and print
const my_bags = new Bag_list();
console.log("====printing my_bags====");
console.log(my_bags);

//test methods add
my_establishments.addEstablishment(establishment1);
my_establishments.addEstablishment(establishment2);
console.log("====printing my_establishment after adding establishments====");
console.log(my_establishments);

my_bags.addBag(bag1);
console.log("====printing my_bags after adding bags====");
console.log(my_bags);