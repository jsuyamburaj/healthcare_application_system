document.addEventListener('DOMContentLoaded', () => {
    // 🧾 REGISTER USER
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;

            const user = { name, email, password };
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('loggedIn', 'true');

            alert('✅ Registration successful! Redirecting to home...');
            window.location.href = 'index.html';
        });
    }

    // 🔑 LOGIN USER
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.email === email && user.password === password) {
                localStorage.setItem('loggedIn', 'true');
                alert(`✅ Welcome back, ${user.name}!`);
                window.location.href = 'index.html';
            } else {
                alert('❌ Invalid email or password!');
            }
        });
    }

    // 👤 DISPLAY PROFILE + LOGOUT
    const profileSection = document.getElementById('profileSection');
    if (profileSection) {
        const user = JSON.parse(localStorage.getItem('user'));
        const loggedIn = localStorage.getItem('loggedIn') === 'true';

        if (user && loggedIn) {
            profileSection.innerHTML = `
                <div class="profile-card">
                    <p><strong>👋 Hello, ${user.name}</strong></p>
                    <p>${user.email}</p>
                    <button id="logoutBtn">🚪 Logout</button>
                </div>
            `;
            document.getElementById('logoutBtn').addEventListener('click', () => {
                localStorage.setItem('loggedIn', 'false');
                alert('Logged out successfully!');
                window.location.reload();
            });
        } else {
            profileSection.innerHTML = `
                <p>Please <a href="login.html">log in</a> to view your profile.</p>
            `;
        }
    }

    // 📅 HANDLE APPOINTMENTS
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const appointment = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                doctor: document.getElementById('doctor').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value
            };
            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            appointments.push(appointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            alert('✅ Appointment booked successfully!');
            form.reset();
        });
    }

    // 📋 VIEW APPOINTMENTS
    const table = document.getElementById('appointmentsTable');
    if (table) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const tbody = table.querySelector('tbody');
        appointments.forEach(a => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${a.name}</td>
                <td>${a.email}</td>
                <td>${a.phone}</td>
                <td>${a.doctor}</td>
                <td>${a.date}</td>
                <td>${a.time}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // 🌙 DARK MODE TOGGLE
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const isDark = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', isDark);
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const dark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', dark);
            themeToggle.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }
});
