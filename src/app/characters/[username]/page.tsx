import { defaultSkillLevels, getCharacter, getCharacterList } from "@/lib/character";
import CharacterHistory from "./history";
import CharacterSelect from "@/app/components/characterSelect";

interface CharacterParams {
  params: { username: string }
}

export default async function Character({ params } : CharacterParams) {
  console.log(decodeURI(params.username));
  const character = await getCharacter(decodeURI(params.username));
  const characterList = await getCharacterList();

  if (character === null) {
    return (
      <h5 className="text-center">Character not found.</h5>
    );
  } else {
    return (
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="mb-0">{character.name}</h1>
              <small>
                Created: {character.createdAt.toLocaleDateString()}<br />
                Last Updated: {character.updatedAt.toLocaleDateString()}
              </small>
            </div>
            <div className="mt-2">
              <CharacterSelect characterList={characterList} />
            </div>
          </div>
          <div className="mt-4">
            <CharacterHistory defaultSkills={defaultSkillLevels()} history={character.history} />
          </div>
        </div>
      </div>
    );
  }
}