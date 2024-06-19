const messages = [
  { id: 1, user: "John", message: "Hello" },
  { id: 2, user: "Jane", message: "Hi" },
  { id: 3, user: "John", message: "How are you?" },
];

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl">Chat</h1>

      <ul className="mt-4">
        {messages.map((message) => (
          <li key={message.id} className="mb-2">
            <strong>{message.user}</strong>: <br />
            {message.message}
          </li>
        ))}
      </ul>

      <hr className="my-4" />
      <input
        type="text"
        placeholder="Type a message..."
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
    </div>
  );
}
