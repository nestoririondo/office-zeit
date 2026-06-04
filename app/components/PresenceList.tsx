"use client";

import { useState, useEffect } from "react";
import PersonChip from "./PersonChip";

type Presence = { person: string; withDog: boolean; late: boolean; withBeer: boolean; withCake: boolean };

type Props = {
  presences: Presence[];
  currentPerson: string;
  colorMap: Record<string, string>;
  darkBackground?: boolean;
  date: string;
};

export default function PresenceList({
  presences,
  currentPerson,
  colorMap,
  darkBackground,
  date,
}: Props) {
  const [chips, setChips] =
    useState<(Presence & { exiting?: boolean })[]>(presences);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mq.addEventListener("change", handler);
    handler({ matches: mq.matches } as MediaQueryListEvent);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const incoming = new Set(presences.map((p) => p.person));

    const exitTimer = setTimeout(() => {
      setChips((prev) => {
        const toExit = prev.filter((c) => !c.exiting && !incoming.has(c.person));
        if (toExit.length === 0) return presences;
        return prev.map((c) =>
          toExit.some((e) => e.person === c.person) ? { ...c, exiting: true } : c,
        );
      });
    }, 0);

    const timer = setTimeout(() => setChips(() => presences), 220);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(timer);
    };
  }, [presences]);

  return (
    <>
      {chips.map(({ person, withDog, late, withBeer, withCake, exiting }) => (
        <PersonChip
          key={person}
          person={person}
          color={colorMap[person] ?? "#e5e7eb"}
          withDog={withDog}
          late={late}
          withBeer={withBeer}
          withCake={withCake}
          dimmed={person !== currentPerson}
          exiting={exiting}
          darkBackground={isDarkMode ? !darkBackground : darkBackground}
          isOwn={person === currentPerson}
          date={date}
        />
      ))}
    </>
  );
}
