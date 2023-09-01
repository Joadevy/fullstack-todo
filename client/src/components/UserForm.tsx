import { User } from "../types";
import InputFormItem from "./InputFormItem";

interface TodoForm extends HTMLFormElement {
  todo: HTMLInputElement;
}

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

function UserForm({ setUser }: Props) {
  const handleSubmit = async (event: React.FormEvent<TodoForm>) => {
    event.preventDefault();
    const username = capitalize(event.currentTarget.username.value.trim());
    const country = capitalize(event.currentTarget.country.value.trim());

    if (!username || !country) return;

    const user: User = {
      id: crypto.randomUUID(),
      username: username,
      country: country,
      password: "",
    };

    try {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      event.currentTarget.username.value = "";
      event.currentTarget.country.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-5">Reflectify</h1>
        <p className="italic">
          Share your reflection or thought with the world!
        </p>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 max-w-sm m-auto"
      >
        <InputFormItem
          htmlFor="inputName"
          name="username"
          placeholder="Type your name ..."
          label="Name"
        />

        <InputFormItem
          htmlFor="inputPwd"
          name="password"
          placeholder="Type your password ..."
          label="Password"
        />

        <InputFormItem
          htmlFor="inputCountry"
          name="country"
          placeholder="Type your country ..."
          label="Country"
        />

        <button type="submit" className=" bg-purple-600 rounded-md p-2 mt-2 ">
          Continue
        </button>
      </form>
    </>
  );
}

export default UserForm;
