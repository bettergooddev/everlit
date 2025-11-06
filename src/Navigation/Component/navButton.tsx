function NavButton() {
  return (
    <a
      className="h-10 px-4 flex items-center relative overflow-hidden rounded-[2px] border-[0.5px] border-[#a99b914a]/20 group hover:cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
      //   style={{ background: 'hsba(30, 15%, 95%, 0.2)' }}
    >
      <div className="bg-black/50 absolute inset-0 blur-[6px] " />
      <div className="inset-0 absolute  saturate-200">
        <div
          className=" inset-0 absolute pointer-events-none -z-[1]"
          style={{
            background:
              'linear-gradient(249deg, rgb(134 121 107 / 20%) 0.35%, rgba(255, 132, 1, 0) 120.36%)',
          }}
        />
      </div>
      <div className="inset-0 absolute transition-all duration-300 group-hover:bg-[#8E471B]/10 saturate-200">
        <div
          className="blur-[6px] inset-0 absolute pointer-events-none -z-[1] group-hover:rotate-12 group-hover:translate-y-[7px] group-hover:translate-x-[-7px] transition-all duration-300"
          style={{
            background:
              'radial-gradient(at -20% 110%, rgb(225 89 39) 0%, rgb(196 123 63 / 43%) 32%, rgb(247 233 193 / 6%) 63%, rgba(247, 233, 193, 0) 100%)',
          }}
        />
      </div>

      <span className="z-0 relative block">Enter</span>
    </a>
  )
}

export default NavButton
