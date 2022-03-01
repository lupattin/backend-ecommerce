import { firestore } from "db/firestore";
const collection: FirebaseFirestore.CollectionReference =
  firestore.collection("auth");

export class Auth {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
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
  static async findByEmail(cleanEmail: string): Promise<Auth> {
    try {
      const results = await collection.where("email", "==", cleanEmail).get();
      if (results.docs.length) {
        const first = results.docs[0];
        const auth = new Auth(first.id);
        auth.data = first.data();
        return auth;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  static async createNewAuth(data: any): Promise<Auth> {
    try {
      const newAuthSnap = await collection.add(data);
      const newAuth = new Auth(newAuthSnap.id);
      newAuth.data = data;
      return newAuth;
    } catch (error) {
      throw error;
    }
  }
}
