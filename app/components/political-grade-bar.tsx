/**
 * Political grade bar component
 * @param grade - grade of the article
 * @returns Political grade bar component
 */
export default function PoliticalGradeBar({ grade }: { grade: number }) {
  return (
    <div className="w-full h-4 rounded-full flex items-center justify-between bg-neutral-200/80">
      <div
        className={`${-3 === grade && "bg-blue-700"} w-full h-4 rounded-full`}
      />
      <div
        className={`${-2 === grade && "bg-blue-500"} w-full h-4 rounded-full`}
      />
      <div
        className={`${-1 === grade && "bg-blue-300"} w-full h-4 rounded-full`}
      />
      <div
        className={`${0 === grade && "bg-green-600"} w-full h-4 rounded-full`}
      />
      <div
        className={`${1 === grade && "bg-red-300"} w-full h-4 rounded-full`}
      />
      <div
        className={`${2 === grade && "bg-red-500"} w-full h-4 rounded-full`}
      />
      <div
        className={`${3 === grade && "bg-red-700"} w-full h-4 rounded-full`}
      />
    </div>
  );
}
