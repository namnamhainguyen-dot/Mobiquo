export class Navbar {
    render(user) {
        return `
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="index.html">Trang chủ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="cart.html">Giỏ hàng</a>
            </li>
            ${(!user) ?
            `<li class="nav-item">
              <a class="nav-link" href="login.html">Đăng nhập</a>
            </li>
            
            <li class="nav-item">
              <a class="nav-link" href="register.html">Đăng ký</a>
            </li>` : `
            <li class="nav-item">
              <a class="nav-link" href="profile.html">Xin chao${user.name}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" id="logout-link">Đăng xuất</a>
            </li>`}
          </ul>
          `;
    }
}
