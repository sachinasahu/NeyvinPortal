import { toast } from "sonner";

type ToastData = {
  type?: "success" | "error" | "warning" | "info";
};

type ToastMessage = string | { description?: string };

export function useToast() {
  return {
    toast: (message: ToastMessage, data?: ToastData) => {
      const description = typeof message === "string" ? message : message.description || "";

      switch (data?.type) {
        case "success":
          toast.success(description);
          break;
        case "error":
          toast.error(description);
          break;
        case "warning":
          toast.warning(description);
          break;
        case "info":
          toast.info(description);
          break;
        default:
          toast(description);
      }
    },
  };
}
