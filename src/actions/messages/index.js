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
      `<b>From:</b> ${ ctx.from.first_name + (ctx.from.last_name ?
          ' ' + ctx.from.last_name : '') || '@' + ctx.from.username } \n` +
      `<b>User ID:</b> ${ctx.from.id} \n` +
      `<b>Caption:</b> ${caption || 'empty'} \n` +
      `<b>Status:</b> ${status}`,

  changedMessage: (ctx, status) =>
      `<b>From:</b> ${ ctx.from.first_name + (ctx.from.last_name ?
          ' ' + ctx.from.last_name : '') || '@' + ctx.from.username } \n` +
      `<b>Status:</b> ${status} \n`,

  rejectedMesage: ctx =>
      `Siz yuborgan ushbu yechim, ${ ctx.from.first_name + (ctx.from.last_name ?
          ' ' + ctx.from.last_name : '') || '@' + ctx.from.username } tomonidan rad etildi ❌ \n\n` +
          `<i>Yana urinib ko'rishingiz mumkin</i>`,
  acceptMessage: ctx => `Siz yuborgan ushbu yechim, ${ ctx.from.first_name + (ctx.from.last_name ?
      ' ' + ctx.from.last_name : '') || '@' + ctx.from.username } tomonidan tasdiqlandi! ✔ \n\n` +
      `<i>Get code tugmani bosish orqali boshqa ishlaganlar yechimini olishingiz mumkin! </i>`,
  notUniqueMessage: `<b>Sizning yechimingiz tasdiqlanmagunicha boshqa yechim yubora olmaysiz!\n Iltimos javobingiz tasdiqlanishini kutib turing</b>`,

  warningForUser: "☣ Botni hali ishga tushirmaganingiz uchun sizga yechimni yubora olmaymiz ⚠",
  errorForUser: "🛑 Sizni uyga vazifangiz hali tasqidlanmangan❗",
  sendForUser: "♻ Ushbu uyga vazifa yechimi shaxsiyga yuborildi ✅",

  forward_accepted_homework: (ctx) =>
    `<b>From:</b> ${ ctx.first_name + (ctx.last_name ?
      ' ' + ctx.last_name : '') || '@' + ctx['user_name'] } \n`
};
