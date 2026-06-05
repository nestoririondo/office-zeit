import SettingsButton from "./SettingsButton"
import DarkModeToggle from "./DarkModeToggle"

type Props = {
  person: string
  color: string
}

export default function Header({ person, color }: Props) {
  return (
    <header className="flex items-center justify-between pb-6 gap-6">
      <h1 className="font-mono font-bold text-2xl">Wann kommst du ins Office?</h1>
      <div className="flex items-center gap-6">
        <DarkModeToggle />
        <SettingsButton person={person} color={color} />
      </div>
    </header>
  )
}
