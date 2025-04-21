export default function TextReveal() {
  const word = "Animations";

  return (
    <h1 className="flex items-center justify-center text-5xl font-bold font-mono overflow-hidden">
      {word.split("").map((letter, index) => {
        return (
          <span
            key={index}
            className="animate-letter"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {letter}
          </span>
        );
      })}
    </h1>
  );
}
