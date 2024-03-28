export default function Register({ closeRegister }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="flex w-[600px] flex-col">
        <button
          onClick={closeRegister}
          className="place-self-end text-xl text-white"
        >
          X
        </button>
        <div className="rounded bg-white p-2 text-black">Register</div>
      </div>
    </div>
  );
}
