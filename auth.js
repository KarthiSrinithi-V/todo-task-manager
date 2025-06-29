// // Parse token from URL after Google OAuth redirect
// window.onload = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const token = urlParams.get('token');

//   if (token) {
//     localStorage.setItem('token', token);
//     window.history.replaceState({}, document.title, '/dashboard.html');
//     window.location.href = 'dashboard.html';
//   }
// };

// const logoutBtn = document.getElementById('logoutBtn');
// if (logoutBtn) {
//   logoutBtn.onclick = () => {
//     localStorage.removeItem('token');
//     window.location.href = 'login.html';
//   };
// }

// // Redirect to login if not authenticated on dashboard
// if (window.location.pathname.endsWith('dashboard.html')) {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     window.location.href = 'login.html';
//   }
// }
