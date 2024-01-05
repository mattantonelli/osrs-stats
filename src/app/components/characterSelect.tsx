"use client";

import { useRouter } from "next/navigation";

interface CharacterSelectParams {
  characterList: string[];
}

export default function CharacterSelect({ characterList} : CharacterSelectParams) {
  const router = useRouter();

  function selectCharacter(character: string) {
    if (character.length > 0) {
      router.push(`/characters/${character}`);
    }
  }

  return (
    <select className="form-control w-auto" onChange={(e) => selectCharacter(e.target.value)}>
      <option value="">Select a character</option>
      {characterList.map((character) => {
        return <option value={character} key={character}>{character}</option>;
      })}
    </select>
  );
}