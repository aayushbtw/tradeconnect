export default function Page({ params }: { params: { brand: string } }) {
  return (
    <div className="rounded-[5px] overflow-hidden flex flex-col py-[30px] px-5 items-start justify-start border-[1px] border-dashed border-blueviolet">
      <div className="relative bg-white w-[1600px] h-[402px] overflow-hidden shrink-0 text-left text-base text-color-2 font-poppins">
        <div className="absolute top-[354px] left-[143px] w-[1314px] flex flex-row items-center justify-between text-dark">
          <div className="relative capitalize">© 2023 All rights reserved</div>
          <div className="flex flex-row items-start justify-start gap-[37px]">
            <div className="relative capitalize">Terms</div>
            <div className="relative capitalize">Privacy</div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[20px]">
            <img
              className="relative w-[35px] h-[35px] object-cover"
              alt=""
              src="/face-book@2x.png"
            />
            <img
              className="relative w-[35px] h-[35px] object-cover"
              alt=""
              src="/twitter@2x.png"
            />
            <img
              className="relative w-[35px] h-[35px] object-cover"
              alt=""
              src="/twitter1@2x.png"
            />
            <img
              className="relative w-[35px] h-[35px] object-cover"
              alt=""
              src="/youtub@2x.png"
            />
          </div>
        </div>
        <div className="absolute h-[0.25%] top-[82.59%] bottom-[17.16%] left-[0px] bg-color-1 w-[1600px] opacity-[0.25]" />
        <div className="absolute top-[60px] left-[367px] w-28 flex flex-col items-start justify-start gap-[24px]">
          <div className="relative font-semibold">Company</div>
          <div className="flex flex-col items-start justify-start gap-[20px]">
            <div className="relative capitalize">About us</div>
            <div className="relative capitalize">Careers</div>
            <div className="relative capitalize">Contact us</div>
          </div>
        </div>
        <div className="absolute top-[61px] left-[102px] flex flex-col items-start justify-start gap-[24px]">
          <div className="relative font-semibold">Information</div>
          <div className="flex flex-col items-start justify-start gap-[20px]">
            <div className="relative capitalize">FAQ</div>
            <div className="relative capitalize text-black">
              International trade
            </div>
            <div className="relative capitalize">Blog</div>
            <div className="relative capitalize">
              <p className="m-0">Support</p>
            </div>
          </div>
        </div>
        <div className="absolute top-[0px] left-[815px] bg-gold w-[642px] h-[332px]">
          <div className="absolute top-[18.07%] left-[3.12%] font-semibold">
            Subscribe
          </div>
          <div className="absolute h-[15.66%] w-[93.77%] top-[28.61%] right-[3.12%] bottom-[55.72%] left-[3.12%] text-darkslategray">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-md bg-white" />
            <img
              className="absolute h-full w-[9.23%] top-[0%] right-[0.07%] bottom-[0%] left-[90.7%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/fill.svg"
            />
            <img
              className="absolute h-[24.93%] w-[2.82%] top-[36.44%] right-[3.16%] bottom-[38.62%] left-[94.02%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/arrowsdowntopmove1.svg"
            />
            <div className="absolute top-[calc(50%_-_6px)] left-[2.99%] leading-[10px] capitalize">
              Enter your email
            </div>
          </div>
          <div className="absolute w-[93.77%] top-[49.1%] left-[3.12%] leading-[30px] font-semibold text-color-1 inline-block opacity-[0.6]">
            <p className="m-0">Stay in the loop with our newsletter!</p>
            <p className="m-0">&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  );
}
