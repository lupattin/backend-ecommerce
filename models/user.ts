import { firestore } from "db/firestore";

const collection: FirebaseFirestore.CollectionReference =
  firestore.collection("users");

export class User {
  ref: any;
  data: any;
  id: string;
  orders: string[] = [];
  constructor(id: string) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async pull(): Promise<void> {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push(): Promise<void> {
    this.ref.update(this.data);
  }
  static async createNewUser(data: any): Promise<User> {
    const newUserSnap = await collection.add(data);
    const newUser = new User(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
}
