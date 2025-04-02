import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

// esse codigo serve para quando usar nos componentes não precisar tipar em cada um.
//exemplo com tipagem do exemplo abaixo:  const dispatch = useAppDispatch();
//exemplo sem a tipagem do exemplo abaixo:
// const dispatch = useDispatch<AppDispatch>(); // Passando tipo manualmente
// const user = useSelector((state: RootState) => state.auth.user) // Passando o tipo manualmente;
// exemplos acima e de como e ou seria o uso em cada component.

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
