import { useState } from "react";

interface TagInputProps {
  onChange: (tags: string[]) => void;
}

export default function TagInput({ onChange }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "," || e.key === "Enter") && inputValue.trim() !== "") {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      onChange(newTags); // send to parent
    }
    setInputValue("");
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags); // send to parent
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap gap-2 border p-2 rounded-lg">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              ✕
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[120px] border-none outline-none"
          placeholder="Type and press , or Enter"
        />
      </div>
    </div>
  );
}
