"use client";

import SkillChart from "@/app/components/skillChart";
import { LevelUp } from "@/lib/character";
import { useEffect, useRef, useState } from "react";

interface CharacterHistoryParams {
  defaultSkills: Record<string, number>;
  history: LevelUp[];
}

export default function CharacterHistory( { defaultSkills, history } : CharacterHistoryParams) {
  const [delayMs, _setDelayMs] = useState(10);
  const [skills, setSkills] = useState(defaultSkills);
  const [title, setTitle] = useState("");
  const step = useRef(-1);

  useEffect(() => {
    if (step.current < history.length - 1) {
      const interval = setInterval(() => {
        step.current = step.current + 1;

        let newSkills = {...skills};
        const levelUp = history[step.current];
        newSkills[levelUp.skill] = levelUp.level;

        setSkills(newSkills);
        setTitle(levelUp.datetime.toLocaleDateString());

        if(step.current >= history.length) {
          clearInterval(interval);
        }
      }, delayMs);

      return () => clearInterval(interval);
    }
  });

  return (
    <SkillChart skills={skills} title={title} />
  );
}