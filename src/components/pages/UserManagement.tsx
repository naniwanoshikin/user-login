/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, VFC } from "react";
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";

import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  // モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();
  // ユーザー一覧
  const { getUsers, loading, users } = useAllUsers();
  // 選択したユーザー情報
  const { onSelectUser, selectedUser } = useSelectUser();
  // ログインユーザー情報
  const { loginUser } = useLoginUser();
  console.log(loginUser);

  // 画面表示時に実行
  useEffect(() => getUsers(), []);

  // モーダル画面を表示
  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen] // 依存変数なくてもバグ出なかった
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap spacing="20px" p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}

      <UserDetailModal
        user={selectedUser}
        isOpen={isOpen}
        isAdmin={loginUser?.isAdmin} // 管理者ユーザーかどうか
        onClose={onClose}
      />
    </>
  );
});
