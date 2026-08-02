document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Sahifa qayta yuklanishini to'xtatamiz

    // 1. Bot token va Chat ID larini kiriting
    const BOT_TOKEN = 'BOT_TOKENINGIZNI_SHUYERGA_YOZING'; // masalan: 123456789:AAH...
    const CHAT_ID = 'CHAT_IDINGIZNI_SHUYERGA_YOZING';     // masalan: -100123456789 yoki shaxsiy ID

    // 2. Forma qiymatlarini olish
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const service = document.getElementById('contactService').value;
    const submitBtn = document.getElementById('submitBtn');

    // Tugma holatini o'zgartirish (foydalanuvchiga jarayon ketayotganini ko'rsatish)
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Yuborilmoqda...";
    submitBtn.disabled = true;

    // 3. Telegramga yuboriladigan xabar matni (HTML formatida)
    const message = `
<b>📥 YANGI MUROJAAT (idealaqua.uz)</b>

👤 <b>Ism:</b> ${name}
📞 <b>Tel:</b> ${phone}
🛠 <b>Xizmat turi:</b> ${service}
📅 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}
    `;

    // 4. Telegram Bot API ga so'rov yuborish
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: 'HTML',
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Murojaatingiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.");
            document.getElementById('contactForm').reset(); // Formani tozalash
        } else {
            alert("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Tarmoqda xatolik! Xabar yuborilmadi.");
    })
    .finally(() => {
        // Tugmani asl holatiga qaytarish
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    });
});
