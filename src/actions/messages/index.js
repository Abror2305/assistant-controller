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
    `<b>From:</b> ${
      ctx.first_name + (ctx.last_name ? " " + ctx.last_name : "") ||
      "@" + ctx.username
    } \n` +
    `<b>Caption:</b> ${caption.trim() || "empty"} \n` +
    `<b>Status:</b> ${status}`,

  changedMessage: (ctx, status) =>
    `<b>From:</b> ${
      ctx.first_name + (ctx.last_name ? " " + ctx.last_name : "") ||
      "@" + ctx.username
    } \n` + `<b>Status:</b> ${status} \n`,

  rejectedMesage: (ctx) =>
    `Siz yuborgan ushbu yechim, ${
      ctx.first_name + (ctx.last_name ? " " + ctx.last_name : "") ||
      "@" + ctx.username
    } tomonidan rad etildi ❌ \n\n` + `<i>Yana urinib ko'rishingiz mumkin</i>`,

  acceptMessage: (ctx) =>
    `Siz yuborgan ushbu yechim, ${
      ctx.first_name + (ctx.last_name ? " " + ctx.last_name : "") ||
      "@" + ctx.username
    } tomonidan tasdiqlandi! ✅ \n\n` +
    `<i>Get code tugmani bosish orqali boshqa to'g'ri ishlaganlar yechimini olishingiz mumkin! </i>`,

  isAnsweredPending: `<b>Bir vaqtning o'zida ko'p marotaba yechim yubora olmaysiz!</b>`,
  isAnsweredAccepted: `<b>Sizning yechimingiz allaqachon tasdiqlanib bo'lgan!</b>`,

  warningForUser:
    "☣ Botni hali ishga tushirmaganingiz uchun sizga yechimni yubora olmaymiz ⚠",
  errorForUser: "🛑 Sizni uyga vazifangiz hali tasqidlanmangan❗",
  sendForUser: "♻ Ushbu uyga vazifa yechimi shaxsiyga yuborildi ✅",

  captionForAcceptedUsers: (ctx) =>
    `<b>From:</b> ${
      ctx.first_name + (ctx.last_name ? " " + ctx.last_name : "") ||
      "@" + ctx.username
    } \n`,

  addGroupMessage:
    `<i>Eslatma:</i> \n\n` +
    `\t Botni biror guruh uchun faollashtirmoqchi bo'lsangiz sizga 2 ta kanal va 1 ta guruh kerak bo'ladi \n\n\n` +
    `<i>Misol uchun:</i> \n\n` +
    `\t <b>Share  Point</b> - o'quvchilar uchun uyga vazifa yoki biror ma'lumotlar joylab borish, \n\n` +
    `\t <b>Discussion</b> - <b>Share Point</b>ga tashlangan uyga vazifalar yechimini <i>comment</i>ga yuborish va muhokama qilish,\n\n` +
    `\t <b>Admin Channel</b> - o'quvchilar <i>comment</i>ga yuborgan yechimlarini oson tekshirish uchun kerak bo'ladi \n\n\n` +
    `<b>Botni guruh uchun faollashtirish uchun admin bilan bog'laning</b>`,
};
