import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string; // メッセージ文
  status: "info" | "warning" | "success" | "error";
};

export const useMessage = () => {
  const toast = useToast();

  const showMessage = useCallback(
    (props: Props) => {
      const { title, status } = props;

      toast({
        title,
        status,
        position: "top",
        duration: 2000,
        isClosable: true // 閉じてるかどうか
      });
    },
    [toast]
  );
  return { showMessage };
};
