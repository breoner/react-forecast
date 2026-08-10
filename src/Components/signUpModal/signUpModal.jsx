import { useState } from "react";

function SignUpModal({ onClose, onSignUp }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      return;
    }

    onSignUp({
      username: username.trim(),
      email: email.trim(),
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-[16px]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[480px] rounded-[20px] bg-white px-[32px] py-[28px] md:px-[45px] md:py-[32px]"
      >
        <h2 className="text-center text-[26px] font-medium">
          Sign up
        </h2>

        <form onSubmit={handleSubmit} className="mt-[35px]">
          <div>
            <label className="text-[14px] font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-[10px] h-[50px] w-full rounded-[10px] bg-[#E4E4E4] px-[20px] text-[14px] outline-none placeholder:text-[#ABABAB]"
            />
          </div>

          <div className="mt-[24px]">
            <label className="text-[14px] font-medium">
              E-Mail
            </label>

            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-[10px] h-[50px] w-full rounded-[10px] bg-[#E4E4E4] px-[20px] text-[14px] outline-none placeholder:text-[#ABABAB]"
            />
          </div>

          <div className="mt-[24px]">
            <label className="text-[14px] font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-[10px] h-[50px] w-full rounded-[10px] bg-[#E4E4E4] px-[20px] text-[14px] outline-none placeholder:text-[#ABABAB]"
            />
          </div>

          <button
            type="submit"
            className="mx-auto mt-[28px] block rounded-[10px] bg-[#FFB36C] px-[30px] py-[10px] text-[14px]"
          >
            Sign up
          </button>

          <p className="mt-[10px] text-center text-[10px] font-medium">
            Already have an account?{" "}
            <button type="button" className="underline">
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;