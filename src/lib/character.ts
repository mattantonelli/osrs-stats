import { promises as fs } from "fs";

export interface LevelUp {
  datetime: Date;
  level: number;
  skill: string;
}

export class Character {
  name: string;
  history: LevelUp[];
  levels: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, history: LevelUp[], levels: Record<string, number>) {
    this.name = name;
    this.levels = levels;
    this.history = history;
    this.createdAt = history[0].datetime;
    this.updatedAt = history[history.length - 1].datetime;
  }
}

export async function getCharacter(username: string) : Promise<Character | null> {
  // Read the character data from a local JSON file
  const path = `${process.cwd()}/vendor/${username}.json`;
  let data;

  try {
    const file = await fs.readFile(path, "utf-8");
    data = JSON.parse(file);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.error(`File not found: ${path}`);
    } else {
      console.error(`There was a problem reading the file: ${path}`);
    }

    return null;
  }

  // Map the level-up data to an interface
  const history: LevelUp[] = data.map((levelUp: any) => {
    return({
      skill: levelUp["skill"].toLowerCase(),
      level: levelUp["level"],
      datetime: new Date(levelUp["datetime"])
    });
  });

  let levels: Record<string, number> = {
    attack: 1, strength: 1, defence: 1, ranged: 1, prayer: 1, magic: 1, runecraft: 1, construction: 1,
    hitpoints: 10, agility: 1, herblore: 1, thieving: 1, crafting: 1, fletching: 1, slayer: 1, hunter: 1,
    mining: 1, smithing: 1, fishing: 1, cooking: 1, firemaking: 1, woodcutting: 1, farming: 1
  };

  // Iterate over the history of level-ups and track the highest level for each skill
  for(const levelUp of history) {
    const skill = levelUp.skill;
    const currentLevel = levels[skill];
    const newLevel = levelUp.level;

    if (newLevel > currentLevel) {
      levels[skill] = newLevel;
    }
  }

  // Remove Combat since it's a meta level
  delete levels["combat"];

  return new Character(username, history, levels);
}