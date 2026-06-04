type Props = {
  person: string
  color: string
  withDog?: boolean
  dimmed?: boolean
  exiting?: boolean
}

export default function PersonChip({ person, color, withDog, dimmed, exiting }: Props) {
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
        boxShadow: "2px 2px 0 rgba(0,0,0,0.5)",
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
