import "./App.css";

const LENGTH = 3;

export default function App() {
  return (
    <>
      <StackedComponent />
    </>
  );
}

function StackedComponent() {
  return (
    <div className="wrapper">
      {new Array(LENGTH).fill(0).map((_, i) => (
        <div className="card" key={i} style={{ "--index": LENGTH - 1 - i }} />
      ))}
    </div>
  );
}
