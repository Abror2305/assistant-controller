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

  textToAdmin: (ctx, caption, status) =>
      `<b>From:</b> ${ ctx.from.first_name + ctx.from.last_name ?
          ' ' + ctx.from.last_name : '' || '@' + ctx.from.username } \n` +
      `<b>Caption:</b> ${caption} \n` +
      `<b>Status:</b> ${status}`,

  changedMessage: (ctx, status) =>
      `<b>From:</b> ${ ctx.from.first_name + ctx.from.last_name ?
          ' ' + ctx.from.last_name : '' || '@' + ctx.from.username } \n` +
      `<b>Status:</b> ${status} \n`,

};
