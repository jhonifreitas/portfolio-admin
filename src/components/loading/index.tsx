export default function Loading(props: {absolute?: boolean}) {
  return (
    <>
      {props.absolute && 
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-white/80">
          <span className="animate-ping h-10 w-10 rounded-full bg-indigo-400 opacity-75"></span>
        </div>
      }

      {!props.absolute &&
        <span className="animate-ping h-3 w-3 rounded-full bg-white opacity-75"></span>
      }
    </>
  );
}
