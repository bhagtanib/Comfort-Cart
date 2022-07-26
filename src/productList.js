import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const getProducts = async () => {
    let productArray = []
  const querySnapshot = await getDocs(collection(db, "product"));
  querySnapshot.forEach(async (doc) => {
    console.log(doc.id);
    const querySnapshot = await getDocs(collection(db, `product/${doc.id}/list`));
    productArray.push(querySnapshot);
  });
//   console.log(productArray.length);
  return productArray
}
console.log('getProducts called ')



