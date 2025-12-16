const categories = [
    { name: "Дизайн", icon: "🎨", count: 120 },
    { name: "Разработка", icon: "💻", count: 250 },
    { name: "Бизнес", icon: "💼", count: 180 },
    { name: "Маркетинг", icon: "📈", count: 90 }
];
const courses = [
    { id: 1, title: "Основы UI/UX Дизайна", category: "Дизайн", author: "Алиса Иванова", price: "Бесплатно", rating: 4.8 },
    { id: 2, title: "React для начинающих", category: "Разработка", author: "Максим Петров", price: "4900 ₽", rating: 4.9 },
    { id: 3, title: "Digital Marketing 2025", category: "Маркетинг", author: "Ольга Сидорова", price: "7900 ₽", rating: 4.7 },
    { id: 4, title: "Бизнес с нуля", category: "Бизнес", author: "Дмитрий Козлов", price: "Бесплатно", rating: 4.6 },
    { id: 5, title: "Advanced JavaScript", category: "Разработка", author: "Сергей Николаев", price: "5900 ₽", rating: 5.0 },
    { id: 6, title: "Графический дизайн в Figma", category: "Дизайн", author: "Елена Морозова", price: "3900 ₽", rating: 4.8 }
];
function getCategories() { return categories; }
function getCourses(category = null) {
    if (category) return courses.filter(c => c.category === category);
    return courses;
}
function searchCourses(query, category = '') {
    return courses.filter(c => 
        (c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase())) &&
        (!category || c.category === category)
    );
}
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    const select = document.getElementById('homeCategorySelect');
    const filters = document.getElementById('categoryFilters');
    grid.innerHTML = ''; select.innerHTML = '<option value="">Все категории</option>'; filters.innerHTML = '';

    getCategories().forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => showPage('courses', cat.name);
        card.innerHTML = `<div class="category-icon">${cat.icon}</div><h3>${cat.name}</h3><p>${cat.count} курсов</p>`;
        grid.appendChild(card);
        const opt = document.createElement('option');
        opt.value = cat.name; opt.textContent = cat.name;
        select.appendChild(opt);
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${cat.name}" onchange="applyFilters()"> ${cat.name}`;
        filters.appendChild(label);
    });
}
function renderCourses(containerId, courseList) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = '';
    courseList.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.onclick = () => alert(`Курс: ${course.title}\nАвтор: ${course.author}\nЦена: ${course.price}`);
        card.innerHTML = `
            <div class="course-image">📚</div>
            <div class="course-info">
                <span class="course-category">${course.category}</span>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-author">by ${course.author}</p>
                <div class="course-footer">
                    <span class="course-price">${course.price}</span>
                    <div class="course-rating">★ ${course.rating}</div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}
function showPage(page, category = '') {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');

    if (page === 'home') {
        renderCategories();
        renderCourses('popularCoursesGrid', getCourses().slice(0, 6));
    } else if (page === 'courses') {
        const list = category ? getCourses(category) : getCourses();
        renderCourses('coursesGrid', list);
        applyFilters(); 
    }
}
function performSearch() {
    const query = document.getElementById('homeSearchInput').value;
    const category = document.getElementById('homeCategorySelect').value;
    const results = searchCourses(query, category);
    showPage('courses');
    renderCourses('coursesGrid', results);
}
function applyFilters() {
    let selected = Array.from(document.querySelectorAll('#categoryFilters input:checked')).map(cb => cb.value);
    let filtered = courses.filter(c => selected.length === 0 || selected.includes(c.category));
    renderCourses('coursesGrid', filtered);
}
document.getElementById('adminLoginForm').onsubmit = function(e) {
    e.preventDefault();
    const user = document.getElementById('adminUsername').value;
    const pass = document.getElementById('adminPassword').value;
    if (user === 'admin' && pass === 'admin123') {
        document.getElementById('adminLoginScreen').classList.add('hidden');
        document.getElementById('mainContent').classList.add('visible');
        showPage('home');
    } else {
        alert('Неверный логин или пароль!');
    }
};
document.querySelector('.dropdown-toggle').onclick = () => {
    document.querySelector('.dropdown-menu').classList.toggle('active');
};
document.getElementById('loginBtn').onclick = () => { document.getElementById('modalTitle').textContent = 'Войти'; document.getElementById('authModal').classList.add('active'); };
document.getElementById('registerBtn').onclick = () => { document.getElementById('modalTitle').textContent = 'Регистрация'; document.getElementById('authModal').classList.add('active'); };
function closeModal() { document.getElementById('authModal').classList.remove('active'); }
