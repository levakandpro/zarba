const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const TG_TOKEN = "8748134701:AAEevZBGp91-dd9q9jgo3aYqsPvenTgUkD0";
const TG_ID = "5736535127";

exports.notifyNewTrack = onDocumentCreated("tracks/{trackId}", async (event) => {
  const track = event.data.data();
  if (!track) return null;

  const artist = track.artist || "Неизвестно";
  const title = track.title || "Без названия";

  const message = `<b>🔥 Новый трек на ZARBA!</b>\n\n` +
                  `🎵 Исполнитель: <b>${artist}</b>\n` +
                  `🎶 Название: <b>${title}</b>\n\n` +
                  `🔗 Слушать: <a href="https://zarba.ru">перейти на сайт</a>`;

  try {
    await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      chat_id: TG_ID,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: false,
    });
    console.log(`✅ Уведомление о треке ${title} отправлено.`);
  } catch (error) {
    console.error("❌ Ошибка отправки в Telegram:", error);
  }
  return null;
});