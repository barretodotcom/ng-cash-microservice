export const authConfig = {
    jwt: {
        customerSecret: `${process.env.CUSTOMER_SECRET}`,
        expiresIn: "24h"
    },
};