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
      style={{ backgroundColor: color, color: "#000", animation }}
      className={`font-mono text-xs px-2 py-1 font-bold transition-opacity ${dimmed ? "opacity-60" : "opacity-100"}`}
    >
      {person}{withDog ? " 🐶" : ""}
    </span>
  )
}
