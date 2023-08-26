import { useState } from "react";
import UserForm from "./components/UserForm";
import type { Thought } from "./types";
import ThoughtItem from "./components/ThoughtItem";
import InputFormItem from "./components/InputFormItem";
import useUser from "./hooks/useUser";
import api from "./api/thought";

interface thoughtForm extends HTMLFormElement {
  thought: HTMLInputElement;
}

function App() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const { user, setUser } = useUser();

  const handleSubmit = async (event: React.FormEvent<thoughtForm>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.thought.value.trim();

    if (!inputValue) return;

    const thought = {
      id: crypto.randomUUID(),
      description: inputValue,
      country: user?.country || "Unknown",
      username: user?.name || "Anonymous",
      date: new Date(),
    };

    setThoughts([thought, ...thoughts]);
    event.currentTarget.thought.value = "";

    const responseSaveThought = await api.saveThought(thought);
    console.log(responseSaveThought);
  };

  if (!user) {
    return <UserForm setUser={setUser} />;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-5">Reflectify</h1>
        <p className="italic">
          {user?.name
            ? `Hi ${user.name}, share your reflection or thought with the world!`
            : "Share your reflection or thought with the world!"}
        </p>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 p-4 max-w-sm m-auto"
      >
        <InputFormItem
          htmlFor="thoughtInput"
          name="thought"
          placeholder="Share a reflexion..."
        />

        <button type="submit" className=" bg-purple-600 rounded-md p-2 ">
          Share
        </button>
      </form>

      {thoughts.length > 0 && (
        <ul className="flex flex-col gap-4 p-4 mt-5  max-w-sm m-auto">
          {thoughts.map((thought) => (
            <ThoughtItem key={thought.id} thought={thought} />
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
