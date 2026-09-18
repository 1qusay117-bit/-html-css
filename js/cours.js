const modal = document.getElementById("mymodel")
const openBtn = document.getElementById("open")
const closeBtn = document.querySelector("close")
const modalBody = document.getElementById("modelbody")
openBtn.addEventListener('click', () => {
    modal.style.display = 'flex'; // إظهار النافذة
    modalBody.innerHTML = 'جاري التحميل...'; // رسالة تحميل مؤقتة

    // تنفيذ طلب AJAX باستخدام Fetch API
    fetch('https://jsonplaceholder.typicode.com/posts/1') // استبدل الرابط برابط السيرفر الخاص بك
        .then(response => {
            if (!response.ok) {
                throw new Error('حدث خطأ أثناء جلب البيانات');
            }
            return response.json(); // تحويل الاستجابة إلى JSON
        })
        .then(data => {
            // عرض البيانات المستلمة داخل الـ Modal
            modalBody.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
            `;
        })
        .catch(error => {
            // في حال حدوث خطأ
            modalBody.innerHTML = `<p style="color: red;">علينا اعتذار، فشل تحميل البيانات.</p>`;
            console.error('Error:', error);
        });
});

// 2. إغلاق الـ Modal عند النقر على زر الإغلاق (X)
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 3. إغلاق الـ Modal عند النقر في المساحة المجاورة (خارج محتوى الـ Modal)
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});