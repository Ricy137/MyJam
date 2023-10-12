//TODO: tooltip, Modal can abstract out popup
import { ReactNode, useCallback } from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useId,
  FloatingOverlay,
  FloatingFocusManager,
} from "@floating-ui/react";
import { atom, useAtom, useSetAtom } from "jotai";
import cx from "clsx";
import { uniqueId } from "lodash-es";
import renderReactNode from "@utils/renderReactNode";

export interface Modal {
  id: string;
  title: string;
  content: ReactNode;
  headClass?: string;
  containerClass?: string;
  wrapperClass?: string;
}
const isOpenAtom = atom(false);
const modalAtom = atom<Modal | null>(null);

export const useModal = (param?: Omit<Modal, "id">) => {
  const setIsOpen = useSetAtom(isOpenAtom);
  const setModal = useSetAtom(modalAtom);

  const showModal = useCallback(() => {
    if (!param) return;
    setModal({ ...param, id: uniqueId() });
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
    setModal(null);
  }, []);

  return { showModal, hideModal };
};

const ModalRender: React.FC = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [modal, setModal] = useAtom(modalAtom);
  const handleOpen = useCallback((open: boolean, event?: Event) => {
    event?.preventDefault();
    setIsOpen(open);
    if (!open) setModal(null);
  }, []);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpen,
  });

  const click = useClick(context);

  const dismiss = useDismiss(context, {
    outsidePressEvent: "mousedown",
  });

  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const labelId = useId();

  const descriptionId = useId();

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}></div>
      {isOpen && (
        <FloatingOverlay
          lockScroll
          style={{ background: "rgba(0, 0, 0, 0.8)", zIndex: 1000 }}
          className={cx(
            "flex items-center justify-center",
            modal?.containerClass
          )}
        >
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              aria-labelledby={labelId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}
            >
              <div
                className={cx(
                  "p-24px md:40px rounded-30px bg-#ffffff",
                  modal?.wrapperClass
                )}
              >
                <div
                  className={cx(
                    "flex justify-between items-center h-40px text-18px leading-26px text-#111111 font-medium",
                    modal?.headClass
                  )}
                >
                  {modal?.title}
                  <span
                    className="i-ep:close-bold ml-8px text-14px text-#606266 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <div className="h-1px bg-#EBEDF0 pointer-events-none" />
                <div className="pt-24px">{renderReactNode(modal?.content)}</div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </>
  );
};

export default ModalRender;
