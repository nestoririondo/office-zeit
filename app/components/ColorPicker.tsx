import IdentityForm from "./IdentityForm"

type Props = {
  person: string
  currentColor: string
}

export default function ColorPicker({ person, currentColor }: Props) {
  return <IdentityForm person={person} currentColor={currentColor} />
}
