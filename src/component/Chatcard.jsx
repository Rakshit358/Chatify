export default function ChatCard({ name, lastmessage, onClick }) {
  return (
    <a
      onClick={onClick}
      className="flex gap-4 cursor-pointer bg-[#99f6e4] p-4 mt-4 rounded-xl"
    >
      <div className="flex-none w-1/3 items-center">{name}</div>
      <div className="flex-grow w-2/3 items-center">{lastmessage}</div>
    </a>
  );
}
