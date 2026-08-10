function ProfileMenu({ user, onLogout }) {
  return (
    <div className="min-w-[200px] rounded-[10px] bg-white px-[18px] py-[16px] shadow-lg">
      <p className="truncate text-[13px] font-semibold">
        {user.username}
      </p>

      <p className="mt-[3px] truncate text-[11px] text-[#878787]">
        {user.email}
      </p>

      <button
        type="button"
        onClick={onLogout}
        className="mt-[14px] w-full rounded-[10px] bg-[#FFB36C] px-[20px] py-[9px] text-[11px] font-medium"
      >
        Log Out
      </button>
    </div>
  );
}

export default ProfileMenu;