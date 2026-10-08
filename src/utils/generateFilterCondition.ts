import { SearchFilterObj } from "@/utils/types";

const generateFilterCondition = (filterObj: SearchFilterObj, realValue: unknown) => {
    const { operator, value } = filterObj;

    switch (operator) {
        case 'eq':
            return realValue === value;

        case 'ne':
            return realValue !== value;

        case 'contains':
            if (typeof value === "string" || typeof value === "number") {
                throw {
                    statusCode: 400,
                    message: `Invalid value type for 'contains' operator. Expected string or number, got ${typeof value}.`
                }
            }

            return `${realValue}`.toLowerCase().includes(value.toString().toLowerCase());

        case 'not_contains':
            if (typeof value === "string" || typeof value === "number") {
                throw {
                    statusCode: 400,
                    message: `Invalid value type for 'not_contains' operator. Expected string or number, got ${typeof value}.`
                }
            }

            return !`${realValue}`.toLowerCase().includes(value.toString().toLowerCase());

        default:
            throw {
                statusCode: 400,
                message: `Invalid operator: ${operator}. Supported operators are 'eq', 'ne', 'contains', and 'not_contains'.`
            }
    }
}

export default generateFilterCondition;
