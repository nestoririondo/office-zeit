type Props = {
  person: string
  color: string
  withDog?: boolean
  dimmed?: boolean
  exiting?: boolean
  darkBackground?: boolean
}

export default function PersonChip({ person, color, withDog, dimmed, exiting, darkBackground }: Props) {
  const animation = exiting
    ? "chip-out 0.2s ease-in forwards"
    : withDog
      ? "chip-dog-in 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) both"
      : "chip-in 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both"

  return (
    <span
      style={{
        backgroundColor: color,
        color: "#000",
        animation,
        boxShadow: darkBackground
          ? `2px 2px 0 rgba(255,255,255,${dimmed ? 0.3 : 0.65})`
          : `2px 2px 0 rgba(0,0,0,${dimmed ? 0.12 : 0.3})`,
        transform: "rotate(-1.5deg)",
      }}
      className={`inline-flex items-center justify-center font-mono text-xs font-bold min-w-[5rem] min-h-20 max-h-20 p-2 text-center transition-opacity ${dimmed ? "opacity-60" : "opacity-100"}`}
    >
      <span className="flex flex-col items-center leading-tight">
        <span>{person}</span>
        {withDog && <span>🐶</span>}
      </span>
    </span>
  )
}
