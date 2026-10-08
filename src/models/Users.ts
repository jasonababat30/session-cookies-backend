import { User, Search } from "@/utils/types";
import generateFilterCondition from "@/utils/generateFilterCondition";

/**
 * This is just a mock data for Users
 *  In a real application, you would use a database to store user data.
 */
const users: User[] = [
    {
        id: 1,
        user_name: "john_doe",
        password: "password123",
        role: "admin",
        first_name: "John",
        last_name: "Doe",
        age: 30
    },
    {
        id: 2,
        user_name: "jane_doe",
        password: "password456",
        role: "user",
        first_name: "Jane",
        last_name: "Doe",
        age: 27
    }
];

class Users {
    constructor() {}

    public findById(id: number) {
        return users.find(user => user.id === id);
    }

    public search(searchFilters: Search<User>) {
        const usersFound = users.filter(user => {
            const {
                is_or = false,
                filters
            } = searchFilters;

            const filterConditions = Object.entries(filters).reduce(
                (acc, [key, value]) => {
                    if (is_or) {
                        return acc || generateFilterCondition(value, user[key as keyof User]);
                    }

                    return acc && generateFilterCondition(value, user[key as keyof User]);
                },
                true
            );

            return filterConditions;
        });

        return usersFound;
    }
}

const UsersModel = new Users();

export default UsersModel;
