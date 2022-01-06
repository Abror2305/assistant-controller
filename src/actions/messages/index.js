let currentdate = new Date();
module.exports = {
  start:
    `<b>Controller botga xush kelibsiz!</b> \n\n` +
    `Salom foydalanuvchi) Men bilan nimalar qilish mumkin: \n` +
    `<code> * uyga vazifalarni tekshirish</code>\n` +
    `<code> * ma'lumotlarni havfsiz va \n` +
    ` tartibli saqlash </code>\n\n` +
    `<i>Botdan foydalanish boʻyicha toʻliq maʼlumotni koʻrish uchun quyidagi tugmani bosing.</i>`,
  help:
    `<b>Barcha mavjud kommandalar ro'yxati:</b> \n\n` +
    `/help - <code>ushbu yordam habarini ko'rsatish</code> \n`,
  textToAdmin: (ctx, message) => {
    return `<b>Sender</b>: ${ctx.from.first_name} ${ctx.from.last_name} \n` +
      `<b>Username</b>: @${ctx.from.username} \n`;
  },
  replyedMessage: (ctx, type) => {
    return (
      `<b>Username</b>: @${ctx.from.username} \n` + `<b>Type</b>: ${type} \n`
    );
  },
};
