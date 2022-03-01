import { User } from "models/user";

export const UsersController = {
  async getUserBy(id: string): Promise<any> {
    try {
      const user: User = await new User(id);
      await user.pull();
      return user.data;
    } catch (error) {
      throw error;
    }
  },
  async updateUserData(id: string, object: any): Promise<any> {
    try {
      if (object.id || object.userId || object.objectID)
        throw "The userId cannot be changed.";
      const user: User = await new User(id);
      await user.pull();
      user.data = { ...user.data, ...object };
      await user.push();
      return user.data;
    } catch (error) {
      throw error;
    }
  },
  async updateAdressUserData(
    id: string,
    address: string,
    newValue: any
  ): Promise<any> {
    try {
      if (address == "id" || address == "userId" || address == "objectID")
        throw "The userId cannot be changed.";
      const user: User = await new User(id);
      await user.pull();
      user.data[address] = newValue;
      await user.push();
      return user.data;
    } catch (error) {
      throw error;
    }
  },
  async assignOrder(orderId: string, userId: string) {
    try {
      const user: User = await new User(userId);
      await user.pull();
      user.data.orders = [...user.data.orders, orderId];
      await user.push();
      return user.data.orders;
    } catch (error) {
      throw error;
    }
  },
};
