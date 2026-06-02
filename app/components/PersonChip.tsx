type Props = {
  person: string
  color: string
  withDog?: boolean
  dimmed?: boolean
}

export default function PersonChip({ person, color, withDog, dimmed }: Props) {
  return (
    <span
      style={{ backgroundColor: color, color: "#000" }}
      className={`font-mono text-xs px-2 py-1 font-bold transition-opacity ${dimmed ? "opacity-60" : "opacity-100"}`}
    >
      {person}{withDog ? " 🐶" : ""}
    </span>
  )
}
