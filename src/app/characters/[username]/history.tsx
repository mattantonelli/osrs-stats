"use client";

import SkillChart from "@/app/components/skillChart";
import { LevelUp } from "@/lib/character";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface CharacterHistoryParams {
  defaultSkills: Record<string, number>;
  history: LevelUp[];
}

export default function CharacterHistory( { defaultSkills, history } : CharacterHistoryParams) {
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [skills, setSkills] = useState({...defaultSkills});
  const [step, setStep] = useState(0);
  const [debouncedStep] = useDebounce(step, 10);
  const [title, setTitle] = useState("");

  // Animate the chart if play is enabled
  useEffect(() => {
    if (isPlaying) {
      if (step < history.length - 1) {
        setTimeout(() => {
          // Apply the level up data for the current point in history
          let newSkills = {...skills};
          const levelUp = history[step];
          newSkills[levelUp.skill] = levelUp.level;
          setSkills(newSkills);
          setTitle(levelUp.datetime.toLocaleDateString());

          // Increment the step for the next render, which will be triggered after a delay since
          // since we updated the skills.
          setStep(step + 1);
        }, 50 / speed);
      } else {
        // If we have reached the end of the history, stop the animation
        setIsPlaying(false);
      }
    }
  }, [speed, history, isPlaying, skills, step]);

  // Display the current snapshot in history if play is disabled
  useEffect(() => {
    if (!isPlaying) {
      let newSkills = {...defaultSkills};
      let date!: Date;

      // Iterate over history up to the current step to build the skills
      for (const levelUp of history.slice(0, debouncedStep + 1)) {
        newSkills[levelUp.skill] = levelUp.level;
        date = levelUp.datetime;
      }

      setSkills(newSkills);
      setTitle(date?.toLocaleDateString());
    }
  }, [defaultSkills, history, isPlaying, debouncedStep]);

  function setManualStep(newStep: number) {
    setIsPlaying(false);
    setStep(newStep);
  }

  function togglePlay() {
    // If we hit play at the end of the animation, start from the beginning
    if (!isPlaying && step == history.length - 1) {
      setSkills({...defaultSkills});
      setStep(0);
    }

    setIsPlaying(!isPlaying);
  }

  return (
    <div className="d-flex flex-column">
      <SkillChart skills={skills} title={title} />
      <input type="range" className="form-range" min="0" max={history.length - 1}
        value={step} onChange={(e) => setManualStep(parseInt(e.target.value))} />
      <div className="d-flex justify-content-center">
        <button type="button" className={`btn btn-${isPlaying ? "primary" : "success"}`} onClick={() => togglePlay()}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="input-group input-group-speed ms-2">
          <input type="number" className="form-control" value={speed} min="1" max="10"
            onChange={(e) => setSpeed(parseInt(e.target.value))} />
          <span className="input-group-text">x</span>
        </div>
      </div>
    </div>
  );
}