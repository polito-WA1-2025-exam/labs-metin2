import Bag from "./entities/bag.mjs";
import Bag_list from "./entities/bag_list.mjs";
import Establishment from "./entities/establishment.mjs";
import Establishment_list from "./entities/establishment_list.mjs";
import Cart_item from "./entities/cart_item.mjs";
import Cart_item_list from "./entities/cart_item_list.mjs";
import Order_item from "./entities/order_item.mjs";
import Order from "./entities/order.mjs";
import Order_list from "./entities/order_list.mjs";
import User from "./entities/user.mjs";
import User_list from "./entities/user_list.mjs";
import { ShoppingCart } from "./entities/shopping_cart.mjs";
import Food_item from "./entities/food_item.mjs";

const establishment1 = new Establishment(1, "McDonald", "Via roma 2", 123456, "Fast Food");
const establishment2 = new Establishment(2, "BurgerKing", "Via roma 7", 234567, "Fast Food");
const establishment3 = new Establishment(3, "Bella Napoli", "Via roma 20", 345678, "Pizzeria");
const establishment4 = new Establishment(4, "The ranch", "Via roma 24", 456789, "Steakhouse");
const establishment5 = new Establishment(5, "The corner", "Via roma 3", 567890, "Steakhouse");

//testing establishments_list methods
const establishments_list = new Establishment_list();
establishments_list.addEstablishment(establishment1);
establishments_list.addEstablishment(establishment2);
establishments_list.addEstablishment(establishment3);
establishments_list.addEstablishment(establishment4);
establishments_list.addEstablishment(establishment5);
console.log("===================Testing establishments_list methods===================");
console.log(establishments_list);
console.log(establishments_list.getEstablishmentByCuisine("Pizzeria"));
establishments_list.deleteEstablishment(1);
console.log(establishments_list);
establishments_list.addEstablishment(1);

const food_item1 = new Food_item(1, "Chips", 2);
const food_item2 = new Food_item(2, "Burger", 2);
const food_item3 = new Food_item(3, "Chips", 1);
const food_item4 = new Food_item(4, "Burger", 1);
const food_item5 = new Food_item(5, "Margherita", 1);
const food_item6 = new Food_item(6, "Steak", 1);
const food_item7 = new Food_item(7, "Ribs", 1);
const food_item8 = new Food_item(8, "Chips", 2);
const food_item9 = new Food_item(9, "Salad", 1);
const food_item10 = new Food_item(10, "Steak", 2);
const food_item11 = new Food_item(11, "Ribs", 1);
const food_item12 = new Food_item(12, "Gravy", 2);

const bag1 = new Bag(1, "Regular", "Available", 12.5, "Medium", establishment1, [food_item1, food_item2]);
const bag2 = new Bag(2, "Regular", "Available", 12.5, "Medium", establishment1, [food_item3, food_item4]);
const bag3 = new Bag(3, "Regular", "Available", 6 , "Small", establishment3, [food_item5]);
const bag4 = new Bag(4, "Regular", "Available", 20, "Medium", establishment4, [food_item6, food_item7, food_item8, food_item9]);
const bag5 = new Bag(5, "Regular", "Available", 20, "Medium", establishment5, [food_item10, food_item11, food_item12]);
console.log(bag1);

const bags_list = new Bag_list();
bags_list.addBag(bag1);
bags_list.addBag(bag2);
bags_list.addBag(bag3);
bags_list.addBag(bag4);
bags_list.addBag(bag5);
console.log("===================Testing bags_list methods===================");
console.log(bags_list);
console.log(bags_list.getBagByStatus("Available"));

const user1 = new User(1, "Mario_Rossi", "Mario_Rossi");
const user2 = new User(2, "Alberto_Verdi", "Alberto_Verdi");
const user3 = new User(3, "Carlo_Gialli", "Carlo_Gialli");

const users_list = new User_list();
users_list.addUser(user1);
users_list.addUser(user2);
users_list.addUser(user3);
console.log("===================Testing users_list methods===================");
console.log(users_list);
console.log(users_list.getUserById(1));

const cart_item1 = new Cart_item(1, user1, bag1, "10:00", []);
const cart_item2 = new Cart_item(2, user2, bag2, "18:00", [food_item4]);

const cart_items_list = new Cart_item_list();
cart_items_list.addCartItem(cart_item1);
cart_items_list.addCartItem(cart_item2);
console.log("===================Testing cart_items_list methods===================");
console.log(cart_items_list);
console.log(cart_items_list.getCartItemsByUser(1));

const order_item1 = new Order_item(1, bag3, "12:00", []);
const order_item2 = new Order_item(2, bag4, "12:00", [food_item7]);
const order_item3 = new Order_item(3, bag5, "20:00", []);

const order1 = new Order(1, user3, [order_item1, order_item2, order_item3]);

const orders_list = new Order_list();
orders_list.addOrder(order1);
console.log("===================Testing orders_list methods===================");
console.log(orders_list);
console.log(orders_list.getOrdersByUser(3));
