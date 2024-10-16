// Menangani pembuatan voucher
document.getElementById('voucherForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const duration = document.getElementById('duration').value;
    const password = generateRandomPassword(8);

    // Simpan voucher ke local storage
    saveVoucherToLocal(username, password);

    // Menampilkan voucher
    const voucherItem = document.createElement('li');
    voucherItem.innerHTML = `
        <span>Voucher untuk ${username} - Durasi: ${duration} Jam</span>
        <div class="voucher-credentials">
            <span><strong>Username:</strong> ${username}</span>
            <span><strong>Password:</strong> ${password}</span>
        </div>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>`;
    
    document.getElementById('voucherList').appendChild(voucherItem);

    // Reset form
    this.reset();

    // Hapus voucher
    voucherItem.querySelector('.delete-btn').addEventListener('click', function() {
        voucherItem.remove();
    });
});

// Fungsi untuk menyimpan voucher ke local storage
function saveVoucherToLocal(username, password) {
    let vouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
    vouchers.push({ username, password });
    localStorage.setItem('vouchers', JSON.stringify(vouchers));
}

// Fungsi untuk membuat password acak
function generateRandomPassword(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}

// Menangani login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const vouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
    const voucher = vouchers.find(v => v.username === username && v.password === password);

    const loginMessage = document.getElementById('loginMessage');

    if (voucher) {
        loginMessage.textContent = 'Login berhasil! Mengarahkan ke dashboard...';
        loginMessage.style.color = 'green';

        // Simpan status login ke session storage
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', username);

        // Redirect ke halaman dashboard sesuai username
        if (username === 'user1') {
            window.location.href = 'dashboard_user1.html';
        } else if (username === 'user2') {
            window.location.href = 'dashboard_user2.html';
        } else {
            loginMessage.textContent = 'Dashboard untuk pengguna ini belum tersedia.';
            loginMessage.style.color = 'red';
        }
    } else {
        loginMessage.textContent = 'Username atau password salah.';
        loginMessage.style.color = 'red';
    }
});

// Menangani logout di dashboard
document.getElementById('logoutButton')?.addEventListener('click', function() {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
});

// Mengecek status login di dashboard
if (window.location.pathname.includes('dashboard_user')) {
    const loggedIn = sessionStorage.getItem('loggedIn');

    

    if (!loggedIn) {
        // Jika belum login, redirect ke halaman login
        window.location.href = 'login.html';

         // Tampilkan username di dashboard
         document.getElementById('displayUsername').textContent = username;
    }
}
