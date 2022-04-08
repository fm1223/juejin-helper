const got = require('got')
const env = require("./utils/env");
const email = require("./utils/email");


//v2free签到
async function checkin() {
    let cookie = env.V2FREECOOKIE

    if (!cookie) {
        console.log(`请配置cookie`)
        return;
    }
    const url = `https://w1.v2free.net/user/checkin`

    try {

        const res = await got.post(url, {
            headers: {
                'Content-Type': 'application/json',
                'cookie': cookie,
            }
        }).json()

        console.log(`v2free签到结果：${JSON.stringify(res)}`)

        email({
            subject: "v2free签到",
            text: JSON.stringify(res)
        });
    } catch (e) {
        console.log(`${e.message}--${e.code}`)
    }
}

checkin()