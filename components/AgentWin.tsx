import Image from "next/image";
import { Stamp } from "@/components/Stamp";

export function AgentWin() {
  return (
    <figure className="agent-win" aria-label="A note landing after a win">
      <Image
        src="/wax-seal.png"
        alt=""
        width={160}
        height={160}
        className="agent-win-seal"
      />
      <figcaption className="flex items-center justify-between pr-16 font-mono text-[0.65rem] tracking-[0.18em] text-ink-soft uppercase">
        <span>cursor · chat</span>
        <span>after a win</span>
      </figcaption>
      <p className="mt-5 font-mono text-[0.8rem] leading-relaxed text-ink-soft">
        Tests passed. 47 / 47.
        <br />
        The flaky race in checkout is gone.
      </p>
      <div className="agent-win-note mt-6">
        <Stamp className="agent-win-stamp" />
        <p className="mt-5 font-serif text-2xl italic">Maya was here.</p>
        <p className="mt-2 text-lg text-ink-soft">
          Proud of you. That was a real one.
        </p>
      </div>
    </figure>
  );
}
