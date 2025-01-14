

export default function Footer() {
  return (
    <footer className="w-full bg-brand/brand-dark border-t">
      <div className="flex items-cente justify-center gap-0">
        {["C", "a", "r", "t", "e", "r"].map((item, index, arr) => {
          return (
            <span
              // onClick={() => router.push("/")}
              key={`item-${index}`}
              className={`text-[4rem] md:text-[6rem] lg:text-[15rem] font-bold ${
                index + 1 <= arr.length / 2
                  ? "hover:-rotate-12"
                  : "hover:rotate-12"
              }  cursor-pointer transition-all duration-200 ease-out hover:bg-primary-purple/primary-purple-600  hover:scale-110 bg-gradient-to-b  
              from-primary-purple/primary-purple-600 bg-clip-text text-transparent `}
            >
              {item}
            </span>
          );
        })}
      </div>
      
    </footer>
  );
}