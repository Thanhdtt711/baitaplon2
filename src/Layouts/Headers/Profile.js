import React, {useState} from "react";
import clsx from 'clsx';

export default function Profile() {
  
  const [showDropdown, setDropdown] = useState(false);

  const handleToggleDropdown = (e) => {
    e.preventDefault();
    setDropdown(showDropdown?false:true);
  }

  return (
    <div className="header__profile">
      <a href="#" onClick={handleToggleDropdown}>
        <img src="https://s120-ava-talk-zmp3.zmdcdn.me/5/e/a/5/15/120/c1604d29641e7fd7ad325bfa0f2a29b1.jpg" />
      </a>
      <div className={clsx('header__profile--inner', showDropdown&&'open')}>
        <ul>
          <li><a href="">Cá nhân</a></li>
          <li><a href="">Đăng xuất</a></li>
        </ul>
      </div>
    </div>
  );
}
