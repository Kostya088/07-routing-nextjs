// components/NotePreview/NotePreview.tsx

"use client";

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

type Props = {
  children: React.ReactNode;
};

const NotePreview = ({ children }: Props) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div className={css.backdrop} onClick={close}>
      <div className={css.container} onClick={(e) => e.stopPropagation()}>
        <div className={css.item}>
          {children}
          <button className={css.backBtn} onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotePreview;
