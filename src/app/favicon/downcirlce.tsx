// components/icons/DownCircle.jsx
const DownCircle = ({ className = "", width = 28, height = 28 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 28 28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_bdi_192_1123)">
        <rect 
          width="20" 
          height="20" 
          rx="10" 
          transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 24 24)" 
          fill="url(#paint0_linear_192_1123)" 
          shapeRendering="crispEdges"
        />
        <rect 
          x="-0.125" 
          y="-0.125" 
          width="19.75" 
          height="19.75" 
          rx="9.875" 
          transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 23.75 23.75)" 
          stroke="url(#paint1_linear_192_1123)" 
          strokeOpacity="0.7" 
          strokeWidth="0.25" 
          shapeRendering="crispEdges"
        />
      </g>
      <g filter="url(#filter1_d_192_1123)">
        <path 
          d="M10.7998 12.7002L13.317 15.411C13.7126 15.8371 14.387 15.8371 14.7826 15.411L17.2998 12.7002" 
          stroke="#3B68FF" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter id="filter0_bdi_192_1123" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="1"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_192_1123"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.1 0"/>
          <feBlend mode="normal" in2="effect1_backgroundBlur_192_1123" result="effect2_dropShadow_192_1123"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_192_1123" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="1.5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.38 0"/>
          <feBlend mode="normal" in2="shape" result="effect3_innerShadow_192_1123"/>
        </filter>
        <filter id="filter1_d_192_1123" x="8.0498" y="9.9502" width="12" height="8.53027" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.35 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_192_1123"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_192_1123" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_192_1123" x1="-6.5" y1="-8" x2="30.5" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#344EA6" stopOpacity="0.26"/>
          <stop offset="0.505208" stopColor="#587EFF" stopOpacity="0.12"/>
          <stop offset="1" stopColor="#829EFF" stopOpacity="0.04"/>
        </linearGradient>
        <linearGradient id="paint1_linear_192_1123" x1="0.5" y1="3" x2="18" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.15"/>
          <stop offset="1" stopColor="white" stopOpacity="0.44"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DownCircle;