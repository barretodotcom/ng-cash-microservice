export class TransactionQueries {
    static getUserBalanceQuery() {
        return `
        SELECT
            (SUM(t.balance))+ 100 - (
        SELECT
            SUM(t2.balance)
        FROM
            transactions t2
        WHERE
            t2."debitedAccountId" = $1) as "balance"
        FROM
            transactions t
        WHERE
        t."creditedAccountId" = $1
`
    }
}