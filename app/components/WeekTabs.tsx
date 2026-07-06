"use client"

import Link from "next/link"

type Props = {
  activeOffset: number
  isAutoSwitched?: boolean
}

export default function WeekTabs({ activeOffset, isAutoSwitched }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      {isAutoSwitched && (
        <p className="font-mono text-xs text-center">
          Wochenende: du siehst automatisch die nächste Woche.
        </p>
      )}
      <div className="flex gap-px border border-black dark:border-white mx-auto w-fit">
      <Link
        href="/?week=0"
        className={`font-mono text-sm px-4 py-2 ${
          activeOffset === 0
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "hover:bg-gray-100 dark:hover:bg-gray-900"
        }`}
      >
        Diese Woche
      </Link>
      <Link
        href="/?week=1"
        className={`font-mono text-sm px-4 py-2 ${
          activeOffset === 1
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "hover:bg-gray-100 dark:hover:bg-gray-900"
        }`}
      >
        Nächste Woche
      </Link>
      </div>
    </div>
  )
}
