import { getUserExperiences } from '../server'

export default async function ExperienceList({ userId }: { userId: string }) {
  const experiences = await getUserExperiences(userId)
  return (
    <ul>
      {experiences.map((exp) => (
        <li key={exp.id}>
          {exp.title} {exp.startDate.toDateString()}
        </li>
      ))}
    </ul>
  )
}
