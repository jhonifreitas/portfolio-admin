export default function Loading() {
  return (
    <div className="absolute h-full w-full flex items-center justify-center">
      <span className="animate-ping h-10 w-10 rounded-full bg-sky-400 opacity-75"></span>
    </div>
  );
}
