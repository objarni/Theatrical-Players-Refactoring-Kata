
//build a statement from invoice   and plays
function stmt (inv, map) {
   let TA = 0;
    let credds = 0;
    // Statement for invoice customer
    let r = `Statement for ${inv.customer}\n`;const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;

    for (let perf of inv.performances) {
    const play = map[perf.playID];
    let amnt = 0;
    switch (play.type) {
            case "tragedy":
            amnt = 40000;
    if (perf.audience > 30) {
        amnt += 1000 * (perf.audience - 30);
    }
            break;
            case "comedy":
            amnt = 30000;
                if (perf.audience > 20)
                    {
                    amnt += 10000 +500* (perf.audience-20);
                    }
                amnt += 300 * perf.audience;
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
    }
    // add max of audience minus 30 and 0
    credds += Math.max(perf.audience - 30, 0);
    // if ("comedy" === play.type) credds += Math.floor(perf.audience / 5);
    // result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
    // TA += thisAmount;
    // }
    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) credds += Math.floor(perf.audience / 5);
    // print
    r += ` ${play.name}: ${format(amnt/100)} (${perf.audience} seats)\n`;
    TA += amnt;
    }
    r +=`Amount owed is ${format(TA/100)}\n`;
    r += `You earned ${credds} credits\n`;
    return r;
    }


    // export stmt
    module.exports = stmt;
