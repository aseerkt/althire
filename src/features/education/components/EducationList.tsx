import { getUserEducations } from '../server'

export default async function EducationList({ userId }: { userId: string }) {
  const educations = await getUserEducations(userId)
  return (
    <ul>
      {educations.map((edu) => (
        <li key={edu.id}>
          {edu.degree} {edu.startDate.toDateString()}
        </li>
      ))}
    </ul>
  )
}
