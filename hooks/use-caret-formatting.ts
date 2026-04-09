export function useCaretFormatting() {
  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const getBold = () => document.queryCommandState("bold");
  const getItalic = () => document.queryCommandState("italic");
  const getUnderline = () => document.queryCommandState("underline");

  const toggleBold = () => applyFormat("bold");
  const toggleItalic = () => applyFormat("italic");
  const toggleUnderline = () => applyFormat("underline");

  return {
    toggleBold,
    toggleItalic,
    toggleUnderline,
    getBold,
    getItalic,
    getUnderline,
    applyFormat,
  };
}
