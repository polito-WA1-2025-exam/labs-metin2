export function ShoppingCart() {
  const bags = [];

  function add(bag) {
    bags.push(bag);
  }

  function remove(bag) {
    const index = bags.indexOf(bag);
    if (index != -1) bags.splice(index, 1);
  }

  function toString() {
    console.log(bags);
  }

  return {
    add,
    remove,
    toString
  }

}
