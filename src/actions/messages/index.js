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

  captionForAdmin: (ctx, caption, status) =>
      `<b>From:</b> ${ ctx.first_name + (ctx.last_name ?
          ' ' + ctx.last_name : '') || '@' + ctx.username } \n` +
      `<b>Caption:</b> ${caption.trim() || 'empty'} \n` +
      `<b>Status:</b> ${status}`,

  changedMessage: (ctx, status) =>
      `<b>From:</b> ${ ctx.first_name + (ctx.last_name ?
          ' ' + ctx.last_name : '') || '@' + ctx.username } \n` +
      `<b>Status:</b> ${ status } \n`,

  rejectedMesage: ctx =>
      `Siz yuborgan ushbu yechim, ${ ctx.first_name + (ctx.last_name ?
          ' ' + ctx.last_name : '') || '@' + ctx.username } tomonidan rad etildi ❌ \n\n` +
          `<i>Yana urinib ko'rishingiz mumkin</i>`,

  acceptMessage: ctx => `Siz yuborgan ushbu yechim, ${ ctx.first_name + (ctx.last_name ?
      ' ' + ctx.last_name : '') || '@' + ctx.username } tomonidan tasdiqlandi! ✅ \n\n` +
      `<i>Get code tugmani bosish orqali boshqa to'g'ri ishlaganlar yechimini olishingiz mumkin! </i>`,

  isAnsweredPending: `<b>Bir vaqtning o'zida ko'p marotaba yechim yubora olmaysiz!</b>`,
  isAnsweredAccepted: `<b>Sizning yechimingiz allaqachon tasdiqlanib bo'lgan!</b>`,


  warningForUser: "☣ Botni hali ishga tushirmaganingiz uchun sizga yechimni yubora olmaymiz ⚠",
  errorForUser: "🛑 Sizni uyga vazifangiz hali tasqidlanmangan❗",
  sendForUser: "♻ Ushbu uyga vazifa yechimi shaxsiyga yuborildi ✅",

  captionForAcceptedUsers: (ctx) =>
    `<b>From:</b> ${ ctx.first_name + (ctx.last_name ?
      ' ' + ctx.last_name : '') || '@' + ctx.username } \n`
};
