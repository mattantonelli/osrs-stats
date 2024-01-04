import LevelChart from "@/app/components/levelChart";
import { getCharacter } from "@/lib/character";

interface CharacterParams {
  params: { username: string }
}

export default async function Character({ params } : CharacterParams) {
  const character = await getCharacter(decodeURI(params.username));

  if (character !== null) {
    return (
      <div className="row">
        <div className="col-12">
          <h1 className="mb-0">{character.name}</h1>
          <small>
            Created: {character.createdAt.toLocaleDateString()}<br />
            Last Updated: {character.updatedAt.toLocaleDateString()}
          </small>
          <div className="mt-4">
            <LevelChart levels={character.levels} />
          </div>
        </div>
      </div>
    );
  }
}