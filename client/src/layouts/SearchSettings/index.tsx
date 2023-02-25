import { useState } from "react";
import { Button, Modal } from "react-flatifycss";
import clsx from "clsx";
import Icons from "@components/Icons";
import ColumnSettings from "./columns";
import GeneralSettings from "./general";
import HighlightSettings from "./highlight";
import "./style.scss";

export default function SearchSettings() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        aria-label="تنظیمات جستجو"
        className={clsx("settings-modal-toggle", isOpen && "active")}
        size="xs"
        onClick={() => setIsOpen(true)}
      >
        <Icons.Settings />
      </Button>
      <Modal
        aria-label="تنظیمات جستجو"
        id="settings-modal"
        className="settings-modal"
        position="bottom"
        size="sm"
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
      >
        <ColumnSettings />
        <GeneralSettings />
        <HighlightSettings />
      </Modal>
    </>
  );
}
